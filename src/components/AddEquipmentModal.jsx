import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Tractor, MapPin, IndianRupee, User, Phone } from 'lucide-react';

export default function AddEquipmentModal({ isOpen, onClose, onSubmit }) {
  const { t } = useTranslation();
  
  const [formData, setFormData] = useState({
    name: '',
    category: 'tractors',
    price: '',
    owner: '',
    location: '',
    phone: ''
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.owner) return;
    
    // Create new equipment object matching existing schema
    const newEquipment = {
      id: Date.now(), // generate a unique local ID
      name: formData.name,
      category: formData.category,
      price_per_day: parseInt(formData.price, 10),
      owner_name: formData.owner,
      location: formData.location || 'Local',
      phone: formData.phone || '',
      rating: 5.0,
      image_url: "https://images.unsplash.com/photo-1592982537447-6f23342080cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" // default image
    };

    onSubmit(newEquipment);
    onClose();
    // Reset form
    setFormData({
      name: '',
      category: 'tractors',
      price: '',
      owner: '',
      location: '',
      phone: ''
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-white rounded-3xl border border-gray-100 shadow-[0_8px_32px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
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
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Equipment Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">{t('add_equipment.name_label')}</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Tractor className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="pl-10 w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#20A85A]/50 focus:border-[#20A85A] transition-all"
                  placeholder={t('add_equipment.name_placeholder')}
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">{t('add_equipment.category_label')}</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#20A85A]/50 focus:border-[#20A85A] transition-all bg-white"
              >
                <option value="tractors">{t('leasing.categories.tractors')}</option>
                <option value="harvesters">{t('leasing.categories.harvesters')}</option>
                <option value="tillers">{t('leasing.categories.tillers')}</option>
                <option value="pumps">{t('leasing.categories.pumps')}</option>
              </select>
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">{t('add_equipment.price_label')}</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IndianRupee className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min="0"
                  className="pl-10 w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#20A85A]/50 focus:border-[#20A85A] transition-all"
                  placeholder={t('add_equipment.price_placeholder')}
                />
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
                  <input
                    type="text"
                    name="owner"
                    value={formData.owner}
                    onChange={handleChange}
                    required
                    className="pl-10 w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#20A85A]/50 focus:border-[#20A85A] transition-all"
                    placeholder={t('add_equipment.owner_placeholder')}
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">{t('add_equipment.phone_label')}</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="pl-10 w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#20A85A]/50 focus:border-[#20A85A] transition-all"
                    placeholder={t('add_equipment.phone_placeholder')}
                  />
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
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="pl-10 w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#20A85A]/50 focus:border-[#20A85A] transition-all"
                  placeholder={t('add_equipment.location_placeholder')}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
              >
                {t('add_equipment.cancel')}
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2.5 bg-[#20A85A] text-white font-semibold rounded-xl hover:bg-[#1b8c4b] transition-colors"
              >
                {t('add_equipment.submit')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
