# AgriShare — Deployment Guide

A **static Vite + React** app. No server required.  
Build output: `dist/` — upload this folder to any static host.

---

## 🚀 Option 1 — Vercel (Recommended, fastest)

### One-click deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Giridhar-program/agri-smart-dashboard)

### Manual steps
1. Go to [vercel.com](https://vercel.com) → **New Project** → Import from GitHub
2. Select `agri-smart-dashboard`
3. Framework: **Vite** (auto-detected)
4. Build command: `npm run build`  
   Output directory: `dist`
5. **Environment Variables** → Add:
   | Key | Value |
   |-----|-------|
   | `VITE_SUPABASE_URL` | `https://xxxx.supabase.co` |
   | `VITE_SUPABASE_ANON_KEY` | your anon key |
   | `VITE_GEMINI_API_KEY` | your Gemini key |
   | `VITE_LOG_WEBHOOK_URL` | *(optional)* webhook for error logs |
6. Click **Deploy** ✅

> `vercel.json` in the repo handles SPA routing and security headers automatically.

---

## 🚀 Option 2 — Render

1. Go to [render.com](https://render.com) → **New** → **Static Site**
2. Connect your GitHub repo
3. Settings:
   | Field | Value |
   |-------|-------|
   | Build Command | `npm run build` |
   | Publish Directory | `dist` |
4. **Environment** tab → Add the same 3 env vars as above
5. Click **Create Static Site** ✅

> `render.yaml` in the repo can also auto-configure everything via **Blueprint** (Render Dashboard → New → Blueprint).

---

## 🚀 Option 3 — Netlify

### One-click deploy
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/Giridhar-program/agri-smart-dashboard)

### Manual steps
1. Go to [netlify.com](https://netlify.com) → **Add new site** → **Import from Git**
2. Pick your repo
3. Build settings are auto-detected from `netlify.toml`
4. **Site configuration** → **Environment variables** → Add the 3 vars
5. **Deploy site** ✅

---

## 🔑 Required Environment Variables

| Variable | Where to get it |
|----------|----------------|
| `VITE_SUPABASE_URL` | Supabase Dashboard → Project Settings → API |
| `VITE_SUPABASE_ANON_KEY` | Same page as above |
| `VITE_GEMINI_API_KEY` | [Google AI Studio](https://aistudio.google.com/app/apikey) |
| `VITE_LOG_WEBHOOK_URL` | Optional — any POST endpoint for error logs |

> ⚠️ All `VITE_` variables are **bundled into the JS** and visible to users in DevTools.  
> Never put secret server-side keys here.

---

## 🗄️ Supabase Setup (one-time)

1. Create a project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** → run `supabase/schema.sql` to create the table, RLS policies, and indexes
3. Go to **Storage** → create a bucket named `equipment-images` → set **Public**
4. Copy your Project URL and anon key into the env vars above

---

## 🏗️ Local Development

```bash
# 1. Clone
git clone https://github.com/Giridhar-program/agri-smart-dashboard.git
cd agri-smart-dashboard

# 2. Install
npm install

# 3. Configure env
cp .env.example .env.local
# Fill in your keys in .env.local

# 4. Start
npm run dev
# → http://localhost:5173
```

---

## 📦 Build & Preview Locally

```bash
npm run build      # outputs to dist/
npm run preview    # serves dist/ at http://localhost:4173
```
