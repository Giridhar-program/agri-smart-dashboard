import React, { useState } from 'react';
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
  FlaskConical
} from 'lucide-react';
import AIAssistantModal from './components/AIAssistantModal';
import DynamicIsland from './components/DynamicIsland';
import SandboxWidget from './components/SandboxWidget';
import LeasingEconomy from './components/LeasingEconomy';

export default function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'equipment' | 'share' | 'dashboard' | 'sandbox'
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);

  // Central hook that owns the main content swap (PRD §4 "State Hook" pattern).
  const [activeView, setActiveView] = useState('overview');
  // Map the PRD destination ids onto the app's existing view ids:
  // 'overview' -> 'home' landing, 'market' -> 'equipment' leasing, 'ai' -> modal.
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
        <header className="h-20 bg-white border-b border-[#E5E5E5] px-6 sm:px-10 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('overview')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#E5E5E5] text-xs font-semibold text-[#555555] hover:text-[#171717] hover:bg-slate-50 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </button>
            <div className="h-6 w-px bg-slate-200"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#EAF7EF] text-[#20A85A] flex items-center justify-center">
                <FlaskConical className="w-4 h-4" />
              </div>
              <span className="font-bold text-base text-[#171717]">AgriShare</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAIModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EAF7EF] text-[#20A85A] text-xs font-semibold hover:bg-emerald-100 transition-colors"
            >
              <Bot className="w-3.5 h-3.5" />
              <span>Ask Agri-AI</span>
            </button>
          </div>
        </header>

        {/* Sandbox body — PRD §5.4 dashed-border placeholder wrapper (children prop) */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-40">
          <SandboxWidget title="Future IoT Integrations">
            {/* Example injected child demonstrating the extensible wrapper (PRD §5.4 purpose) */}
            <p className="text-xs text-[#555555] text-center max-w-md">
              Prototype slot — a future IoT soil-moisture or weather-API widget will mount here.
            </p>
          </SandboxWidget>
        </main>
      </>
    );
  } else {
    // Equipment / Leasing View
    content = (
      <>
        {/* Top Secondary Bar */}
        <header className="h-20 bg-white border-b border-[#E5E5E5] px-6 sm:px-10 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentView('home')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#E5E5E5] text-xs font-semibold text-[#555555] hover:text-[#171717] hover:bg-slate-50 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </button>
            <div className="h-6 w-px bg-slate-200"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#EAF7EF] text-[#20A85A] flex items-center justify-center">
                <Sprout className="w-4 h-4" />
              </div>
              <span className="font-bold text-base text-[#171717]">AgriShare</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAIModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EAF7EF] text-[#20A85A] text-xs font-semibold hover:bg-emerald-100 transition-colors"
            >
              <Bot className="w-3.5 h-3.5" />
              <span>Ask Agri-AI</span>
            </button>

            <button
              onClick={() => setCurrentView('home')}
              className="px-4 py-2 rounded-full bg-[#20A85A] text-white text-xs font-semibold hover:bg-[#168447] transition-colors"
            >
              Switch to Home
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
    <div className="min-h-screen bg-[#F7F6F2] text-[#171717] font-sans antialiased">
      {content}

      {/* AI Assistant modal — ONE persistent instance shared by every view */}
      <AIAssistantModal 
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
      />

      {/* PRD §4 Dynamic Island — single persistent floating bottom navigation.
          Mounted outside the view switch so switching views never remounts it,
          letting the active pill SLIDE between destinations instead of jumping. */}
      <DynamicIsland
        activeView={islandActive}
        onNavigate={navigate}
        onOpenAI={() => setIsAIModalOpen(true)}
      />
    </div>
  );
}
