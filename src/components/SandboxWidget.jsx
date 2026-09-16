import React from 'react';
import { FlaskConical, Droplets, CloudSun } from 'lucide-react';

/**
 * SandboxWidget — PRD §5.4 "The Sandbox Component".
 *
 * An extensible wrapper / developer slot that explicitly uses the React
 * `children` prop: future features (e.g. IoT soil-moisture mapping, weather
 * APIs) can be injected inside it without touching the surrounding layout.
 *
 * Visually marked as a development placeholder with a dashed border per PRD:
 * border-dashed border-slate-300 bg-slate-50/50.
 */
export default function SandboxWidget({ title = 'Sandbox', children }) {
  return (
    // Outer card keeps the app's existing anatomy; inner dashed zone is the PRD-specified placeholder area.
    <section className="rounded-[24px] border border-dashed border-slate-300 bg-slate-50/50 p-6 sm:p-10">
      <div className="flex items-center justify-center gap-2 mb-2">
        <FlaskConical className="w-4 h-4 text-[#20A85A]" />
        <h2 className="text-lg font-bold tracking-tight text-[#171717]">{title}</h2>
      </div>
      <p className="text-center text-xs text-[#555555] max-w-md mx-auto mb-6">
        Modular development slot — drop in future features here via the{' '}
        <code className="px-1 py-0.5 rounded bg-white border border-slate-200 text-[10px]">children</code> prop.
      </p>

      {/* Injection point for future modules (children prop) */}
      <div className="flex flex-col items-center gap-4">
        {/* Example placeholder modules demonstrating the injection pattern — no APIs, mock UI only */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 w-full max-w-lg">
          <div className="flex-1 flex items-center gap-3 rounded-2xl bg-white border border-slate-200 px-4 py-3">
            <div className="w-9 h-9 rounded-full bg-[#EAF7EF] text-[#20A85A] flex items-center justify-center shrink-0">
              <Droplets className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-[#171717] truncate">IoT Soil Moisture Mapping</p>
              <p className="text-xs text-[#555555]">Sensor grid widget — slot reserved</p>
            </div>
          </div>
          <div className="flex-1 flex items-center gap-3 rounded-2xl bg-white border border-slate-200 px-4 py-3">
            <div className="w-9 h-9 rounded-full bg-[#EAF7EF] text-[#20A85A] flex items-center justify-center shrink-0">
              <CloudSun className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-[#171717] truncate">Weather API Module</p>
              <p className="text-xs text-[#555555]">Forecast widget — slot reserved</p>
            </div>
          </div>
        </div>

        {/* Whatever a future developer passes in renders here */}
        {children}
      </div>
    </section>
  );
}
