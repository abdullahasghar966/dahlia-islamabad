# 16 · GPU & Animation Performance Notes

You mentioned the other laptop has a GPU "so animations run smoothly." Here's the honest, useful version of how that helps — and how to make the site feel great for *everyone*, not just powerful machines.

---

## 1. What the GPU actually helps with

**During development (big win):**
- Faster builds/HMR, smooth previewing of heavy scenes, recording high-FPS screen captures, and comfortably running a **live 3D (WebGL/R3F)** hero while you iterate.
- If you add Three.js/React-Three-Fiber, a discrete GPU makes authoring shaders and 3D scenes pleasant.

**At runtime, for the *end user* (important nuance):**
- Your visitors mostly arrive from **Instagram on mid-range phones**. The site must feel smooth on *their* devices, not just your GPU laptop. So we optimize for the phone and let the GPU laptop be a comfortable authoring environment.
- The good news: the animation techniques we chose (CSS/GSAP `transform`+`opacity`, Lenis) are already **GPU-composited in every modern browser** — they run on the GPU even on phones. A discrete GPU on the dev machine doesn't change what ships; it just makes building/previewing nicer.

**Bottom line:** the GPU laptop is perfect for *building* an animation-rich site and for *optionally* adding live WebGL. We still engineer for smoothness on phones.

---

## 2. How to exploit the GPU (optional, elevate-only)

If you want to spend the GPU budget on something visible, add **one** of these to the hero — behind a capability + reduced-motion check so weak devices fall back to the static/parallax version:

- **R3F 3D hero:** a slowly rotating potted plant / floating leaves / a glass of iced coffee, lit softly. Pre-load a compressed **glTF (Draco/meshopt)**; cap DPR (`gl={{ dpr: [1, 1.75] }}`), pause when offscreen.
- **Shader gradient / fluid canvas** background for a section (a warm, organic moving gradient) via a fragment shader — cheap and gorgeous.
- **Particle petals / dust** in the offers/confetti moment.
- **Subtle post-processing** (very light bloom/grain) — use sparingly; it's the easiest way to tank mobile FPS.

**Guardrails for any WebGL:**
```tsx
const canWebGL = typeof window !== "undefined" && !!document.createElement("canvas").getContext("webgl2");
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const use3D = canWebGL && !reduce && window.matchMedia("(min-width: 768px)").matches;
// else render the pre-rendered/parallax hero (the default, Mana-style)
```
- Lazy-load the 3D bundle with `next/dynamic({ ssr:false })` so phones never download it.
- Cap devicePixelRatio, pause the render loop offscreen, compress textures (KTX2/basis).
- Always ship the **image/parallax fallback** as the baseline — remember the reference itself used pre-rendered images, not live WebGL.

---

## 3. Universal smoothness rules (apply regardless of GPU)

- Animate **only** `transform` and `opacity`. Never animate `width/height/top/left/margin` in loops.
- Add `will-change: transform` to actively-animating elements; **remove it** when idle.
- Use `content-visibility: auto` on below-the-fold sections.
- Debounce/throttle scroll work; let **Lenis drive GSAP's ticker** (don't run two RAF loops).
- Lazy-mount heavy sections (Instagram, Aesthetic, any 3D).
- Cap parallax/kinetic travel and disable the most expensive effects under `~768px`.
- Test on a **real mid-range Android** — if it's smooth there, it's smooth everywhere.
- Respect `prefers-reduced-motion` (users *and* low-power devices benefit).

---

## 4. Measuring
- Chrome DevTools **Performance** panel: watch for long tasks + layout thrash; aim to stay near **60fps** during scroll.
- **Lighthouse** (mobile preset) ≥ 90; watch **INP** and **CLS** especially with all this motion.
- `@vercel/speed-insights` for field data after launch.

---

## TL;DR
The GPU laptop makes **building** (and optionally shipping a **live 3D hero**) a joy. Ship WebGL only as a progressive enhancement behind capability + reduced-motion checks, and engineer the core experience to be buttery on the phones your Instagram audience actually uses.
