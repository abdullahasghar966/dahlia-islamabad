import type { ColorTheme } from "@/lib/types";
import { themeStop } from "@/lib/theme";
import { cn } from "@/lib/utils";

type SectionProps = {
  children: React.ReactNode;
  /** The page-level color stop this band owns (06 · section rhythm). */
  theme?: ColorTheme;
  id?: string;
  className?: string;
  /** Wrap children in the centered 1440px shell. */
  contained?: boolean;
  /** Standard vertical rhythm. Off for full-bleed bands that set their own. */
  padded?: boolean;
  /**
   * Opt into `content-visibility: auto` (13 §2).
   *
   * Off by default, and deliberately so: this page is driven end-to-end by
   * ScrollTrigger, and an unrendered section reports its `contain-intrinsic-size`
   * placeholder rather than its real height. That makes every trigger position
   * below it wrong until a refresh, and resizes the document mid-scroll. Worth
   * it only on long, static content that hosts no scroll animation.
   */
  deferPaint?: boolean;
  as?: "section" | "div" | "footer" | "header";
  "aria-label"?: string;
  "aria-labelledby"?: string;
};

/**
 * A band. Sections are transparent — the animated `--page-bg` shows through,
 * which is what makes the cross-fade read as one continuous journey rather than
 * a stack of colored boxes. `data-bg`/`data-fg` are what ThemeController reads.
 */
export function Section({
  children,
  theme = "bone",
  id,
  className,
  contained = true,
  padded = true,
  deferPaint = false,
  as: Tag = "section",
  ...aria
}: SectionProps) {
  const stop = themeStop(theme);

  return (
    <Tag
      id={id}
      data-bg={stop.bg}
      data-fg={stop.fg}
      data-theme={theme}
      className={cn("relative", padded && "band-y", deferPaint && "defer-paint", className)}
      {...aria}
    >
      {contained ? <div className="shell">{children}</div> : children}
    </Tag>
  );
}
