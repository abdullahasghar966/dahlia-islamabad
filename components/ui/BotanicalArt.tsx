import { hashIndex } from "@/lib/utils";

/**
 * Decorative botanical line art (12-ASSETS-CHECKLIST.md §5). Drawn as SVG so it
 * scales, themes to `currentColor`, and costs nothing to ship.
 */

export type Motif = "leaf" | "sprig" | "bloom" | "pot" | "cup" | "monstera" | "arches";

/** `arches` is excluded — it is the brand device, placed deliberately, never at random. */
const MOTIFS: Motif[] = ["leaf", "sprig", "bloom", "pot", "cup", "monstera"];

/** Stable per item, so a dish or plant always gets the same drawing. */
export function motifFor(seed: string): Motif {
  return MOTIFS[hashIndex(seed, MOTIFS.length)];
}

export function BotanicalArt({
  motif = "leaf",
  className,
  strokeWidth = 3,
}: {
  motif?: Motif;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {motif === "leaf" && <Leaf />}
      {motif === "sprig" && <Sprig />}
      {motif === "bloom" && <Bloom />}
      {motif === "pot" && <Pot />}
      {motif === "cup" && <Cup />}
      {motif === "monstera" && <MonsteraLeaf />}
      {motif === "arches" && <Arches />}
    </svg>
  );
}

/**
 * The two arched greenhouse windows from Dahlia's real logo (02b §0), drawn as
 * a thin single line with a ground line joining them. 02b calls for this as a
 * recurring brand device rather than a one-off, so it lives here alongside the
 * botanical motifs and is used as section framing.
 */
function Arches() {
  return (
    <g>
      <path d="M96 300V168a52 52 0 0 1 104 0v132" transform="translate(-24 0)" />
      <path d="M200 300V168a52 52 0 0 1 104 0v132" transform="translate(24 0)" />
      {/* mullions */}
      <path d="M124 300V168a28 28 0 0 1 56 0v132M152 140v160" />
      <path d="M248 300V168a28 28 0 0 1 56 0v132M276 140v160" />
      {/* transoms */}
      <path d="M76 216h152M200 216h152" />
      {/* ground line */}
      <path d="M40 300h320" />
    </g>
  );
}

function Leaf() {
  return (
    <g>
      <path d="M200 78c62 42 78 138 0 244-78-106-62-202 0-244Z" />
      <path d="M200 96v212" />
      <path d="M200 152l46-24M200 152l-46-24M200 202l54-30M200 202l-54-30M200 252l44-28M200 252l-44-28" />
    </g>
  );
}

function Sprig() {
  return (
    <g>
      <path d="M200 340c0-90 6-160 0-244" />
      {[
        { y: 268, s: 1 },
        { y: 212, s: 0.88 },
        { y: 158, s: 0.74 },
      ].map(({ y, s }) => (
        <g key={y} transform={`translate(200 ${y}) scale(${s})`}>
          <path d="M0 0c34-8 54-32 50-56-30 0-50 26-50 56Z" transform="translate(0 0)" />
          <path d="M0 0c-34-8-54-32-50-56 30 0 50 26 50 56Z" transform="translate(0 14)" />
        </g>
      ))}
      <path d="M200 96c0-16 8-28 22-34-2 18-8 30-22 34Z" />
    </g>
  );
}

function Bloom() {
  return (
    <g>
      {Array.from({ length: 12 }).map((_, i) => (
        <path
          key={i}
          d="M200 196c16-34 16-70 0-96-16 26-16 62 0 96Z"
          transform={`rotate(${i * 30} 200 200)`}
        />
      ))}
      {Array.from({ length: 6 }).map((_, i) => (
        <path
          key={`inner-${i}`}
          d="M200 200c10-20 10-38 0-52-10 14-10 32 0 52Z"
          transform={`rotate(${i * 60 + 30} 200 200)`}
        />
      ))}
      <circle cx="200" cy="200" r="17" />
    </g>
  );
}

function Pot() {
  return (
    <g>
      <path d="M136 244h128l-14 84a10 10 0 0 1-10 8h-80a10 10 0 0 1-10-8l-14-84Z" />
      <rect x="126" y="222" width="148" height="26" rx="10" />
      <path d="M200 222c0-52 4-88 0-124" />
      <path d="M200 168c30-6 48-28 44-52-26 2-44 24-44 52Z" />
      <path d="M200 200c-30-6-48-28-44-52 26 2 44 24 44 52Z" />
      <path d="M200 132c22-4 34-20 32-38-19 2-32 18-32 38Z" />
    </g>
  );
}

function Cup() {
  return (
    <g>
      <path d="M112 190h158v56a70 70 0 0 1-70 70h-18a70 70 0 0 1-70-70v-56Z" />
      <path d="M270 206h20a34 34 0 0 1 0 68h-20" />
      <path d="M104 330h182" />
      <path d="M168 152c-14-14-14-30 0-44M204 152c-14-14-14-30 0-44M240 152c-14-14-14-30 0-44" />
    </g>
  );
}

function MonsteraLeaf() {
  return (
    <g>
      <path d="M200 344V208" />
      <path d="M200 208c-84 0-128-52-128-116 64-16 128 12 128 116Z" />
      <path d="M200 208c84 0 128-52 128-116-64-16-128 12-128 116Z" />
      <path d="M132 108l30 46M96 128l40 34M180 100l14 52M268 108l-30 46M304 128l-40 34M220 100l-14 52" />
    </g>
  );
}
