# 13 · SEO · Performance · Accessibility · Launch

A local business lives or dies on local search + mobile speed. Don't skip this.

---

## 1. SEO

### Metadata
- Per-route `generateMetadata`: unique title + description + OG/Twitter image.
- Titles like `Menu — DAHLIA Islamabad (Café + Nursery)`.
- `metadataBase`, canonical URLs, `sitemap.ts`, `robots.ts`.

### Local business JSON-LD (home + /visit)
```jsonc
{
  "@context":"https://schema.org",
  "@type":["Restaurant","Store"],
  "name":"DAHLIA Islamabad — Nursery + Café",
  "servesCuisine":["Café","Brunch","Pizza"],
  "telephone":"+92-327-5000969",
  "address":{"@type":"PostalAddress","streetAddress":"1 Agha Khan Rd, F-6 Markaz","addressLocality":"Islamabad","addressCountry":"PK"},
  "geo":{"@type":"GeoCoordinates","latitude":"<lat>","longitude":"<lng>"},
  "openingHoursSpecification":[ /* from siteSettings.hours */ ],
  "priceRange":"Rs 2000–3000",
  "image":["<og>"],
  "sameAs":["https://www.instagram.com/dahliaislamabad/"],
  "url":"https://dahlia.pk"
}
```
Add `Menu`/`MenuItem` schema on `/menu` and `Product` schema on plant detail if selling.

### Extras
- Register/point to **Google Business Profile**.
- Semantic HTML (`main`, `nav`, `section`, `h1..h3` hierarchy — one H1/page).
- Descriptive `alt` on every image (from CMS).
- OpenGraph images per key page.

---

## 2. Performance (Core Web Vitals)

- **Images:** `next/image` everywhere, correct `sizes`, `priority` on the hero only, AVIF/WebP, **blur placeholders** (Sanity `lqip`). Never ship raw multi-MB photos.
- **Fonts:** self-host variable `.woff2`, `display: swap`, preload only the display cut used above the fold; subset if possible.
- **JS:** import GSAP plugins individually; `next/dynamic` for Instagram/Aesthetic/heavy motion; avoid shipping Studio to the client bundle.
- **Motion:** animate only `transform`/`opacity`; `content-visibility: auto` on below-fold sections; pause offscreen animation.
- **Caching:** ISR (`revalidate`) on data pages; edge cache the IG route.
- **Targets:** LCP < 2.5s (mobile), CLS < 0.1, INP < 200ms. Lighthouse ≥ 90 all categories. Test on a mid-range Android on 4G — that's the real audience.

---

## 3. Accessibility (WCAG AA)

- **Reduced motion:** honor `prefers-reduced-motion` on *every* animation (see file 07 §14).
- **Contrast:** AA (4.5:1 text) on every section theme — re-check `cream` on `terracotta`/`forest`/`dahlia` and `ink` on `moss`/`blush`.
- **Keyboard:** all draggables/carousels have button + arrow-key control; visible `focus-visible` rings; logical tab order; `Esc` closes overlays; focus trapped in drawers/modals; focus returns on close.
- **Screen readers:** semantic landmarks, `aria-label` on icon buttons, `alt` text, marquees `aria-hidden` if decorative + pausable, route-change announcements for client transitions.
- **Targets:** 44×44px min touch; forms have labels + error text tied via `aria-describedby`.
- **Custom cursor:** never the only affordance; keep focus states strong.
- **Easter egg:** non-essential, keyboard-triggerable, skipped in reduced-motion.

---

## 4. Privacy & consent
- Cookie/consent banner defaults to **decline non-essential**; load GA4/pixels only after consent.
- No personal data in URLs; forms POST to server routes; validate with zod; rate-limit reserve/contact.
- Privacy page; clear data handling for reservations/newsletter.

---

## 5. Launch checklist
- [ ] All routes render; 404/500 styled.
- [ ] Lighthouse ≥ 90 (Perf/A11y/Best-practices/SEO) on mobile.
- [ ] Reduced-motion pass; keyboard-only pass; screen-reader smoke test.
- [ ] Real content in CMS (or clearly-flagged placeholders); prices correct.
- [ ] JSON-LD validates (Rich Results Test).
- [ ] `sitemap.xml` + `robots.txt` live; canonical tags correct.
- [ ] OG images preview correctly (share test).
- [ ] Forms deliver email (Resend) + show success/error.
- [ ] Instagram feed loads or gracefully falls back.
- [ ] Analytics firing after consent.
- [ ] Domain + HTTPS + `www` redirect on Vercel.
- [ ] Cross-browser (Chrome/Safari/Firefox) + iOS Safari smooth-scroll check.
- [ ] Owner can edit menu/plants/gallery in Studio.
