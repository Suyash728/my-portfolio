import { ICONS } from "@/content/icons.generated";
import type { LinkIconName } from "@/content/types";

/**
 * Glyphs for project links. They take `currentColor`, not a brand colour, so a
 * link row reads as one object — the technology marks are the only place on the
 * page that carries brand colour.
 *
 * The repository glyph is the real GitHub mark, because that is worth
 * recognising at a glance. The other two are stroked geometry; at 13px the
 * difference in weight between the solid mark and the strokes is not readable,
 * and inventing a "solid" document glyph would be worse than either.
 */
const GLYPHS: Record<
  LinkIconName,
  { mode: "fill" | "stroke"; d: string[]; label: string }
> = {
  repo: {
    mode: "fill",
    d: [ICONS.github.path],
    label: "Repository on GitHub",
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

export function LinkIcon({ name }: { name: LinkIconName }) {
  const glyph = GLYPHS[name];
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="size-[13px] flex-none"
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
