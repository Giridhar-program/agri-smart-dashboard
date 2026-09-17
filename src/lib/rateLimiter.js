/**
 * rateLimiter.js
 *
 * Client-side rate limiting for the AI chat feature.
 * Uses sessionStorage so limits reset when the tab is closed.
 *
 * Limits:
 *   - MAX_MESSAGES_PER_SESSION: total AI calls allowed in one browser session
 *   - MIN_INTERVAL_MS: minimum milliseconds between consecutive calls (throttle)
 */

const STORAGE_KEY = 'agrishare_ai_calls';
const MAX_MESSAGES_PER_SESSION = 20;   // max total AI calls per session
const MIN_INTERVAL_MS = 3000;           // 3 seconds minimum between calls

/**
 * Load the stored rate-limit state from sessionStorage.
 * @returns {{ count: number, lastCallAt: number }}
 */
function loadState() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (_) {
    // Ignore parse errors — treat as fresh state
  }
  return { count: 0, lastCallAt: 0 };
}

/**
 * Persist the rate-limit state to sessionStorage.
 * @param {{ count: number, lastCallAt: number }} state
 */
function saveState(state) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (_) {
    // sessionStorage unavailable (private mode edge case) — fail silently
  }
}

/**
 * Check whether an AI call is allowed right now.
 *
 * @returns {{ allowed: boolean, reason: string | null }}
 *   - allowed: true if the call can proceed
 *   - reason: human-readable denial message, or null if allowed
 */
export function checkRateLimit() {
  const state = loadState();
  const now = Date.now();

  if (state.count >= MAX_MESSAGES_PER_SESSION) {
    return {
      allowed: false,
      reason: `You've reached the limit of ${MAX_MESSAGES_PER_SESSION} AI messages for this session. Please refresh to continue.`,
    };
  }

  const elapsed = now - state.lastCallAt;
  if (state.lastCallAt > 0 && elapsed < MIN_INTERVAL_MS) {
    const wait = Math.ceil((MIN_INTERVAL_MS - elapsed) / 1000);
    return {
      allowed: false,
      reason: `Please wait ${wait} second${wait !== 1 ? 's' : ''} before sending another message.`,
    };
  }

  return { allowed: true, reason: null };
}

/**
 * Record a successful AI call (call this AFTER the request is sent).
 */
export function recordCall() {
  const state = loadState();
  saveState({ count: state.count + 1, lastCallAt: Date.now() });
}

/**
 * Return remaining session messages (for optional UI display).
 * @returns {number}
 */
export function remainingMessages() {
  const { count } = loadState();
  return Math.max(0, MAX_MESSAGES_PER_SESSION - count);
}
