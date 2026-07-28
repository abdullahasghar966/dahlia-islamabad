# 04 · Design System

Botanical, warm, editorial — Mana's confidence with a nursery's soul.

---

## 1. Color tokens

```css
/* globals.css — Tailwind v4 @theme, or :root */
@theme {
  /* canvas & ink */
  --color-bone:      #F6F1E4;  /* page background (Mana's cream, warmed) */
  --color-cream:     #FBF6EA;  /* raised surfaces / cards */
  --color-ink:       #17130E;  /* near-black, warm */
  --color-ink-soft:  #4A4335;  /* secondary text */

  /* greens — the nursery */
  --color-forest:    #1E3A2B;  /* deep sections, dark UI */
  --color-fern:      #3E5E43;
  --color-sage:      #6E8B5B;
  --color-moss:      #AFC98A;  /* echoes Mana #ACD084 */

  /* warmth — the café */
  --color-terracotta:#C85A3E;
  --color-clay:      #E39A4C;
  --color-amber:     #F2C14E;

  /* the flower — signature accent */
  --color-dahlia:    #D24E63;  /* bloom rose/red */
  --color-blush:     #F0C9C1;

  /* cool accent (sparingly) */
  --color-sky:       #9CC4D6;
}
```

### Section theming map
| Zone | Background | Foreground/text |
|---|---|---|
| Hero / Story | `bone` | `ink` |
| Café / Menu | `terracotta` (or `clay`) | `cream` |
| Nursery | `forest` / `moss` | `cream` / `ink` |
| Aesthetic / Gallery | `blush` | `ink` |
| Offers / Reserve | `dahlia` | `cream` |
| Visit (footer-adjacent) | `forest` | `cream` |

**Mechanic:** each section carries `data-bg`/`data-fg`; a ScrollTrigger cross-fades the page background CSS variables as sections enter (see `07-ANIMATION-INTERACTION.md`).

### Contrast rules (accessibility)
- Body text must hit **AA (4.5:1)** on its section background. `cream` on `terracotta`/`forest`/`dahlia` passes; `ink` on `moss`/`blush`/`bone` passes. Avoid `sage`/`clay` for small text on light — use for large text/graphics only. Verify each pairing before shipping.

---

## 2. Typography

### Families
- **Display — Fraunces** (variable serif). Use axes: `opsz` (large for headlines), `wght` 300–600, and the `SOFT` / `WONK` axes low-to-moderate for organic warmth. Serves the oversized editorial headlines.
- **UI/Body — General Sans** (or **Satoshi**), Fontshare, free. Clean grotesque workhorse.
- **Accent (optional)** — Fraunces *italic* for handwritten-feeling captions/menu notes.

Load with `next/font/local` (self-host the variable `.woff2`) or `next/font/google` for Fraunces. `display: swap`, preload the display weight used above the fold.

### Fluid scale (use `clamp()`)
```css
--fs-mega:  clamp(4rem, 22vw, 20rem);   /* kinetic word ("GATHER") */
--fs-h1:    clamp(2.5rem, 6vw, 5.5rem);
--fs-h2:    clamp(2rem, 4vw, 3.5rem);
--fs-h3:    clamp(1.5rem, 2.5vw, 2.25rem);
--fs-lead:  clamp(1.05rem, 1.4vw, 1.35rem);
--fs-body:  1rem;
--fs-small: 0.875rem;
--fs-label: 0.75rem;  /* uppercase eyebrows, +0.08em tracking */
```

### Rules
- Headlines: Fraunces, tight leading (0.95–1.05), optical large.
- Eyebrows/labels: General Sans, UPPERCASE, letter-spacing `0.08em`.
- Body: General Sans, line-height 1.55, `ink-soft` for secondary.
- Never more than these two families. Contrast comes from **size + weight**, like Mana.

---

## 3. Spacing, grid, radius

```css
--space-unit: 8px;                       /* 0.5rem base */
--section-y:  clamp(5rem, 12vw, 12rem);  /* vertical rhythm between bands */
--gutter:     clamp(1rem, 4vw, 4rem);
--maxw:       1440px;
--radius-card: 1.25rem;
--radius-img:  1rem;
--radius-pill: 999px;
```
- 12-column grid, centered `max-w-[1440px]`, gutters as above.
- Cards `1.25rem`, images `1rem`, buttons/pills full-round. **Nothing sharp** — organic and soft.

---

## 4. Texture & depth
- A very low-opacity **paper/grain** overlay on the `bone` canvas (a tiling PNG or SVG `feTurbulence`, ~3–5% opacity) for warmth.
- Soft, diffuse shadows only (`0 20px 60px -20px rgba(23,19,14,.25)`), never hard drop-shadows.
- Optional subtle **noise + blur** on color blocks for a printed feel.
- Botanical **spot illustrations** (leaves, sprigs, the dahlia bloom) as decorative accents — SVG, 1–2 accent colors.

---

## 5. Buttons & controls
- **Primary:** solid `ink` (or `forest`) pill, `cream` text; magnetic hover (pointer-follow) + slight scale.
- **Secondary:** outline pill, fills on hover.
- **Ghost/link:** underline that draws in on hover (SVG/`background-size` animation).
- Focus-visible: 2px `dahlia` ring, offset 2px.
- Min touch target 44×44px.

---

## 6. Iconography
Custom line icons for care badges (light: low/bright-indirect/full-sun; water: low/med/high; pet-friendly). `lucide-react` for generic UI (arrow, menu, close, map-pin, clock, phone).

---

## 7. Motion principles (design-level; code in file 07)
- **Ease:** custom cubic-beziers — expressive but never bouncy-cheap. e.g. `cubic-bezier(0.16, 1, 0.3, 1)` (out-expo-ish) for reveals; `cubic-bezier(0.7,0,0.3,1)` for color/scrubs.
- **Duration:** reveals 0.6–0.9s; micro-hovers 0.2–0.3s; page transitions 0.6–0.8s.
- **Stagger:** 0.06–0.1s between items.
- **Restraint:** one hero moment per section; let whitespace and type breathe.
- **Reduced motion:** all scrubs → simple fades; marquees stop; Lenis smoothing off.

---

## 8. Dark mode
Not required for v1 (the brand is warm-light). If added later, invert to a `forest`/`ink` night palette with `bone` text — but the default experience is light.
