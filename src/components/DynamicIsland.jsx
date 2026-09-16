import React, { useState, useLayoutEffect, useRef } from 'react';
import { LayoutDashboard, Store, Bot, FlaskConical } from 'lucide-react';

/**
 * DynamicIsland — PRD §4 "Dynamic Island Pattern".
 *
 * A floating, pill-shaped navigation cluster fixed to the bottom-center of the
 * viewport, giving the app a modern mobile/web hybrid feel. It complements the
 * existing top navbar (nothing is removed — this is an additional navigator).
 *
 * Glassmorphic treatment per PRD: backdrop-blur-md bg-white/80 border-slate-200.
 *
 * The active state is a single absolutely-positioned pill that SLIDES between
 * the nav items (measured with refs + useLayoutEffect) instead of each button
 * painting its own background — so the highlight glides fluidly from tab to tab.
 *
 * Props:
 *  - activeView:  currently displayed view id ('home' | 'equipment' | 'sandbox')
 *  - onNavigate:  callback to switch the main content view
 *  - onOpenAI:    callback that opens the existing AI Assistant modal
 */
export default function DynamicIsland({ activeView, onNavigate, onOpenAI }) {
  // Nav destinations per PRD §4: Overview, Market (Leasing), AI Assistant, Sandbox.
  // Ids use the PRD destination names; App.jsx maps 'overview' -> the 'home' landing
  // view and 'market' -> the 'equipment' leasing view. AI Assistant is special-cased:
  // instead of switching views it opens the existing AI modal via onOpenAI.
  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard, action: () => onNavigate?.('overview') },
    { id: 'market', label: 'Market', icon: Store, action: () => onNavigate?.('market') },
    { id: 'ai', label: 'AI Assistant', icon: Bot, action: onOpenAI },
    { id: 'sandbox', label: 'Sandbox', icon: FlaskConical, action: () => onNavigate?.('sandbox') },
  ];

  // Sliding-pill state: {left, width} in px relative to the nav container.
  // `ready` is false until the first measurement so the pill never flashes
  // at position 0 with zero width before layout settles.
  const [pill, setPill] = useState({ left: 0, width: 0, ready: false });
  const itemRefs = useRef({});

  // Measure the active item and position the pill beneath it.
  // useLayoutEffect runs synchronously after DOM mutation but before paint,
  // so there's no visible jump between the activeView change and pill move.
  // Also re-measured on window resize (labels show/hide across breakpoints,
  // which changes each item's width).
  useLayoutEffect(() => {
    const updatePill = () => {
      const el = itemRefs.current[activeView];
      if (!el) return;
      setPill({ left: el.offsetLeft, width: el.offsetWidth, ready: true });
    };

    updatePill();
    window.addEventListener('resize', updatePill);
    return () => window.removeEventListener('resize', updatePill);
  }, [activeView]);

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40">
      {/* `relative` anchors the absolutely-positioned sliding pill to the nav bar */}
      <nav
        aria-label="Dynamic Island navigation"
        className="relative flex items-center gap-1 px-2 py-1.5 rounded-full backdrop-blur-md bg-white/80 border border-slate-200 shadow-[0_4px_24px_rgba(0,0,0,0.08)] transition-all duration-300"
      >
        {/* The sliding active pill — one element that glides between items.
            transition-[left,width] animates both position and size so moving
            between narrow/wide items (icon-only vs icon+label) stays smooth. */}
        <span
          aria-hidden="true"
          className="absolute top-1.5 bottom-1.5 rounded-full bg-emerald-100 transition-[left,width] duration-300 ease-out"
          style={{
            left: `${pill.left}px`,
            width: `${pill.width}px`,
            opacity: pill.ready ? 1 : 0, // hidden until first measurement
          }}
        />

        {navItems.map(({ id, label, icon: Icon, action }) => {
          const isActive = activeView === id;
          return (
            <button
              key={id}
              ref={(el) => { itemRefs.current[id] = el; }}
              onClick={action}
              aria-current={isActive ? 'page' : undefined}
              className={`group relative z-10 flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full text-xs font-semibold transition-colors duration-200 cursor-pointer ${
                isActive
                  ? 'text-emerald-800' // pill supplies the background now
                  : 'text-[#555555] hover:text-[#171717]'
              }`}
            >
              <Icon
                className={`w-4 h-4 transition-transform duration-200 group-hover:scale-110 ${
                  isActive ? 'text-emerald-800' : 'text-[#555555] group-hover:text-[#20A85A]'
                }`}
              />
              <span className="hidden sm:inline">{label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
