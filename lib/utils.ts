import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * The fluid type scale in globals.css defines custom `--text-*` tokens, so
 * `text-lead`, `text-h2`, `text-small`… are font sizes. tailwind-merge only
 * knows Tailwind's stock sizes (`text-sm`, `text-2xl`, …) and files every other
 * `text-*` under its `text-color` catch-all — which made `text-lead` collide
 * with a real colour class and silently win, leaving ink text on an ink button.
 *
 * Registering the scale puts these back in the `font-size` group, so a size and
 * a colour can coexist on the same element the way they are written.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["mega", "h1", "h2", "h3", "lead", "body", "small", "label"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const pkr = new Intl.NumberFormat("en-PK", {
  style: "currency",
  currency: "PKR",
  maximumFractionDigits: 0,
});

/** `1450` → `Rs 1,450` */
export function formatPrice(value: number) {
  return pkr.format(value).replace("PKR", "Rs").replace(/ /g, " ").trim();
}

/** `"23:00"` → `"11:00 pm"` */
export function formatTime(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  if (Number.isNaN(h)) return hhmm;
  const suffix = h >= 12 ? "pm" : "am";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${String(m ?? 0).padStart(2, "0")} ${suffix}`;
}

/** Pakistan Standard Time is UTC+5 with no DST — safe to hard-offset. */
export function islamabadDayIndex(now: Date = new Date()) {
  const utc = now.getTime() + now.getTimezoneOffset() * 60_000;
  return new Date(utc + 5 * 3_600_000).getDay();
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

/** Deterministic 0..n-1 from a string — keeps placeholder art stable per item. */
export function hashIndex(seed: string, length: number) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0;
  return Math.abs(h) % Math.max(length, 1);
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}
