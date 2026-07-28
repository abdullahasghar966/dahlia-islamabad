"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";
import { siteSettings } from "@/lib/content/site";
import { cn } from "@/lib/utils";

/**
 * Lazy Google Maps embed — the iframe is only created once the block is near
 * the viewport, so it never costs anything on first paint (13 §2).
 *
 * TODO: real asset — swap `mapEmbedUrl` for the owner's place-ID embed URL.
 */
export function MapEmbed({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <div
      ref={ref}
      className={cn(
        "relative aspect-[4/3] w-full overflow-hidden rounded-img bg-current/10",
        className,
      )}
    >
      {visible ? (
        <iframe
          src={siteSettings.mapEmbedUrl}
          title="Dahlia on Google Maps — 1 Agha Khan Rd, F-6 Markaz, Islamabad"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center gap-2 text-small opacity-60">
          <MapPin size={22} aria-hidden />
        </div>
      )}
    </div>
  );
}
