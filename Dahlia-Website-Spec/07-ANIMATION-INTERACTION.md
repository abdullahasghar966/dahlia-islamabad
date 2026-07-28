# 07 · Animation & Interaction Spec (with code patterns)

This file is the implementation heart. Patterns are illustrative — adapt to final component names. All of it degrades under `prefers-reduced-motion`.

---

## 1. Global smooth scroll (Lenis) + GSAP sync

```tsx
// components/motion/LenisProvider.tsx
"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;                       // native scroll for reduced-motion

    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);

    // expose to open/close for drawers/modals
    (window as any).__lenis = lenis;
    return () => { lenis.destroy(); gsap.ticker.remove(lenis.raf as any); };
  }, []);
  return <>{children}</>;
}
```
- **Pause Lenis** when a drawer/modal/lightbox opens: `window.__lenis?.stop()` / `.start()`.
- Set `html { scroll-behavior: auto }` (Lenis handles it).

---

## 2. Reusable reveal (Motion)

```tsx
// components/motion/Reveal.tsx
"use client";
import { motion, useReducedMotion } from "motion/react";

export function Reveal({ children, delay = 0, y = 24 }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >{children}</motion.div>
  );
}
```
Use for pillars, cards, generic blocks. For grids, prefer `ScrollTrigger.batch` (below) to stagger efficiently.

---

## 3. Split headline reveal (GSAP SplitText)

```tsx
// SplitText is free in GSAP 3.13+
gsap.registerPlugin(SplitText, ScrollTrigger);
const split = new SplitText(el, { type: "lines,words" });
gsap.from(split.lines, {
  yPercent: 110, opacity: 0, stagger: 0.08, duration: 0.9,
  ease: "expo.out",
  scrollTrigger: { trigger: el, start: "top 80%" },
});
// wrap lines in overflow:hidden parents for a "mask up" reveal
```
Use for hero H1 and every section headline.

---

## 4. Batched grid stagger (efficient)

```tsx
ScrollTrigger.batch(".js-reveal", {
  start: "top 85%",
  onEnter: (els) =>
    gsap.to(els, { opacity: 1, y: 0, stagger: 0.08, duration: 0.7, ease: "power3.out" }),
});
// items start at opacity:0; y:24 in CSS
```

---

## 5. Kinetic type band (scroll-scrubbed drift)

```tsx
gsap.to(".kinetic-word", {
  xPercent: -25,                          // horizontal drift
  ease: "none",
  scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: true },
});
// per-letter parallax: map each letter to a slightly different y via scrub
```
`will-change: transform;` on the word. On mobile, reduce travel and font-size.

---

## 6. Per-section background color cross-fade

Each `<section data-bg="#C85A3E" data-fg="#FBF6EA">`. One controller:

```tsx
gsap.utils.toArray<HTMLElement>("[data-bg]").forEach((sec) => {
  ScrollTrigger.create({
    trigger: sec, start: "top 60%", end: "bottom 40%",
    onEnter:     () => setTheme(sec),
    onEnterBack: () => setTheme(sec),
  });
});
function setTheme(sec: HTMLElement) {
  gsap.to(":root", {
    "--page-bg": sec.dataset.bg, "--page-fg": sec.dataset.fg,
    duration: 0.6, ease: "power2.out", overwrite: "auto",
  });
}
// body { background: var(--page-bg); color: var(--page-fg); transition handled by gsap }
```
This is the Mana "flavor color" mechanic. Keep contrast AA at every stop.

---

## 7. Draggable showcase (hero) — GSAP Draggable + Inertia

```tsx
gsap.registerPlugin(Draggable, InertiaPlugin); // InertiaPlugin free in GSAP 3.13+
Draggable.create(track, {
  type: "x", inertia: true, bounds: wrapper, edgeResistance: 0.85,
  snap: (v) => Math.round(v / cardW) * cardW,
  onDrag: updateParallax, onThrow: updateParallax,
});
```
Prev/next buttons animate `track` by ±`cardW` with `gsap.to(...ease:"expo.out")`. Provide keyboard arrows + ARIA. On touch it feels native.

**Simpler/a11y alternative for the menu carousel:** `embla-carousel-react` with `dragFree`, `loop`, momentum — wire external prev/next and a progress bar.

---

## 8. Marquee (infinite, pausable)

```tsx
// duplicate content x2; translate -50% infinitely
<div className="marquee" data-speed="40">
  <div className="marquee__track">{items}{items}</div>
</div>
```
```css
.marquee__track { display:flex; gap:2rem; width:max-content; animation: scroll 40s linear infinite; }
.marquee:hover .marquee__track { animation-play-state: paused; }
@keyframes scroll { to { transform: translateX(-50%); } }
@media (prefers-reduced-motion: reduce){ .marquee__track{ animation:none; } }
```
Or drive with GSAP for velocity-linked speed (faster while scrolling).

---

## 9. Magnetic buttons + custom cursor

```tsx
// Magnetic: on mousemove within radius, translate toward pointer (spring), reset on leave.
// Custom cursor: a small leaf/dot following pointer (rAF-lerp); scales up over [data-cursor="hover"];
//   hidden on touch (pointer: coarse) and reduced-motion.
```
Keep the real cursor visible for accessibility, or ensure focus states are strong if you hide it.

---

## 10. Drawers, overlays, lightbox (Motion presence)

```tsx
<AnimatePresence>
  {open && (
    <motion.aside
      initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
      transition={{ duration: 0.5, ease: [0.7,0,0.3,1] }} />
  )}
</AnimatePresence>
```
- Reserve drawer slides from right; scrim fades; **Lenis paused**; focus-trapped; `Esc` closes.
- Lightbox uses `layoutId` shared-element transition from the clicked tile.
- Mobile nav overlay: staggered link reveal via `staggerChildren`.

---

## 11. Page transitions
- **Preferred:** Next.js **View Transitions** (`unstable_ViewTransition`) for cross-route morphs.
- **Or** an overlay wipe: a `forest`/color panel sweeps across on navigation start, reveals on complete (Motion or GSAP). Preserve scroll restoration; announce route change to screen readers.

---

## 12. The footer easter egg (seedling grows)
- A potted-seedling SVG. Click/hold (and `Enter`/`Space` when focused) runs a GSAP timeline: stem grows, leaves unfurl (stagger), a small dahlia **blooms**, tiny particles. Resets after a few seconds.
- Announce nothing intrusive; it's non-essential and skipped under reduced-motion (show final bloom statically).

---

## 13. Number counters
```tsx
// animate 0 → target on view (e.g., 16,700 followers, cups poured, plants rehomed)
```
Use `motion`'s `useMotionValue`+`animate`, or a small rAF tween. Format with `Intl.NumberFormat`.

---

## 14. Reduced-motion contract (must-do)
When `prefers-reduced-motion: reduce`:
- Lenis **off** (native scroll).
- All `scrub`/parallax/kinetic drift → **static** or a single fade.
- Marquees **paused/static**.
- Preloader **skipped**; easter egg shows end-state.
- Drawers still animate but with short, simple fades.
Test by toggling the OS setting.

---

## 15. Performance guards
- Animate only **`transform`/`opacity`**; avoid layout-thrashing props.
- `will-change` only on actively-animating elements; remove after.
- **Lazy-mount** heavy sections (Instagram, Aesthetic) with `IntersectionObserver`/`next/dynamic`.
- Pause offscreen animations & reel previews.
- Cap kinetic/parallax travel on mobile; test on a mid-range phone (most traffic is IG mobile).
- Keep total JS lean; import GSAP plugins individually.

---

## 16. Easing tokens (reuse everywhere)
```
--ease-out-expo:  cubic-bezier(0.16, 1, 0.3, 1);   /* reveals */
--ease-inout-soft:cubic-bezier(0.7, 0, 0.3, 1);    /* color scrubs, drawers */
--ease-out-back:  cubic-bezier(0.34, 1.56, 0.64, 1); /* playful pops (sparingly) */
```
