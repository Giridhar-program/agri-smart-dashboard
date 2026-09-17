import React, { useState, useEffect, useRef } from 'react';
import { Bot, Sparkles, X, Send, ArrowRight, CornerDownLeft } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { useTranslation } from 'react-i18next';
import { checkRateLimit, recordCall, remainingMessages } from '../lib/rateLimiter';
import { logError } from '../lib/logger';

// Initialize the Google Generative AI with the API key from environment variables
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

// Security: maximum characters accepted in a single user message
const MAX_INPUT_LENGTH = 500;
// AI call timeout in milliseconds
const AI_TIMEOUT_MS = 15_000;

export default function AIAssistantModal({ isOpen, onClose }) {
  const { t } = useTranslation();
  const abortControllerRef = useRef(null);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setMessages([
      {
        sender: 'ai',
        text: t('hero.description'), // Or we could use a specific greeting, let's use the description for now or hardcode a greeting key
      }
    ]);
  }, [t]);

  if (!isOpen) return null;

  const quickPrompts = [
    t('ai_modal.q1'),
    t('ai_modal.q2'),
    t('ai_modal.q3'),
    t('ai_modal.q4')
  ];

  const handleSend = async (textToSend) => {
    // Trim and enforce length cap before anything else
    const rawText = (textToSend || query).trim();
    const text = rawText.slice(0, MAX_INPUT_LENGTH);
    if (!text) return;

    // Security: enforce client-side rate limit
    const { allowed, reason } = checkRateLimit();
    if (!allowed) {
      setMessages(prev => [...prev, { sender: 'ai', text: reason }]);
      return;
    }

    // Record the call BEFORE the async operation so rapid clicks are also throttled
    recordCall();

    // Add user message
    const newMessages = [...messages, { sender: 'user', text }];
    setMessages(newMessages);
    setQuery('');
    setIsTyping(true);

    if (!genAI) {
      setMessages([...newMessages, { sender: 'ai', text: t('ai_modal.error_key') }]);
      setIsTyping(false);
      return;
    }

    try {
      const model = genAI.getGenerativeModel({
        model: 'gemini-2.5-flash',
        systemInstruction:
          'You are the AgriShare Farming & Machinery Assistant. ' +
          'You help farmers optimize yield, equipment rentals, and soil health. ' +
          'Give concise, practical advice.',
      });

      // Build conversation history for context
      const history = messages.slice(1).map((m) => ({
        role: m.sender === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }],
      }));

      const chat = model.startChat({ history });

      // Enforce a 15-second timeout on the Gemini call
      abortControllerRef.current = new AbortController();
      const timeoutId = setTimeout(() => abortControllerRef.current?.abort(), AI_TIMEOUT_MS);

      let reply;
      try {
        const result = await chat.sendMessage(text);
        clearTimeout(timeoutId);
        reply = result.response.text();
      } catch (innerErr) {
        clearTimeout(timeoutId);
        throw innerErr;
      }

      setMessages([...newMessages, { sender: 'ai', text: reply }]);
    } catch (error) {
      // Security: do NOT expose raw error details to the UI
      logError('AIAssistantModal: Gemini call failed', error);

      const isTimeout =
        error.name === 'AbortError' ||
        error.name === 'TimeoutError' ||
        error.message?.includes('timed out');

      const fallbackReply = isTimeout
        ? 'The AI assistant took too long to respond. Please try again with a shorter question.'
        : 'Based on regional data: For 10–15 acres, a 45–50 HP tractor is optimal. ' +
          'You can rent one on AgriShare for ~₹750/hour. ' +
          '(Note: Live AI is temporarily unavailable. Please try again shortly.)';

      setMessages([...newMessages, { sender: 'ai', text: fallbackReply }]);
    } finally {
      setIsTyping(false);
      abortControllerRef.current = null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="w-full max-w-xl bg-black/40 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 bg-white/10 border-b border-white/10 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center">
              <Bot className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-white">{t('ai_modal.title')}</h3>
                <span className="text-[10px] uppercase font-bold bg-[#20A85A] text-white px-2 py-0.5 rounded-full">
                  {t('ai_modal.live')}
                </span>
              </div>
              <p className="text-xs text-emerald-100">{t('ai_modal.subtitle')}</p>
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
        <div className="p-5 flex-1 overflow-y-auto space-y-4 min-h-[260px] max-h-[380px] scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-3.5 text-sm leading-relaxed ${m.sender === 'user'
                  ? 'bg-emerald-500/80 text-white rounded-br-none shadow-sm backdrop-blur-md border border-emerald-400/30'
                  : 'bg-white/10 text-white border border-white/20 rounded-bl-none shadow-sm backdrop-blur-md'
                  }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl p-3 text-xs text-white/70 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
                <span>{t('ai_modal.analyzing')}</span>
              </div>
            </div>
          )}
        </div>

        {/* Quick Question Chips */}
        <div className="px-5 pt-3 pb-2 bg-white/5 border-t border-white/10">
          <p className="text-[11px] font-semibold text-white/50 uppercase tracking-wider mb-2">{t('ai_modal.suggested')}</p>
          <div className="flex flex-wrap gap-1.5">
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                className="text-xs bg-white/10 hover:bg-white/20 text-white hover:text-emerald-300 border border-white/10 hover:border-emerald-500/50 px-3 py-1.5 rounded-full transition-colors text-left backdrop-blur-sm"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white/5 border-t border-white/10">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={query}
              maxLength={MAX_INPUT_LENGTH}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={t('ai_modal.placeholder')}
              className="flex-1 bg-white/10 border border-white/20 rounded-full px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-emerald-500/50 focus:bg-white/15 backdrop-blur-sm transition-all"
            />
            <button
              onClick={() => handleSend()}
              className="w-10 h-10 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white flex items-center justify-center transition-colors shadow-sm shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          {/* Character counter + session remaining — security transparency */}
          <div className="flex justify-between mt-1.5 px-1">
            <span className={`text-[10px] ${
              query.length > MAX_INPUT_LENGTH * 0.9 ? 'text-amber-400' : 'text-white/30'
            }`}>
              {query.length}/{MAX_INPUT_LENGTH}
            </span>
            <span className="text-[10px] text-white/30">
              {remainingMessages()} messages left this session
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
