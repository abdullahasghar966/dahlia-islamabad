import { Marquee } from "@/components/motion/Marquee";
import { siteSettings } from "@/lib/content/site";

/**
 * S1 · thin ticker of freshness + key info. The text is read once by assistive
 * tech from the visually-hidden copy; the moving strip itself is decorative and
 * pausable on hover (13 §3).
 *
 * Deliberately carries no `data-bg`: it paints its own forest strip and is only
 * ~40px tall, so letting it drive the page-level color journey would make the
 * whole canvas flash dark for a band you have already scrolled past.
 */
export function AnnouncementBar() {
  const parts = siteSettings.announcement.split("·").map((p) => p.trim());

  return (
    <div className="relative z-[90] flex h-10 items-center bg-forest text-cream">
      <p className="sr-only">{siteSettings.announcement}</p>
      <Marquee duration={44} gap="2.5rem" decorative>
        {parts.map((part, i) => (
          <span key={`${part}-${i}`} className="eyebrow flex items-center gap-10 whitespace-nowrap">
            {part}
            <span aria-hidden className="inline-block h-1 w-1 rounded-full bg-moss" />
          </span>
        ))}
      </Marquee>
    </div>
  );
}
