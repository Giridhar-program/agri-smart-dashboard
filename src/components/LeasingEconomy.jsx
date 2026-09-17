import React, { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '../supabaseClient';
import { MapPin, Phone, CheckCircle, XCircle, Search, Tag, Plus, AlertTriangle, RefreshCw, Tractor } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import RentModal from './RentModal';
import AddEquipmentModal from './AddEquipmentModal';
import { logError } from '../lib/logger';

const PAGE_SIZE = 12;

const FALLBACK_EQUIPMENT = [
  { id: 1, title: 'Mahindra 575 DI Tractor', category: 'Tractors', price_per_day: 1800, owner_name: 'K. Suresh Kumar', panchayat_location: 'Alappuzha Panchayat', contact_number: '+91 98470 12345', is_available: true, image_url: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&q=80&w=800' },
  { id: 2, title: 'Kubota Power Tiller 12HP', category: 'Tillers', price_per_day: 950, owner_name: 'Biju Varghese', panchayat_location: 'Kottayam Panchayat', contact_number: '+91 94471 23456', is_available: true, image_url: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&q=80&w=800' },
  { id: 3, title: 'Yanmar Paddy Transplanter', category: 'Harvesters & Seeders', price_per_day: 2200, owner_name: 'Anil Radhakrishnan', panchayat_location: 'Palakkad Panchayat', contact_number: '+91 97452 34567', is_available: true, image_url: 'https://images.unsplash.com/photo-1530507629858-e4977d30e9e0?auto=format&fit=crop&q=80&w=800' },
  { id: 4, title: 'Heavy-Duty Honda Water Pump', category: 'Pumps & Irrigation', price_per_day: 450, owner_name: 'M. Thomas', panchayat_location: 'Thrissur Panchayat', contact_number: '+91 96333 45678', is_available: false, image_url: 'https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?auto=format&fit=crop&q=80&w=800' },
  { id: 5, title: 'Stihl Backpack Brush Cutter', category: 'Cutters & Tools', price_per_day: 350, owner_name: 'Abdul Rahman', panchayat_location: 'Kozhikode Panchayat', contact_number: '+91 98954 56789', is_available: true, image_url: 'https://images.unsplash.com/photo-1590682680695-43b964a3ae17?auto=format&fit=crop&q=80&w=800' },
  { id: 6, title: 'Multi-Crop Paddy Thresher', category: 'Processing Equipment', price_per_day: 1500, owner_name: 'Gopalan Nair', panchayat_location: 'Malappuram Panchayat', contact_number: '+91 95625 67890', is_available: true, image_url: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=800' },
  { id: 7, title: 'Aspee Solar Knapsack Sprayer', category: 'Sprayers', price_per_day: 250, owner_name: 'Rajan P.K.', panchayat_location: 'Idukki Panchayat', contact_number: '+91 94966 78901', is_available: true, image_url: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&q=80&w=800' },
  { id: 8, title: 'VST Shakti Power Reaper', category: 'Harvesters & Seeders', price_per_day: 1200, owner_name: 'Mathew Joseph', panchayat_location: 'Wayanad Panchayat', contact_number: '+91 97477 89012', is_available: true, image_url: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&q=80&w=800' },
];

// ─── Skeleton Card ─────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="bg-white border border-[#E5E5E5] rounded-[24px] overflow-hidden animate-pulse">
      <div className="h-48 bg-slate-200" />
      <div className="p-5 space-y-3">
        <div className="h-3 w-20 bg-slate-200 rounded-full" />
        <div className="h-5 w-3/4 bg-slate-200 rounded-full" />
        <div className="h-3 w-full bg-slate-200 rounded-full" />
        <div className="h-3 w-2/3 bg-slate-200 rounded-full" />
      </div>
      <div className="px-5 pb-5 flex justify-between items-center">
        <div className="h-6 w-16 bg-slate-200 rounded-full" />
        <div className="h-8 w-20 bg-slate-200 rounded-full" />
      </div>
    </div>
  );
}

// ─── Empty State ───────────────────────────────────────────────────────────────

function EmptyState({ onClear }) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4 border border-white/20">
        <Tractor className="w-8 h-8 text-white/40" />
      </div>
      <h3 className="text-lg font-bold text-white mb-1">No equipment found</h3>
      <p className="text-sm text-white/60 max-w-xs">
        Try adjusting your search or filter to find available equipment in your area.
      </p>
      <button
        onClick={onClear}
        className="mt-4 px-5 py-2 bg-white/10 border border-white/20 text-white text-xs font-semibold rounded-full hover:bg-white/20 transition"
      >
        Clear Filters
      </button>
    </div>
  );
}

// ─── Error Banner ──────────────────────────────────────────────────────────────

function ErrorBanner({ onRetry }) {
  return (
    <div className="col-span-full">
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-rose-900/30 border border-rose-500/30 rounded-2xl px-6 py-5 text-center sm:text-left">
        <AlertTriangle className="w-8 h-8 text-rose-400 shrink-0" />
        <div className="flex-1">
          <p className="text-sm font-semibold text-rose-200">Could not load equipment listings</p>
          <p className="text-xs text-rose-300/80 mt-0.5">Showing offline data. Check your connection and try again.</p>
        </div>
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-4 py-2 bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-200 text-xs font-semibold rounded-full transition"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Retry
        </button>
      </div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function LeasingEconomy({ onSelectEquipment }) {
  const { t } = useTranslation();

  const [equipmentList, setEquipmentList] = useState([]);
  const [loading, setLoading]             = useState(true);
  const [loadingMore, setLoadingMore]     = useState(false);
  const [error, setError]                 = useState(false);
  const [hasMore, setHasMore]             = useState(false);
  const [page, setPage]                   = useState(0);
  const [totalCount, setTotalCount]       = useState(null);

  const [searchQuery, setSearchQuery]         = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const [selectedItem, setSelectedItem]   = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Debounce search so we don't hit Supabase on every keystroke
  const searchDebounceRef = useRef(null);
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    clearTimeout(searchDebounceRef.current);
    searchDebounceRef.current = setTimeout(() => setDebouncedSearch(searchQuery), 350);
    return () => clearTimeout(searchDebounceRef.current);
  }, [searchQuery]);

  // Reset to page 0 when search/filter changes
  useEffect(() => {
    setPage(0);
    setEquipmentList([]);
  }, [debouncedSearch, selectedCategory]);

  // Fetch whenever page or filters change
  useEffect(() => {
    fetchEquipment(page, page === 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, debouncedSearch, selectedCategory]);

  async function fetchEquipment(pageNum = 0, isFirstPage = true) {
    try {
      isFirstPage ? setLoading(true) : setLoadingMore(true);
      setError(false);

      const from = pageNum * PAGE_SIZE;
      const to   = from + PAGE_SIZE - 1;

      // Build query — push filter to Supabase, not the client
      let query = supabase
        .from('equipment_lease')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(from, to);

      if (debouncedSearch.trim()) {
        query = query.ilike('title', `%${debouncedSearch.trim()}%`);
      }
      if (selectedCategory !== 'All') {
        query = query.eq('category', selectedCategory);
      }

      const { data, error: supaErr, count } = await query;

      if (supaErr) throw supaErr;

      const rows = data && data.length > 0 ? data : (isFirstPage ? FALLBACK_EQUIPMENT : []);
      setTotalCount(count ?? rows.length);
      setHasMore((from + PAGE_SIZE) < (count ?? 0));

      setEquipmentList((prev) => (isFirstPage ? rows : [...prev, ...rows]));
    } catch (err) {
      logError('LeasingEconomy: failed to fetch equipment', err, { page: pageNum, search: debouncedSearch, category: selectedCategory });
      setError(true);
      if (pageNum === 0) setEquipmentList(FALLBACK_EQUIPMENT);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }

  const handleRetry = useCallback(() => {
    setPage(0);
    setEquipmentList([]);
    fetchEquipment(0, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, selectedCategory]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
  };

  const handleAddEquipment = (newItem) => {
    setEquipmentList((prev) => [
      {
        ...newItem,
        title: newItem.name,
        panchayat_location: newItem.location,
        contact_number: newItem.phone,
        is_available: true,
      },
      ...prev,
    ]);
  };

  // Derive category list from fallback data (stable) so pills render even while loading
  const categories = ['All', ...new Set(FALLBACK_EQUIPMENT.map((i) => i.category))];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      {/* Header */}
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

        {/* Result count */}
        {!loading && totalCount !== null && (
          <p className="text-xs text-white/50 mt-3">
            {totalCount} listing{totalCount !== 1 ? 's' : ''} found
          </p>
        )}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Error Banner */}
        {error && <ErrorBanner onRetry={handleRetry} />}

        {/* Skeleton Loading */}
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          : equipmentList.length === 0
            ? <EmptyState onClear={handleClearFilters} />
            : equipmentList.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-[#E5E5E5] rounded-[24px] overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Image with Availability Badge */}
                    <div className="relative h-48 w-full bg-slate-100">
                      <img
                        src={item.image_url || 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&q=80&w=800'}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 right-3">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium shadow-sm ${
                          item.is_available
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}>
                          {item.is_available
                            ? <><CheckCircle className="w-3.5 h-3.5" /> {t('leasing.available')}</>
                            : <><XCircle className="w-3.5 h-3.5" /> {t('leasing.rented')}</>}
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5">
                      <div className="flex items-center gap-1.5 text-xs font-medium text-[#20A85A] mb-1">
                        <Tag className="w-3.5 h-3.5" />
                        <span>{item.category}</span>
                      </div>
                      <h3 className="text-lg font-bold text-[#171717] leading-snug">{item.title}</h3>
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
                      <span className="text-lg font-extrabold text-[#171717]">₹{item.price_per_day}</span>
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

      {/* Load More */}
      {hasMore && !loading && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={loadingMore}
            className="px-8 py-3 bg-white/10 border border-white/20 text-white text-sm font-semibold rounded-full hover:bg-white/20 transition disabled:opacity-50 flex items-center gap-2"
          >
            {loadingMore ? (
              <><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin inline-block" /> Loading…</>
            ) : (
              'Load More Equipment'
            )}
          </button>
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
