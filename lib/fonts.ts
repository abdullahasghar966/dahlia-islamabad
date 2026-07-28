import localFont from "next/font/local";

/**
 * Self-hosted per 04-DESIGN-SYSTEM.md §2 and 13-SEO-PERF-A11Y.md §2.
 * Two families only — contrast comes from size and weight, like the reference.
 */

export const fraunces = localFont({
  src: [
    {
      path: "../public/fonts/Fraunces-Variable.woff2",
      weight: "300 700",
      style: "normal",
    },
    {
      path: "../public/fonts/Fraunces-Variable-Italic.woff2",
      weight: "300 700",
      style: "italic",
    },
  ],
  variable: "--font-fraunces",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

export const generalSans = localFont({
  src: [
    { path: "../public/fonts/GeneralSans-400.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/GeneralSans-500.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/GeneralSans-600.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/GeneralSans-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-general-sans",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "sans-serif"],
});
