import React from 'react';
import { useTranslation } from 'react-i18next';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, ArrowRight } from 'lucide-react';

const mockData = [
  { name: 'Jan', price: 2100 },
  { name: 'Feb', price: 2150 },
  { name: 'Mar', price: 2200 },
  { name: 'Apr', price: 2280 },
  { name: 'May', price: 2350 },
  { name: 'Jun', price: 2320 },
  { name: 'Jul', price: 2400 },
];

export default function MarketPriceAnalyzer() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col h-full text-white">
      {/* Modern Marquee Ticker */}
      <div className="w-full bg-[#168447] text-white py-2 overflow-hidden sticky top-20 z-20 shadow-md">
        <div className="whitespace-nowrap animate-[marquee_20s_linear_infinite] inline-block font-semibold tracking-wide text-sm">
          {t('market_page.live_ticker')}: 🌾 {t('market_page.wheat')}: ₹2,400/q (+1.2%) &nbsp;&nbsp;|&nbsp;&nbsp; 🍚 {t('market_page.rice')}: ₹3,100/q (+0.5%) &nbsp;&nbsp;|&nbsp;&nbsp; 🌽 {t('market_page.maize')}: ₹1,850/q (-0.3%) &nbsp;&nbsp;|&nbsp;&nbsp; 🥔 {t('market_page.potato')}: ₹1,200/q (+2.1%) &nbsp;&nbsp;|&nbsp;&nbsp; 🌾 {t('market_page.wheat')}: ₹2,400/q (+1.2%) &nbsp;&nbsp;|&nbsp;&nbsp; 🍚 {t('market_page.rice')}: ₹3,100/q (+0.5%) &nbsp;&nbsp;|&nbsp;&nbsp; 🌽 {t('market_page.maize')}: ₹1,850/q (-0.3%)
        </div>
      </div>

      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 pb-40">
        
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight drop-shadow-md text-white">
            {t('market_page.title')}
          </h2>
          <p className="mt-3 text-white/90 max-w-2xl mx-auto drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-medium text-lg">
            {t('market_page.subtitle')}
          </p>
        </div>

        {/* Chart Container */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[32px] p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2 drop-shadow-sm">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                {t('market_page.wheat')} {t('market_page.price_trends').split('(')[0]} (₹/q)
              </h3>
              <p className="text-sm text-white/80 font-medium">{t('market_page.price_trends')}</p>
            </div>
            
            <div className="flex gap-2">
              <button className="px-4 py-1.5 rounded-full bg-[#20A85A] text-white text-xs font-semibold shadow-sm">1M</button>
              <button className="px-4 py-1.5 rounded-full bg-white/10 text-white hover:bg-white/20 text-xs font-semibold transition border border-white/20">6M</button>
              <button className="px-4 py-1.5 rounded-full bg-white/10 text-white hover:bg-white/20 text-xs font-semibold transition border border-white/20">1Y</button>
            </div>
          </div>

          <div className="h-[300px] sm:h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#20A85A" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#20A85A" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" tick={{fill: 'rgba(255,255,255,0.8)', fontSize: 12, fontWeight: 500}} tickLine={false} axisLine={false} />
                <YAxis stroke="rgba(255,255,255,0.5)" tick={{fill: 'rgba(255,255,255,0.8)', fontSize: 12, fontWeight: 500}} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(17,24,39,0.9)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '12px', color: '#fff', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
                  itemStyle={{ color: '#34d399', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="price" stroke="#20A85A" strokeWidth={3} fillOpacity={1} fill="url(#colorPrice)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
           <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[24px] p-6 flex justify-between items-center group cursor-pointer hover:bg-white/15 transition shadow-md">
             <div>
               <h4 className="font-bold text-lg text-white mb-1 drop-shadow-sm">{t('market_page.set_alerts')}</h4>
               <p className="text-sm text-white/80 font-medium">{t('market_page.set_alerts_desc')}</p>
             </div>
             <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#20A85A] transition shadow-sm border border-white/10">
               <ArrowRight className="w-5 h-5 text-white" />
             </div>
           </div>
           
           <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[24px] p-6 flex justify-between items-center group cursor-pointer hover:bg-white/15 transition shadow-md">
             <div>
               <h4 className="font-bold text-lg text-white mb-1 drop-shadow-sm">{t('market_page.view_mandi')}</h4>
               <p className="text-sm text-white/80 font-medium">{t('market_page.view_mandi_desc')}</p>
             </div>
             <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#20A85A] transition shadow-sm border border-white/10">
               <ArrowRight className="w-5 h-5 text-white" />
             </div>
           </div>
        </div>

      </div>
    </div>
  );
}
