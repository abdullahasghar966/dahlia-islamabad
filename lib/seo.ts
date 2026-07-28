import type { Metadata } from "next";
import { siteSettings } from "@/lib/content/site";
import { menu } from "@/lib/content/menu";
import type { Plant } from "@/lib/types";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dahlia.pk";

/** `Menu — DAHLIA Islamabad (Café + Nursery)` (05-SITEMAP-IA.md §5). */
export function pageMetadata({
  title,
  description,
  path = "/",
}: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const url = new URL(path, SITE_URL).toString();
  const full = `${title} — DAHLIA Islamabad (Café + Nursery)`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: full,
      description,
      url,
      siteName: "DAHLIA Islamabad",
      locale: "en_PK",
      type: "website",
      // No `images` here on purpose: declaring them would override the
      // `opengraph-image.tsx` file convention, which renders a themed card per
      // route at build time (lib/og/frame.tsx).
    },
    twitter: {
      card: "summary_large_image",
      title: full,
      description,
    },
  };
}

const DAY_SCHEMA: Record<string, string> = {
  Sunday: "https://schema.org/Sunday",
  Monday: "https://schema.org/Monday",
  Tuesday: "https://schema.org/Tuesday",
  Wednesday: "https://schema.org/Wednesday",
  Thursday: "https://schema.org/Thursday",
  Friday: "https://schema.org/Friday",
  Saturday: "https://schema.org/Saturday",
};

/** Local-business JSON-LD for home and /visit (13-SEO-PERF-A11Y.md §1). */
export function localBusinessJsonLd() {
  const { address, socials, seo } = siteSettings;

  return {
    "@context": "https://schema.org",
    "@type": ["Restaurant", "Store"],
    name: "DAHLIA Islamabad — Nursery + Café",
    description: seo.metaDescription,
    servesCuisine: ["Café", "Brunch", "Pizza"],
    telephone: "+92-327-5000969",
    address: {
      "@type": "PostalAddress",
      streetAddress: `${address.line1}, ${address.area}`,
      addressLocality: address.city,
      postalCode: address.postal,
      addressCountry: "PK",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: address.geo.lat,
      longitude: address.geo.lng,
    },
    openingHoursSpecification: siteSettings.hours
      .filter((row) => !row.closed)
      .map((row) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: DAY_SCHEMA[row.day],
        opens: row.open,
        closes: row.close,
      })),
    priceRange: "Rs 2000–3000",
    image: [new URL("/opengraph-image", SITE_URL).toString()],
    sameAs: [socials.instagram].filter(Boolean),
    url: SITE_URL,
  };
}

/**
 * `Menu` + `MenuItem` for /menu (13-SEO-PERF-A11Y.md §1).
 *
 * Prices are emitted only where one exists — a `MenuItem` with a null price
 * omits `offers` entirely rather than publishing a zero, which Google would
 * read as "free".
 */
export function menuJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: "DAHLIA Islamabad — Café Menu",
    url: new URL("/menu", SITE_URL).toString(),
    inLanguage: "en",
    hasMenuSection: menu.map((category) => ({
      "@type": "MenuSection",
      name: category.title,
      description: category.description,
      hasMenuItem: category.dishes.map((dish) => ({
        "@type": "MenuItem",
        name: dish.name,
        description: dish.description,
        ...(dish.badges.includes("veg") ? { suitableForDiet: "https://schema.org/VegetarianDiet" } : {}),
        ...(dish.price !== null
          ? {
              offers: {
                "@type": "Offer",
                price: dish.price,
                priceCurrency: "PKR",
              },
            }
          : {}),
      })),
    })),
  };
}

/** `Product` for a plant detail page (13 §1). */
export function plantJsonLd(plant: Plant) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: plant.name,
    alternateName: plant.botanicalName,
    description: plant.careNotes[0] ?? `${plant.name} at Dahlia's nursery in Islamabad.`,
    category: "Plants",
    url: new URL(`/nursery/${plant.slug}`, SITE_URL).toString(),
    ...(plant.price !== null
      ? {
          offers: {
            "@type": "Offer",
            price: plant.price,
            priceCurrency: "PKR",
            availability: plant.inStock
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
            // Sold in the shop, not shipped.
            availableAtOrFrom: {
              "@type": "Place",
              name: "DAHLIA Islamabad",
              address: {
                "@type": "PostalAddress",
                streetAddress: `${siteSettings.address.line1}, ${siteSettings.address.area}`,
                addressLocality: siteSettings.address.city,
                addressCountry: "PK",
              },
            },
          },
        }
      : {}),
  };
}

export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: new URL(crumb.path, SITE_URL).toString(),
    })),
  };
}
