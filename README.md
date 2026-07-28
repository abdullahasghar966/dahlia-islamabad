# DAHLIA Islamabad — Café + Plant Nursery

The website for Dahlia, 1 Agha Khan Rd, F-6 Markaz, Islamabad. Built to the
specification in [`Dahlia-Website-Spec/`](./Dahlia-Website-Spec) — a botanical
re-skin of the craft of [Mana Yerba Mate](https://en.manayerbamate.com): Lenis
inertia scroll, oversized kinetic type, draggable showcases, a per-section
background colour journey, and a footer easter egg.

## Run it

```bash
npm run dev
```

Then open http://localhost:3000.

> **Windows note:** Node was installed into `C:\Program Files\nodejs` during
> setup. If `npm` isn't found in a fresh shell, open a new terminal so it picks
> up the updated PATH, or use `scripts\dev.cmd`, which prepends it.

| Script | What it does |
|---|---|
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |
| `npm run check:contrast` | Verifies every colour stop against WCAG AA |
| `npm run check:menu` | Diffs the shipped menu against the verified seed in `08 §6` |
| `npm run check` | All four, in order |

**Run `npm run check:menu` after touching `lib/content/menu.ts`.** The menu is
real, owner-published data — a typo in a price is the kind of error nobody spots
until a customer is charged wrong, so it is diffed against the canonical seed
rather than eyeballed.

## Stack

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind v4 (CSS-first) ·
Lenis · GSAP 3.15 (ScrollTrigger, Draggable, Inertia, SplitText, Flip, Observer) ·
Motion · Embla · Zod + React Hook Form · Resend.

## Layout

```
app/
  (site)/          the site frame + every page
  api/             reserve · contact · subscribe
  globals.css      design tokens, the colour-journey @property, utilities
components/
  motion/          LenisProvider ThemeController Reveal SplitHeading Marquee
                   Magnetic Parallax ClipReveal Counter RevealGroup
  layout/          Header NavOverlay Footer ReserveDrawer CookieBanner Cursor
  sections/        the homepage S0–S11
  menu/ nursery/   DishCard CategoryTabs OrderBar PlantCard CareBadges …
  ui/              Button Section Figure Drawer Lightbox HoursTable …
lib/
  content/         typed seed content, shaped like the Sanity GROQ projections
  theme.ts         the colour stops (contrast-verified)
  gsap-setup.ts    plugin registration + reduced-motion helper
```

## Three things worth knowing

**`cn()` is an extended tailwind-merge, and that matters.** The fluid scale in
`globals.css` defines custom `--text-*` tokens, so `text-lead`, `text-h2`,
`text-small` are *font sizes*. Stock tailwind-merge only knows Tailwind's own
sizes and files every other `text-*` under its `text-color` catch-all — which
made `text-lead` silently delete the colour class next to it, leaving ink text
on an ink button. `lib/utils.ts` registers the scale so sizes and colours can
coexist. **If you add a `--text-*` token, add its name there too.** Related:
write theme-variable colours as `text-[color:var(--page-fg)]`, not
`text-[var(--page-fg)]`, so the value is unambiguously typed.

**The colour journey.** `--page-bg` and `--page-fg` are registered with
`@property` as `<color>`, so the cross-fade is a plain CSS transition. The
scroll controller (`components/motion/ThemeController.tsx`) only ever calls
`setProperty` — the browser does the interpolation, which is cheaper than
tweening a variable from JS and collapses to an instant swap under reduced
motion with no extra branching.

**Placeholder imagery.** No real photographs exist yet. `components/ui/Figure.tsx`
draws designed placeholder art at the final aspect ratio with the final `sizes`,
so adding real photos changes no layout. See [`PLACEHOLDERS.md`](./PLACEHOLDERS.md).

## Accessibility

Every animation has a reduced-motion path, all 12 colour stops meet WCAG AA for
body text (`npm run` the contrast script), drawers and the lightbox trap focus
and restore it, draggable carousels have buttons and arrow keys, and touch
targets are ≥44px. The custom cursor is additive — the native one stays visible.

## Environment

Copy `.env.example` to `.env.local`. Everything is optional for local
development; without keys the forms validate and then fail honestly rather than
pretending to have sent anything.

## State of the build

Phases 0–2 of `14-ROADMAP-PHASES.md` are done and verified, plus the Phase 4 API
layer. Phase 3 (Sanity) and live email/Instagram need credentials — see
[`PLACEHOLDERS.md §6`](./PLACEHOLDERS.md).
