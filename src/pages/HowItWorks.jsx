import React from 'react';
import { useTranslation } from 'react-i18next';
import { Tractor, Bot, TrendingUp, CheckCircle2 } from 'lucide-react';

export default function HowItWorks() {
  const { t } = useTranslation();

  const steps = [
    {
      icon: Tractor,
      title: t('how_it_works.step1_title'),
      description: t('how_it_works.step1_desc'),
      color: "bg-emerald-500/20 text-emerald-400"
    },
    {
      icon: Tractor,
      title: t('how_it_works.step2_title'),
      description: t('how_it_works.step2_desc'),
      color: "bg-blue-500/20 text-blue-400"
    },
    {
      icon: TrendingUp,
      title: t('how_it_works.step3_title'),
      description: t('how_it_works.step3_desc'),
      color: "bg-amber-500/20 text-amber-400"
    },
    {
      icon: Bot,
      title: t('how_it_works.step4_title'),
      description: t('how_it_works.step4_desc'),
      color: "bg-purple-500/20 text-purple-400"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-white pb-32">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
          {t('how_it_works.title')}
        </h2>
        <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto drop-shadow-sm font-medium">
          {t('how_it_works.subtitle')}
        </p>
      </div>

      <div className="space-y-8">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={index} className="flex flex-col md:flex-row items-center gap-8 bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-[32px] hover:bg-white/15 transition-all shadow-lg">
              <div className={`w-24 h-24 rounded-[24px] flex items-center justify-center shrink-0 ${step.color} border border-white/10 shadow-inner`}>
                <Icon className="w-12 h-12" />
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-white mb-3 drop-shadow-sm">{step.title}</h3>
                <p className="text-white/90 leading-relaxed text-lg font-medium">{step.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-16 text-center">
        <div className="inline-flex items-center gap-3 bg-emerald-500/20 border border-emerald-500/30 px-6 py-4 rounded-full text-emerald-300 font-semibold shadow-sm backdrop-blur-md">
          <CheckCircle2 className="w-6 h-6" />
          <span>{t('footer.verified')}</span>
        </div>
      </div>
    </div>
  );
}
