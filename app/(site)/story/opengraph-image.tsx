import { ogImage, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og/frame";

export const alt = "The story behind DAHLIA Islamabad";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    eyebrow: "Our story",
    title: "Come for the coffee. Leave with a fern.",
    theme: "clay",
  });
}
