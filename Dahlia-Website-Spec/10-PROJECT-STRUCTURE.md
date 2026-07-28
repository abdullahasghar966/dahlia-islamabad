# 10 · Project Structure

```
dahlia/
├─ app/
│  ├─ (site)/
│  │  ├─ layout.tsx            # Lenis + Cursor + Header + Footer + Drawers + CookieBanner
│  │  ├─ page.tsx              # HOME (sections S0–S11)
│  │  ├─ menu/page.tsx
│  │  ├─ nursery/page.tsx
│  │  ├─ nursery/[slug]/page.tsx
│  │  ├─ story/page.tsx
│  │  ├─ aesthetic/page.tsx
│  │  ├─ visit/page.tsx
│  │  ├─ journal/page.tsx      # optional
│  │  └─ journal/[slug]/page.tsx
│  ├─ legal/privacy/page.tsx
│  ├─ legal/cafe-policy/page.tsx
│  ├─ studio/[[...tool]]/page.tsx   # embedded Sanity Studio (optional)
│  ├─ api/
│  │  ├─ reserve/route.ts      # POST → Resend
│  │  ├─ contact/route.ts      # POST → Resend
│  │  ├─ subscribe/route.ts    # POST → newsletter (double opt-in)
│  │  └─ instagram/route.ts    # cached IG fetch (optional)
│  ├─ sitemap.ts
│  ├─ robots.ts
│  ├─ globals.css              # @theme tokens, fonts, base, textures
│  ├─ not-found.tsx
│  └─ error.tsx
├─ components/
│  ├─ layout/    Header NavOverlay Footer ReserveDrawer CookieBanner Cursor SkipLink
│  ├─ motion/    LenisProvider Reveal SplitHeading Marquee Magnetic SectionTheme Parallax Counter PageTransition
│  ├─ sections/  Hero DraggableShowcase Pillars PillarCard KineticBand SignatureCarousel
│  │            NurseryHighlight AestheticStrip OffersCTA InstagramFeed IgTile Preloader SeedlingEasterEgg
│  ├─ menu/      MenuList CategoryTabs DishCard
│  ├─ nursery/   PlantGrid PlantCard PlantFilters CareBadges PlantDetail
│  └─ ui/        Button Pill Field Input Select Drawer Lightbox Section Eyebrow MapEmbed HoursTable SocialLinks
├─ lib/
│  ├─ sanity.client.ts  sanity.image.ts  queries.ts  types.ts
│  ├─ resend.ts         gsap-setup.ts    utils.ts     seo.ts
│  └─ instagram.ts
├─ sanity/
│  ├─ schemas/          (all documents from file 08)
│  ├─ structure.ts      (desk structure, singletons)
│  └─ sanity.config.ts
├─ public/
│  ├─ fonts/            (Fraunces + General Sans .woff2)
│  ├─ textures/         (grain.png, paper.svg)
│  ├─ illustrations/    (leaf, sprig, dahlia, pillar icons, seedling)
│  ├─ images/           (placeholder food/plant/interior until CMS)
│  └─ favicon set, og-default.jpg
├─ .env.local  .env.example
├─ next.config.ts       (image domains: cdn.sanity.io, scontent IG, cloudinary)
├─ tsconfig.json  eslint  prettier
└─ package.json
```

---

## Key files explained

**`app/(site)/layout.tsx`** — the frame. Order matters:
```tsx
<LenisProvider>
  <Cursor />
  <SkipLink />
  <Header />
  <main id="content">{children}</main>
  <Footer />
  <ReserveDrawer />
  <CookieBanner />
</LenisProvider>
```

**`app/globals.css`** — Tailwind v4 `@import "tailwindcss";`, `@theme { --color-* ... --fs-* ... }`, `@font-face`/next-font wiring, base element styles, the grain texture, and the `:root { --page-bg; --page-fg; }` that the color cross-fade animates.

**`lib/gsap-setup.ts`** — `gsap.registerPlugin(ScrollTrigger, Draggable, Flip, SplitText, InertiaPlugin, Observer)` once; export configured helpers.

**`next.config.ts`** — `images.remotePatterns` for `cdn.sanity.io`, Instagram CDN, Cloudinary; enable View Transitions if used.

**Data fetching** — pages are Server Components fetching via GROQ with `export const revalidate = 300` (ISR). Client sections receive data as props; only motion/interaction is client-side.

---

## Rendering strategy
- **Home / Menu / Nursery / Visit:** ISR (revalidate ~5 min) — fast + fresh.
- **Plant / Journal detail:** `generateStaticParams` + ISR.
- **API routes:** Node runtime for Resend; edge for the IG cache if desired.
- **Studio:** client-only route, excluded from sitemap.
