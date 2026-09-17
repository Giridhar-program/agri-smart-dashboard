/**
 * rateLimiter.js
 *
 * Client-side rate limiting for the AI chat feature.
 * Uses sessionStorage so limits reset when the tab is closed.
 *
 * Limits:
 *   - MAX_MESSAGES_PER_SESSION : total AI calls allowed in one browser session
 *   - MAX_MESSAGES_PER_MINUTE  : sliding-window cap (last 60 seconds)
 *   - MIN_INTERVAL_MS          : minimum ms between consecutive calls (throttle)
 */

const STORAGE_KEY           = 'agrishare_ai_calls';
const MAX_MESSAGES_PER_SESSION = 20;
const MAX_MESSAGES_PER_MINUTE =  5;   // max 5 AI calls within any 60-second window
const MIN_INTERVAL_MS          = 3_000; // 3 s minimum between calls

// ─── Storage helpers ──────────────────────────────────────────────────────────

/**
 * Load the stored rate-limit state from sessionStorage.
 * @returns {{ count: number, lastCallAt: number, timestamps: number[] }}
 */
function loadState() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Back-compat: add timestamps array if missing (upgrade from v1)
      if (!parsed.timestamps) parsed.timestamps = [];
      return parsed;
    }
  } catch (_) {
    // Ignore parse errors — treat as fresh state
  }
  return { count: 0, lastCallAt: 0, timestamps: [] };
}

/**
 * Persist the rate-limit state to sessionStorage.
 * @param {{ count: number, lastCallAt: number, timestamps: number[] }} state
 */
function saveState(state) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (_) {
    // sessionStorage unavailable (private mode edge case) — fail silently
  }
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Check whether an AI call is allowed right now.
 *
 * Checks (in order):
 *   1. Session cap   — have we exceeded MAX_MESSAGES_PER_SESSION?
 *   2. Per-minute    — are there >= MAX_MESSAGES_PER_MINUTE in the last 60 s?
 *   3. Throttle      — has MIN_INTERVAL_MS elapsed since the last call?
 *
 * @returns {{ allowed: boolean, reason: string | null }}
 */
export function checkRateLimit() {
  const state = loadState();
  const now   = Date.now();

  // 1. Session cap
  if (state.count >= MAX_MESSAGES_PER_SESSION) {
    return {
      allowed: false,
      reason: `You've reached the limit of ${MAX_MESSAGES_PER_SESSION} AI messages for this session. Please refresh to start a new session.`,
    };
  }

  // 2. Per-minute sliding window
  const windowStart    = now - 60_000;
  const recentCalls    = (state.timestamps || []).filter((t) => t > windowStart);
  if (recentCalls.length >= MAX_MESSAGES_PER_MINUTE) {
    const oldestInWindow = Math.min(...recentCalls);
    const waitSec = Math.ceil((oldestInWindow + 60_000 - now) / 1_000);
    return {
      allowed: false,
      reason: `You're sending messages too quickly. Please wait ${waitSec} second${waitSec !== 1 ? 's' : ''} before trying again.`,
    };
  }

  // 3. Minimum interval throttle
  const elapsed = now - state.lastCallAt;
  if (state.lastCallAt > 0 && elapsed < MIN_INTERVAL_MS) {
    const wait = Math.ceil((MIN_INTERVAL_MS - elapsed) / 1_000);
    return {
      allowed: false,
      reason: `Please wait ${wait} second${wait !== 1 ? 's' : ''} before sending another message.`,
    };
  }

  return { allowed: true, reason: null };
}

/**
 * Record a successful AI call.
 * Call this AFTER the request is accepted (before the async operation).
 */
export function recordCall() {
  const state = loadState();
  const now   = Date.now();

  // Prune timestamps older than 60 s to keep storage small
  const windowStart = now - 60_000;
  const timestamps  = [...(state.timestamps || []).filter((t) => t > windowStart), now];

  saveState({
    count:      state.count + 1,
    lastCallAt: now,
    timestamps,
  });
}

/**
 * Return remaining session messages (for optional UI display).
 * @returns {number}
 */
export function remainingMessages() {
  const { count } = loadState();
  return Math.max(0, MAX_MESSAGES_PER_SESSION - count);
}

/**
 * Return full rate-limit status (for debugging or detailed UI).
 * @returns {{ sessionRemaining: number, minuteRemaining: number, nextAllowedAt: number }}
 */
export function getRateLimitStatus() {
  const state = loadState();
  const now   = Date.now();

  const windowStart = now - 60_000;
  const recentCalls = (state.timestamps || []).filter((t) => t > windowStart);

  const minuteRemaining = Math.max(0, MAX_MESSAGES_PER_MINUTE - recentCalls.length);
  const sessionRemaining = Math.max(0, MAX_MESSAGES_PER_SESSION - state.count);

  // When will the next call be allowed?
  let nextAllowedAt = now;
  if (sessionRemaining === 0) {
    nextAllowedAt = Infinity; // never (need a full refresh)
  } else if (minuteRemaining === 0 && recentCalls.length > 0) {
    nextAllowedAt = Math.min(...recentCalls) + 60_000;
  } else if (state.lastCallAt > 0 && (now - state.lastCallAt) < MIN_INTERVAL_MS) {
    nextAllowedAt = state.lastCallAt + MIN_INTERVAL_MS;
  }

  return { sessionRemaining, minuteRemaining, nextAllowedAt };
}
