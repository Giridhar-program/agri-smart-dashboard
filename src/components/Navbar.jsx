import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Sprout, Globe, Menu, X, ArrowRight, Bot } from 'lucide-react';

export default function Navbar({ onNavigate, onOpenAI }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();

  return (
    <header className="relative z-40 w-full px-4 sm:px-8 lg:px-12 pt-5 sm:pt-7">
      {/* Large Floating Rounded Navbar spanning full width with 24-32px margins */}
      <nav className="w-full h-20 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 shadow-lg px-6 sm:px-10 flex items-center justify-between transition-all duration-300">
        
        {/* LEFT: AgriShare Logo + Brand Name (Firmly on the left side) */}
        <div className="flex items-center min-w-[200px] justify-start">
          <div 
            onClick={() => onNavigate?.('home')}
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            <div className="w-11 h-11 rounded-full bg-white/20 text-emerald-300 flex items-center justify-center transition-transform group-hover:scale-105 shadow-xs">
              <Sprout className="w-6 h-6 text-emerald-300" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-white font-sans drop-shadow-sm">
              AgriShare
            </span>
          </div>
        </div>

        {/* CENTER: Navigation Links (Perfect center alignment) */}
        <div className="hidden lg:flex items-center justify-center gap-9 flex-1">
          <button 
            onClick={() => onNavigate?.('equipment')}
            className="text-sm font-medium text-white/80 hover:text-white transition-colors cursor-pointer drop-shadow-sm"
          >
            {t('nav.explore')}
          </button>
          <button 
            onClick={() => onNavigate?.('equipment')}
            className="text-sm font-medium text-white/80 hover:text-white transition-colors cursor-pointer drop-shadow-sm"
          >
            {t('nav.equipment')}
          </button>
          <button 
            onClick={() => onOpenAI?.()}
            className="text-sm font-medium text-white/80 hover:text-emerald-300 inline-flex items-center gap-1.5 transition-colors cursor-pointer drop-shadow-sm"
          >
            <Bot className="w-4 h-4 text-emerald-300" />
            <span>{t('nav.ai_assistant')}</span>
          </button>
          <button 
            onClick={() => onNavigate?.('how_it_works')}
            className="text-sm font-medium text-white/80 hover:text-white transition-colors cursor-pointer drop-shadow-sm"
          >
            {t('nav.how_it_works')}
          </button>
        </div>

        {/* RIGHT: Language, Sign In, Primary Action */}
        <div className="hidden sm:flex items-center justify-end gap-5 min-w-[200px]">
          {/* Language Selector */}
          <button 
            onClick={() => {
              const current = i18n.language || 'en';
              const next = current === 'en' ? 'hi' : current === 'hi' ? 'ml' : 'en';
              i18n.changeLanguage(next);
              localStorage.setItem('agrishare_language', next);
            }}
            className="flex items-center gap-1.5 text-xs font-semibold text-white/80 hover:text-white px-3 py-1.5 rounded-full hover:bg-white/10 transition-colors cursor-pointer drop-shadow-sm w-[70px] justify-center"
            title="Change Language"
          >
            <Globe className="w-3.5 h-3.5" />
            <span className="uppercase">{i18n.language || 'EN'}</span>
          </button>

          {/* Sign In */}
          <button 
            onClick={() => onNavigate?.('equipment')}
            className="text-sm font-medium text-white hover:text-emerald-300 transition-colors px-2 py-1.5 cursor-pointer drop-shadow-sm"
          >
            {t('nav.sign_in')}
          </button>

          {/* Primary Green Pill Button */}
          <button 
            onClick={() => onNavigate?.('equipment')}
            className="inline-flex items-center gap-2 bg-[#20A85A] hover:bg-[#168447] text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-[0_4px_14px_rgba(32,168,90,0.4)] hover:shadow-[0_6px_20px_rgba(32,168,90,0.5)] transition-all duration-200 cursor-pointer"
          >
            <span>{t('nav.get_started')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile / Tablet Hamburger Toggle */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors ml-auto"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 bg-white rounded-3xl border border-[#E5E5E5] shadow-xl p-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-3 font-medium text-base text-[#171717]">
            <button 
              onClick={() => { onNavigate?.('equipment'); setMobileMenuOpen(false); }}
              className="text-left px-3 py-2 rounded-xl hover:bg-slate-50 transition-colors"
            >
              Explore
            </button>
            <button 
              onClick={() => { onNavigate?.('equipment'); setMobileMenuOpen(false); }}
              className="text-left px-3 py-2 rounded-xl hover:bg-slate-50 transition-colors"
            >
              Equipment
            </button>
            <button 
              onClick={() => { onOpenAI?.(); setMobileMenuOpen(false); }}
              className="text-left px-3 py-2 rounded-xl hover:bg-emerald-50 text-[#20A85A] flex items-center gap-2 transition-colors"
            >
              <Bot className="w-4 h-4" />
              <span>AI Assistant</span>
            </button>
            <button 
              onClick={() => { onNavigate?.('how_it_works'); setMobileMenuOpen(false); }}
              className="text-left px-3 py-2 rounded-xl hover:bg-slate-50 transition-colors"
            >
              How It Works
            </button>
          </div>

          <div className="pt-3 border-t border-[#E5E5E5] flex flex-col gap-3">
            <button 
              onClick={() => { onNavigate?.('equipment'); setMobileMenuOpen(false); }}
              className="w-full py-2.5 text-center text-sm font-medium text-[#171717] border border-[#E5E5E5] rounded-full hover:bg-slate-50 transition-colors"
            >
              Sign In
            </button>
            <button 
              onClick={() => { onNavigate?.('equipment'); setMobileMenuOpen(false); }}
              className="w-full py-2.5 text-center text-sm font-semibold text-white bg-[#20A85A] hover:bg-[#168447] rounded-full shadow-sm transition-colors flex items-center justify-center gap-2"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
