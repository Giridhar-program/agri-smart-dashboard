# AgriShare — Project Summary

> **One-liner:** A frontend prototype for a smart-agriculture platform connecting farmers with equipment rentals, an AI farming assistant, and community resource sharing — built fully client-side with mock data (no backend).

This document is a quick onboarding summary for teammates. The product spec lives in [`agtech_prototype_prd.md`](./agtech_prototype_prd.md).

---

## 1. Quick Facts

| | |
|---|---|
| **App name** | `agri-smart-dashboard` |
| **Type** | Frontend prototype — client-side state only, JSON mock data, zero external APIs |
| **Source of truth for product** | `agtech_prototype_prd.md` (PRD) |
| **Node scripts** | `npm run dev` · `npm run build` · `npm run preview` |

## 2. Tech Stack (per PRD §2)

| Layer | Tech | Version |
|---|---|---|
| Build tool | Vite | ^4.5.3 |
| Framework | React (functional components + hooks) | ^18.2.0 |
| Styling | Tailwind CSS | ^3.4.1 |
| Icons | lucide-react | ^0.344.0 |
| Charts (reserved for the price widget) | Recharts | ^3.10.1 |
| Backend / external APIs | **None** — intentional per PRD | — |

## 3. Project Structure

```
src/
├── main.jsx                     # React root (StrictMode)
├── index.css                    # Tailwind layers + custom scrollbar
├── App.jsx                      # View router + central navigation hook
├── pages/
│   └── LandingPage.jsx          # "Overview" home view (hero + 3 feature cards)
└── components/
    ├── Navbar.jsx               # Top floating pill navbar
    ├── Hero.jsx                 # Hero headline + primary CTAs
    ├── FeatureCard.jsx          # Reusable image feature card
    ├── AIFloatingButton.jsx     # Bottom-right AI launcher with pulse ring
    ├── AIAssistantModal.jsx     # Chat modal — mock AI, quick prompts, typing state
    ├── DynamicIsland.jsx        # PRD §4 floating bottom nav with SLIDING active pill
    └── SandboxWidget.jsx        # PRD §5.4 dashed-border extensible wrapper (children prop)
```

## 4. Navigation Architecture

**Two navigators coexist (nothing was removed):**

1. **Top navbar** — classic floating pill header, present on the home view.
2. **Dynamic Island** (PRD §4) — glassmorphic pill (`backdrop-blur-md bg-white/80 border-slate-200`) fixed at bottom-center. Four destinations:

| Island item | Maps to | Behavior |
|---|---|---|
| **Overview** | `home` view (LandingPage) | View switch |
| **Market** | `equipment` view (rentals grid) | View switch |
| **AI Assistant** | existing AI modal | Opens modal (no view change) |
| **Sandbox** | `sandbox` view (PRD §5.4 placeholder) | View switch |

**Key implementation detail:** the island and the AI modal are mounted **once at `App.jsx` root, outside the view switch**. Views swap as `content` inside a single shell — so the island is never remounted and its active pill can animate fluidly between items. The active highlight is a single measured pill (`useLayoutEffect` + refs reading `offsetLeft`/`offsetWidth`, animated via `transition-[left,width] duration-300`), re-measured on resize, hidden until first measurement to avoid a 0,0 flash. Ids use PRD naming (`overview`, `market`, `ai`, `sandbox`); `App.jsx` maps them to internal view ids.

## 5. Views

### Home / Overview (`LandingPage`)
- Hero ("Smart farming, made accessible."), Explore + Ask AI CTAs.
- Three feature cards: **Rent Equipment**, **Share & Earn**, **AI Farming Assistant** (highlighted "Core Feature").
- Trust footnote + AI floating button.

### Market / Equipment Leasing
- Header with search input; grid of equipment cards (image, category, name, location, feature chips, availability badge, rate, "Book Rental").
- Data: hard-coded `equipmentList` array in `App.jsx` (3 items, Unsplash imagery).

### Sandbox (PRD §5.4)
- `SandboxWidget` renders a `border-dashed border-slate-300 bg-slate-50/50` placeholder card titled "Future IoT Integrations", with two reserved mock slots (IoT Soil Moisture, Weather API) and an explicit `children` injection point for future modules.

### AI Assistant Modal
- Chat UI: distinct AI/user bubbles, quick-prompt chips, input + send button, "typing…" indicator via `setTimeout` with canned Kerala/India-farming responses. Fully mock.

## 6. Mock Data & Future Integration Points

All data is client-side. PRD §7 requires marking future API/Supabase seams — search the code for:

- `[FUTURE API/SUPABASE INTEGRATION POINT]` comments in:
  - `App.jsx` — equipment list → later `supabase.from('equipment').select()`
  - `AIAssistantModal.jsx` — `setTimeout` → later edge-function/LLM call
  - `LandingPage.jsx` — feature imagery/copy → later CMS table

## 7. Design Language (unchanged per PRD)

- Canvas `#F7F6F2`, text `#171717`, muted `#555555`, brand green `#20A85A` / `#168447`, light green `#EAF7EF`.
- Rounded cards (`rounded-[24px]`+), subtle borders `#E5E5E5`, soft shadows, pill buttons, Inter font, glassmorphic surfaces.
- Tailwind theme tokens under the `agri` namespace in `tailwind.config.js`.

## 8. Getting Started

```bash
npm install        # once
npm run dev        # dev server → http://localhost:5173
npm run build      # production build to dist/ (verified passing)
npm run preview    # serve the production build
```

## 9. Known Gaps / Next Steps (from PRD, not yet built)

- [ ] **§5.1 Crop Price Prediction widget** — Recharts line chart with crop selector (Cardamom/Rubber/Black Pepper) + "Show AI Forecast" dashed-line toggle, and the exact §6 `cropData` seed.
- [ ] **§6 leasing seed data** — swap current equipment list for the exact Kerala-based `equipmentData` array; add the "Rent Now" confirmation modal (current CTA opens the AI modal instead).
- [ ] **§5.3 chat spec alignment** — PRD describes the assistant as a dedicated island view; currently it's a modal (existing design kept intentionally).
- [ ] Empty-state handling for data arrays (PRD §7 error-handling note).

---
*Generated with Codebuff 🤖 — ask the team channel for access questions.*
