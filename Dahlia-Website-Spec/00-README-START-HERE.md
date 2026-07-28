# DAHLIA Islamabad — Website Build Bundle
### Read this first

This folder is a **complete, hand-off-ready specification** for building the DAHLIA Islamabad (Café + Plant Nursery) website. It is modeled on the craft of **https://en.manayerbamate.com** (Mana Yerba Mate), re-skinned into a botanical café + nursery world.

The bundle is written so a fresh **Opus 5** session on your GPU laptop can read it and build the site end-to-end **without re-researching anything**. All facts here were gathered live from the reference site's DOM/CSS and from Dahlia's real listings — they are not invented.

---

## How to use this on the other laptop

1. Copy the whole `Dahlia-Website-Spec/` folder into your new project directory (e.g. `D:\dahlia\`).
2. Open Opus 5 / Claude Code in that directory.
3. Paste the prompt from **`15-OPUS5-BUILD-PROMPT.md`** (start with the Phase 0 + Phase 1 prompt).
4. Tell it: *"Read every .md in `Dahlia-Website-Spec/` first, then build."*
5. Build the homepage first (it's the showpiece), verify it in the browser, then continue through the phases.

---

## Reading order (what each file covers)

| # | File | What's inside |
|---|---|---|
| 00 | `00-README-START-HERE.md` | This file — orientation & reading order |
| 01 | `01-REFERENCE-TEARDOWN.md` | Full teardown of Mana Yerba Mate — platform, palette, type, every section, every animation |
| 02 | `02-BRAND-DAHLIA.md` | Dahlia's real facts, concept translation, voice & tone, content inventory |
| 02b | `02b-VERIFIED-MENU-POLICY-DISCOUNTS.md` | ⭐ **SOURCE OF TRUTH** — the real menu (names/prices/descriptions), café policy, and bank discounts, transcribed from Dahlia's own IG highlights + the real wordmark/logo motif |
| 03 | `03-TECH-STACK.md` | Exact stack, every dependency + why, env vars, config, install commands |
| 04 | `04-DESIGN-SYSTEM.md` | Color tokens, typography, spacing, grid, radii, textures, motion principles |
| 05 | `05-SITEMAP-IA.md` | Routes, navigation, information architecture, URL scheme |
| 06 | `06-HOMEPAGE-SECTIONS.md` | The showpiece — sections S0–S11 in full detail (content + layout + motion) |
| 07 | `07-ANIMATION-INTERACTION.md` | The complete motion spec + real code patterns (Lenis, GSAP, Motion), reduced-motion, a11y |
| 08 | `08-CONTENT-MODEL-SANITY.md` | Every Sanity schema, GROQ queries, seed data |
| 09 | `09-COMPONENTS-INVENTORY.md` | Every component, its props and behavior |
| 10 | `10-PROJECT-STRUCTURE.md` | Folder tree, file responsibilities, providers |
| 11 | `11-INNER-PAGES.md` | Menu, Nursery (+detail), Visit, Story, Aesthetic, Journal — page by page |
| 12 | `12-ASSETS-CHECKLIST.md` | Everything to gather from the owner (photos, hours, prices, tokens) |
| 13 | `13-SEO-PERF-A11Y.md` | SEO, JSON-LD, Core Web Vitals, accessibility, launch checklist |
| 14 | `14-ROADMAP-PHASES.md` | Phase-by-phase build plan with task lists and acceptance criteria |
| 15 | `15-OPUS5-BUILD-PROMPT.md` | Copy-paste prompts for Opus 5 — one per phase |
| 16 | `16-GPU-ANIMATION-NOTES.md` | How to actually exploit the GPU (WebGL/R3F options, dev perf) + honest notes on runtime perf |

---

## One-paragraph vision

Keep Mana's **craft**, swap its **world**. A warm bone/cream canvas; a botanical palette (forest greens for the nursery, terracotta & clay for the café, a dahlia-rose signature accent); oversized editorial **Fraunces** headlines paired with a clean **General Sans** UI; and the exact Mana motion vocabulary — **Lenis** buttery inertia scroll, **GSAP** draggable dish/plant showcases, oversized **kinetic type**, per-section background **color cross-fades**, marquees, magnetic buttons, a custom cursor, and a delightful footer **easter egg** (a seedling that grows). Built on **Next.js 15 + Tailwind v4 + Sanity + Vercel**. The bar: *smooth, colorful, oversized, playful — but botanical and hospitable.*

---

## Quick facts (so you never have to look them up)
- **Business:** DAHLIA — "home to a café and plant nursery."
- **Address:** 1 Agha Khan Rd, F-6 Markaz, F-6/3, Islamabad 25000, Pakistan.
- **Phone:** 0327 5000969.
- **Hours:** Weekdays 12:00–23:00 · Weekends 10:00–23:00 *(confirm exact per-day)*.
- **Instagram:** @dahliaislamabad (16.7K, reel-heavy) · sister branch @dahlialahore.
- **Reference to match the craft of:** https://en.manayerbamate.com
