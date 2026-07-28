# PLACEHOLDERS — what is still waiting on real material

Everything below is deliberately provisional. The build never blocks on it: each
item renders at its final size and shape, so dropping the real thing in causes
**no layout change** (12-ASSETS-CHECKLIST.md · placeholder strategy).

Grep the codebase for `TODO:` to find every marker in place.

---

## 1. Photography — the make-or-break asset

**Nothing on the site is a real photograph yet.** Every image slot renders
designed placeholder art instead: a themed color block, a botanical line
drawing, the item's name, and a small "Photo soon" chip.

- Where: `components/ui/Figure.tsx`
- How it works: `Figure` takes an `ImageRef`. While `image.url` is undefined it
  draws the placeholder. The moment a URL exists it renders `next/image` with
  the **same** aspect ratio and the **same** `sizes` string. Nothing else changes.
- To swap in real photos: set `url` (and ideally `lqip`) on the relevant entries
  in `lib/content/*.ts`, or let Sanity supply them in Phase 3.

Needed, per `12-ASSETS-CHECKLIST.md §2`:

| Slot | Where it appears | Count |
|---|---|---|
| Hero subjects | `components/sections/Hero.tsx` → `ITEMS` | 4 |
| Signature dishes | `lib/content/menu.ts` — the six named in 02b §4 | 6 |
| Full menu | `lib/content/menu.ts` — every card-layout dish | 58 |
| Plants | `lib/content/plants.ts` | 12 |
| Nursery editorial | `components/sections/NurseryHighlight.tsx` | 3 |
| Story blocks | `app/(site)/story/page.tsx` → `BLOCKS` | 3 |
| Gallery / "Aesthetic" | `lib/content/gallery.ts` | 12 |
| Instagram grid | falls back to gallery until the API is wired | 9 |
**Not needed:** OG images and the favicon are generated, not placeholders.
`app/**/opengraph-image.tsx` renders a themed 1200×630 card per route at build
time (including one per plant) via `lib/og/frame.tsx`, and `app/icon.svg` is a
drawn dahlia. Replace them with photography-based art only if the owner prefers
it — nothing is missing.

## 2. Prices

**The café menu is verified and real.** `lib/content/menu.ts` is transcribed
from the owner's own Instagram highlights via
`Dahlia-Website-Spec/02b-VERIFIED-MENU-POLICY-DISCOUNTS.md` — 10 categories, 82
items (58 dishes + 17 drinks + 7 add-ons), exact PKR prices, exclusive of GST.
Nothing here needs replacing.

Two deliberate restraints:

- **No dietary badges.** Only `signature` and `house-special` are applied,
  because those are the only two the printed menu marks. `veg`/`spicy` are *not*
  inferred from ingredient lists — guessing a dietary claim on a restaurant menu
  is exactly the kind of error that matters. The badge types exist and are ready
  the moment the owner confirms which dishes qualify.
- **Bank discounts are hard-coded but shouldn't stay that way.** `discounts` in
  `lib/content/site.ts` holds the HBL and Allied Bank cards. 02b §3 is explicit
  that these rotate and must be CMS-managed — wire them to Sanity first in
  Phase 3, and **confirm current validity with the owner before launch** (the
  HBL card is dated June 2, Allied Bank July 15 2025).

**Nursery prices are still placeholder.** Every `price` in
`lib/content/plants.ts` is invented and must be replaced from the owner's
inventory.

> Drinks and add-ons render as a typographic price list, not photo cards
> (02b §0), so those 24 items need no photography at all.

## 3. Hours — unconfirmed

`lib/content/site.ts → siteSettings.hours` encodes weekdays 12:00–23:00 and
weekends 10:00–23:00, from `02-BRAND-DAHLIA.md §2`. That file itself flags the
per-day detail as unconfirmed and notes Tue–Fri may open ~11:00. **Confirm each
day with the owner** — these hours also feed the JSON-LD that Google reads.

## 4. Links and identifiers awaiting the owner

| Field | File | Current value |
|---|---|---|
| foodpanda store URL | `lib/content/site.ts` | generic foodpanda.pk homepage |
| Google Maps place link | `lib/content/site.ts` | a text search, not the real place |
| Maps embed URL | `lib/content/site.ts` | address query embed, not a place ID |
| Coordinates | `lib/content/site.ts` | approximate F-6 Markaz, feeds JSON-LD `geo` |
| Threads / Facebook | `lib/content/site.ts` | omitted — only Instagram is verified |

## 5. Copy needing an owner pass

- ~~Café policy~~ — **done.** `app/(site)/legal/cafe-policy/page.tsx` now carries
  the owner's real published policy (02b §1). The same numbers are not just copy:
  `siteSettings.policy` drives the reserve form and the `/api/reserve` schema, so
  only tables of 8+ can actually be booked, smaller parties get walk-in guidance
  instead of a form, and the 10% service charge note appears from 10 guests up.
- **Privacy** (`app/(site)/legal/privacy/page.tsx`) — accurately describes what
  the site does, but **has not had legal review** and does not yet reference
  Pakistan's data-protection regime.
- **Testimonials** (`lib/content/site.ts`) — written as placeholders and labelled
  "Placeholder review". Replace with real Google/Tripadvisor quotes.
- **Story counters** (`app/(site)/story/page.tsx`) — only the 16.7K follower
  count is verified. "Cups poured" and "plants rehomed" are invented.
- All dish descriptions are draft copy in the brand voice, not menu text.

## 6. Not yet built — needs credentials

| Phase | Blocked on |
|---|---|
| **3 · Sanity CMS** | a Sanity project ID + token. `lib/content/*` already matches the GROQ projections in `08-CONTENT-MODEL-SANITY.md`, so this is a data-source swap, not a rewrite. |
| **4 · Email delivery** | `RESEND_API_KEY` + a verified sending domain. Routes, validation, honeypots and rate limiting are built and tested; with no key the forms fail **honestly** (503 + "call us") rather than pretending to succeed. |
| **4 · Instagram feed** | an IG Basic Display token. The curated fallback grid is live and is the documented fallback. |
| **5 · Analytics** | a GA4 ID. The consent banner is built and defaults to decline; nothing loads before consent. |

## 7. Known deviations from the spec — deliberate

1. **Terracotta and dahlia page backgrounds are slightly deepened.**
   `04-DESIGN-SYSTEM.md §1` states `cream` on `terracotta` and on `dahlia` pass
   AA. Measured, they are **3.90:1** and **3.89:1** — below the 4.5:1 body-text
   floor. The page-level stops use `#BA4C33` and `#C24358` (4.67:1 and 4.60:1);
   the original brighter hexes remain as accent tokens for large type and
   graphics. Run `node scripts/check-contrast.mjs` to re-verify.
2. **Section colour handoff uses `top 50% / bottom 50%`,** not the 60/40 in
   `07-ANIMATION-INTERACTION.md §6`. The 60/40 windows overlap, so any band
   shorter than ~1.2 viewports surrendered its colour while still on screen.
3. **`content-visibility: auto` is opt-in, not the default** on `Section`. It
   made every unrendered section report a placeholder height, which put every
   ScrollTrigger position below it out by hundreds of pixels.
4. **Care badges are always present,** fading from muted to full on hover rather
   than appearing from nothing, so keyboard and touch users can read them.
5. **Rate limiting is per server instance** (in-memory). Move it to Upstash/Vercel
   KV before launch — see the note in `lib/rate-limit.ts`.
6. **The announcement bar does not drive the colour journey** — it paints its own
   strip. At ~40px tall, letting it own the page background flashed the whole
   canvas dark for a band you had already scrolled past.
7. **The announcement bar (S1) renders inside `<Header>`,** not in page flow. As
   a sibling of a `fixed` header it sat underneath and was covered by it. It is
   now global chrome on every route rather than homepage-only.
8. **`--header-h` and `--sticky-top` are the single source of truth** for header
   height and where sticky sub-navigation parks. Both are consumed via
   `calc()`/`top` rather than hard-coded offsets. `--sticky-top` is registered
   with `@property` because an unregistered custom property feeding `top`
   combined with `transition: top` pins the old value and the update never
   lands at all.
9. **The route cross-fade in 07 §11 is deferred, not forgotten.** Every fade
   approach needs the incoming page to start at `opacity: 0`, and browsers pause
   animations and transitions in a backgrounded tab — a fade paused at 0% leaves
   the page blank until it is focused. Reproduced here with a JS fade, a
   keyframe animation, and a transition out of `@starting-style`. The View
   Transitions API (07 §11's own first choice) is the right implementation
   because the browser drives it against a snapshot and cannot leave it
   half-applied. `components/motion/PageTransition.tsx` keeps the useful half —
   rebuilding scroll measurements after a route swap.
10. **No `loading.tsx` yet, deliberately.** Adding one creates a Suspense
    boundary whether or not anything suspends; verified in a production build
    that /menu and /nursery then shipped their content inside `<div hidden>`
    behind a `$RC` reveal script while every other route stayed plain static
    HTML. Those two pages alone would have gone blank without JS, for no gain,
    since neither fetches anything today. `components/ui/Skeleton.tsx` is built
    and waiting for Phase 3.
