import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowRight, Bot, Sparkles } from 'lucide-react';

export default function Hero({ onExplore, onOpenAI }) {
  const { t } = useTranslation();
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      ".hero-anim",
      { y: 50, opacity: 0, rotateX: -15 },
      { y: 0, opacity: 1, rotateX: 0, duration: 1.2, stagger: 0.2, ease: "power3.out", transformPerspective: 1000 }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="pt-12 sm:pt-16 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center flex flex-col items-center">

      {/* Main Dominant Heading */}
      <h1 className="hero-anim text-4xl sm:text-5xl md:text-6xl lg:text-[74px] font-bold text-white tracking-[-0.03em] leading-[1.04] max-w-4xl drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
        {t('hero.title_line1')}<br className="hidden sm:inline" />
        <span className="text-[#34d399] drop-shadow-[0_2px_8px_rgba(16,185,129,0.4)]"> {t('hero.title_line2')}</span>
      </h1>

      {/* Hero Description */}
      <p className="hero-anim mt-6 text-base sm:text-lg md:text-xl text-white/90 font-medium leading-relaxed max-w-[700px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
        {t('hero.description')}
      </p>

      {/* Primary Actions */}
      <div className="hero-anim mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
        {/* Primary Button */}
        <button 
          onClick={onExplore}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#20A85A] hover:bg-[#168447] text-white text-base font-semibold shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <span>{t('hero.explore_btn')}</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        {/* Secondary Button with AI Sparkles */}
        <button 
          onClick={onOpenAI}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 text-base font-semibold shadow-lg transition-all duration-300 cursor-pointer group"
        >
          <Sparkles className="w-4 h-4 text-emerald-300 group-hover:scale-110 transition-transform" />
          <span>{t('hero.ask_ai_btn')}</span>
        </button>
      </div>
    </section>
  );
}
