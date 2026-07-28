import type Lenis from "lenis";

declare global {
  interface Window {
    /** Exposed by LenisProvider so drawers/modals can pause smooth scroll. */
    __lenis?: Lenis;
  }
}

export {};
