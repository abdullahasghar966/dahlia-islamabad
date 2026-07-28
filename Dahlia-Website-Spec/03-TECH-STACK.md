# 03 · Tech Stack — the "best of stacks"

Chosen for: SEO for a local business, image-heavy performance, and the animation ceiling the reference sets.

---

## 1. Core

| Concern | Choice | Version target | Why |
|---|---|---|---|
| Framework | **Next.js** (App Router) | 15.x | SSR/ISR for local SEO, image optimization, route handlers, View Transitions |
| Runtime | **React** | 19.x | Latest concurrency, `use`, actions |
| Language | **TypeScript** | 5.x | Typed components + CMS types |
| Styling | **Tailwind CSS** | v4 | Utility system + CSS-var theming for per-section colors |
| Variants | **class-variance-authority**, `clsx`, `tailwind-merge` | latest | Clean component variants |

## 2. Motion (the heart of the project)

| Purpose | Library | Notes |
|---|---|---|
| Smooth inertia scroll | **lenis** (`@studio-freight/lenis` → now `lenis`) | The reference's signature feel; drives ScrollTrigger |
| Scroll & complex timelines | **gsap** + **ScrollTrigger**, **Draggable**, **Flip**, **SplitText**, **Observer** | Kinetic type, draggable showcases, pinned/parallax, color scrub. *SplitText is now free in GSAP 3.13+.* |
| Component micro-motion | **motion** (framer-motion) | Hover, layout, `AnimatePresence`, drawers, page presence |
| Carousels (a11y) | **embla-carousel-react** | Accessible/touch carousel; use GSAP Draggable only where you want the exact Mana drag feel |

## 3. Content & data

| Purpose | Choice | Notes |
|---|---|---|
| Headless CMS | **Sanity** (`sanity`, `next-sanity`, `@sanity/image-url`, `@portabletext/react`) | Menu, plants, gallery, offers, journal; live editing; great DX |
| Images | **next/image** + Sanity CDN (or **Cloudinary**) | `sizes`, blur placeholders, AVIF/WebP |
| Forms | **react-hook-form** + **zod** | Reserve, contact, newsletter |
| Email | **resend** + **react-email** | Serverless send; no server to run |
| Instagram feed | IG **Basic Display API** token, cached to Sanity/edge (avoid rate limits) | Fallback: manual featured grid |

## 4. Ops

| Purpose | Choice |
|---|---|
| Hosting | **Vercel** (edge, image CDN, analytics) |
| Analytics | **@vercel/analytics** + **@vercel/speed-insights** + **GA4** |
| Icons | **lucide-react** or a custom SVG set (leaf/water/light/pet) |
| Fonts | **Fraunces** (display) + **General Sans / Satoshi** (UI) — Fontshare/Google, self-hosted via `next/font` |
| Lint/format | ESLint (next config) + Prettier + `prettier-plugin-tailwindcss` |

## 5. Optional flair (GPU-friendly — see `16-GPU-ANIMATION-NOTES.md`)
- **@react-three/fiber** + **@react-three/drei** for a live 3D leaf/plant hero or a shader gradient.
- **postprocessing** for subtle bloom/grain.
- **View Transitions API** (Next.js `unstable_ViewTransition`) or a Barba-style overlay for page transitions.
- **Recommendation:** ship v1 with pre-rendered/parallax imagery (like Mana). Add R3F on the GPU machine only if it clearly elevates the hero — keep it behind a capability/reduced-motion check so weak devices fall back.

---

## 6. Install (fresh project)

```bash
# scaffold
npx create-next-app@latest dahlia --typescript --tailwind --eslint --app --src-dir=false --import-alias "@/*"
cd dahlia

# motion
npm i lenis gsap motion embla-carousel-react

# content + media
npm i next-sanity @sanity/image-url @portabletext/react
npm i sanity @sanity/vision   # if embedding Studio at /studio

# forms + email
npm i react-hook-form zod @hookform/resolvers resend react-email @react-email/components

# ui helpers
npm i class-variance-authority clsx tailwind-merge lucide-react

# analytics
npm i @vercel/analytics @vercel/speed-insights

# optional 3D
npm i three @react-three/fiber @react-three/drei
```

> Tailwind v4 uses the CSS-first config (`@import "tailwindcss";` + `@theme` in `globals.css`) — no `tailwind.config.js` needed for tokens. Put design tokens there (see `04-DESIGN-SYSTEM.md`).

---

## 7. Environment variables (`.env.local`)

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=xxxx
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=xxxx           # server-only, for drafts/preview
RESEND_API_KEY=xxxx
CONTACT_TO_EMAIL=hello@dahlia.pk
INSTAGRAM_TOKEN=xxxx                  # or run a cache job
NEXT_PUBLIC_GA_ID=G-XXXXXXX
NEXT_PUBLIC_SITE_URL=https://dahlia.pk
```

---

## 8. Why not Shopify (like the reference)?
Mana sells packaged cans → Shopify makes sense. Dahlia earns from **dine-in + nursery + foodpanda**. A headless **Next.js + Sanity** build gives full control of the animation-heavy experience, costs little, and keeps a clean seam to add a **Shopify Storefront API** (or Medusa) nursery shop later without a rebuild.

## 9. Node & tooling
- Node ≥ 20 LTS. Package manager: `npm` or `pnpm` (pnpm recommended for speed on the GPU laptop).
- Commit hooks optional (husky + lint-staged).
