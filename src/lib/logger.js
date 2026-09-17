/**
 * logger.js
 *
 * Structured error logging wrapper.
 *
 * In development:  logs to console with full stack trace.
 * In production:   logs to console AND sends a JSON payload to
 *                  VITE_LOG_WEBHOOK_URL (if set). You can point this
 *                  to a Supabase Edge Function, Sentry DSN relay, or
 *                  any webhook endpoint.
 *
 * Usage:
 *   import { logError, logWarn, logInfo } from '../lib/logger';
 *   logError('Supabase fetch failed', err, { component: 'LeasingEconomy' });
 */

const IS_PROD = import.meta.env.PROD;
const WEBHOOK_URL = import.meta.env.VITE_LOG_WEBHOOK_URL;

/**
 * Build a structured log payload.
 * @param {'error'|'warn'|'info'} level
 * @param {string} message
 * @param {Error|null} error
 * @param {Record<string, any>} context
 */
function buildPayload(level, message, error = null, context = {}) {
  return {
    level,
    message,
    timestamp: new Date().toISOString(),
    url: window.location.href,
    userAgent: navigator.userAgent,
    error: error
      ? {
          name: error.name,
          message: error.message,
          // Only include stack in dev or when explicitly allowed
          stack: !IS_PROD ? error.stack : undefined,
        }
      : null,
    context,
  };
}

/**
 * Send payload to the configured webhook (fire-and-forget, never throws).
 * @param {object} payload
 */
async function sendToWebhook(payload) {
  if (!WEBHOOK_URL) return;
  try {
    await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      // Short timeout so logging never blocks the UI
      signal: AbortSignal.timeout?.(3000),
    });
  } catch {
    // Intentionally swallow — logging must never crash the app
  }
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Log an error-level event.
 * @param {string} message
 * @param {Error|null} [error]
 * @param {Record<string, any>} [context]
 */
export function logError(message, error = null, context = {}) {
  const payload = buildPayload('error', message, error, context);
  // Always log to console (sanitised in prod — no raw stack in production logs)
  console.error(`[AgriShare ERROR] ${message}`, IS_PROD ? context : error);
  if (IS_PROD) sendToWebhook(payload);
}

/**
 * Log a warning-level event.
 * @param {string} message
 * @param {Record<string, any>} [context]
 */
export function logWarn(message, context = {}) {
  const payload = buildPayload('warn', message, null, context);
  console.warn(`[AgriShare WARN] ${message}`, context);
  if (IS_PROD) sendToWebhook(payload);
}

/**
 * Log an info-level event (dev only — never sent to webhook).
 * @param {string} message
 * @param {Record<string, any>} [context]
 */
export function logInfo(message, context = {}) {
  if (!IS_PROD) {
    console.info(`[AgriShare INFO] ${message}`, context);
  }
}
