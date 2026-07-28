import { ogImage, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og/frame";

export const alt = "Visit DAHLIA Islamabad — F-6 Markaz";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    eyebrow: "Come and see us",
    title: "F-6's greenest corner.",
    theme: "forest",
  });
}
