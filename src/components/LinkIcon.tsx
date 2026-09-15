import { ICONS } from "@/content/icons.generated";
import type { LinkIconName } from "@/content/types";

/**
 * Every glyph the page draws outside the technology list: project link types,
 * the heading arrow, and the three marks in the rail.
 *
 * They take `currentColor`, not a brand colour, so a link row reads as one
 * object — the technology marks stay the only place on the page that carries
 * brand colour, and the rail stays the one loud element without also becoming
 * the one colourful one.
 *
 * The GitHub and LinkedIn marks are the real ones, because those are worth
 * recognising at a glance. The rest are stroked geometry; at 13px the
 * difference in weight between a solid mark and the strokes is not readable,
 * and inventing a "solid" document glyph would be worse than either.
 */
export type GlyphName = LinkIconName | "arrow" | "github" | "linkedin" | "mail";

const GLYPHS: Record<
  GlyphName,
  { mode: "fill" | "stroke"; d: string[]; label: string }
> = {
  /** Affordance, not a link type: marks a heading as leading somewhere. */
  arrow: {
    mode: "stroke",
    d: ["M7 17 17 7", "M8 7h9v9"],
    label: "Opens in a new page",
  },
  repo: {
    mode: "fill",
    d: [ICONS.github.path],
    label: "Repository on GitHub",
  },
  /** Same mark as `repo`, different job: a profile in the rail, not a project. */
  github: {
    mode: "fill",
    d: [ICONS.github.path],
    label: "GitHub profile",
  },
  linkedin: {
    mode: "fill",
    d: [ICONS.linkedin.path],
    label: "LinkedIn profile",
  },
  mail: {
    mode: "stroke",
    d: ["M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z", "m3.6 6.6 8.4 6 8.4-6"],
    label: "Email",
  },
  live: {
    mode: "stroke",
    d: [
      "M13 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7",
      "M15 3h6v6",
      "M10.5 13.5 21 3",
    ],
    label: "Opens in a new page",
  },
  paper: {
    mode: "stroke",
    d: [
      "M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z",
      "M14 3v5h5",
      "M9 13h6",
      "M9 17h4",
    ],
    label: "Published paper",
  },
};

export function LinkIcon({
  name,
  className = "size-[13px] flex-none",
}: {
  name: GlyphName;
  className?: string;
}) {
  const glyph = GLYPHS[name];
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill={glyph.mode === "fill" ? "currentColor" : "none"}
      stroke={glyph.mode === "stroke" ? "currentColor" : "none"}
      strokeWidth={glyph.mode === "stroke" ? 2 : undefined}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {glyph.d.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}
