import Link from "next/link";
import { CareBadges } from "@/components/nursery/CareBadges";
import { Figure } from "@/components/ui/Figure";
import { Pill } from "@/components/ui/Pill";
import type { Plant } from "@/lib/types";
import { cn, formatPrice } from "@/lib/utils";

/**
 * Care badges are always in the DOM — 06 S7 describes them as revealed on
 * hover, but hiding them outright would strand keyboard and touch users, so
 * they fade from muted to full instead of appearing from nothing.
 */
export function PlantCard({
  plant,
  sizes,
  className,
  ratio = "portrait",
}: {
  plant: Plant;
  sizes: string;
  className?: string;
  ratio?: "portrait" | "square" | "tall";
}) {
  return (
    <article className={cn("group h-full", className)}>
      <Link
        href={`/nursery/${plant.slug}`}
        data-cursor="hover"
        className="flex h-full flex-col rounded-card focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dahlia"
      >
        <div className="relative overflow-hidden rounded-img">
          <div className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05] motion-reduce:transition-none motion-reduce:group-hover:scale-100">
            <Figure
              image={plant.images[0] ?? { alt: plant.name }}
              label={plant.name}
              tone={plant.colorTheme}
              ratio={ratio}
              seed={plant.slug}
              sizes={sizes}
            />
          </div>

          {!plant.inStock ? (
            <span className="absolute top-3 left-3">
              <Pill tone="solid">Back soon</Pill>
            </span>
          ) : null}
        </div>

        <div className="mt-4 flex flex-1 flex-col gap-1.5">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="font-display-sm text-lead leading-snug">{plant.name}</h3>
            <span className="shrink-0 text-small tabular-nums opacity-70">
              {plant.price === null ? "Ask" : formatPrice(plant.price)}
            </span>
          </div>

          <p className="text-small italic opacity-55">{plant.botanicalName}</p>

          <CareBadges
            plant={plant}
            compact
            className="mt-auto pt-3 opacity-60 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:transition-none"
          />
        </div>
      </Link>
    </article>
  );
}
