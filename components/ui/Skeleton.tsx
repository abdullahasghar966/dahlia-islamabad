import { cn } from "@/lib/utils";

/**
 * Loading placeholders (05-SITEMAP-IA.md §6).
 *
 * Built and ready, but **not wired to a `loading.tsx` yet, on purpose.**
 * Adding one to a route creates a Suspense boundary whether or not anything
 * suspends, and Next then serves that page's content inside `<div hidden>` for
 * an inline script to reveal. Verified in a production build: with `loading.tsx`
 * present, /menu and /nursery shipped hidden content and a `$RC` reveal script
 * while every other route stayed plain static HTML — so those two pages alone
 * would have gone blank without JS, for no benefit, since neither fetches
 * anything today.
 *
 * Wire these up in Phase 3, when the pages actually fetch from Sanity and the
 * boundary earns its cost. The shapes already match the real grids so nothing
 * jumps when data lands.
 */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "animate-pulse rounded-img bg-current/10 motion-reduce:animate-none",
        className,
      )}
    />
  );
}

export function CardGridSkeleton({
  count = 8,
  ratio = "aspect-[4/5]",
}: {
  count?: number;
  ratio?: string;
}) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className="grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4 lg:gap-8"
    >
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex flex-col gap-4">
          <Skeleton className={ratio} />
          <Skeleton className="h-4 w-3/4 rounded-pill" />
          <Skeleton className="h-3 w-1/2 rounded-pill" />
        </div>
      ))}
      <span className="sr-only">Loading…</span>
    </div>
  );
}
