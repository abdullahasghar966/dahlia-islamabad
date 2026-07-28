# 11 · Inner Pages — detail

Same motion vocabulary as the homepage, dialed down so content leads. Each page: **Purpose · Layout · Motion.**

---

## /menu — Café menu
- **Purpose:** the full, browsable menu; funnel to reserve/order.
- **Layout:**
  - Hero strip: "The Menu" (Fraunces) on a warm `clay/terracotta` block. **Use the arched-window line motif** from the real logo (see `02b §0`) as a framing device.
  - **Sticky `CategoryTabs`** — VERIFIED order: **Starters · Salad · Breakfast · Chicken · Beef · Seafood · Detroit-Style Pizza · Desserts · Drinks · Add-ons** — that scroll-spy.
  - Per category: `DishCard` grid (photo, name, one-line, **price as `Rs 2,295`**, badges). All dishes/prices from `02b` (source of truth) / `08 §6` JSON.
  - Foot of page: the notes **"Prices exclusive of GST"** and **"10% service charge on tables of 10+"** (from `siteSettings`).
  - Sticky footer CTA bar: **Reserve** · **Order on foodpanda** · **Call**.
- **Motion:** category color-wash as you scroll into each; cards **fade-up** (batched); dish image **zoom** on hover; tab underline slides; specials get a gentle pulse. Reduced-motion → plain.

## /nursery — Plant catalog
- **Purpose:** browse/discover plants; drive in-store visits.
- **Layout:**
  - Hero on `forest/moss`: "The Nursery — bring the outside in."
  - **`PlantFilters`** (Type, Light, Water, Pet-friendly, In-stock).
  - **`PlantGrid`** of `PlantCard` (photo, name, botanical name, price, `CareBadges`).
  - Empty state when filters match nothing (illustration + reset).
- **Motion:** grid **stagger-reveal**; hover reveals care badges + quick "View"; filter changes animate via Motion **layout** (FLIP) reflow. Reduced-motion → instant reflow.

## /nursery/[slug] — Plant detail
- **Purpose:** care info + intent to buy (in-store/WhatsApp).
- **Layout:** image gallery (lightbox) · name + botanical + price · `CareBadges` (light/water/difficulty/pet) · care notes (PortableText) · **"Ask about this plant" (WhatsApp)** + "Reserve to pick up". Related plants row.
- **Motion:** gallery shared-element into lightbox; sticky buy panel on desktop; care notes reveal.

## /visit — Location, hours, reserve, contact
- **Purpose:** the conversion hub.
- **Layout:**
  - Big address + `HoursTable` (current day highlighted) on `forest`.
  - **Map** embed (lazy) + "Get directions".
  - **ReserveForm** (name, date, time, party size, phone, note) → `/api/reserve`. **Reflect the verified café policy (`02b §1`):** reservations are held for **tables of 8+**; for parties of 2–6 show walk-in messaging ("we operate on a walk-in policy — we'll do our best to seat you"). Note the **15-minute hold** and dining-time windows (1h45 for 2–6, 2h for 8+).
  - Contact: phone (`tel:`), WhatsApp, email, foodpanda button.
  - "Often busy — walk-ins welcome; 8+ can reserve ahead" note.
- **Motion:** hours row highlight; form field focus animations; success state (petal confetti). All AA + keyboard.

## /story — About
- **Purpose:** the heart — why a café *and* a nursery.
- **Layout:** editorial long-form. Big statement hero; alternating image/text blocks (the space, the plants, the food, the people/`teamMember`); a testimonial strip; CTA to visit.
- **Motion:** parallax images, line-reveal headings, sticky captions, counters (16.7K community, cups poured, plants rehomed).

## /aesthetic — Gallery / lookbook
- **Purpose:** sell the vibe (their "Aesthetic" highlight).
- **Layout:** full-bleed masonry of interior/food/plant photography (CMS `galleryImage`), filter by tag, lightbox. IG follow CTA.
- **Motion:** masonry stagger; hover scale + neighbor desaturate; lightbox shared-element; optional dual-direction marquee header.

## /journal (optional) — care + recipes + events
- **Layout:** post grid (`journalPost`), tags, featured post; article page = cover, PortableText, author, related.
- **Motion:** cover parallax, reading-progress bar, reveal-on-scroll.

## /legal/privacy & /legal/cafe-policy
- Simple, readable typographic pages (PortableText or MDX). Café policy mirrors what they publish on Instagram. Light motion only.

---

## Cross-page patterns
- Persistent **Reserve/Order** affordance (drawer + sticky bar on menu/nursery).
- Consistent hero pattern: Eyebrow → Fraunces H1 → lead → CTA, on a themed block.
- Breadcrumbs on detail pages.
- Every list has an **empty**, **loading (skeleton)**, and **error** state.
