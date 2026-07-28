import { ogImage, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og/frame";

export const alt = "DAHLIA Islamabad — home to a café and a plant nursery";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/** Fallback card for any route without its own. */
export default function Image() {
  return ogImage({
    eyebrow: "F-6 Markaz · Islamabad",
    title: "Home to a café & a plant nursery.",
    theme: "forest",
  });
}
