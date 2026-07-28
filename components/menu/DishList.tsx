import { DishBadges } from "@/components/ui/Pill";
import type { Dish } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

/**
 * Right-aligned price list for the categories that carry little or no
 * description — drinks and add-ons. The real menu sets these as a plain list
 * rather than photo cards (02b §0), and seventeen photo tiles of soft drinks
 * would read far worse than the typography it actually uses.
 */
export function DishList({ dishes }: { dishes: Dish[] }) {
  return (
    <ul className="mt-10 grid gap-x-14 sm:grid-cols-2">
      {dishes.map((dish) => (
        <li key={dish.slug} className="border-b border-current/10 py-4">
          <div className="flex items-baseline gap-3">
            <span className="font-display-sm text-lead leading-snug">{dish.name}</span>

            {/* dotted leader, purely decorative */}
            <span
              aria-hidden
              className="min-w-6 flex-1 translate-y-[-0.3em] border-b border-dotted border-current/30"
            />

            <span className="shrink-0 text-body tabular-nums opacity-80">
              {dish.price === null ? "Ask" : formatPrice(dish.price)}
            </span>
          </div>

          {dish.description ? (
            <p className="mt-1 text-small opacity-60">{dish.description}</p>
          ) : null}

          <DishBadges badges={dish.badges} className="mt-2" />
        </li>
      ))}
    </ul>
  );
}
