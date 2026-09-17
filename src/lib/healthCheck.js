/**
 * healthCheck.js
 *
 * Lightweight uptime checker for external services.
 * Called once on app mount; result is used to show a health banner.
 *
 * Checks:
 *   1. Supabase REST API (HEAD to /rest/v1/)
 *   2. Google Generative AI API (HEAD to the base domain)
 *
 * Usage:
 *   import { runHealthChecks } from '../lib/healthCheck';
 *   const { supabase, gemini, anyDown } = await runHealthChecks();
 */

import { ping } from './apiClient';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

/**
 * Run all health checks in parallel.
 * @returns {Promise<{ supabase: boolean, gemini: boolean, anyDown: boolean }>}
 */
export async function runHealthChecks() {
  const supabaseEndpoint = SUPABASE_URL
    ? `${SUPABASE_URL}/rest/v1/`
    : null;

  // Run checks in parallel with a 5s timeout each
  const [supabaseOk, geminiOk] = await Promise.all([
    supabaseEndpoint
      ? ping(supabaseEndpoint, 5_000)
      : Promise.resolve(false),
    ping('https://generativelanguage.googleapis.com', 5_000),
  ]);

  return {
    supabase: supabaseOk,
    gemini: geminiOk,
    anyDown: !supabaseOk || !geminiOk,
  };
}

/**
 * Returns a human-readable status message for the banner.
 * @param {{ supabase: boolean, gemini: boolean }} status
 * @returns {string}
 */
export function getHealthMessage({ supabase, gemini }) {
  if (!supabase && !gemini) {
    return 'Equipment listings and AI assistant are temporarily unavailable. Please check your connection.';
  }
  if (!supabase) {
    return 'Equipment listings may be unavailable. Database service is unreachable.';
  }
  if (!gemini) {
    return 'AI Assistant is temporarily unavailable. Equipment browsing is unaffected.';
  }
  return null;
}
