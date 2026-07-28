"use client";

import { Phone, UtensilsCrossed } from "lucide-react";
import { useReserveDrawer } from "@/components/layout/ReserveProvider";
import { siteSettings } from "@/lib/content/site";

/** Persistent conversion affordance on /menu and /nursery (11 · cross-page). */
export function OrderBar() {
  const { openDrawer } = useReserveDrawer();

  return (
    <div className="sticky bottom-0 z-50 border-t border-current/10 bg-[color-mix(in_srgb,var(--page-bg)_92%,transparent)] backdrop-blur-lg">
      <div className="shell flex items-center gap-2 py-3">
        <button
          type="button"
          onClick={openDrawer}
          className="inline-flex min-h-11 flex-1 items-center justify-center rounded-pill bg-[var(--page-fg)] px-4 text-small font-medium text-[color:var(--page-bg)] transition-transform duration-300 hover:scale-[1.02] motion-reduce:transition-none motion-reduce:hover:scale-100"
        >
          Reserve
        </button>

        <a
          href={siteSettings.foodpandaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-pill border border-current/30 px-4 text-small transition-colors hover:bg-current/10"
        >
          <UtensilsCrossed size={16} aria-hidden />
          <span className="hidden sm:inline">Order on </span>foodpanda
        </a>

        <a
          href={siteSettings.phoneHref}
          aria-label={`Call ${siteSettings.phone}`}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-pill border border-current/30 transition-colors hover:bg-current/10"
        >
          <Phone size={16} aria-hidden />
        </a>
      </div>
    </div>
  );
}
