import React from 'react';
import { ArrowRight, Bot, Sparkles } from 'lucide-react';

export default function Hero({ onExplore, onOpenAI }) {
  return (
    <section className="pt-12 sm:pt-16 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center flex flex-col items-center">
      {/* Subtle Tag / Value Proposition Pill */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#E5E5E5] text-xs font-semibold text-[#555555] shadow-xs mb-6 sm:mb-8">
        <span className="w-2 h-2 rounded-full bg-[#20A85A]"></span>
        <span>Smart Agriculture Platform</span>
      </div>

      {/* Main Dominant Heading */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[74px] font-bold text-[#171717] tracking-[-0.03em] leading-[1.04] max-w-4xl">
        Smart farming,<br className="hidden sm:inline" />
        <span className="text-[#20A85A]"> made accessible.</span>
      </h1>

      {/* Hero Description */}
      <p className="mt-6 text-base sm:text-lg md:text-xl text-[#555555] font-normal leading-relaxed max-w-[700px]">
        AgriShare connects farmers with affordable agricultural equipment, smart AI assistance, and practical farming resources — all in one simple platform.
      </p>

      {/* Primary Actions */}
      <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
        {/* Primary Button */}
        <button 
          onClick={onExplore}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#20A85A] hover:bg-[#168447] text-white text-base font-semibold shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <span>Explore Equipment</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        {/* Secondary Button with AI Sparkles */}
        <button 
          onClick={onOpenAI}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-white hover:bg-slate-50 text-[#171717] border border-[#E5E5E5] hover:border-slate-300 text-base font-semibold shadow-xs transition-all duration-200 cursor-pointer group"
        >
          <Sparkles className="w-4 h-4 text-[#20A85A] group-hover:scale-110 transition-transform" />
          <span>Ask AI Assistant</span>
        </button>
      </div>
    </section>
  );
}
