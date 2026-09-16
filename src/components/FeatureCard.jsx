import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function FeatureCard({
  icon: Icon,
  title,
  description,
  ctaText,
  imageUrl,
  fallbackGradient,
  isAI = false,
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className={`group relative h-[300px] sm:h-[320px] rounded-[28px] overflow-hidden cursor-pointer transition-all duration-300 transform hover:-translate-y-1.5 shadow-[0_6px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.12)] border ${
        isAI ? 'border-[#20A85A]/60 ring-2 ring-[#20A85A]/20' : 'border-[#E5E5E5]/60'
      }`}
    >
      {/* Background Image with Fallback */}
      <div 
        className={`absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-105 ${fallbackGradient || 'bg-slate-800'}`}
        style={{ backgroundImage: `url(${imageUrl})` }}
      />

      {/* Dark Subtle Protective Overlay for Readable White Text */}
      <div className={`absolute inset-0 transition-opacity duration-300 ${
        isAI 
          ? 'bg-gradient-to-t from-[#0B1E13] via-[#0B1E13]/70 to-black/30 group-hover:from-[#0B1E13]/95' 
          : 'bg-gradient-to-t from-black/85 via-black/55 to-black/25 group-hover:from-black/90'
      }`} />

      {/* Special AI Glow Highlight Badge (if AI card) */}
      {isAI && (
        <div className="absolute top-5 right-5 z-20">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#20A85A]/90 text-white text-[11px] font-bold tracking-wide uppercase shadow-sm backdrop-blur-sm border border-emerald-300/40">
            <Sparkles className="w-3 h-3 text-amber-300" />
            Core Feature
          </span>
        </div>
      )}

      {/* Card Content (Bottom-aligned like high-end SaaS reference) */}
      <div className="relative z-10 h-full p-7 flex flex-col justify-between text-white">
        {/* Top Icon Pill */}
        <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-colors group-hover:bg-white/25">
          <Icon className="w-6 h-6 text-white" />
        </div>

        {/* Bottom Text & CTA */}
        <div className="space-y-2">
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-emerald-300 transition-colors">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-200 line-clamp-2 leading-relaxed font-normal">
            {description}
          </p>

          <div className="pt-2">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-white group-hover:text-[#20A85A] group-hover:translate-x-1 transition-all duration-200">
              <span>{ctaText}</span>
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
