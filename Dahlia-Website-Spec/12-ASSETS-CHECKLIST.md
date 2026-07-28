# 12 · Assets & Data Checklist

What to gather from the owner (and what Opus 5 can placeholder in the meantime).

---

## 1. Brand assets (from owner)
- [ ] **Logo / wordmark** — SVG preferred (light + dark). If none, Opus 5 can set the DAHLIA wordmark in Fraunces as a temporary lockup.
- [ ] **Favicon** — source PNG/SVG for the full favicon set + `og-default.jpg` (1200×630).
- [ ] Brand color confirmation (the palette in `04-DESIGN-SYSTEM.md` is a proposal — adjust to any existing brand green/pink).

## 2. Photography (the make-or-break asset)
- [ ] **Hero subjects:** 1–2 signature dishes (ideally on transparent/clean plate), a signature plant, an interior wide shot.
- [ ] **Menu photos:** one clean shot per signature dish (Lotus French Toast, Whipped Ricotta Pizza, Dirty Fries, Beiruti Hummus, Bang Bang Prawns, Seoul Beef Bowl, etc.). *Names/prices are already verified in `02b`; only photos are outstanding.*
- [ ] **Nursery photos:** per plant, on a clean or greenhouse background; plus lifestyle shelf shots.
- [ ] **"Aesthetic" set:** 10–15 of their best interior/ambience/golden-hour shots (the reels stills work well).
- [ ] **Team candids** for `/story` (optional).
> Source: shoot fresh, or export the highest-quality frames from their Instagram **with permission**. Deliver as high-res JPG/PNG; the build will optimize (AVIF/WebP, blur placeholders).

## 3. Copy & data
- [ ] **Exact per-day hours** (confirm Mon–Sun open/close).
- [x] **Menu** with categories + prices (PKR) — ✅ VERIFIED in `02b` (owner to confirm any recent changes only).
- [ ] **Nursery inventory** with names, botanical names, prices, care levels, stock.
- [ ] **Address confirmation** + **Google Maps** place link & embed URL.
- [ ] **Phone / WhatsApp** number(s), **foodpanda** store URL.
- [ ] **Café policy** text (from their IG highlight) for `/legal/cafe-policy`.
- [ ] A few **testimonials** (Google/Tripadvisor) for the social-proof strip.
- [ ] Confirm **follower count** for the counter (currently ~16.7K).

## 4. Accounts / tokens (from owner)
- [ ] **Sanity** project (create; get projectId + tokens).
- [ ] **Resend** API key + a verified sending domain/email.
- [ ] **Instagram** Basic Display token (or agree to a manual featured grid instead).
- [ ] **GA4** measurement ID.
- [ ] **Vercel** account + **domain** (dahlia.pk or similar) DNS access.

## 5. Illustrations / icons (Opus 5 can generate as SVG)
- [ ] Four **pillar icons/spots** (plate/fork, leaf/plant, table/people, sparkle/heart).
- [ ] **Care badge icons** (light: low/bright-indirect/full-sun; water: low/med/high; pet-friendly).
- [ ] Decorative **botanical sprigs / leaves / dahlia bloom** SVGs for accents.
- [ ] The **seedling** for the footer easter egg.
- [ ] **Grain/paper texture** (subtle) for the canvas.

## 6. Fonts (free — Opus 5 self-hosts)
- [ ] **Fraunces** (variable) — Google Fonts / GitHub.
- [ ] **General Sans** or **Satoshi** — Fontshare.
- Place `.woff2` in `public/fonts/`, load via `next/font/local`.

---

## Placeholder strategy (so the build never blocks)
Until real assets arrive, Opus 5 should:
- Use tasteful **placeholder imagery** (solid color blocks with the dish/plant name, or free botanical/food stock) sized to final dimensions.
- Seed CMS with the **real names, categories AND real prices** from `02b-VERIFIED-MENU-POLICY-DISCOUNTS.md` (ready-to-import JSON in `08 §6`). Only *photos* are placeholder — never the menu data.
- Keep every image behind `next/image` with correct `sizes` so swapping in real photos needs **no layout change**.
- Mark all placeholders with a `// TODO: real asset` comment and list them in a `PLACEHOLDERS.md`.
