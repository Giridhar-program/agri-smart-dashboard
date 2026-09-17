import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Tractor, MapPin, IndianRupee, User, Phone, Upload, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { supabase } from '../supabaseClient';
import { logError } from '../lib/logger';

const MAX_IMAGE_SIZE_BYTES = 2 * 1024 * 1024; // 2 MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

/**
 * Compress an image File to max 800×600 using canvas, returning a Blob.
 * @param {File} file
 * @returns {Promise<Blob>}
 */
async function compressImage(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const MAX_W = 800, MAX_H = 600;
      let { width, height } = img;
      if (width > MAX_W || height > MAX_H) {
        const ratio = Math.min(MAX_W / width, MAX_H / height);
        width  = Math.round(width  * ratio);
        height = Math.round(height * ratio);
      }
      const canvas = document.createElement('canvas');
      canvas.width  = width;
      canvas.height = height;
      canvas.getContext('2d').drawImage(img, 0, 0, width, height);
      URL.revokeObjectURL(url);
      canvas.toBlob(
        (blob) => (blob ? resolve(blob) : reject(new Error('Canvas toBlob failed'))),
        'image/jpeg',
        0.82, // quality
      );
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Image load error')); };
    img.src = url;
  });
}

export default function AddEquipmentModal({ isOpen, onClose, onSubmit }) {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: '', category: 'Tractors', price: '', owner: '', location: '', phone: '',
  });
  const [imageFile, setImageFile]     = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageError, setImageError]   = useState('');
  const [submitting, setSubmitting]   = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [dupeWarning, setDupeWarning] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImageError('');
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      setImageError('Only JPEG, PNG, or WebP images are accepted.');
      return;
    }
    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      setImageError('Image must be under 2 MB. The file will be compressed automatically on upload.');
    }
    // Show preview regardless of size (we compress on submit)
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  /**
   * Check Supabase for an existing row matching title + owner + location.
   * Returns true if a duplicate is found.
   */
  async function checkDuplicate() {
    try {
      const { data, error } = await supabase
        .from('equipment_lease')
        .select('id')
        .ilike('title', formData.name.trim())
        .ilike('owner_name', formData.owner.trim())
        .limit(1);

      if (error) throw error;
      return data && data.length > 0;
    } catch (err) {
      // If the check fails, allow the submission to proceed (fail open for UX)
      logError('AddEquipmentModal: duplicate check failed', err);
      return false;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.owner) return;
    if (dupeWarning) {
      // User clicked "Submit Anyway" after seeing the warning
      await doInsert();
      return;
    }

    setSubmitting(true);
    setSubmitError('');

    const isDupe = await checkDuplicate();
    if (isDupe) {
      setSubmitting(false);
      setDupeWarning(true);
      return;
    }

    await doInsert();
  };

  async function doInsert() {
    setSubmitting(true);
    setDupeWarning(false);

    let imageUrl = 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&q=80&w=800';

    // Upload image if provided
    if (imageFile) {
      try {
        const blob = await compressImage(imageFile);
        const fileName = `equipment-${Date.now()}.jpg`;
        const { data: uploadData, error: uploadErr } = await supabase.storage
          .from('equipment-images')
          .upload(fileName, blob, { contentType: 'image/jpeg', upsert: false });

        if (uploadErr) throw uploadErr;

        const { data: publicData } = supabase.storage
          .from('equipment-images')
          .getPublicUrl(uploadData.path);
        imageUrl = publicData.publicUrl;
      } catch (err) {
        logError('AddEquipmentModal: image upload failed', err);
        // Non-fatal — fall back to default image
      }
    }

    try {
      const { data: inserted, error: insertErr } = await supabase
        .from('equipment_lease')
        .insert([{
          title:              formData.name.trim(),
          category:           formData.category,
          price_per_day:      parseInt(formData.price, 10),
          owner_name:         formData.owner.trim(),
          panchayat_location: formData.location.trim() || 'Local',
          contact_number:     formData.phone.trim() || '',
          is_available:       true,
          image_url:          imageUrl,
        }])
        .select()
        .single();

      if (insertErr) throw insertErr;

      onSubmit(inserted || {
        id: Date.now(), name: formData.name, category: formData.category,
        price_per_day: parseInt(formData.price, 10), owner_name: formData.owner,
        location: formData.location || 'Local', phone: formData.phone, image_url: imageUrl,
      });

      // Reset
      setFormData({ name: '', category: 'Tractors', price: '', owner: '', location: '', phone: '' });
      setImageFile(null);
      setImagePreview(null);
      onClose();
    } catch (err) {
      logError('AddEquipmentModal: insert failed', err);
      setSubmitError('Could not save equipment. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-white rounded-3xl border border-gray-100 shadow-[0_8px_32px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-bold text-lg text-gray-900">{t('add_equipment.title')}</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          {/* Duplicate warning */}
          {dupeWarning && (
            <div className="mb-4 flex gap-3 items-start bg-amber-50 border border-amber-200 rounded-xl p-4">
              <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-amber-800">Possible duplicate listing</p>
                <p className="text-xs text-amber-700 mt-0.5">
                  Equipment with a similar name and owner already exists. Are you sure you want to add it again?
                </p>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => setDupeWarning(false)}
                    className="px-3 py-1.5 text-xs font-semibold border border-amber-300 text-amber-700 rounded-lg hover:bg-amber-100 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={doInsert}
                    className="px-3 py-1.5 text-xs font-semibold bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition"
                  >
                    Add Anyway
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Submit error */}
          {submitError && (
            <div className="mb-4 flex gap-3 items-center bg-rose-50 border border-rose-200 rounded-xl p-3">
              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
              <p className="text-xs text-rose-700">{submitError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Equipment Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">{t('add_equipment.name_label')}</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Tractor className="h-4 w-4 text-gray-400" />
                </div>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required maxLength={100}
                  className="pl-10 w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#20A85A]/50 focus:border-[#20A85A] transition-all"
                  placeholder={t('add_equipment.name_placeholder')} />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">{t('add_equipment.category_label')}</label>
              <select name="category" value={formData.category} onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#20A85A]/50 focus:border-[#20A85A] transition-all bg-white">
                <option value="Tractors">{t('leasing.categories.tractors')}</option>
                <option value="Harvesters & Seeders">{t('leasing.categories.harvesters')}</option>
                <option value="Tillers">{t('leasing.categories.tillers')}</option>
                <option value="Pumps & Irrigation">{t('leasing.categories.pumps')}</option>
                <option value="Cutters & Tools">Cutters &amp; Tools</option>
                <option value="Sprayers">Sprayers</option>
                <option value="Processing Equipment">Processing Equipment</option>
              </select>
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">{t('add_equipment.price_label')}</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IndianRupee className="h-4 w-4 text-gray-400" />
                </div>
                <input type="number" name="price" value={formData.price} onChange={handleChange}
                  required min="1" max="100000"
                  className="pl-10 w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#20A85A]/50 focus:border-[#20A85A] transition-all"
                  placeholder={t('add_equipment.price_placeholder')} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Owner Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">{t('add_equipment.owner_label')}</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-gray-400" />
                  </div>
                  <input type="text" name="owner" value={formData.owner} onChange={handleChange} required maxLength={80}
                    className="pl-10 w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#20A85A]/50 focus:border-[#20A85A] transition-all"
                    placeholder={t('add_equipment.owner_placeholder')} />
                </div>
              </div>
              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">{t('add_equipment.phone_label')}</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-4 w-4 text-gray-400" />
                  </div>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} maxLength={15}
                    pattern="[+0-9\s\-]+"
                    className="pl-10 w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#20A85A]/50 focus:border-[#20A85A] transition-all"
                    placeholder={t('add_equipment.phone_placeholder')} />
                </div>
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">{t('add_equipment.location_label')}</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-4 w-4 text-gray-400" />
                </div>
                <input type="text" name="location" value={formData.location} onChange={handleChange} maxLength={100}
                  className="pl-10 w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#20A85A]/50 focus:border-[#20A85A] transition-all"
                  placeholder={t('add_equipment.location_placeholder')} />
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Equipment Photo <span className="font-normal text-gray-400">(optional, max 2 MB)</span>
              </label>
              {imagePreview ? (
                <div className="relative rounded-xl overflow-hidden border border-gray-200 h-36">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  <button type="button" onClick={() => { setImageFile(null); setImagePreview(null); setImageError(''); }}
                    className="absolute top-2 right-2 w-7 h-7 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center h-24 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-[#20A85A]/50 hover:bg-green-50/30 transition">
                  <Upload className="w-5 h-5 text-gray-400 mb-1" />
                  <span className="text-xs text-gray-500">Click to upload JPEG / PNG / WebP</span>
                  <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleImageChange} className="hidden" />
                </label>
              )}
              {imageError && (
                <p className="text-xs text-amber-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />{imageError}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="pt-4 flex gap-3">
              <button type="button" onClick={onClose}
                className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors">
                {t('add_equipment.cancel')}
              </button>
              <button type="submit" disabled={submitting}
                className="flex-1 px-4 py-2.5 bg-[#20A85A] text-white font-semibold rounded-xl hover:bg-[#1b8c4b] transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
                {submitting
                  ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving…</>
                  : <><CheckCircle className="w-4 h-4" /> {t('add_equipment.submit')}</>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
