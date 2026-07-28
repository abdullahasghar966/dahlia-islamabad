import { cn } from "@/lib/utils";
import type { DishBadge } from "@/lib/types";

export function Pill({
  children,
  className,
  tone = "outline",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "outline" | "solid" | "moss" | "dahlia" | "amber";
}) {
  return (
    <span
      className={cn(
        "eyebrow inline-flex items-center rounded-pill px-2.5 py-1 leading-none",
        tone === "outline" && "border border-current/30",
        tone === "solid" && "bg-[var(--page-fg)] text-[color:var(--page-bg)]",
        tone === "moss" && "bg-moss text-forest",
        tone === "dahlia" && "bg-dahlia text-cream",
        tone === "amber" && "bg-amber text-ink",
        className,
      )}
    >
      {children}
    </span>
  );
}

const BADGE_LABEL: Record<DishBadge, string> = {
  veg: "Veg",
  spicy: "Spicy",
  new: "New",
  seasonal: "Seasonal",
  signature: "Signature",
  "house-special": "House special",
};

const BADGE_TONE: Record<DishBadge, "moss" | "dahlia" | "amber" | "outline"> = {
  veg: "moss",
  spicy: "dahlia",
  new: "amber",
  seasonal: "outline",
  signature: "dahlia",
  "house-special": "amber",
};

export function DishBadges({ badges, className }: { badges: DishBadge[]; className?: string }) {
  if (!badges.length) return null;
  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)}>
      {badges.map((badge) => (
        <li key={badge}>
          <Pill tone={BADGE_TONE[badge]}>{BADGE_LABEL[badge]}</Pill>
        </li>
      ))}
    </ul>
  );
}
