# 05 · Sitemap & Information Architecture

---

## 1. Routes

```
/                     Home — the showpiece (sections S0–S11)
/menu                 Café menu — categories, dishes, seasonal specials
/nursery              Plant & garden catalog (filter by light/water/type)
/nursery/[slug]       Plant detail — care level, light, water, price, ask/reserve
/story                About — the space, the people, the philosophy
/aesthetic            Gallery / lookbook (IG-fed, the "Aesthetic" world)
/visit                Location, hours, map, reservations, contact, foodpanda
/journal              (optional) plant care + recipes + events index
/journal/[slug]       Article
/legal/privacy        Privacy policy
/legal/cafe-policy    Café policy (they already publish this on IG)
```

Global chrome on every route: **Header**, **Footer**, **Reserve drawer**, **Newsletter**, **Cookie/consent**, **Custom cursor**, **Lenis** scroll.

---

## 2. Primary navigation

**Header (desktop):**
- Left: `Menu` · `Nursery` · `Story`
- Center: **DAHLIA** wordmark (→ home)
- Right: `Visit` · **`Reserve`** (button → drawer)

**Header (mobile):** hamburger → full-screen overlay with staggered links + a background leaf illustration + phone/IG/foodpanda at the bottom.

**Footer nav:** Visit (address, hours, map, phone, foodpanda) · Explore (Menu, Nursery, Story, Aesthetic, Journal) · Social (IG, Threads, FB) · Newsletter · Legal.

---

## 3. Information architecture (content grouping)

```
DAHLIA
├─ Eat  →  /menu           (café: categories → dishes → seasonal specials)
├─ Grow →  /nursery        (plants: categories/filters → plant detail)
├─ Know →  /story, /journal (who we are, care guides, recipes, events)
├─ See  →  /aesthetic      (gallery / IG lookbook)
└─ Come →  /visit          (location, hours, reserve, order, contact)
```

The homepage is a **teaser of all five**, in the Mana scroll-journey format, funneling to `/visit` (reserve/order) and `/menu`.

---

## 4. Conversion goals (in priority order)
1. **Reserve a table** (drawer + `/visit`).
2. **Order** (foodpanda / WhatsApp / call deep-links).
3. **Browse menu** and **browse nursery**.
4. **Follow on Instagram** / join newsletter (events + seasonal drops).

Every page keeps a persistent Reserve/Order affordance.

---

## 5. URL & SEO scheme
- Clean, human slugs (`/nursery/fiddle-leaf-fig`).
- One H1 per page; descriptive titles: `Menu — DAHLIA Islamabad (Café + Nursery)`.
- `sitemap.xml`, `robots.txt`, canonical tags.
- Local-business JSON-LD on home + `/visit` (see `13-SEO-PERF-A11Y.md`).

---

## 6. States to design (don't forget)
- Empty states (no plants in a filter, no journal posts yet).
- Loading skeletons for CMS-fed grids.
- 404 (a lost-in-the-greenhouse illustration + links home).
- Form success/error (reserve, contact, newsletter).
- Reduced-motion variant of every animated section.
- Offline/slow-network image fallbacks (blur placeholders).
