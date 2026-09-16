import React, { useState } from 'react';
import { X, Check, Calendar, User, MapPin } from 'lucide-react';

export default function RentModal({ equipment, onClose }) {
  const [rentalDays, setRentalDays] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  if (!equipment) return null;

  const totalPrice = equipment.price_per_day * rentalDays;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
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
          /* Confirmation Success View */
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
          /* Rental Request Form */
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Selected Equipment Summary Card */}
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

            {/* Input: Duration */}
            <div>
              <label className="block text-xs font-semibold text-[#171717] mb-1">
                Duration (Days)
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={rentalDays}
                  onChange={(e) => setRentalDays(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full pl-9 pr-3 py-2 bg-white border border-[#E5E5E5] rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#20A85A]/50"
                  required
                />
              </div>
            </div>

            {/* Total Price Breakdown */}
            <div className="flex justify-between items-center py-2 px-3 bg-emerald-50 border border-emerald-200 rounded-xl">
              <span className="text-xs font-medium text-emerald-800">Total Rental Cost:</span>
              <span className="text-base font-extrabold text-[#20A85A]">₹{totalPrice}</span>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              className="w-full py-2.5 bg-[#20A85A] text-white rounded-full text-xs font-semibold hover:bg-[#168447] transition"
            >
              Confirm & Request Rental
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
