# 15 · Build Prompts for Opus 5

Copy-paste these on the GPU laptop, in order. Put this whole `Dahlia-Website-Spec/` folder in the project directory first.

---

## Kickoff (paste once, at the start)

> You are building the **DAHLIA Islamabad** website — a café + plant nursery in F-6 Islamabad. The quality bar is the craft of **https://en.manayerbamate.com** (smooth Lenis scroll, oversized kinetic type, draggable showcases, per-section color-blocking, playful easter eggs), re-skinned into a **botanical café + nursery** world.
>
> **First, read every file in `Dahlia-Website-Spec/` in order (00→16).** They contain the full teardown, brand facts, stack, design system, section specs, animation code patterns, content model, and roadmap. Do not re-research — everything you need is there. When you're done reading, confirm the plan back to me in a few bullets, then start **Phase 0**.
>
> Constraints for the whole build: Next.js 15 App Router + TypeScript + Tailwind v4; **Lenis** + **GSAP** (ScrollTrigger, Draggable, Flip, SplitText) + **Motion**; **Sanity** for content; **Resend** for forms; deploy target **Vercel**. Honor `prefers-reduced-motion` on every animation, keep it **AA-accessible** and **mobile-first**, typed and reusable. Use placeholder imagery keyed to the real menu/plant names, behind `next/image`, so real photos drop in with no layout change.

---

## Phase 0 — Foundations

> Do **Phase 0** from `14-ROADMAP-PHASES.md`. Scaffold the Next.js 15 + TS + Tailwind v4 project, install the dependencies from `03-TECH-STACK.md`, wire the design tokens and fonts from `04-DESIGN-SYSTEM.md` into `globals.css` (Fraunces display + General Sans UI, the color tokens, `--page-bg/--page-fg`, grain texture), set up `LenisProvider` + `gsap-setup.ts` per `07-ANIMATION-INTERACTION.md`, and build the `app/(site)/layout.tsx` frame plus the base primitives (`Button`, `Section`, `Eyebrow`, `Reveal`, `Marquee`, `Magnetic`). Show me the running dev server and a working reduced-motion-aware Reveal before moving on.

## Phase 1 — Home showpiece

> Build the **entire homepage**, sections **S0–S11 exactly as specified in `06-HOMEPAGE-SECTIONS.md`**, using the full animation vocabulary and code patterns in `07-ANIMATION-INTERACTION.md`: draggable hero + menu showcases, oversized kinetic-type band, **per-section background color cross-fade**, marquees, magnetic buttons, custom cursor, and the footer **seedling easter egg**. Use the botanical palette and the color-journey rhythm from `04`/`06`. Content = placeholder keyed to the real Dahlia menu/plant names in `02-BRAND-DAHLIA.md`. Verify it in the browser at desktop + mobile, with reduced-motion on and off. This is the showpiece — make it feel as good as the reference.

## Phase 2 — Inner pages

> Build `/menu`, `/nursery` + `/nursery/[slug]`, `/visit`, `/story`, `/aesthetic`, and the legal pages per `11-INNER-PAGES.md`, reusing the components in `09-COMPONENTS-INVENTORY.md`. Same motion language, lower intensity so content leads. Include empty/loading/error states.

## Phase 3 — CMS

> Add **Sanity** per `08-CONTENT-MODEL-SANITY.md`: all schemas, Studio at `/studio`, desk structure with `siteSettings` as a singleton, the GROQ queries, and ISR fetching. Replace hard-coded content with CMS data. Seed real menu categories/dishes, plant categories, gallery, and site settings from `02-BRAND-DAHLIA.md`.

## Phase 4 — Forms & live data

> Implement `/api/reserve`, `/api/contact`, `/api/subscribe` with **Resend** + zod validation + rate-limiting, wire the Reserve drawer and Visit form, and add the Instagram feed (cached) with a curated fallback. Show me a working reservation email.

## Phase 5 — Polish & ship

> Do the launch checklist in `13-SEO-PERF-A11Y.md`: JSON-LD, metadata, sitemap/robots, OG images, page transitions, Lighthouse ≥ 90 mobile, full a11y/keyboard/reduced-motion pass. Then deploy to **Vercel** with the domain and analytics (post-consent). Produce a `PLACEHOLDERS.md` of anything awaiting real assets.

---

## Handy follow-up prompts
- *"Show me the homepage in the browser and screenshot desktop + mobile."*
- *"Turn on `prefers-reduced-motion` and confirm every animation degrades gracefully."*
- *"Run Lighthouse (mobile) and fix anything under 90."*
- *"List every placeholder asset you used and where the real one goes."*
- *"Swap in these real photos/prices for the menu."* (when assets arrive)
- *"Add the optional R3F 3D hero from `16-GPU-ANIMATION-NOTES.md`, behind a reduced-motion/capability check."*

---

## Guardrails to remind Opus 5
- Don't invent business facts — use `02-BRAND-DAHLIA.md`; flag anything uncertain (exact hours, prices) as TODO.
- Keep secrets server-side (`.env.local`); never expose Resend/Sanity write tokens to the client.
- Every animated component needs a reduced-motion fallback.
- Prefer Server Components; `"use client"` only for interactivity/motion.
- Mobile-first — most traffic arrives from Instagram on phones.
