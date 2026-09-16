import React from 'react';
import { Bot, Sparkles } from 'lucide-react';

export default function AIFloatingButton({ onClick, isOpen }) {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={onClick}
        aria-label="Open AI Farming Assistant"
        className="relative group w-14 h-14 rounded-full bg-[#20A85A] hover:bg-[#168447] text-white flex items-center justify-center shadow-lg shadow-[#20A85A]/30 transition-all duration-300 transform hover:scale-110 active:scale-95 cursor-pointer"
      >
        {/* Subtle Pulse Ring */}
        <span className="absolute -inset-1 rounded-full bg-[#20A85A]/30 animate-ping pointer-events-none opacity-75"></span>

        <Bot className="w-6 h-6 transition-transform group-hover:rotate-6" />

        {/* Small Sparkle Accent */}
        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-400 border-2 border-white flex items-center justify-center">
          <Sparkles className="w-2.5 h-2.5 text-slate-900" />
        </span>

        {/* Tooltip on hover */}
        <span className="absolute right-16 px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-md">
          Ask Agri-AI
        </span>
      </button>
    </div>
  );
}
