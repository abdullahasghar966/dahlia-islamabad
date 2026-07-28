/**
 * Shapes mirror the GROQ projections in 08-CONTENT-MODEL-SANITY.md §2 so that
 * swapping `lib/content/*` for real Sanity fetches in Phase 3 is a data-source
 * change, not a component change.
 */

export type ColorTheme =
  | "bone"
  | "cream"
  | "terracotta"
  | "clay"
  | "amber"
  | "forest"
  | "fern"
  | "sage"
  | "moss"
  | "dahlia"
  | "blush"
  | "sky";

export type ImageRef = {
  /** Absent until real photography lands — components fall back to placeholder art. */
  url?: string;
  lqip?: string;
  alt: string;
};

export type DishBadge = "veg" | "spicy" | "new" | "seasonal" | "signature" | "house-special";

export type Dish = {
  name: string;
  slug: string;
  description: string;
  /** PKR, exclusive of GST (02b). `null` only where the menu prints no price. */
  price: number | null;
  badges: DishBadge[];
  colorTheme: ColorTheme;
  isSignature: boolean;
  available: boolean;
  /** Kitchen note printed on the menu, e.g. "bake time 25 mins". */
  note?: string;
  image: ImageRef;
};

export type MenuCategory = {
  title: string;
  slug: string;
  description: string;
  colorTheme: ColorTheme;
  /**
   * Drinks and add-ons carry no descriptions on the real menu, so they read
   * better as a right-aligned price list than as photo cards (02b §0).
   */
  layout: "cards" | "list";
  dishes: Dish[];
};

/** Bank partnership discount (02b §3) — time-sensitive, CMS-managed. */
export type Discount = {
  bank: string;
  card: string;
  percent: number;
  /** Maximum PKR discount per transaction. */
  cap: number;
};

export type Light = "low" | "bright-indirect" | "full-sun";
export type Water = "low" | "medium" | "high";
export type Difficulty = "easy" | "medium" | "expert";

export type Plant = {
  name: string;
  slug: string;
  botanicalName: string;
  categorySlug: string;
  price: number | null;
  light: Light;
  water: Water;
  difficulty: Difficulty;
  petFriendly: boolean;
  size: string;
  careNotes: string[];
  inStock: boolean;
  isFeatured: boolean;
  colorTheme: ColorTheme;
  images: ImageRef[];
};

export type PlantCategory = {
  title: string;
  slug: string;
  description: string;
};

export type GalleryImage = {
  id: string;
  caption: string;
  tags: string[];
  featured: boolean;
  colorTheme: ColorTheme;
  image: ImageRef;
};

export type Testimonial = {
  quote: string;
  author: string;
  source: string;
  rating: number;
};

export type Offer = {
  title: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  colorTheme: ColorTheme;
  active: boolean;
};

export type HoursRow = {
  day: string;
  open: string;
  close: string;
  closed: boolean;
};

export type SiteSettings = {
  title: string;
  tagline: string;
  phone: string;
  phoneHref: string;
  whatsapp: string;
  foodpandaUrl: string;
  mapsUrl: string;
  mapEmbedUrl: string;
  address: {
    line1: string;
    area: string;
    city: string;
    postal: string;
    country: string;
    geo: { lat: number; lng: number };
  };
  hours: HoursRow[];
  socials: { instagram: string; threads?: string; facebook?: string };
  announcement: string;
  followerCount: number;
  /** Verified café policy (02b §1) — drives reserve logic, not just copy. */
  policy: {
    /** Below this party size the house is walk-in only. */
    reservableFromPartySize: number;
    /** A held table is released after this many minutes. */
    holdMinutes: number;
    /** Dining window in minutes, by party size. */
    diningMinutes: { small: number; large: number };
    serviceChargePercent: number;
    serviceChargeFromPartySize: number;
  };
  priceNote: string;
  serviceNote: string;
  seo: { metaTitle: string; metaDescription: string };
};

export type Pillar = {
  title: string;
  line: string;
  icon: "plate" | "leaf" | "table" | "sparkle";
  colorTheme: ColorTheme;
};
