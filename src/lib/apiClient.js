/**
 * apiClient.js
 *
 * Centralized fetch wrapper providing:
 *   - Request timeout (AbortController, default 10s)
 *   - Exponential-backoff retry (up to 3 attempts, network errors only)
 *   - In-flight request deduplication (same URL shares one Promise)
 *   - TTL-based in-memory response cache (configurable, default 60s)
 *
 * Usage:
 *   import { apiGet, apiPost, clearCache } from '../lib/apiClient';
 *   const data = await apiGet('https://...', { ttl: 30 });
 */

// ─── In-memory stores ────────────────────────────────────────────────────────

/** @type {Map<string, { data: any, expiresAt: number }>} */
const cache = new Map();

/** @type {Map<string, Promise<any>>} */
const inFlight = new Map();

// ─── Constants ────────────────────────────────────────────────────────────────

const DEFAULT_TIMEOUT_MS  = 10_000;   // 10 seconds
const DEFAULT_TTL_MS      = 60_000;   // 60 seconds cache
const MAX_RETRIES         = 3;
const RETRY_BASE_DELAY_MS = 500;      // doubles each retry: 500 → 1000 → 2000

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Sleep for `ms` milliseconds.
 * @param {number} ms
 */
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * Whether an error is worth retrying (network / abort / 5xx, never 4xx).
 * @param {Error | Response} e
 */
function isRetryable(e) {
  if (e instanceof Response) return e.status >= 500;
  // TypeError = network failure; DOMException(ABORT_ERR) = timeout
  return e instanceof TypeError || (e instanceof DOMException && e.name === 'AbortError');
}

// ─── Core fetch with timeout ──────────────────────────────────────────────────

/**
 * Fetch `url` with an AbortController timeout.
 * @param {string} url
 * @param {RequestInit & { timeoutMs?: number }} options
 * @returns {Promise<Response>}
 */
async function fetchWithTimeout(url, { timeoutMs = DEFAULT_TIMEOUT_MS, ...options } = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    return response;
  } catch (err) {
    if (err.name === 'AbortError') {
      const timeout = new Error(`Request timed out after ${timeoutMs}ms: ${url}`);
      timeout.name = 'TimeoutError';
      throw timeout;
    }
    throw err;
  } finally {
    clearTimeout(timer);
  }
}

// ─── Retry wrapper ────────────────────────────────────────────────────────────

/**
 * Execute `fn` up to `MAX_RETRIES` times with exponential backoff.
 * Only retries on retryable errors.
 * @template T
 * @param {() => Promise<T>} fn
 * @returns {Promise<T>}
 */
async function withRetry(fn) {
  let lastError;
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (!isRetryable(err) || attempt === MAX_RETRIES - 1) throw err;
      const delay = RETRY_BASE_DELAY_MS * Math.pow(2, attempt);
      await sleep(delay);
    }
  }
  throw lastError;
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * GET a URL with caching and deduplication.
 *
 * @param {string} url
 * @param {{
 *   ttl?: number,        // cache TTL in ms (0 = skip cache)
 *   timeoutMs?: number,
 *   headers?: Record<string, string>
 * }} options
 * @returns {Promise<any>}  parsed JSON
 */
export async function apiGet(url, { ttl = DEFAULT_TTL_MS, timeoutMs = DEFAULT_TIMEOUT_MS, headers = {} } = {}) {
  const cacheKey = url;

  // 1. Serve from cache if fresh
  if (ttl > 0) {
    const hit = cache.get(cacheKey);
    if (hit && Date.now() < hit.expiresAt) {
      return hit.data;
    }
  }

  // 2. Deduplicate in-flight requests
  if (inFlight.has(cacheKey)) {
    return inFlight.get(cacheKey);
  }

  // 3. Fetch (with retry + timeout)
  const promise = withRetry(async () => {
    const res = await fetchWithTimeout(url, { timeoutMs, headers });
    if (!res.ok) {
      const err = new Error(`HTTP ${res.status} — ${res.statusText}`);
      err.status = res.status;
      throw err;
    }
    return res.json();
  }).then((data) => {
    if (ttl > 0) cache.set(cacheKey, { data, expiresAt: Date.now() + ttl });
    inFlight.delete(cacheKey);
    return data;
  }).catch((err) => {
    inFlight.delete(cacheKey);
    throw err;
  });

  inFlight.set(cacheKey, promise);
  return promise;
}

/**
 * POST JSON to a URL (no caching, with retry + timeout).
 *
 * @param {string} url
 * @param {any} body
 * @param {{ timeoutMs?: number, headers?: Record<string, string> }} options
 * @returns {Promise<any>}  parsed JSON
 */
export async function apiPost(url, body, { timeoutMs = DEFAULT_TIMEOUT_MS, headers = {} } = {}) {
  return withRetry(async () => {
    const res = await fetchWithTimeout(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...headers },
      body: JSON.stringify(body),
      timeoutMs,
    });
    if (!res.ok) {
      const err = new Error(`HTTP ${res.status} — ${res.statusText}`);
      err.status = res.status;
      throw err;
    }
    return res.json();
  });
}

/**
 * Invalidate a cached entry (call after a successful mutation).
 * @param {string} url  the exact URL used in the original apiGet call
 */
export function clearCache(url) {
  if (url) {
    cache.delete(url);
  } else {
    cache.clear();
  }
}

/**
 * Perform a lightweight HEAD request to check if a URL is reachable.
 * Returns true if the server responds with any HTTP status (even 4xx).
 * Returns false on network error or timeout.
 *
 * @param {string} url
 * @param {number} [timeoutMs=5000]
 * @returns {Promise<boolean>}
 */
export async function ping(url, timeoutMs = 5_000) {
  try {
    const res = await fetchWithTimeout(url, { method: 'HEAD', timeoutMs });
    return res.status < 600;
  } catch {
    return false;
  }
}
