import React from 'react';
import { Tractor, Users, Bot, Sparkles, ShieldCheck, CheckCircle2 } from 'lucide-react';
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
  // Reliable high-resolution agricultural imagery
  // [FUTURE API/SUPABASE INTEGRATION POINT] Feature-card imagery/copy can later be
  // fetched from a CMS table (e.g. supabase.from('feature_cards')); static assets
  // below are intentional for this API-free prototype.
  const cardImages = {
    rent: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1000&q=80", // Tractor in lush green field
    share: "https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?auto=format&fit=crop&w=1000&q=80", // Harvester / farm machinery
    ai: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=1000&q=80" // Smart tech farming field
  };

  return (
    <div className="min-h-screen bg-[#F7F6F2] text-[#171717] flex flex-col justify-between selection:bg-[#20A85A]/20 selection:text-[#168447]">
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
        <section className="mt-4 sm:mt-8 mb-8 sm:mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* CARD 1: Rent Equipment */}
            <FeatureCard
              icon={Tractor}
              title="Rent Equipment"
              description="Access tractors, harvesters, pumps and other agricultural tools without the high purchase cost."
              ctaText="Explore"
              imageUrl={cardImages.rent}
              fallbackGradient="bg-emerald-900"
              onClick={() => onNavigate('equipment')}
            />

            {/* CARD 2: Share & Earn */}
            <FeatureCard
              icon={Users}
              title="Share & Earn"
              description="Equipment owners can list unused machinery and earn income by renting it to nearby farmers."
              ctaText="List Equipment"
              imageUrl={cardImages.share}
              fallbackGradient="bg-amber-950"
              onClick={() => onNavigate('share')}
            />

            {/* CARD 3: AI Farming Assistant (Visually Standout Feature) */}
            <FeatureCard
              icon={Bot}
              title="AI Farming Assistant"
              description="Get intelligent farming guidance, recommendations and quick answers whenever you need them."
              ctaText="Ask AI"
              imageUrl={cardImages.ai}
              fallbackGradient="bg-[#0B1E13]"
              isAI={true}
              onClick={onOpenAI}
            />
          </div>
        </section>

        {/* Minimalist Trust & Credibility Footnote */}
        <div className="border-t border-[#E5E5E5] pt-6 pb-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#555555]">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-[#20A85A]" />
              Verified Equipment Owners
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-[#20A85A]" />
              Transparent Hourly & Daily Rates
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
