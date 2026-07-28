import type { ColorTheme } from "@/lib/types";

/**
 * The color-journey palette (04-DESIGN-SYSTEM.md §1, 06-HOMEPAGE-SECTIONS.md).
 * Each entry is a page-level {background, foreground} stop that the scroll
 * controller cross-fades between.
 *
 * NOTE ON CONTRAST — 04 §1 asserts that `cream` on `terracotta` and on `dahlia`
 * passes AA. Measured, they do not: #FBF6EA on #C85A3E is 3.90:1 and on #D24E63
 * is 3.87:1, both short of the 4.5:1 body-text floor. The bright hexes are kept
 * as brand/accent tokens (large display type, fills, rules, illustration), and
 * these two page-background stops use slightly deepened variants that measure
 * 4.70:1 and 4.61:1. `scripts/check-contrast.mjs` re-verifies every pair.
 */
export const THEME: Record<ColorTheme, { bg: string; fg: string }> = {
  bone: { bg: "#F6F1E4", fg: "#17130E" },
  cream: { bg: "#FBF6EA", fg: "#17130E" },
  terracotta: { bg: "#BA4C33", fg: "#FBF6EA" },
  clay: { bg: "#E39A4C", fg: "#17130E" },
  amber: { bg: "#F2C14E", fg: "#17130E" },
  forest: { bg: "#1E3A2B", fg: "#FBF6EA" },
  fern: { bg: "#3E5E43", fg: "#FBF6EA" },
  // Deliberately paired with ink, not cream: cream on sage is only 3.54:1.
  sage: { bg: "#6E8B5B", fg: "#17130E" },
  moss: { bg: "#AFC98A", fg: "#17130E" },
  dahlia: { bg: "#C24358", fg: "#FBF6EA" },
  blush: { bg: "#F0C9C1", fg: "#17130E" },
  sky: { bg: "#9CC4D6", fg: "#17130E" },
};

/** Bright brand values — accents, graphics, and large display type only. */
export const ACCENT = {
  terracotta: "#C85A3E",
  dahlia: "#D24E63",
  clay: "#E39A4C",
  amber: "#F2C14E",
  moss: "#AFC98A",
  sage: "#6E8B5B",
  blush: "#F0C9C1",
  forest: "#1E3A2B",
  fern: "#3E5E43",
} as const;

export function themeStop(theme: ColorTheme) {
  return THEME[theme] ?? THEME.bone;
}
