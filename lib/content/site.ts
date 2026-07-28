import type { Discount, Offer, Pillar, SiteSettings, Testimonial } from "@/lib/types";

/**
 * Verified facts from 02-BRAND-DAHLIA.md §2. Anything marked TODO needs the
 * owner to confirm before launch (12-ASSETS-CHECKLIST.md §3).
 */
export const siteSettings: SiteSettings = {
  title: "DAHLIA — Nursery + Café",
  tagline: "Home to a café and plant nursery.",
  phone: "0327 5000969",
  phoneHref: "tel:+923275000969",
  whatsapp: "https://wa.me/923275000969",
  // TODO: real asset — owner to supply the foodpanda store URL.
  foodpandaUrl: "https://www.foodpanda.pk/",
  // TODO: real asset — owner to supply the exact Google Maps place link.
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Dahlia+Nursery+Cafe+F-6+Markaz+Islamabad",
  // TODO: real asset — owner to supply the Maps embed URL for their place ID.
  mapEmbedUrl:
    "https://www.google.com/maps?q=1%20Agha%20Khan%20Rd,%20F-6%20Markaz,%20Islamabad&output=embed",
  address: {
    line1: "1 Agha Khan Rd",
    area: "F-6 Markaz, F-6/3",
    city: "Islamabad",
    postal: "25000",
    country: "Pakistan",
    // TODO: confirm exact coordinates with the owner (approximate F-6 Markaz).
    geo: { lat: 33.7294, lng: 73.0771 },
  },
  /**
   * TODO: confirm exact per-day hours. 02-BRAND-DAHLIA.md records weekdays
   * 12:00–23:00 and weekends 10:00–23:00, with a note that Tue–Fri may open ~11:00.
   */
  hours: [
    { day: "Sunday", open: "10:00", close: "23:00", closed: false },
    { day: "Monday", open: "12:00", close: "23:00", closed: false },
    { day: "Tuesday", open: "12:00", close: "23:00", closed: false },
    { day: "Wednesday", open: "12:00", close: "23:00", closed: false },
    { day: "Thursday", open: "12:00", close: "23:00", closed: false },
    { day: "Friday", open: "12:00", close: "23:00", closed: false },
    { day: "Saturday", open: "10:00", close: "23:00", closed: false },
  ],
  socials: {
    instagram: "https://www.instagram.com/dahliaislamabad/",
  },
  announcement:
    "Now growing in F-6 Islamabad · Café + Nursery · Walk-ins welcome · Tables of 8+ can reserve ahead · ☎ 0327 5000969",
  followerCount: 16700,
  /** Verified from the owner's own "Cafe Policy" highlight (02b §1). */
  policy: {
    reservableFromPartySize: 8,
    holdMinutes: 15,
    diningMinutes: { small: 105, large: 120 },
    serviceChargePercent: 10,
    serviceChargeFromPartySize: 10,
  },
  priceNote: "Prices exclusive of GST.",
  serviceNote: "A 10% service charge is added to tables of 10 or more.",
  seo: {
    metaTitle: "DAHLIA Islamabad — Café + Plant Nursery in F-6",
    metaDescription:
      "Home to a café and a plant nursery in F-6 Markaz, Islamabad. From-scratch brunch, whipped ricotta pizza, and shelves of plants to take home.",
  },
};

/** 02-BRAND-DAHLIA.md §5 — the homepage benefit row. */
export const pillars: Pillar[] = [
  {
    title: "Eat well",
    line: "Seasonal, from-scratch plates — brunch that's worth the wait.",
    icon: "plate",
    colorTheme: "terracotta",
  },
  {
    title: "Grow green",
    line: "A living nursery: pick a plant, we'll tell you how to keep it happy.",
    icon: "leaf",
    colorTheme: "forest",
  },
  {
    title: "Gather",
    line: "Tables for long lunches, good talks, and better afternoons.",
    icon: "table",
    colorTheme: "clay",
  },
  {
    title: "Feel good",
    line: "The kind of green, golden-hour space you photograph on the way out.",
    icon: "sparkle",
    colorTheme: "dahlia",
  },
];

export const offers: Offer[] = [
  {
    title: "Big table? That one you can book.",
    body: "We run on walk-ins, but tables of eight or more can be reserved across the week. Tell us when, and the Lotus french toast will be waiting.",
    ctaLabel: "Reserve a table",
    ctaHref: "#reserve",
    colorTheme: "dahlia",
    active: true,
  },
];

/**
 * Bank partnership discounts (02b §3), transcribed from the owner's highlights.
 *
 * TODO: confirm current validity before launch — the HBL card is dated June 2
 * and the Allied Bank card July 15 2025, and these deals rotate. 02b is explicit
 * that they must be CMS-managed and never hard-coded; this array is the interim
 * stand-in for that Sanity document and should be the first thing wired in
 * Phase 3 so staff can retire an expired offer without a deploy.
 */
export const discounts: Discount[] = [
  { bank: "HBL", card: "Infinite Credit Card", percent: 40, cap: 10000 },
  { bank: "HBL", card: "Elite World Debit Card", percent: 40, cap: 10000 },
  { bank: "HBL", card: "Platinum Credit Card", percent: 25, cap: 5000 },
  { bank: "HBL", card: "World Debit Card", percent: 25, cap: 5000 },
  { bank: "HBL", card: "Gold Credit Card", percent: 20, cap: 5000 },
  { bank: "HBL", card: "Titanium Debit Card", percent: 20, cap: 5000 },
  { bank: "HBL", card: "Gold Debit Card", percent: 20, cap: 5000 },
  { bank: "Allied Bank", card: "Visa Premium Debit Card", percent: 40, cap: 4000 },
  { bank: "Allied Bank", card: "Visa Platinum Debit Card", percent: 20, cap: 2000 },
  { bank: "Allied Bank", card: "Visa Platinum Credit Card", percent: 20, cap: 2000 },
];

export const discountsByBank = discounts.reduce<Record<string, Discount[]>>((acc, d) => {
  (acc[d.bank] ??= []).push(d);
  return acc;
}, {});

/** TODO: replace with real Google / Tripadvisor pulls (12-ASSETS-CHECKLIST.md §3). */
export const testimonials: Testimonial[] = [
  {
    quote: "The greenest corner of F-6. We came for coffee and left with a fern.",
    author: "Placeholder review",
    source: "Google",
    rating: 5,
  },
  {
    quote: "Service and atmosphere are the draw — worth the wait on a weekend.",
    author: "Placeholder review",
    source: "Tripadvisor",
    rating: 5,
  },
  {
    quote: "Whipped ricotta pizza, a table under the plants, three hours gone.",
    author: "Placeholder review",
    source: "Google",
    rating: 5,
  },
];
