import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Tractor, Users, Bot, Sparkles, ShieldCheck, CheckCircle2, TrendingUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import FeatureCard from '../components/FeatureCard';
import AIFloatingButton from '../components/AIFloatingButton';

/**
 * LandingPage — the Home view.
 *
 * Note: the AI Assistant modal and the PRD §4 Dynamic Island are now owned by
 * App.jsx as single persistent instances (so the island's active pill can slide
 * between destinations without remounting). This component receives `onOpenAI`
 * from App and forwards it to every AI entry point below.
 */
export default function LandingPage({ onNavigate, onOpenAI }) {
  const { t } = useTranslation();
  const cardsRef = useRef(null);
  
  useGSAP(() => {
    gsap.fromTo(
      ".feature-card",
      { y: 100, opacity: 0, rotateX: 10 },
      { 
        y: 0, 
        opacity: 1, 
        rotateX: 0, 
        duration: 1, 
        stagger: 0.15, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 85%",
        }
      }
    );
  }, { scope: cardsRef });

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-emerald-500/20 selection:text-emerald-300">
      {/* 1. TOP FLOATING NAVBAR */}
      <Navbar 
        onNavigate={onNavigate}
        onOpenAI={onOpenAI}
      />

      {/* MAIN VIEWPORT CONTENT */}
      <main className="flex-1 flex flex-col justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-4 sm:py-6">
        {/* 2. & 3. & 4. HERO SECTION */}
        <Hero 
          onExplore={() => onNavigate('equipment')}
          onOpenAI={onOpenAI}
        />

        {/* 5. THREE HORIZONTAL FEATURE CARDS */}
        <section className="mt-4 sm:mt-8 mb-8 sm:mb-12" ref={cardsRef}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8" style={{ perspective: '1000px' }}>
            {/* CARD 1: Rent Equipment */}
            <FeatureCard
              icon={Tractor}
              title={t('features.rent.title')}
              description={t('features.rent.desc')}
              ctaText={t('features.rent.cta')}
              onClick={() => onNavigate('equipment')}
            />

            {/* CARD 2: Market Price Analyzer */}
            <FeatureCard
              icon={TrendingUp}
              title={t('features.market.title')}
              description={t('features.market.desc')}
              ctaText={t('features.market.cta')}
              onClick={() => onNavigate('market_price')}
            />

            {/* CARD 3: AI Farming Assistant (Visually Standout Feature) */}
            <FeatureCard
              icon={Bot}
              title={t('features.ai.title')}
              description={t('features.ai.desc')}
              ctaText={t('features.ai.cta')}
              isAI={true}
              onClick={onOpenAI}
            />
          </div>
        </section>

        {/* Minimalist Trust & Credibility Footnote */}
        <div className="border-t border-white/20 pt-6 pb-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 font-medium text-white/80">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              {t('footer.verified')}
            </span>
            <span className="flex items-center gap-1.5 font-medium text-white/80">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              {t('footer.transparent')}
            </span>
          </div>
          <p className="text-center sm:text-right">
            © {new Date().getFullYear()} AgriShare Inc. Empowering farmers with accessible technology.
          </p>
        </div>
      </main>

      {/* 6. AI ASSISTANT FLOATING BUTTON */}
      <AIFloatingButton 
        onClick={onOpenAI}
      />
    </div>
  );
}
