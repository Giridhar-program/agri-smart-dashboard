# 🌾 AgriShare — Smart Agriculture & Equipment Platform
> **Hackathon Edition** — Democratizing agricultural machinery and AI-powered agronomy insights for smallholder farmers.

[![Live Demo](https://img.shields.io/badge/Live_Demo-Render-46E3B7?style=for-the-badge&logo=render&logoColor=black)](https://agri-smart-dashboard.onrender.com)
[![GitHub License](https://img.shields.io/badge/license-MIT-green.svg?style=for-the-badge)](LICENSE)
[![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)

---

## 🌐 Live Application

- **Live URL**: [https://agri-smart-dashboard.onrender.com](https://agri-smart-dashboard.onrender.com)
- **Repository**: [https://github.com/Giridhar-program/agrishare-hackathon](https://github.com/Giridhar-program/agrishare-hackathon)

---

## 💡 Problem & Solution

### The Challenge
Smallholder farmers in rural regions face severe barriers to modern farming:
- **Prohibitive Machinery Costs**: High capital cost prevents purchase of tractors, harvesters, and drones.
- **Unregulated Rental Markets**: Middlemen inflate rental rates and lack availability guarantees.
- **Limited Agronomic Support**: Timely crop guidance, pest advisories, and mandi price trends are hard to access.

### The AgriShare Solution
AgriShare is a peer-to-peer agricultural equipment sharing and advisory platform that empowers farmers to:
1. **Rent Machinery On-Demand**: Hyper-local leasing with hourly/daily pricing, fuel efficiency tags, and transparent reviews.
2. **Monetize Idle Equipment**: Equipment owners list their machinery with custom availability calendars to generate secondary income.
3. **AI Agronomist Assistant**: An interactive AI advisor powered by Google Gemini delivering real-time advice on crop health, soil treatment, and seasonal preparation.
4. **Market Price Analyzer**: Real-time mandi price trends and predictive crop yield intelligence.
5. **Multilingual & Accessible**: Native multi-language support (English, Hindi, etc.) designed for low-friction onboarding.

---

## ✨ Key Features

- **🚜 Peer-to-Peer Equipment Marketplace**: Filter by category (Tractors, Harvesters, Tillers, Sprayers, Drones), view transparent rates, and rent directly.
- **🤖 Smart AI Farming Assistant**: Chat modal with contextual farm queries, crop diagnostic suggestions, and localized advice.
- **📊 Real-time Dashboard & Metrics**: Track active leases, rental savings, and carbon offset statistics.
- **🔒 Production-Hardened Security**:
  - Sliding-window rate limiting & abuse prevention
  - Resilient API client with exponential backoff & retry mechanism
  - Strict Content Security Policy (CSP) & sanitized inputs
  - Duplicate booking & double-spend transaction safeguards
  - Client-side image compression for low-bandwidth upload optimization
- **📱 Responsive & Mobile-First**: Adaptive Dynamic Island navigation bar and clean glassmorphism UI styled with Tailwind CSS.

---

## 🛠️ Tech Stack

| Domain | Technology |
|---|---|
| **Frontend Framework** | React 18 (Functional Components, Hooks) |
| **Build & Tooling** | Vite 8 + `@vitejs/plugin-react` |
| **Styling & Animations** | Tailwind CSS 3, GSAP (GreenSock), Lucide React Icons |
| **Backend & Database** | Supabase (PostgreSQL, Row-Level Security, Realtime) |
| **AI / LLM Integration** | Google Generative AI (Gemini 1.5 / 2.0 Flash) |
| **Internationalization** | i18next & react-i18next |
| **Data Visualization** | Recharts |
| **Deployment** | Render (Static Web Service with auto-deploy & security headers) |

---

## 🚀 Getting Started Locally

### 1. Clone the Repository
```bash
git clone https://github.com/Giridhar-program/agrishare-hackathon.git
cd agrishare-hackathon
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Copy the template file:
```bash
cp example.env .env.local
```
Edit `.env.local` with your credentials:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_GEMINI_API_KEY=your_google_gemini_api_key
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 5. Build for Production
```bash
npm run build
npm run preview
```

---

## ☁️ Deployment

AgriShare is built as a static Single Page Application (SPA). Detailed hosting guides for Render, Vercel, and Netlify can be found in [`DEPLOYMENT.md`](./DEPLOYMENT.md).

---

## 👥 Hackathon Team & Acknowledgements

Developed with ❤️ for agricultural innovation and rural empowerment.
Feel free to open issues or submit PRs to contribute to AgriShare!
