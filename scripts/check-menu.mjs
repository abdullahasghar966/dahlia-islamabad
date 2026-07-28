/**
 * Verifies the shipped menu against the canonical seed.
 *
 * `Dahlia-Website-Spec/08-CONTENT-MODEL-SANITY.md §6` carries a machine-readable
 * array of every dish transcribed from the owner's own menu. This diffs
 * `lib/content/menu.ts` against it so a typo in a name or a price — the kind of
 * error nobody notices until a customer is charged the wrong amount — fails
 * loudly instead of shipping.
 *
 * Run: node --experimental-strip-types scripts/check-menu.mjs
 */

import { readFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();

const spec = await readFile(
  path.join(root, "Dahlia-Website-Spec", "08-CONTENT-MODEL-SANITY.md"),
  "utf8",
);

// The appendix is the one ```json fence that parses as an array of dishes.
const fences = [...spec.matchAll(/```json\s*([\s\S]*?)```/g)].map((m) => m[1]);
let seed = null;
for (const block of fences) {
  try {
    const parsed = JSON.parse(block);
    if (Array.isArray(parsed) && parsed[0]?.name && "price" in parsed[0]) {
      seed = parsed;
      break;
    }
  } catch {
    /* not the array we want */
  }
}

if (!seed) {
  console.error("Could not find the dish seed array in 08 §6.");
  process.exit(1);
}

const { menu } = await import(
  pathToFileURL(path.join(root, "lib", "content", "menu.ts")).href
);

/**
 * Known, intentional differences between the seed's keys and what ships.
 *
 * Listed one by one rather than derived by a rule. A tempting rule — "ignore
 * anything in parentheses" — would also collapse "Fiesta Burrito Bowl
 * (Chicken)" and "(Beef)" into one dish, which are separate items at different
 * prices. Being explicit means a genuinely new mismatch still fails.
 */
const NAME_ALIASES = {
  // The seed keeps the serving qualifier in the name; the site moves it to the
  // description so the price list reads cleanly.
  "americano hot iced": "americano",
  "cafe latte hot iced": "cafe latte",
  "cafe latte flavoured hot iced": "cafe latte flavoured",
  "fresh juice seasonal": "fresh juice",
};

/** The seed uses a short category key; the site uses the full URL slug. */
const CATEGORY_ALIASES = {
  pizza: "detroit style pizza",
};

const shipped = new Map();
for (const category of menu) {
  for (const dish of category.dishes) {
    shipped.set(norm(dish.name), { ...dish, cat: category.slug });
  }
}

const problems = [];
const seen = new Set();

for (const item of seed) {
  const key = NAME_ALIASES[norm(item.name)] ?? norm(item.name);
  seen.add(key);
  const got = shipped.get(key);

  if (!got) {
    problems.push(`MISSING   ${item.name} (${item.cat})`);
    continue;
  }
  if (got.price !== item.price) {
    problems.push(`PRICE     ${item.name}: spec Rs ${item.price}, shipped Rs ${got.price}`);
  }
  const expectedCat = CATEGORY_ALIASES[norm(item.cat)] ?? norm(item.cat);
  if (norm(got.cat) !== expectedCat) {
    problems.push(`CATEGORY  ${item.name}: spec "${item.cat}", shipped "${got.cat}"`);
  }
  if (item.signature && !got.isSignature) {
    problems.push(`SIGNATURE ${item.name}: spec marks it signature, shipped does not`);
  }
  for (const badge of item.badges ?? []) {
    if (!got.badges.includes(badge)) {
      problems.push(`BADGE     ${item.name}: spec assigns "${badge}", shipped does not`);
    }
  }
}

const extra = [...shipped.keys()].filter((k) => !seen.has(k));

console.log(`\nSeed items:    ${seed.length}`);
console.log(`Shipped items: ${shipped.size}`);
if (extra.length) {
  console.log(`\nShipped but not in the seed (${extra.length}):`);
  for (const k of extra) console.log(`  · ${shipped.get(k).name} (${shipped.get(k).cat})`);
}

if (problems.length) {
  console.log(`\n${problems.length} mismatch(es):\n`);
  for (const p of problems) console.log("  " + p);
  console.log("");
  process.exit(1);
}

console.log("\nEvery seeded dish matches the shipped menu on name, price, category and badges.\n");

/**
 * Compare loosely: the seed and the site differ only in punctuation and casing.
 * Accents are folded rather than stripped — otherwise "Café" collapses to "caf"
 * and every accented dish (Café Latte, Soufflé Pancakes) silently fails to match.
 */
function norm(value) {
  return String(value)
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}
