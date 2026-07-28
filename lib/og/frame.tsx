import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { THEME } from "@/lib/theme";
import type { ColorTheme } from "@/lib/types";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

/**
 * Satori (behind ImageResponse) reads ttf/otf/woff — not woff2 — so these are
 * static Fraunces cuts kept beside this file, separate from the woff2 the site
 * itself serves.
 */
async function fonts() {
  const dir = path.join(process.cwd(), "lib", "og");
  const [semibold, regular] = await Promise.all([
    readFile(path.join(dir, "Fraunces-600.woff")),
    readFile(path.join(dir, "Fraunces-400.woff")),
  ]);
  return [
    { name: "Fraunces", data: semibold, weight: 600 as const, style: "normal" as const },
    { name: "Fraunces", data: regular, weight: 400 as const, style: "normal" as const },
  ];
}

/**
 * The shared OG card. One layout, themed per route by the colour journey
 * palette, so a shared link reads as Dahlia before the page even opens.
 */
export async function ogImage({
  eyebrow,
  title,
  theme = "forest",
}: {
  eyebrow: string;
  title: string;
  theme?: ColorTheme;
}) {
  const stop = THEME[theme] ?? THEME.forest;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: stop.bg,
          color: stop.fg,
          padding: 72,
          fontFamily: "Fraunces",
          position: "relative",
        }}
      >
        {/* a bloom, cropped off the right edge */}
        <div
          style={{
            position: "absolute",
            top: -150,
            right: -150,
            width: 620,
            height: 620,
            borderRadius: 620,
            border: `2px solid ${stop.fg}`,
            opacity: 0.16,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: -40,
            right: -40,
            width: 400,
            height: 400,
            borderRadius: 400,
            border: `2px solid ${stop.fg}`,
            opacity: 0.12,
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 40, height: 2, background: stop.fg, opacity: 0.5, display: "flex" }} />
          <div
            style={{
              fontSize: 22,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            Dahlia
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 900 }}>
          <div style={{ fontSize: 24, letterSpacing: "0.14em", textTransform: "uppercase", opacity: 0.7 }}>
            {eyebrow}
          </div>
          <div style={{ fontSize: 82, lineHeight: 1.04, fontWeight: 600, letterSpacing: "-0.02em" }}>
            {title}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, opacity: 0.75 }}>
          <div style={{ display: "flex" }}>Café + Plant Nursery</div>
          <div style={{ display: "flex" }}>1 Agha Khan Rd, F-6 Markaz, Islamabad</div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: await fonts() },
  );
}
