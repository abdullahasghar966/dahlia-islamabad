import { ogImage, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og/frame";

export const alt = "The plant nursery at DAHLIA Islamabad";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    eyebrow: "The nursery",
    title: "Bring the outside in.",
    theme: "fern",
  });
}
