import Link from "next/link";
import { BotanicalArt } from "@/components/ui/BotanicalArt";

/**
 * Lost in the greenhouse (05-SITEMAP-IA.md §6).
 * Lives at the app root so it also catches routes outside the (site) group,
 * and therefore renders its own minimal chrome.
 */
export default function NotFound() {
  return (
    <main className="grid min-h-[100svh] place-items-center bg-bone px-6 text-ink">
      <div className="flex max-w-lg flex-col items-center text-center">
        <BotanicalArt motif="pot" className="w-32 opacity-30" strokeWidth={3} />

        <p className="eyebrow mt-8 opacity-55">Error 404</p>

        <h1 className="font-display-lg mt-4 text-h1 leading-[1.0]">
          Lost in the greenhouse.
        </h1>

        <p className="mt-6 text-lead opacity-70">
          That page isn&apos;t on any of our shelves. It happens — the good stuff is this way.
        </p>

        <nav aria-label="Helpful links" className="mt-9 flex flex-wrap justify-center gap-3">
          {[
            { href: "/", label: "Home" },
            { href: "/menu", label: "Menu" },
            { href: "/nursery", label: "Nursery" },
            { href: "/visit", label: "Visit" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex min-h-11 items-center rounded-pill border border-ink/25 px-5 text-small transition-colors hover:bg-ink hover:text-bone"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </main>
  );
}
