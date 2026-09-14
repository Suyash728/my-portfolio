import { ICONS } from "@/content/icons.generated";
import type { Tech } from "@/content/types";

/**
 * Technology chips. Anything with a brand mark gets its icon — grey at rest,
 * brand colour on hover. Anything without one (pgvector, RAG, rate limiting)
 * renders as a plain chip rather than being given an invented logo.
 */
export function TechList({
  items,
  className = "",
}: {
  items: Tech[];
  className?: string;
}) {
  return (
    <ul
      className={`flex list-none flex-wrap gap-x-5 gap-y-2.5 p-0 ${className}`}
    >
      {items.map((tech) => {
        const icon = tech.icon ? ICONS[tech.icon] : undefined;
        return (
          <li
            key={tech.name}
            className={icon ? "tech" : "tech tech-plain"}
            style={
              icon ? ({ "--brand": icon.hex } as React.CSSProperties) : undefined
            }
          >
            {icon ? (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d={icon.path} />
              </svg>
            ) : null}
            <span>{tech.name}</span>
          </li>
        );
      })}
    </ul>
  );
}
