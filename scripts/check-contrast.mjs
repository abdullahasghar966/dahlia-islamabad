/**
 * WCAG AA verification for every page-level color stop (13-SEO-PERF-A11Y.md §3).
 * Run: node scripts/check-contrast.mjs
 */

const THEME = {
  bone: { bg: "#F6F1E4", fg: "#17130E" },
  cream: { bg: "#FBF6EA", fg: "#17130E" },
  terracotta: { bg: "#BA4C33", fg: "#FBF6EA" },
  clay: { bg: "#E39A4C", fg: "#17130E" },
  amber: { bg: "#F2C14E", fg: "#17130E" },
  forest: { bg: "#1E3A2B", fg: "#FBF6EA" },
  fern: { bg: "#3E5E43", fg: "#FBF6EA" },
  sage: { bg: "#6E8B5B", fg: "#17130E" },
  moss: { bg: "#AFC98A", fg: "#17130E" },
  dahlia: { bg: "#C24358", fg: "#FBF6EA" },
  blush: { bg: "#F0C9C1", fg: "#17130E" },
  sky: { bg: "#9CC4D6", fg: "#17130E" },
};

/** The original 04-DESIGN-SYSTEM.md values, for the record. */
const ORIGINAL = {
  "terracotta (spec #C85A3E)": { bg: "#C85A3E", fg: "#FBF6EA" },
  "dahlia (spec #D24E63)": { bg: "#D24E63", fg: "#FBF6EA" },
  "sage (spec #6E8B5B) + cream": { bg: "#6E8B5B", fg: "#FBF6EA" },
};

const channel = (c) => {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
};

const luminance = (hex) => {
  const n = parseInt(hex.replace("#", ""), 16);
  const r = channel((n >> 16) & 255);
  const g = channel((n >> 8) & 255);
  const b = channel(n & 255);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const ratio = (a, b) => {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
};

let failures = 0;

const report = (label, { bg, fg }, { strict = true } = {}) => {
  const r = ratio(bg, fg);
  const passAA = r >= 4.5;
  const passLarge = r >= 3;
  const mark = passAA ? "PASS" : passLarge ? "large-only" : "FAIL";
  if (strict && !passAA) failures++;
  console.log(
    `${mark.padEnd(11)} ${label.padEnd(28)} ${fg} on ${bg}  ${r.toFixed(2)}:1`,
  );
};

console.log("\nShipped page-level stops (AA body text needs 4.5:1)\n");
for (const [name, pair] of Object.entries(THEME)) report(name, pair);

console.log("\nFor reference — values as written in 04-DESIGN-SYSTEM.md\n");
for (const [name, pair] of Object.entries(ORIGINAL)) report(name, pair, { strict: false });

console.log(
  failures === 0
    ? "\nAll shipped stops meet WCAG AA for body text.\n"
    : `\n${failures} shipped stop(s) below AA.\n`,
);

process.exit(failures === 0 ? 0 : 1);
