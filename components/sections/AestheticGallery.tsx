"use client";

import { useMemo, useState } from "react";
import { Figure } from "@/components/ui/Figure";
import { Lightbox } from "@/components/ui/Lightbox";
import { gallery, galleryTags } from "@/lib/content/gallery";
import { cn, hashIndex } from "@/lib/utils";

const RATIOS = ["portrait", "landscape", "square", "tall"] as const;

/**
 * /aesthetic · a masonry wall with tag filtering.
 *
 * Tiles here are unique and stable, so the lightbox gets the real shared-element
 * transition (`sharedLayout`) rather than the plain fade the homepage strip uses.
 */
export function AestheticGallery() {
  const [tag, setTag] = useState<string | null>(null);
  const [open, setOpen] = useState<number | null>(null);

  const visible = useMemo(
    () => (tag ? gallery.filter((g) => g.tags.includes(tag)) : gallery),
    [tag],
  );

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by tag">
        <Chip active={tag === null} onClick={() => setTag(null)}>
          Everything
        </Chip>
        {galleryTags.map((item) => (
          <Chip key={item} active={tag === item} onClick={() => setTag(tag === item ? null : item)}>
            {item}
          </Chip>
        ))}
      </div>

      <p aria-live="polite" className="mt-6 text-small opacity-60">
        {visible.length} {visible.length === 1 ? "photograph" : "photographs"}
      </p>

      {visible.length ? (
        <div className="strip mt-8 gap-5 [column-count:1] sm:[column-count:2] lg:[column-count:3]">
          {visible.map((item, i) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setOpen(i)}
              data-cursor="hover"
              aria-label={`Open image: ${item.caption}`}
              className="strip-tile mb-5 block w-full break-inside-avoid rounded-img text-left transition-[transform,filter,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dahlia motion-reduce:transition-none"
            >
              <Figure
                image={item.image}
                label={item.caption}
                tone={item.colorTheme}
                ratio={RATIOS[hashIndex(item.id, RATIOS.length)]}
                seed={item.id}
                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
              />
            </button>
          ))}
        </div>
      ) : (
        <p className="mt-10 rounded-card border border-current/20 px-6 py-14 text-center opacity-65">
          Nothing tagged that way yet. Try &ldquo;everything&rdquo;.
        </p>
      )}

      <Lightbox
        items={visible}
        index={open}
        onClose={() => setOpen(null)}
        onNavigate={setOpen}
        sharedLayout
      />
    </div>
  );
}

function Chip({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex min-h-11 items-center rounded-pill border px-4 text-small capitalize",
        "transition-colors duration-300",
        active
          ? "border-transparent bg-[var(--page-fg)] text-[color:var(--page-bg)]"
          : "border-current/25 opacity-75 hover:opacity-100",
      )}
    >
      {children}
    </button>
  );
}
