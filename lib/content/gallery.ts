import type { ColorTheme, GalleryImage } from "@/lib/types";

/**
 * The "Aesthetic" wall (02-BRAND-DAHLIA.md §8, 11-INNER-PAGES.md /aesthetic).
 *
 * TODO: real photography — 10–15 of the owner's best interior / golden-hour
 * shots (12-ASSETS-CHECKLIST.md §2). Captions and tags below are drafts; the
 * tones drive the placeholder art so the wall still reads as a designed grid.
 */

type Seed = {
  caption: string;
  tags: string[];
  tone: ColorTheme;
  featured?: boolean;
};

const seeds: Seed[] = [
  { caption: "The long table, mid-afternoon", tags: ["interior", "tables"], tone: "clay", featured: true },
  { caption: "Shelves, four rows deep", tags: ["plants", "interior"], tone: "forest", featured: true },
  { caption: "Golden hour through the front glass", tags: ["light", "interior"], tone: "amber", featured: true },
  { caption: "Whipped ricotta, before it went", tags: ["food"], tone: "terracotta", featured: true },
  { caption: "Monstera in the corner seat", tags: ["plants"], tone: "fern" },
  { caption: "Coffee, two cups, no rush", tags: ["food", "drinks"], tone: "moss" },
  { caption: "Terracotta stacked by the door", tags: ["plants", "detail"], tone: "terracotta" },
  { caption: "Sunday, ten past ten", tags: ["interior", "light"], tone: "blush" },
  { caption: "The pass at full tilt", tags: ["kitchen", "food"], tone: "dahlia" },
  { caption: "Ferns and the good light", tags: ["plants", "light"], tone: "sage" },
  { caption: "Corner two, always taken", tags: ["interior", "tables"], tone: "clay" },
  { caption: "Watering, before open", tags: ["plants", "detail"], tone: "fern" },
];

export const gallery: GalleryImage[] = seeds.map((seed, i) => ({
  id: `gallery-${i + 1}`,
  caption: seed.caption,
  tags: seed.tags,
  featured: seed.featured ?? false,
  colorTheme: seed.tone,
  image: { alt: `${seed.caption} — Dahlia Islamabad` },
}));

export const galleryTags = Array.from(new Set(gallery.flatMap((g) => g.tags))).sort();

export const featuredGallery = gallery.filter((g) => g.featured);

/**
 * S10 · Instagram feed placeholder.
 * TODO: replace with the cached IG Basic Display fetch in Phase 4; this curated
 * grid is the documented fallback (06-HOMEPAGE-SECTIONS.md S10).
 */
export const instagramFallback = gallery.slice(0, 9).map((g, i) => ({
  id: `ig-${i + 1}`,
  permalink: "https://www.instagram.com/dahliaislamabad/",
  caption: g.caption,
  isReel: i % 3 === 1,
  colorTheme: g.colorTheme,
  image: g.image,
}));

export type IgTileData = (typeof instagramFallback)[number];
