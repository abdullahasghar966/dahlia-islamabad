# 06 · Homepage — Section by Section (the showpiece)

This is the core deliverable. Build the home page first; it demonstrates the whole system.

Each section lists: **Purpose · Layout · Content · Motion · Component**. Motion details/code are in `07-ANIMATION-INTERACTION.md`. Sections top → bottom.

---

## S0 · Preloader (optional, tasteful)
- **Purpose:** set the tone; hide first-paint jank.
- **Layout:** centered DAHLIA wordmark on `bone`; a thin leaf/sprig draws on, or a progress line fills.
- **Motion:** mask-wipe up to reveal the hero; total ≤ 1.2s. **Skip on repeat visits** (sessionStorage). Reduced-motion → instant.
- **Component:** `<Preloader/>`.

---

## S1 · Announcement marquee
- **Purpose:** freshness + key info.
- **Layout:** thin full-width bar, `forest` on `bone` (or reversed).
- **Content:** *"Now growing in F-6 Islamabad · Café + Nursery · Walk-ins welcome · Weekend brunch from 10am · ☎ 0327 5000969"* (from CMS `siteSettings.announcement`).
- **Motion:** seamless infinite **marquee**; pause on hover; respects reduced-motion (static).
- **Component:** `<Marquee/>`.

---

## S2 · Header / navigation
- **Purpose:** wayfinding + reserve.
- **Layout:** left links / center wordmark / right `Visit` + `Reserve`. Transparent over hero, gains a `cream` blur background on scroll.
- **Motion:** hide-on-scroll-down / show-on-scroll-up; **magnetic** logo + Reserve button; hover **underline draw**. Mobile: animated hamburger → full-screen overlay with **staggered** link reveal + background leaf art.
- **Component:** `<Header/>`, `<NavOverlay/>`, `<Magnetic/>`.

---

## S3 · Hero
- **Purpose:** the identity hit — "café + nursery" in one breath.
- **Layout:** full viewport, `bone`. Big Fraunces headline left/center; a **draggable showcase** of hero subjects (a signature dish, a signature plant, an interior) as pre-rendered/parallax images; hours + address sub-line; two CTAs.
- **Content:**
  - H1: **"Home to a café & a plant nursery."**
  - Sub: "F-6 Markaz, Islamabad · Open till 11pm"
  - CTAs: **See the menu** → `/menu` · **Reserve a table** → drawer
  - Prev/next controls on the showcase.
- **Motion:** parallax layers (leaves/steam) on scroll & pointer; **GSAP Draggable + inertia** on the showcase with snap; subtle **idle float** on the hero object; headline **SplitText** line-reveal on load; scroll-cue bounce.
- **Component:** `<Hero/>`, `<DraggableShowcase/>`.

---

## S4 · Four pillars — "What is Dahlia?"
- **Purpose:** explain the concept fast (Mana's benefit row).
- **Layout:** 4-up row (2×2 on mobile) on `bone`, each a card with a spot-illustration/icon + title + one witty line.
- **Content:** **Eat well · Grow green · Gather · Feel good** (copy in `02-BRAND-DAHLIA.md §5`).
- **Motion:** staggered **fade-up** on enter (ScrollTrigger.batch); icon **micro-animation** on hover (leaf sway / cup steam); numbers/labels tick in.
- **Component:** `<Pillars/>`, `<PillarCard/>`, `<Reveal/>`.

---

## S5 · Kinetic type band
- **Purpose:** the "wow" — Mana's 297px "FLAVORS" moment.
- **Layout:** full-bleed color block; one oversized word (cycles **GATHER / GROW / GOOD DAYS**) spanning the viewport.
- **Motion:** word drifts horizontally, **scroll-scrubbed**; per-letter parallax; the page background **cross-fades** into this block's color and out. A secondary line (SplitText) reveals beneath.
- **Component:** `<KineticBand/>`, `<SplitHeading/>`, `<SectionTheme/>`.

---

## S6 · Signature menu carousel
- **Purpose:** make the food irresistible; funnel to `/menu`.
- **Layout:** heading "Straight from the pass" + "View full menu"; a **horizontal draggable** row of dish cards. Section bg → **terracotta/clay**.
- **Content (seed — real signatures from `02b`):** Lotus French Toast (Rs 1545, house special) · Whipped Ricotta Pizza (Rs 2295) · Dirty Fries (Rs 1325) · Beiruti Hummus (Rs 1145) · Bang Bang Prawns (Rs 2095) · Seoul Beef Bowl (Rs 2295). Each card: photo, name, one-line, price (`Rs 2,295`), per-dish **color wash**, badge (new/veg/signature/house-special).
- **Motion:** **Embla** or **GSAP Draggable** with momentum; prev/next wired to both; hover **lift + image zoom**; drag cursor ("drag" label); magnetic "View full menu".
- **Component:** `<SignatureCarousel/>`, `<DishCard/>`.

---

## S7 · Nursery highlight
- **Purpose:** show the other half — plants.
- **Layout:** split editorial. Sticky copy column ("Bring the outside in.") while a column of plant photos scrolls; a mini 3–4 plant grid with care icons. CTA **Explore the nursery** → `/nursery`. Section bg → **forest/moss**.
- **Motion:** **parallax** image columns; **sticky pin** on the text; hover reveals **care badges** (light/water); plant images **clip-reveal** on enter.
- **Component:** `<NurseryHighlight/>`, `<PlantCard/>`, `<CareBadges/>`.

---

## S8 · The "Aesthetic" strip
- **Purpose:** sell the vibe (their reels-worthy interiors).
- **Layout:** full-bleed **two-row marquee** of ambience photos moving in opposite directions; click → lightbox. Section bg → **blush**.
- **Motion:** dual-direction **marquee**; hover slightly enlarges + desaturates neighbors; **lightbox** with shared-element transition.
- **Component:** `<AestheticStrip/>`, `<Lightbox/>`.

---

## S9 · Offers / Reserve + newsletter CTA
- **Purpose:** convert (Mana's subscription block).
- **Layout:** big statement on **dahlia-rose** block: "Weekend brunch, 10 till 11 — save the table." Reserve button + a **newsletter** field for events/seasonal drops. Playful aside beneath.
- **Content:** headline + `siteSettings`-driven offer; success message: "You're on the list. We'll bring snacks."
- **Motion:** field **focus** animations; button magnetic; on submit → **petal confetti**; bg is the reddest point of the color journey.
- **Component:** `<OffersCTA/>`, `<NewsletterForm/>`, `<Field/>`.
- **Backend:** POST `/api/subscribe` (Resend + double opt-in). Never store secrets client-side.

---

## S10 · Instagram feed
- **Purpose:** live social proof (Mana's "energy in your feed").
- **Layout:** "@dahliaislamabad — a feed as green as our shelves" + a responsive grid (6–9 latest), follower count, follow button.
- **Content:** latest posts/reels via IG Basic Display API, **cached** (Sanity/edge) to dodge rate limits; fallback = curated featured grid.
- **Motion:** staggered grid **reveal**; hover **play-preview** on reels; count **ticks up**.
- **Component:** `<InstagramFeed/>`, `<IgTile/>`.

---

## S11 · Footer
- **Purpose:** everything practical + delight.
- **Layout:** on `forest`. Two columns — **Visit** (address, map embed, hours table, phone, foodpanda) and **Explore** (nav, socials, newsletter). A giant background Fraunces "DAHLIA". Credits line + legal links.
- **The easter egg:** a small **potted seedling** that **grows** when clicked/held (Mana's "Press Space to jump" analogue); keyboard-accessible; purely for delight. Optional: a tiny "water me" watering-can cursor near it.
- **Motion:** background word parallax; seedling **grow** timeline (GSAP) with a little bloom at the end; hours row highlights the current day.
- **Component:** `<Footer/>`, `<SeedlingEasterEgg/>`, `<HoursTable/>`.

---

## Section rhythm (color journey)
`bone` → `bone` → `bone` → `bone` → **[color]** → **terracotta** → **forest** → **blush** → **dahlia** → `bone` → **forest**.
The eye travels warm→green→rose→dark, telling the Café → Nursery → Community → Come-visit story through color alone.

---

## Build order within the homepage
1. Layout shell + Lenis + tokens + fonts (from Phase 0).
2. S2 Header + S11 Footer (frame).
3. S3 Hero (the identity).
4. S4 Pillars, S6 Signature carousel, S7 Nursery (the substance).
5. S5 Kinetic band + section color cross-fade (the wow).
6. S1 Marquee, S8 Aesthetic, S9 Offers, S10 Instagram (the texture).
7. S0 Preloader + S11 easter egg (the polish).
