/**
 * Drawers, overlays and the lightbox pause the page behind them (07 §10).
 * Reference-counted so nested overlays don't unlock each other early.
 */

let locks = 0;
let restorePadding = "";

export function lockScroll() {
  locks += 1;
  if (locks > 1) return;

  const lenis = typeof window !== "undefined" ? window.__lenis : undefined;
  lenis?.stop();

  const el = document.documentElement;
  // Without Lenis (reduced motion) the native scrollbar still needs blocking.
  if (!lenis) {
    const gap = window.innerWidth - el.clientWidth;
    restorePadding = el.style.paddingRight;
    if (gap > 0) el.style.paddingRight = `${gap}px`;
    el.style.overflow = "hidden";
  }
}

export function unlockScroll() {
  locks = Math.max(0, locks - 1);
  if (locks > 0) return;

  const lenis = typeof window !== "undefined" ? window.__lenis : undefined;
  lenis?.start();

  if (!lenis) {
    const el = document.documentElement;
    el.style.overflow = "";
    el.style.paddingRight = restorePadding;
  }
}
