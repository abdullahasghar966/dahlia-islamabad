import { Instagram, Play } from "lucide-react";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { Counter } from "@/components/motion/Counter";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Figure } from "@/components/ui/Figure";
import { Section } from "@/components/ui/Section";
import { instagramFallback, type IgTileData } from "@/lib/content/gallery";
import { siteSettings } from "@/lib/content/site";

/**
 * S10 · live social proof.
 *
 * TODO: Phase 4 — replace `instagramFallback` with the cached IG Basic Display
 * fetch. This curated grid is the documented fallback, so the section renders
 * identically whether or not the API is reachable.
 */
export function InstagramFeed() {
  return (
    <Section theme="bone" aria-labelledby="instagram-heading">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <Eyebrow className="mb-5">@dahliaislamabad</Eyebrow>
          <SplitHeading
            as="h2"
            id="instagram-heading"
            className="font-display-lg max-w-2xl text-h2 leading-[1.02]"
          >
            A feed as green as our shelves.
          </SplitHeading>
        </div>

        <div className="flex flex-col items-start gap-4">
          <p className="text-lead">
            <Counter to={siteSettings.followerCount} className="font-display-sm text-h3" />
            <span className="ml-2 opacity-65">and counting</span>
          </p>
          <Button href={siteSettings.socials.instagram} magnetic>
            <Instagram size={18} aria-hidden />
            Follow
          </Button>
        </div>
      </div>

      <RevealGroup className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        {instagramFallback.map((tile) => (
          <IgTile key={tile.id} tile={tile} />
        ))}
      </RevealGroup>
    </Section>
  );
}

function IgTile({ tile }: { tile: IgTileData }) {
  return (
    <a
      data-reveal
      href={tile.permalink}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="hover"
      className="group relative block overflow-hidden rounded-img focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dahlia"
    >
      <div className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06] motion-reduce:transition-none motion-reduce:group-hover:scale-100">
        <Figure
          image={tile.image}
          label={tile.caption}
          tone={tile.colorTheme}
          ratio="square"
          seed={tile.id}
          sizes="(max-width: 640px) 46vw, 30vw"
        />
      </div>

      {tile.isReel ? (
        <span
          aria-hidden
          className="absolute top-3 right-3 grid h-8 w-8 place-items-center rounded-pill bg-ink/45 text-cream backdrop-blur-sm"
        >
          <Play size={13} fill="currentColor" />
        </span>
      ) : null}

      <span className="sr-only">
        {tile.isReel ? "Reel" : "Post"}: {tile.caption} — opens Instagram in a new tab
      </span>
    </a>
  );
}
