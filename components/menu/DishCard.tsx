import { Figure } from "@/components/ui/Figure";
import { DishBadges } from "@/components/ui/Pill";
import type { Dish } from "@/lib/types";
import { cn, formatPrice } from "@/lib/utils";

/** Photo, name, one-line, price, badges — with a hover lift + image zoom. */
export function DishCard({
  dish,
  sizes,
  className,
  ratio = "portrait",
}: {
  dish: Dish;
  sizes: string;
  className?: string;
  ratio?: "portrait" | "square" | "landscape";
}) {
  return (
    <article
      data-cursor="hover"
      className={cn(
        "group flex h-full flex-col",
        "transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
        "hover:-translate-y-1.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0",
        className,
      )}
    >
      <div className="overflow-hidden rounded-img">
        <div className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05] motion-reduce:transition-none motion-reduce:group-hover:scale-100">
          <Figure
            image={dish.image}
            label={dish.name}
            tone={dish.colorTheme}
            ratio={ratio}
            seed={dish.slug}
            sizes={sizes}
          />
        </div>
      </div>

      <div className="mt-5 flex flex-1 flex-col gap-2">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display-sm text-lead leading-snug">{dish.name}</h3>
          <span className="shrink-0 text-small tabular-nums opacity-70">
            {dish.price === null ? "Ask" : formatPrice(dish.price)}
          </span>
        </div>

        <p className="text-small leading-relaxed opacity-65">{dish.description}</p>

        {dish.note ? (
          <p className="text-small italic opacity-50">{dish.note}</p>
        ) : null}

        <DishBadges badges={dish.badges} className="mt-auto pt-3" />
      </div>
    </article>
  );
}
