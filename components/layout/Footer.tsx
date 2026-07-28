import Link from "next/link";
import { MapPin, Phone, UtensilsCrossed } from "lucide-react";
import { Parallax } from "@/components/motion/Parallax";
import { NewsletterForm } from "@/components/layout/NewsletterForm";
import { SeedlingEasterEgg } from "@/components/sections/SeedlingEasterEgg";
import { HoursTable } from "@/components/ui/HoursTable";
import { MapEmbed } from "@/components/ui/MapEmbed";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { siteSettings } from "@/lib/content/site";
import { themeStop } from "@/lib/theme";

const EXPLORE = [
  { href: "/menu", label: "Menu" },
  { href: "/nursery", label: "Nursery" },
  { href: "/story", label: "Story" },
  { href: "/aesthetic", label: "Aesthetic" },
  { href: "/visit", label: "Visit" },
];

const LEGAL = [
  { href: "/legal/privacy", label: "Privacy" },
  { href: "/legal/cafe-policy", label: "Café policy" },
];

/** S11 · everything practical, plus the delight. */
export function Footer() {
  const forest = themeStop("forest");
  const { address, phone, phoneHref, foodpandaUrl, mapsUrl, whatsapp } = siteSettings;

  return (
    <footer
      data-bg={forest.bg}
      data-fg={forest.fg}
      className="relative isolate overflow-hidden bg-forest text-cream"
    >
      {/* the giant background wordmark */}
      <Parallax speed={0.16} className="pointer-events-none absolute inset-x-0 bottom-0 -z-10">
        <span
          aria-hidden
          className="block w-full text-center text-mega leading-[0.8] text-cream/[0.055]"
          style={{ fontFamily: "var(--font-display)", fontVariationSettings: '"opsz" 144' }}
        >
          DAHLIA
        </span>
      </Parallax>

      <div className="shell grid gap-14 pt-[clamp(4rem,8vw,7rem)] pb-10 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        {/* ---- Visit ---- */}
        <div className="flex flex-col gap-8">
          <div>
            <h2 className="eyebrow mb-5 opacity-65">Visit</h2>
            <address className="font-display-sm text-h3 leading-[1.15] not-italic">
              {address.line1},<br />
              {address.area},<br />
              {address.city}
            </address>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <FooterAction href={mapsUrl} icon={<MapPin size={16} />}>
              Get directions
            </FooterAction>
            <FooterAction href={phoneHref} icon={<Phone size={16} />}>
              {phone}
            </FooterAction>
            <FooterAction href={foodpandaUrl} icon={<UtensilsCrossed size={16} />}>
              foodpanda
            </FooterAction>
          </div>

          <div className="max-w-md">
            <h3 className="eyebrow mb-3 opacity-65">Hours</h3>
            <HoursTable />
            <p className="mt-3 text-small text-cream/55">
              Often busy at weekends — reserving ahead is the safe move.
            </p>
          </div>

          <MapEmbed className="max-w-md" />
        </div>

        {/* ---- Explore ---- */}
        <div className="flex flex-col gap-10">
          <div>
            <h2 className="eyebrow mb-5 opacity-65">Explore</h2>
            <ul className="flex flex-col gap-1">
              {EXPLORE.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    data-cursor="hover"
                    className="font-display-sm inline-flex min-h-11 items-center py-1 text-h3 leading-[1.15] opacity-90 transition-opacity hover:opacity-100"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="eyebrow mb-4 opacity-65">Events &amp; seasonal drops</h3>
            <NewsletterForm tone="dark" className="max-w-md" />
          </div>

          <div>
            <h3 className="eyebrow mb-4 opacity-65">Follow</h3>
            <SocialLinks />
            <p className="mt-3 text-small text-cream/55">
              A feed as green as our shelves — @dahliaislamabad
            </p>
          </div>

          <div className="flex items-center gap-4">
            <SeedlingEasterEgg />
          </div>
        </div>
      </div>

      {/* ---- credits ---- */}
      <div className="shell flex flex-col gap-4 border-t border-cream/15 py-7 text-small text-cream/55 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} Dahlia — Nursery + Café. Come for the coffee, leave with a
          fern.
        </p>
        <ul className="flex flex-wrap gap-x-5">
          {LEGAL.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="link-draw inline-flex min-h-11 items-center">
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="link-draw inline-flex min-h-11 items-center"
            >
              WhatsApp
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

function FooterAction({
  href,
  icon,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      data-cursor="hover"
      className="inline-flex min-h-11 items-center gap-2 rounded-pill border border-cream/25 px-4 text-small transition-colors hover:bg-cream/10"
    >
      <span aria-hidden>{icon}</span>
      {children}
    </a>
  );
}
