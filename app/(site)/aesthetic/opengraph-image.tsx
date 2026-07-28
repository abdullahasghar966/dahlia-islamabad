import { ogImage, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og/frame";

export const alt = "The DAHLIA Islamabad lookbook";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    eyebrow: "The lookbook",
    title: "The room does half the work.",
    theme: "blush",
  });
}
