import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import LandingPage from './pages/LandingPage';
import {
  ArrowLeft,
  Tractor,
  Calendar,
  MapPin,
  Fuel,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Bot,
  Search,
  Filter,
  ArrowRight,
  Sprout,
  FlaskConical,
  WifiOff,
} from 'lucide-react';
import AIAssistantModal from './components/AIAssistantModal';
import DynamicIsland from './components/DynamicIsland';
import SandboxWidget from './components/SandboxWidget';
import LeasingEconomy from './components/LeasingEconomy';
import OnboardingModal from './components/OnboardingModal';
import HowItWorks from './pages/HowItWorks';
import MarketPriceAnalyzer from './pages/MarketPriceAnalyzer';
import { runHealthChecks, getHealthMessage } from './lib/healthCheck';

// ─── Health Banner ────────────────────────────────────────────────────────────
function HealthBanner({ message }) {
  const [visible, setVisible] = useState(true);
  if (!visible || !message) return null;
  return (
    <div className="fixed top-0 inset-x-0 z-[100] flex items-center gap-3 px-4 py-2.5 bg-amber-900/90 backdrop-blur-md border-b border-amber-600/40 text-amber-100 text-xs font-medium">
      <WifiOff className="w-4 h-4 shrink-0 text-amber-400" />
      <span className="flex-1">{message}</span>
      <button
        onClick={() => setVisible(false)}
        className="text-amber-400 hover:text-amber-200 transition font-bold ml-2"
        aria-label="Dismiss"
      >
        ✕
      </button>
    </div>
  );
}

export default function App() {
  const { i18n } = useTranslation();
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(
    !!localStorage.getItem('agrishare_language')
  );
  const [healthMessage, setHealthMessage] = useState(null);

  useEffect(() => {
    const savedLang = localStorage.getItem('agrishare_language');
    if (savedLang) i18n.changeLanguage(savedLang);
  }, [i18n]);

  // Run health checks once on mount (non-blocking)
  useEffect(() => {
    runHealthChecks().then((status) => {
      const msg = getHealthMessage(status);
      if (msg) setHealthMessage(msg);
    });
  }, []);

  const [currentView, setCurrentView] = useState('home'); // 'home' | 'equipment' | 'share' | 'dashboard' | 'sandbox'
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);

  // Central hook that owns the main content swap (PRD §4 "State Hook" pattern).
  const [activeView, setActiveView] = useState('overview');
  // Map the PRD destination ids onto the app's existing view ids:
  // map the PRD destination ids onto the app's existing view ids:
  const navigate = (destination) => {
    const viewMap = { overview: 'home', market: 'equipment' };
    if (destination === 'ai') {
      setIsAIModalOpen(true);
      return;
    }
    setCurrentView(viewMap[destination] || destination);
    setActiveView(destination);
  };

  // Sample Agricultural Equipment Data for Demonstration
  // [FUTURE API/SUPABASE INTEGRATION POINT] Replace this hard-coded array with a
  // useEffect + fetch (or supabase.from('equipment').select()) call that loads the
  // equipment list from the backend; local state below remains the source of truth
  // for rendering until then.
  const equipmentList = [
    {
      id: 1,
      name: "Mahindra 575 DI Sarpanch",
      category: "Tractor (47 HP)",
      owner: "Ramesh Patel",
      location: "Karnal, Haryana (4.2 km away)",
      hourlyRate: "₹750 / hr",
      dailyRate: "₹4,500 / day",
      rating: "4.9 (38 rentals)",
      image: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=600&q=80",
      features: ["Hydraulic Lift", "Dual Clutch", "Fuel Efficient"],
      available: true
    },
    {
      id: 2,
      name: "John Deere 5050 D 4WD",
      category: "Heavy Tractor (50 HP)",
      owner: "Gurmeet Singh",
      location: "Ludhiana, Punjab (7.8 km away)",
      hourlyRate: "₹900 / hr",
      dailyRate: "₹5,400 / day",
      rating: "4.8 (52 rentals)",
      image: "https://images.unsplash.com/photo-1544986581-efac024faf62?auto=format&fit=crop&w=1000&q=80",
      features: ["Power Steering", "4WD Traction", "Trailer Hitch"],
      available: true
    },
    {
      id: 3,
      name: "Kartar 4000 Combine Harvester",
      category: "Combine Harvester",
      owner: "Devendra Verma",
      location: "Ambala, Haryana (11 km away)",
      hourlyRate: "₹1,600 / hr",
      dailyRate: "₹11,000 / day",
      rating: "5.0 (24 rentals)",
      image: "https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?auto=format&fit=crop&w=1000&q=80",
      features: ["Paddy & Wheat Cutters", "GPS Tracker", "AC Cabin"],
      available: false
    }
  ];

  // Derive the island's active destination from the current view (inverse of the map above).
  const islandActive = currentView === 'home' ? 'overview' : currentView === 'equipment' ? 'market' : currentView;

  // Content switch — each branch renders ONLY the view body.
  // The AI Assistant modal and the Dynamic Island are mounted ONCE below (outside
  // the switch) so the island is never remounted between views and its active
  // pill can slide fluidly from destination to destination.
  let content = null;
  if (currentView === 'home') {
    content = (
      <LandingPage
        onNavigate={setCurrentView}
        onOpenAI={() => setIsAIModalOpen(true)}
      />
    );
  } else if (currentView === 'sandbox') {
    // PRD §5.4 Sandbox View — extensible wrapper slot for future feature modules.
    content = (
      <>
        {/* Top Secondary Bar — same chrome as the equipment view for consistency */}
        <header className="h-20 bg-white/10 backdrop-blur-lg border-b border-white/20 px-6 sm:px-10 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('overview')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-xs font-semibold text-white/80 hover:text-white hover:bg-white/10 transition-colors backdrop-blur-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{i18n.t('app.back_to_home')}</span>
            </button>
            <div className="h-6 w-px bg-white/20"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                <FlaskConical className="w-4 h-4" />
              </div>
              <span className="font-bold text-base text-white">AgriShare</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAIModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold hover:bg-emerald-500/30 transition-colors border border-emerald-500/30"
            >
              <Bot className="w-3.5 h-3.5" />
              <span>{i18n.t('app.ask_ai')}</span>
            </button>
          </div>
        </header>

        {/* Sandbox body — PRD §5.4 dashed-border placeholder wrapper (children prop) */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-40">
          <SandboxWidget title="Future IoT Integrations">
            {/* Example injected child demonstrating the extensible wrapper (PRD §5.4 purpose) */}
            <p className="text-xs text-white/60 text-center max-w-md">
              Prototype slot — a future IoT soil-moisture or weather-API widget will mount here.
            </p>
          </SandboxWidget>
        </main>
      </>
    );
  } else if (currentView === 'how_it_works') {
    content = (
      <>
        {/* Top Secondary Bar */}
        <header className="h-20 bg-white/10 backdrop-blur-lg border-b border-white/20 px-6 sm:px-10 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentView('home')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-xs font-semibold text-white/80 hover:text-white hover:bg-white/10 transition-colors backdrop-blur-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{i18n.t('app.back_to_home')}</span>
            </button>
          </div>
        </header>
        <main className="pb-40">
          <HowItWorks />
        </main>
      </>
    );
  } else if (currentView === 'market_price') {
    content = (
      <>
        {/* Top Secondary Bar */}
        <header className="h-20 bg-white/10 backdrop-blur-lg border-b border-white/20 px-6 sm:px-10 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentView('home')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-xs font-semibold text-white/80 hover:text-white hover:bg-white/10 transition-colors backdrop-blur-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{i18n.t('app.back_to_home')}</span>
            </button>
          </div>
        </header>
        <main className="pb-40 h-full">
          <MarketPriceAnalyzer />
        </main>
      </>
    );
  } else {
    // Equipment / Leasing View
    content = (
      <>
        {/* Top Secondary Bar */}
        <header className="h-20 bg-white/10 backdrop-blur-lg border-b border-white/20 px-6 sm:px-10 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentView('home')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-xs font-semibold text-white/80 hover:text-white hover:bg-white/10 transition-colors backdrop-blur-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{i18n.t('app.back_to_home')}</span>
            </button>
            <div className="h-6 w-px bg-white/20"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                <Sprout className="w-4 h-4" />
              </div>
              <span className="font-bold text-base text-white">AgriShare</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAIModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold hover:bg-emerald-500/30 transition-colors border border-emerald-500/30"
            >
              <Bot className="w-3.5 h-3.5" />
              <span>{i18n.t('app.ask_ai')}</span>
            </button>

            <button
              onClick={() => setCurrentView('home')}
              className="px-4 py-2 rounded-full bg-emerald-500 text-white text-xs font-semibold hover:bg-emerald-600 transition-colors"
            >
              {i18n.t('app.switch_to_home')}
            </button>
          </div>
        </header>

        {/* Main Content Body */}
        <main className="pb-40">
          <LeasingEconomy onSelectEquipment={(item) => setIsAIModalOpen(true)} />
        </main>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-black/40 text-white font-sans antialiased">
      {/* Uptime / health banner — shown when Supabase or Gemini is unreachable */}
      <HealthBanner message={healthMessage} />

      {!hasCompletedOnboarding ? (
        <OnboardingModal onComplete={() => setHasCompletedOnboarding(true)} />
      ) : (
        <>
          {content}

          {/* AI Assistant modal — ONE persistent instance shared by every view */}
          <AIAssistantModal
            isOpen={isAIModalOpen}
            onClose={() => setIsAIModalOpen(false)}
          />

          {/* PRD §4 Dynamic Island */}
          <DynamicIsland
            activeView={islandActive}
            onNavigate={navigate}
            onOpenAI={() => setIsAIModalOpen(true)}
          />
        </>
      )}
    </div>
  );
}
