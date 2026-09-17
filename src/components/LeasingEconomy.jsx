import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { MapPin, Phone, CheckCircle, XCircle, Search, Tag, Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import RentModal from './RentModal';
import AddEquipmentModal from './AddEquipmentModal';

const FALLBACK_EQUIPMENT = [
  { id: 1, title: 'Mahindra 575 DI Tractor', category: 'Tractors', price_per_day: 1800, owner_name: 'K. Suresh Kumar', panchayat_location: 'Alappuzha Panchayat', contact_number: '+91 98470 12345', is_available: true, image_url: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&q=80&w=800' },
  { id: 2, title: 'Kubota Power Tiller 12HP', category: 'Tillers', price_per_day: 950, owner_name: 'Biju Varghese', panchayat_location: 'Kottayam Panchayat', contact_number: '+91 94471 23456', is_available: true, image_url: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&q=80&w=800' },
  { id: 3, title: 'Yanmar Paddy Transplanter', category: 'Harvesters & Seeders', price_per_day: 2200, owner_name: 'Anil Radhakrishnan', panchayat_location: 'Palakkad Panchayat', contact_number: '+91 97452 34567', is_available: true, image_url: 'https://images.unsplash.com/photo-1530507629858-e4977d30e9e0?auto=format&fit=crop&q=80&w=800' },
  { id: 4, title: 'Heavy-Duty Honda Water Pump', category: 'Pumps & Irrigation', price_per_day: 450, owner_name: 'M. Thomas', panchayat_location: 'Thrissur Panchayat', contact_number: '+91 96333 45678', is_available: false, image_url: 'https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?auto=format&fit=crop&q=80&w=800' },
  { id: 5, title: 'Stihl Backpack Brush Cutter', category: 'Cutters & Tools', price_per_day: 350, owner_name: 'Abdul Rahman', panchayat_location: 'Kozhikode Panchayat', contact_number: '+91 98954 56789', is_available: true, image_url: 'https://images.unsplash.com/photo-1590682680695-43b964a3ae17?auto=format&fit=crop&q=80&w=800' },
  { id: 6, title: 'Multi-Crop Paddy Thresher', category: 'Processing Equipment', price_per_day: 1500, owner_name: 'Gopalan Nair', panchayat_location: 'Malappuram Panchayat', contact_number: '+91 95625 67890', is_available: true, image_url: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=800' },
  { id: 7, title: 'Aspee Solar Knapsack Sprayer', category: 'Sprayers', price_per_day: 250, owner_name: 'Rajan P.K.', panchayat_location: 'Idukki Panchayat', contact_number: '+91 94966 78901', is_available: true, image_url: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&q=80&w=800' },
  { id: 8, title: 'VST Shakti Power Reaper', category: 'Harvesters & Seeders', price_per_day: 1200, owner_name: 'Mathew Joseph', panchayat_location: 'Wayanad Panchayat', contact_number: '+91 97477 89012', is_available: true, image_url: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&q=80&w=800' }
];

export default function LeasingEconomy({ onSelectEquipment }) {
  const { t } = useTranslation();
  const [equipmentList, setEquipmentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    fetchEquipment();
  }, []);

  async function fetchEquipment() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('equipment_lease')
        .select('*')
        .order('id', { ascending: true });

      if (error) throw error;
      if (data && data.length > 0) {
        setEquipmentList(data);
      } else {
        setEquipmentList(FALLBACK_EQUIPMENT);
      }
    } catch (err) {
      console.error('Error fetching equipment:', err.message);
      // Fallback to offline Kerala seed dataset to preserve demo continuity
      setEquipmentList(FALLBACK_EQUIPMENT);
    } finally {
      setLoading(false);
    }
  }

  const handleAddEquipment = (newItem) => {
    // Optimistically update the list locally
    setEquipmentList(prev => [
      {
        ...newItem,
        title: newItem.name,
        panchayat_location: newItem.location,
        contact_number: newItem.phone,
        is_available: true
      },
      ...prev
    ]);
  };

  const categories = ['All', ...new Set(equipmentList.map((item) => item.category))];

  const filteredEquipment = equipmentList.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.panchayat_location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8 text-center max-w-2xl mx-auto">
        <span className="inline-block px-3 py-1 bg-green-100 text-[#20A85A] text-xs font-semibold rounded-full mb-3">
          {t('leasing.shared_network')}
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight drop-shadow-md">
          {t('leasing.title')}
        </h2>
        <p className="text-white/80 mt-3 text-sm sm:text-base drop-shadow-sm max-w-lg mx-auto">
          {t('leasing.subtitle')}
        </p>

        {/* Search & Action Bar */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder={t('leasing.search_placeholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-[#E5E5E5] rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#20A85A]/50 shadow-sm transition"
            />
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-6 py-3 bg-[#20A85A] text-white rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-[#168447] transition shadow-sm whitespace-nowrap"
          >
            <Plus className="w-5 h-5" />
            {t('leasing.add_equipment')}
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition shadow-sm ${
                selectedCategory === cat
                  ? 'bg-[#20A85A] text-white border border-[#20A85A]'
                  : 'bg-white/10 border border-white/20 text-white/90 hover:bg-white/20 backdrop-blur-md'
              }`}
            >
              {cat === 'All' ? t('leasing.categories.all') : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center py-16">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#20A85A]"></div>
        </div>
      ) : (
        /* Equipment Cards Grid matching AgriShare Design Language */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEquipment.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-[#E5E5E5] rounded-[24px] overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Image Container with Badge */}
                <div className="relative h-48 w-full bg-slate-100">
                  <img
                    src={item.image_url || 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&q=80&w=800'}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium shadow-sm ${
                        item.is_available
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}
                    >
                      {item.is_available ? (
                        <>
                          <CheckCircle className="w-3.5 h-3.5" /> {t('leasing.available')}
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3.5 h-3.5" /> {t('leasing.rented')}
                        </>
                      )}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-[#20A85A] mb-1">
                    <Tag className="w-3.5 h-3.5" />
                    <span>{item.category}</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#171717] leading-snug">
                    {item.title}
                  </h3>

                  <div className="mt-3 space-y-2 text-xs text-[#555555]">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                      <span>{item.panchayat_location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400 shrink-0" />
                      <span>{item.owner_name} ({item.contact_number})</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-5 pt-0 mt-2 flex items-center justify-between border-t border-slate-100">
                <div>
                  <span className="text-xs text-gray-400 block">{t('leasing.per_day')}</span>
                  <span className="text-lg font-extrabold text-[#171717]">
                    ₹{item.price_per_day}
                  </span>
                  <span className="text-xs text-gray-500"> / {t('leasing.per_day').split(' ')[1] || 'day'}</span>
                </div>
                <button
                  onClick={() => setSelectedItem(item)}
                  disabled={!item.is_available}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition ${
                    item.is_available
                      ? 'bg-[#20A85A] text-white hover:bg-[#168447]'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {item.is_available ? t('leasing.rent_now') : t('leasing.unavailable')}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedItem && (
        <RentModal equipment={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
      <AddEquipmentModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onSubmit={handleAddEquipment} 
      />
    </div>
  );
}
