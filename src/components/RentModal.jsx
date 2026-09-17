import React, { useState, useEffect } from 'react';
import { X, Check, Calendar, User, MapPin, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { logError } from '../lib/logger';

// Key prefix for sessionStorage dupe prevention
const SUBMISSION_KEY_PREFIX = 'agrishare_rent_';
// How long (ms) to block re-submission for the same equipment + date combo
const DUPE_BLOCK_MS = 60_000; // 60 seconds

/**
 * Build a stable key for a rental submission.
 * Combines equipmentId + calendar date so same-equipment re-bookings on a
 * different day are allowed, but rapid double-submits are blocked.
 */
function buildSubmissionKey(equipmentId) {
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  return `${SUBMISSION_KEY_PREFIX}${equipmentId}_${today}`;
}

/**
 * Check sessionStorage to see if this rental was already submitted recently.
 * @param {string|number} equipmentId
 * @returns {boolean}
 */
function isDuplicateSubmission(equipmentId) {
  try {
    const key  = buildSubmissionKey(equipmentId);
    const raw  = sessionStorage.getItem(key);
    if (!raw) return false;
    const { submittedAt } = JSON.parse(raw);
    return (Date.now() - submittedAt) < DUPE_BLOCK_MS;
  } catch {
    return false;
  }
}

/**
 * Record a rental submission in sessionStorage.
 * @param {string|number} equipmentId
 */
function recordSubmission(equipmentId) {
  try {
    const key = buildSubmissionKey(equipmentId);
    sessionStorage.setItem(key, JSON.stringify({ submittedAt: Date.now() }));
  } catch {
    // sessionStorage unavailable — silently skip
  }
}

export default function RentModal({ equipment, onClose }) {
  const [rentalDays, setRentalDays] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted]   = useState(false);
  const [error, setError]           = useState('');

  // Reset state when a different equipment item is selected
  useEffect(() => {
    setRentalDays(1);
    setSubmitting(false);
    setSubmitted(false);
    setError('');
  }, [equipment?.id]);

  if (!equipment) return null;

  const totalPrice = equipment.price_per_day * rentalDays;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Duplicate submission guard
    if (isDuplicateSubmission(equipment.id)) {
      setError('You already submitted a request for this equipment today. Please wait a moment before trying again.');
      return;
    }

    setSubmitting(true);

    try {
      // Simulate a rental request API call with a 10s timeout.
      // Replace the Promise.resolve() below with your actual Supabase insert
      // or payments API call, wrapped in apiClient.apiPost().
      // e.g.: await apiPost('/api/rentals', { equipment_id: equipment.id, days: rentalDays });
      await Promise.race([
        new Promise((resolve) => setTimeout(resolve, 400)), // placeholder for real API
        new Promise((_, reject) => setTimeout(() => reject(new Error('TimeoutError')), 10_000)),
      ]);

      // Record the submission AFTER success to prevent dupe on page refresh
      recordSubmission(equipment.id);
      setSubmitted(true);
    } catch (err) {
      logError('RentModal: submission failed', err, { equipmentId: equipment.id, rentalDays });

      if (err.message === 'TimeoutError' || err.name === 'TimeoutError') {
        setError('The request timed out. Please check your connection and try again.');
      } else {
        setError('Something went wrong sending your request. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-[24px] border border-[#E5E5E5] w-full max-w-md overflow-hidden shadow-xl transition-all">

        {/* Modal Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100 bg-[#F7F6F2]">
          <h3 className="text-base font-bold text-[#171717]">
            {submitted ? 'Request Sent!' : 'Confirm Equipment Rental'}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-200/50 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          /* ── Success State ──────────────────────────────────────────────── */
          <div className="p-6 text-center space-y-4">
            <div className="w-12 h-12 bg-emerald-100 text-[#20A85A] rounded-full flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="text-lg font-bold text-[#171717]">Request Successfully Sent</h4>
              <p className="text-xs text-[#555555]">
                Request sent to <strong className="text-[#171717]">{equipment.owner_name}</strong> in{' '}
                <strong className="text-[#171717]">{equipment.panchayat_location}</strong>.
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left text-xs text-[#555555] space-y-1.5">
              <div className="flex justify-between">
                <span>Equipment:</span>
                <span className="font-semibold text-[#171717]">{equipment.title}</span>
              </div>
              <div className="flex justify-between">
                <span>Duration:</span>
                <span className="font-semibold text-[#171717]">{rentalDays} Day(s)</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-1.5">
                <span>Estimated Cost:</span>
                <span className="font-bold text-[#20A85A]">₹{totalPrice}</span>
              </div>
            </div>
            <p className="text-[11px] text-gray-400">
              The equipment owner will contact you directly via phone ({equipment.contact_number}) to arrange delivery or pickup.
            </p>
            <button
              onClick={onClose}
              className="w-full py-2.5 bg-[#20A85A] text-white rounded-full text-xs font-semibold hover:bg-[#168447] transition"
            >
              Back to Equipment
            </button>
          </div>
        ) : (
          /* ── Rental Request Form ─────────────────────────────────────────── */
          <form onSubmit={handleSubmit} className="p-6 space-y-4">

            {/* Error Banner */}
            {error && (
              <div className="flex gap-3 items-start bg-rose-50 border border-rose-200 rounded-xl p-3">
                <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-xs text-rose-700">{error}</p>
                </div>
                <button type="button" onClick={() => setError('')}
                  className="text-rose-400 hover:text-rose-600 transition">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Equipment Summary Card */}
            <div className="flex gap-3 items-center bg-[#F7F6F2] p-3 rounded-2xl border border-slate-200">
              <img
                src={equipment.image_url}
                alt={equipment.title}
                className="w-14 h-14 object-cover rounded-xl shrink-0"
              />
              <div className="overflow-hidden">
                <h4 className="text-xs font-bold text-[#171717] truncate">{equipment.title}</h4>
                <div className="flex items-center gap-1 text-[11px] text-[#555555] mt-0.5">
                  <MapPin className="w-3 h-3 text-gray-400 shrink-0" />
                  <span className="truncate">{equipment.panchayat_location}</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-[#555555]">
                  <User className="w-3 h-3 text-gray-400 shrink-0" />
                  <span className="truncate">{equipment.owner_name}</span>
                </div>
              </div>
            </div>

            {/* Duration Input */}
            <div>
              <label className="block text-xs font-semibold text-[#171717] mb-1">
                Duration (Days)
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="number" min="1" max="30" value={rentalDays} required
                  onChange={(e) => setRentalDays(Math.max(1, Math.min(30, parseInt(e.target.value) || 1)))}
                  className="w-full pl-9 pr-3 py-2 bg-white border border-[#E5E5E5] rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#20A85A]/50"
                />
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="flex justify-between items-center py-2 px-3 bg-emerald-50 border border-emerald-200 rounded-xl">
              <span className="text-xs font-medium text-emerald-800">Total Rental Cost:</span>
              <span className="text-base font-extrabold text-[#20A85A]">₹{totalPrice}</span>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-2.5 bg-[#20A85A] text-white rounded-full text-xs font-semibold hover:bg-[#168447] transition disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {submitting
                ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending Request…</>
                : 'Confirm & Request Rental'}
            </button>

            {/* Retry hint */}
            {error && (
              <button type="submit" disabled={submitting}
                className="w-full py-2 text-xs text-gray-500 hover:text-gray-700 flex items-center justify-center gap-1 transition">
                <RefreshCw className="w-3.5 h-3.5" /> Try Again
              </button>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
