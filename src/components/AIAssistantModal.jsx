import React, { useState } from 'react';
import { Bot, Sparkles, X, Send, ArrowRight, CornerDownLeft } from 'lucide-react';

export default function AIAssistantModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: "Namaste! I'm your AgriShare Farming & Machinery Assistant. How can I help optimize your yield, equipment rentals, or soil health today?",
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const quickPrompts = [
    "🚜 What size tractor is best for 12 acres of wheat?",
    "🌱 Best nitrogen fertilizer schedule for early kharif",
    "💰 How do I list my rotavator to earn extra income?",
    "🌧️ Monsoon rainfall forecast and irrigation planning"
  ];

  const handleSend = (textToSend) => {
    const text = textToSend || query;
    if (!text.trim()) return;

    // Add user message
    const newMessages = [...messages, { sender: 'user', text }];
    setMessages(newMessages);
    setQuery('');
    setIsTyping(true);

    // Simulated Smart AI Response (mock network delay — no external APIs used)
    // [FUTURE API/SUPABASE INTEGRATION POINT] Swap this setTimeout for a real call
    // to an LLM/edge-function endpoint (e.g. supabase.functions.invoke('agri-ai'))
    // and render its reply instead of the canned response.
    setTimeout(() => {
      let reply = "Based on regional soil and machinery data: ";
      if (text.toLowerCase().includes("tractor") || text.toLowerCase().includes("acres")) {
        reply = "For 10–15 acres, a 45–50 HP tractor (like a Mahindra 575 DI or John Deere 5050 D) is optimal. You can rent one on AgriShare for ~₹750/hour rather than purchasing for ₹7.5 Lakhs!";
      } else if (text.toLowerCase().includes("list") || text.toLowerCase().includes("rotavator") || text.toLowerCase().includes("earn")) {
        reply = "Listing your machinery takes 2 minutes! Farmers in your tehsil currently demand rotavators at ₹600–₹850/hr. You can earn an estimated ₹18,000–₹25,000/month in idle seasons.";
      } else {
        reply = "Great question! For optimal yield this season, prioritize deep tillage before sowing and monitor soil moisture at 15cm depth. Check our Equipment page to lease seed drills!";
      }

      setMessages([...newMessages, { sender: 'ai', text: reply }]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-xl bg-white rounded-3xl border border-[#E5E5E5] shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-[#0B1E13] to-[#168447] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center">
              <Bot className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-white">AgriShare AI Assistant</h3>
                <span className="text-[10px] uppercase font-bold bg-[#20A85A] text-white px-2 py-0.5 rounded-full">
                  Live
                </span>
              </div>
              <p className="text-xs text-emerald-100">Smart farming advice & equipment guidance</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="p-5 flex-1 overflow-y-auto space-y-4 bg-slate-50/50 min-h-[260px] max-h-[380px]">
          {messages.map((m, idx) => (
            <div 
              key={idx} 
              className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[85%] rounded-2xl p-3.5 text-sm leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-[#20A85A] text-white rounded-br-none shadow-sm'
                    : 'bg-white text-[#171717] border border-[#E5E5E5] rounded-bl-none shadow-xs'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-[#E5E5E5] rounded-2xl p-3 text-xs text-[#555555] flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#20A85A] animate-spin" />
                <span>Agri-AI is analyzing your query...</span>
              </div>
            </div>
          )}
        </div>

        {/* Quick Question Chips */}
        <div className="px-5 pt-3 pb-2 bg-white border-t border-[#E5E5E5]/80">
          <p className="text-[11px] font-semibold text-[#555555] uppercase tracking-wider mb-2">Suggested Questions</p>
          <div className="flex flex-wrap gap-1.5">
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                className="text-xs bg-[#F7F6F2] hover:bg-[#EAF7EF] text-[#171717] hover:text-[#20A85A] border border-[#E5E5E5] px-3 py-1.5 rounded-full transition-colors text-left"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white border-t border-[#E5E5E5] flex items-center gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask anything about crops, tractors, or rentals..."
            className="flex-1 bg-[#F7F6F2] border border-[#E5E5E5] rounded-full px-4 py-2.5 text-sm text-[#171717] placeholder:text-[#555555]/60 focus:outline-none focus:border-[#20A85A]"
          />
          <button
            onClick={() => handleSend()}
            className="w-10 h-10 rounded-full bg-[#20A85A] hover:bg-[#168447] text-white flex items-center justify-center transition-colors shadow-sm shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
