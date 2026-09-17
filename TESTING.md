# AgriShare — Testing & Resilience Guide

## 1. Simultaneous Users

### Goal
Verify no race conditions, data corruption, or UI breakage under concurrent load.

### Manual Protocol (5-tab test)
1. Open **5 browser tabs** all pointing to `http://localhost:5173`
2. In tabs 1–3: navigate to **Equipment Listings** and trigger a search simultaneously
3. In tabs 4–5: open the **AI Assistant** and fire messages simultaneously
4. **Expected**: each tab shows its own independent results; no shared state bleed

### What to watch for
- [ ] Each tab's search results are independent
- [ ] AI rate limiter fires correctly per-tab (sessionStorage is tab-scoped)
- [ ] No duplicate equipment inserts if "Add Equipment" is clicked simultaneously
- [ ] Network tab shows request deduplication working (only 1 Supabase call fires even if 2 tabs request same data)

---

## 2. Rate Limit Behaviour

### AI Chat Rate Limiter
| Test | Steps | Expected Result |
|------|-------|----------------|
| Throttle (3s) | Send a message, immediately send another | Second message blocked: "Please wait N seconds…" |
| Per-minute cap | Send 5 messages within 60 seconds | 6th message blocked: "You're sending messages too quickly…" |
| Session cap | Send 20 messages across the session | 21st blocked: "You've reached the limit of 20 AI messages…" |

### Equipment Submission De-dupe
| Test | Steps | Expected Result |
|------|-------|----------------|
| Dupe rental request | Click "Confirm & Request Rental", then immediately click again | Duplicate guard fires: "You already submitted a request…" |
| Dupe equipment add | Add equipment with same name+owner as an existing row | Warning dialog: "Possible duplicate listing" |

---

## 3. Error & Loading States

| Scenario | How to trigger | Expected UI |
|----------|---------------|-------------|
| Supabase offline | Disconnect Wi-Fi, load Equipment page | Red error banner with Retry button + fallback data shown |
| Search no results | Search for "zzznoresults999" | Illustrated empty state with "Clear Filters" button |
| AI timeout | Use browser DevTools → throttle network to "Offline" | "The AI assistant took too long…" message in chat |
| Image too large | Upload a >2MB image in AddEquipmentModal | Warning shown, compression applied before upload |
| Health banner | Set VITE_SUPABASE_URL to an invalid URL | Amber banner appears at top: "Equipment listings may be unavailable…" |

---

## 4. Backup & Restore (Supabase)

### Export (Backup)
```bash
# Option A — Supabase CLI
supabase db dump -f backup_$(date +%Y%m%d).sql

# Option B — Dashboard
# Supabase Dashboard → Settings → Database → Backups → Download
```

### Restore
```bash
# Restore to local dev Supabase instance
supabase db reset
psql -h localhost -p 54322 -U postgres -d postgres -f backup_20240917.sql
```

### What to verify after restore
- [ ] `equipment_lease` table has expected row count
- [ ] RLS policies are intact (`SELECT * FROM pg_policies WHERE tablename = 'equipment_lease'`)
- [ ] Indexes are intact (`SELECT indexname FROM pg_indexes WHERE tablename = 'equipment_lease'`)
- [ ] Storage bucket `equipment-images` files are accessible

---

## 5. API Limits & Spending Caps

### Google Gemini
- Free tier: 15 requests/min, 1M tokens/day
- Client-side rate limiter: **5 calls/min per session**, **20 total per session**
- For production: set a **budget alert** in Google Cloud Console → Billing

### Supabase
- Free tier: 500MB DB, 1GB storage, 2GB bandwidth
- Monitor usage: Dashboard → Reports → API usage
- Set **project pause** threshold: Settings → General → Pausing

---

## 6. Performance Checklist

- [ ] Equipment list loads in < 2s on 4G (use DevTools Network → Slow 4G)
- [ ] "Load More" appends rows without full-page re-render
- [ ] Skeleton loader shows within 100ms of navigation
- [ ] Images are lazy-loaded (check `loading="lazy"` attribute in DOM)
- [ ] Build bundle < 1MB gzipped (check `dist/` after `npm run build`)
