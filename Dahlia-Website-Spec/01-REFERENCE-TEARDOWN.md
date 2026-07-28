# 01 · Reference Teardown — Mana Yerba Mate
### https://en.manayerbamate.com — analyzed live from the DOM/CSS

This is what we are matching in **craft** (not content). Everything below was read directly off the running site.

---

## 1. Platform & technology (observed)

| Layer | Finding |
|---|---|
| Platform | **Shopify** (theme assets `app.css`, `global.js`; `window.Shopify` present) |
| i18n | **Weglot** (`weglot.min.js`) — FR default, EN mirror at `en.` subdomain |
| Subscriptions | **ReCharge** widget (`rechargecdn.com`) |
| Marketing | Meta Pixel, Google Tag Manager, GA4, Leadfox, EcomSend popups |
| Animation libs | Not exposed on `window` (bundled in theme). `animate.css` is loaded. Behavior = **Lenis smooth scroll + GSAP ScrollTrigger/Draggable**. |
| 3D | **Pre-rendered images**, not live WebGL. `canvasCount = 0`, `videoCount = 0`. Credits name a 3D artist (Jeff Clermont) — the cans were modeled, then exported as image assets. |
| Media weight | ~**102 `<img>`** on the homepage; product thumbs are `*_340x280_crop_center.jpg`; decorative `etoile.svg` (stars) reused. |
| Font | **PP Neue Montreal** ("Neue Montreal 2020") — the only family. |

**Lesson for us:** you do **not** need WebGL to get this feel. Pre-rendered/parallax imagery + Lenis + GSAP is enough. (We keep the option open for a live 3D hero on the GPU laptop — see `16-GPU-ANIMATION-NOTES.md`.)

---

## 2. Exact color palette (sampled from computed styles)

| Role | Hex | RGB |
|---|---|---|
| Canvas / page background | `#FEF7E6` | 254,247,230 (cream) |
| Ink / body text | `#0E0E0E` | 14,14,14 |
| Flavor — green (light) | `#ACD084` | 172,208,132 |
| Flavor — green (deep) | `#195E1C` | 25,94,28 |
| Flavor — coral | `#F15B40` | 241,91,64 |
| Flavor — navy | `#2B3D73` | 43,61,115 |
| Flavor — magenta | `#E72F63` | 231,47,99 |
| Flavor — yellow | `#FFD372` | 255,211,114 |
| Flavor — sky | `#88C1F8` | 136,193,248 |
| Flavor — blush | `#F6B1CF` | 246,177,207 |

**The mechanic:** every flavor owns a color. As you scroll into a flavor's zone, the **entire section background becomes that color**. This color-blocking is the site's rhythm. We copy the mechanic with a botanical palette (see `04-DESIGN-SYSTEM.md`).

---

## 3. Typography

- **One** typeface (PP Neue Montreal), three weights: **300 / 400 / 700**.
- **Extreme size contrast** is the entire personality:
  - Word **"FLAVORS"** renders at **≈297px**.
  - Section statements ≈**72px**, weight **300**, **UPPERCASE**.
  - Body ≈**25px**.
- Uppercase + light weight for big statements; regular for body; bold (700) only for the small hero label.

**Takeaway:** go big or go home. A single family with huge display sizes reads as confident and modern. We swap to Fraunces (display) + General Sans (UI) for a warmer, botanical register.

---

## 4. Section-by-section anatomy (top → bottom)

### 4.1 Announcement bar
- Thin sticky bar: *"Free shipping on all purchases of $35 or more — Quebec and Ontario."*
- Plus a **marquee wordmark** ("Yerba Mate") scrolling.

### 4.2 Header / navigation
- **Left:** `Shop`, `Learn` (button → dropdown of flavors).
- **Center:** logo, links home.
- **Right:** language toggle (EN/FR), account, **cart** (opens drawer).
- **Mobile:** slide-in panel; "Flavours" expands to the 5 products; language + social links at the bottom.

### 4.3 Hero
- Full-bleed cream stage.
- A **draggable / prev-next showcase** cycling the four flavor cans (Grapefruit, Blackberry & Hibiscus, Tropical, Melon & Mint) as pre-rendered images.
- Big headline; the whole thing invites touch/drag.

### 4.4 "MANA? YERBA MATÉ? — What are we talking about"
- Cheeky intro line: *"(we're going to tell each other the real things)."*
- **Four benefit pillars**, each a punchy title + one witty line:
  - **Without the crash** — "A gentle wave of energy. To get you going without the crash."
  - **Natural caffeine** — "This certified organic caffeine comes from the plant. A gift from Mother Nature."
  - **Antioxidant** — "Richer in antioxidants than tea. Not bad."
  - **Vegan** — "A plant-based drink that tastes like heaven. Who could ask for more?"

### 4.5 "FLAVORS" — kinetic type band
- The giant ~297px word. Sub: *"Fresh, fruity, sparkling, beautiful colours, awaken your taste buds."*
- Color-drenched; the word reacts to scroll.

### 4.6 Recommended products
- Heading "Recommended products" + "See all our products".
- A **horizontal draggable carousel** with prev/next buttons.
- Each card: product image, name, **"Discover this product"**, and a **quick-add** button. Cards themed to the flavor color; hover lifts and swaps imagery.

### 4.7 Subscription CTA
- *"Sign up for automatic delivery and save 10%."* → **Subscribe**.
- Big playful statement: **"WE HAVE WHAT YOU NEED"**, with the aside *"We don't deliver in space yet, but who knows…"* (This wit is a brand signature — copy the *energy*, not the words.)

### 4.8 Instagram
- **"@manayerbamate — For a dose of energy in your feed."**
- A grid linking to Instagram.

### 4.9 Footer
- Socials (FB, LinkedIn, IG), copyright, legal (Terms, Refund policy).
- A **playful easter egg**: **"Press Space to jump"** + a "Jump key" — a tiny in-page jumping-character mini-game.
- A **Credits** panel (opens a modal) crediting **design / front-end / back-end / illustrations / 3D** with names + links. (A classy touch used by studio-grade sites.)

---

## 5. Motion & interaction inventory (the checklist to replicate)

- [ ] **Lenis** smooth/inertia scroll site-wide.
- [ ] Infinite **marquee** ticker(s), pause on hover.
- [ ] **Draggable** hero + product carousels with momentum/inertia + prev/next.
- [ ] **Scroll-triggered reveals**: staggered fade-up, clip/mask reveals, line-by-line text reveals.
- [ ] **Oversized kinetic type** reacting to scroll (parallax / horizontal drift / scrub).
- [ ] **Per-section background color transitions** tied to scroll position.
- [ ] Product cards: hover **lift + image-swap + quick-view/quick-add**.
- [ ] **Cart/side drawer** slide-in (for us: a Reserve drawer).
- [ ] **Cookie/consent** banner (privacy-first).
- [ ] **Credits** modal.
- [ ] A **playful easter egg** that rewards exploration.
- [ ] Everything respects **`prefers-reduced-motion`**.

Detailed implementation of each is in `07-ANIMATION-INTERACTION.md`.

---

## 6. What we deliberately change for Dahlia
- **Platform:** Next.js + Sanity (not Shopify) — Dahlia is dine-in + nursery + foodpanda, not packaged e-commerce.
- **Palette:** botanical, not candy.
- **Type:** editorial serif + grotesque, not a single grotesque.
- **Content units:** dishes + plants instead of drink cans.
- **Commerce:** ordering via foodpanda/WhatsApp/call in Phase 1; optional headless shop for the nursery in Phase 2.
