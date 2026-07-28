# 09 · Component Inventory

Every component, grouped by folder, with purpose + key props/behavior. Keep them typed, small, and reusable.

---

## layout/
| Component | Purpose | Notes / props |
|---|---|---|
| `Header` | Top nav | transparent→blur on scroll; hide/show on scroll dir; slots for links + Reserve |
| `NavOverlay` | Mobile full-screen menu | staggered links, background leaf art, focus-trap, `Esc` close |
| `Footer` | Practical + delight | Visit + Explore columns, hours table, socials, credits, easter egg |
| `ReserveDrawer` | Right-side reserve panel | `open`, `onClose`; form (name, date, time, party, phone); pauses Lenis |
| `CookieBanner` | Consent | privacy-first default (decline non-essential); persists choice |
| `Cursor` | Custom cursor | rAF-lerp dot/leaf; scales over `[data-cursor="hover"]`; off on touch/reduced-motion |
| `SkipLink` | a11y | "Skip to content" |

## motion/
| Component | Purpose |
|---|---|
| `LenisProvider` | Smooth scroll + GSAP ticker sync (see file 07) |
| `Reveal` | Fade/slide-in on view (Motion) |
| `SplitHeading` | GSAP SplitText line/word reveal |
| `Marquee` | Infinite ticker, pausable, reduced-motion aware |
| `Magnetic` | Pointer-follow magnetic wrapper |
| `SectionTheme` | Sets `data-bg/data-fg`; participates in color cross-fade |
| `Parallax` | `speed` prop; translateY on scroll |
| `Counter` | Animate number to target on view |
| `PageTransition` | Route overlay/View-Transition wrapper |

## sections/  (homepage)
| Component | Section |
|---|---|
| `Hero` | S3 |
| `DraggableShowcase` | S3 hero drag |
| `Pillars` + `PillarCard` | S4 |
| `KineticBand` | S5 |
| `SignatureCarousel` | S6 |
| `NurseryHighlight` | S7 |
| `AestheticStrip` | S8 |
| `OffersCTA` | S9 |
| `InstagramFeed` + `IgTile` | S10 |
| `Preloader` | S0 |
| `SeedlingEasterEgg` | S11 |

## menu/
| Component | Purpose |
|---|---|
| `MenuList` | Category → dishes layout on `/menu` |
| `CategoryTabs` | Sticky category nav / filter |
| `DishCard` | Photo, name, price, badges, color wash; hover zoom |

## nursery/
| Component | Purpose |
|---|---|
| `PlantGrid` | Filterable grid on `/nursery` |
| `PlantCard` | Photo, name, price, care badges; hover |
| `PlantFilters` | Filter by light/water/type/pet-friendly |
| `CareBadges` | Light/water/pet icons + labels |
| `PlantDetail` | `/nursery/[slug]` gallery + care + ask/reserve |

## ui/
| Component | Purpose |
|---|---|
| `Button` | Variants: primary/secondary/ghost (CVA); magnetic option |
| `Pill` / `Badge` | Labels, dish/plant badges |
| `Field` / `Input` / `Select` | Form controls with focus animation + zod errors |
| `Drawer` | Generic slide-over (Reserve reuses) |
| `Lightbox` | Shared-element image viewer |
| `Section` | Standard band wrapper (padding, maxw, theme) |
| `Eyebrow` | Uppercase label |
| `MapEmbed` | Google map iframe (lazy) |
| `HoursTable` | Highlights current day |
| `SocialLinks` | IG/Threads/FB |

## Providers & utilities
- `app/(site)/layout.tsx`: `LenisProvider` → `Cursor` → `Header` → `{children}` → `Footer` → `ReserveDrawer` → `CookieBanner`.
- Context: `useReserveDrawer()` (open/close), `useTheme()` (section color, optional).
- `lib/gsap-setup.ts`: register plugins once, export helpers.
- `lib/utils.ts`: `cn()` (clsx+tailwind-merge), formatters (price `Intl.NumberFormat('en-PK',{style:'currency',currency:'PKR'})`, time).

---

## Component conventions
- Server Components by default; `"use client"` only where interactivity/motion needs it.
- Every animated component reads `useReducedMotion()` (or the media query) and provides a static fallback.
- Props typed from Sanity query shapes (generate types or hand-write interfaces in `lib/types.ts`).
- All interactive controls: `focus-visible` ring, ARIA labels, keyboard support.
- Images via `next/image` with `sizes` + `placeholder="blur"` (Sanity `lqip`).
