# 14 · Build Roadmap — Phases

Estimates assume one focused builder (Opus 5) on the GPU laptop. Ship the homepage first — it proves the whole system.

---

## Phase 0 — Foundations  (½–1 day)
**Goal:** a running shell with the design system wired.
- [ ] Scaffold Next.js 15 + TS + Tailwind v4 (`create-next-app`).
- [ ] Install deps (see `03-TECH-STACK.md §6`).
- [ ] `globals.css`: `@theme` tokens (colors, `--fs-*`, spacing), grain texture, `:root { --page-bg; --page-fg }`.
- [ ] Fonts: self-host Fraunces + General Sans via `next/font`.
- [ ] `LenisProvider` + `gsap-setup.ts` (register plugins).
- [ ] `app/(site)/layout.tsx` frame (Header/Footer stubs, Cursor, SkipLink).
- [ ] `Button`, `Section`, `Eyebrow`, `Reveal`, `Marquee`, `Magnetic` primitives.
**Done when:** dev server runs, smooth scroll works, tokens/fonts render, a test Reveal animates and respects reduced-motion.

## Phase 1 — Home showpiece  (2–3 days)  ← the "wow"
**Goal:** the full homepage with complete motion.
- [ ] S2 Header (scroll behavior, magnetic, mobile overlay) + S11 Footer.
- [ ] S3 Hero + `DraggableShowcase` (parallax, inertia, SplitText H1).
- [ ] S4 Pillars (batched stagger + icon hovers).
- [ ] S6 Signature carousel (Embla/Draggable, hover zoom).
- [ ] S7 Nursery highlight (sticky + parallax + care badges).
- [ ] S5 Kinetic band + **section color cross-fade** controller.
- [ ] S1 Marquee, S8 Aesthetic strip (+ lightbox), S9 Offers CTA, S10 Instagram (placeholder feed).
- [ ] S0 Preloader + S11 Seedling easter egg.
- [ ] Reduced-motion + mobile pass on the whole page.
**Done when:** homepage matches the section spec, scrolls buttery, color-journeys correctly, works on mobile + keyboard + reduced-motion.

## Phase 2 — Content pages  (1–2 days)
- [ ] `/menu` (sticky category tabs, dish grid, specials, order bar).
- [ ] `/nursery` (filters, plant grid) + `/nursery/[slug]` (gallery, care, ask).
- [ ] `/visit` (hours table, map, reserve form UI).
- [ ] `/story` (editorial), `/aesthetic` (gallery), legal pages.
**Done when:** all routes exist, share the nav/chrome, and use the same motion language at lower intensity.

## Phase 3 — CMS wiring  (1 day)
- [ ] Sanity schemas (file 08) + Studio at `/studio` + desk structure.
- [ ] GROQ queries; swap hard-coded content for CMS fetches (ISR).
- [ ] Seed real menu/plants/gallery/settings.
**Done when:** owner can edit menu/plants/gallery/hours and the site updates.

## Phase 4 — Forms & live data  (½ day)
- [ ] `/api/reserve`, `/api/contact`, `/api/subscribe` via Resend (+ zod, rate-limit).
- [ ] Reserve drawer + Visit form wired; success/error states.
- [ ] Instagram feed (cached) or curated fallback.
**Done when:** a reservation/contact/newsletter submit sends email and confirms.

## Phase 5 — Polish & ship  (1 day)
- [ ] JSON-LD, metadata, sitemap/robots, OG images.
- [ ] Lighthouse ≥ 90 mobile; a11y + keyboard + reduced-motion pass.
- [ ] Page transitions (View Transitions/overlay).
- [ ] Deploy to Vercel + domain + analytics after consent.
- [ ] `PLACEHOLDERS.md` listing anything awaiting real assets.
**Done when:** live, fast, accessible, editable, and the owner has signed off.

---

## Optional Phase 6 — elevate (GPU-friendly)
- [ ] Live 3D hero (R3F) or shader gradient background — behind a capability/reduced-motion check.
- [ ] Headless nursery commerce (Shopify Storefront API / Medusa).
- [ ] Journal/blog + events.
- [ ] Urdu localization.

---

## Definition of done (whole project)
Smooth (Lenis), colorful (section color-journey), oversized (Fraunces kinetic type), playful (easter egg + wit), botanical, **AA-accessible**, **mobile-first**, **fast**, and **owner-editable** — matching the craft of the reference while being unmistakably Dahlia.
