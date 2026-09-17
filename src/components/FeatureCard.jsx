import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function FeatureCard({
  icon: Icon,
  title,
  description,
  ctaText,
  isAI = false,
  onClick,
}) {
  const { t } = useTranslation();

  return (
    <div
      onClick={onClick}
      className={`feature-card group relative h-[300px] sm:h-[320px] rounded-[28px] overflow-hidden cursor-pointer transition-all duration-500 shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.2)] border bg-white/10 backdrop-blur-xl ${
        isAI ? 'border-emerald-400/50 hover:bg-white/15' : 'border-white/20 hover:bg-white/20'
      }`}
    >
      {/* Subtle shine effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Special AI Glow Highlight Badge (if AI card) */}
      {isAI && (
        <div className="absolute top-5 right-5 z-20">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#20A85A]/90 text-white text-[11px] font-bold tracking-wide uppercase shadow-sm backdrop-blur-sm border border-emerald-300/40">
            <Sparkles className="w-3 h-3 text-amber-300" />
            {t('features.core_feature')}
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
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-white group-hover:text-emerald-300 group-hover:translate-x-1 transition-all duration-300">
              <span>{ctaText}</span>
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
