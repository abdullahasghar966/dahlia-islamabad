import { ogImage, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og/frame";

export const alt = "The menu at DAHLIA Islamabad";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    eyebrow: "The café",
    title: "Straight from the pass.",
    theme: "terracotta",
  });
}
