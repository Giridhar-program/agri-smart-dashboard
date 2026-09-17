import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Globe, ArrowRight, Sprout } from 'lucide-react';

export default function OnboardingModal({ onComplete }) {
  const { i18n } = useTranslation();
  const [region, setRegion] = useState('All India');
  const [language, setLanguage] = useState('en');

  const regions = [
    "All India",
    "Punjab",
    "Haryana",
    "Maharashtra",
    "Uttar Pradesh",
    "Madhya Pradesh",
    "Kerala"
  ];

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिंदी (Hindi)' },
    { code: 'ml', label: 'മലയാളം (Malayalam)' }
  ];

  const handleContinue = () => {
    localStorage.setItem('agrishare_region', region);
    localStorage.setItem('agrishare_language', language);
    i18n.changeLanguage(language);
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 animate-in zoom-in-95 duration-300 flex flex-col items-center">
        
        {/* Logo/Icon */}
        <div className="w-16 h-16 rounded-full bg-[#EAF7EF] text-[#20A85A] flex items-center justify-center mb-6">
          <Sprout className="w-8 h-8" />
        </div>
        
        <h2 className="text-2xl font-bold text-[#171717] text-center mb-2">Welcome to AgriShare</h2>
        <p className="text-sm text-[#555555] text-center mb-8">
          Please select your region and preferred language to personalize your experience.
        </p>

        {/* Region Selector */}
        <div className="w-full mb-5">
          <label className="flex items-center gap-2 text-sm font-semibold text-[#171717] mb-2">
            <MapPin className="w-4 h-4 text-[#20A85A]" />
            Select Region
          </label>
          <select 
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="w-full bg-[#F7F6F2] border border-[#E5E5E5] rounded-xl px-4 py-3 text-sm text-[#171717] focus:outline-none focus:border-[#20A85A] focus:ring-1 focus:ring-[#20A85A]"
          >
            {regions.map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        {/* Language Selector */}
        <div className="w-full mb-8">
          <label className="flex items-center gap-2 text-sm font-semibold text-[#171717] mb-2">
            <Globe className="w-4 h-4 text-[#20A85A]" />
            Select Language / भाषा चुनें
          </label>
          <div className="grid grid-cols-2 gap-3">
            {languages.map(lang => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all ${
                  language === lang.code 
                    ? 'bg-[#EAF7EF] border-[#20A85A] text-[#168447]' 
                    : 'bg-white border-[#E5E5E5] text-[#555555] hover:border-[#20A85A]/50 hover:bg-slate-50'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#20A85A] hover:bg-[#168447] text-white font-semibold transition-colors shadow-sm"
        >
          Continue
          <ArrowRight className="w-4 h-4" />
        </button>

      </div>
    </div>
  );
}
