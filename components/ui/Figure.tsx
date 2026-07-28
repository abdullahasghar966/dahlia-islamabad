import Image from "next/image";
import { BotanicalArt, motifFor, type Motif } from "@/components/ui/BotanicalArt";
import { themeStop } from "@/lib/theme";
import type { ColorTheme, ImageRef } from "@/lib/types";
import { cn } from "@/lib/utils";

const RATIO: Record<string, string> = {
  square: "aspect-square",
  portrait: "aspect-[4/5]",
  tall: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  wide: "aspect-[16/10]",
  cinema: "aspect-[21/9]",
};

type FigureProps = {
  image: ImageRef;
  /** Drawn into the placeholder so an empty tile still says what it will hold. */
  label?: string;
  tone?: ColorTheme;
  ratio?: keyof typeof RATIO;
  sizes: string;
  priority?: boolean;
  className?: string;
  /** Seed for picking the motif; falls back to the label. */
  seed?: string;
  motif?: Motif;
  rounded?: "img" | "card" | "none";
};

/**
 * One image surface for the whole site.
 *
 * TODO: real photography. Until `image.url` exists this renders designed
 * placeholder art at the *final* aspect ratio and with the final `sizes`, so
 * dropping real photos in causes no layout change (12 · placeholder strategy).
 */
export function Figure({
  image,
  label,
  tone = "moss",
  ratio = "portrait",
  sizes,
  priority = false,
  className,
  seed,
  motif,
  rounded = "img",
}: FigureProps) {
  const stop = themeStop(tone);
  const shell = cn(
    "relative isolate w-full overflow-hidden",
    RATIO[ratio],
    rounded === "img" && "rounded-img",
    rounded === "card" && "rounded-card",
    className,
  );

  if (image.url) {
    return (
      <div className={shell}>
        <Image
          src={image.url}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
          {...(image.lqip ? { placeholder: "blur" as const, blurDataURL: image.lqip } : {})}
        />
      </div>
    );
  }

  return (
    <div
      className={shell}
      style={{ backgroundColor: stop.bg, color: stop.fg }}
      role="img"
      aria-label={image.alt}
    >
      {/* soft organic wash */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-45"
        style={{
          background: `radial-gradient(120% 90% at 18% 8%, ${stop.fg}22 0%, transparent 55%),
                       radial-gradient(90% 80% at 88% 96%, ${stop.fg}1f 0%, transparent 60%)`,
        }}
      />
      <BotanicalArt
        motif={motif ?? motifFor(seed ?? label ?? image.alt)}
        className="absolute inset-0 h-full w-full opacity-[0.22]"
        strokeWidth={4}
      />
      {label ? (
        <span
          aria-hidden
          className="font-display-sm absolute inset-x-0 bottom-0 p-4 text-small leading-tight opacity-70"
        >
          {label}
        </span>
      ) : null}
      <span
        aria-hidden
        className="eyebrow absolute top-3 right-3 rounded-pill border border-current/30 px-2 py-0.5 text-[0.6rem] opacity-50"
      >
        Photo soon
      </span>
    </div>
  );
}
