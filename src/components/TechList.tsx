"use client";

import React from "react";
import { ICONS } from "@/content/icons.generated";
import type { Tech } from "@/content/types";
import { useTechFilter, setTechFilter } from "@/lib/filterState";
import { sound } from "@/lib/sound";

/**
 * Technology chips. Anything with a brand mark gets its icon — grey at rest,
 * brand colour on hover. Anything without one (pgvector, RAG, rate limiting)
 * renders as a plain chip rather than being given an invented logo.
 *
 * Fully interactive and WCAG list-compliant: wraps an operable button inside
 * standard <li> list items so list semantics are preserved.
 */
export function TechList({
  items,
  className = "",
}: {
  items: Tech[];
  className?: string;
}) {
  const [activeFilter] = useTechFilter();

  const handleTechClick = (name: string) => {
    sound.playClick();
    setTechFilter(name);
  };

  return (
    <ul
      className={`flex list-none flex-wrap gap-x-5 gap-y-2.5 p-0 ${className}`}
    >
      {items.map((tech) => {
        const icon = tech.icon ? ICONS[tech.icon] : undefined;
        const isActive = activeFilter?.toLowerCase() === tech.name.toLowerCase();

        return (
          <li key={tech.name} className="inline-flex">
            <button
              type="button"
              aria-pressed={isActive}
              aria-label={`Filter projects using ${tech.name}`}
              onClick={() => handleTechClick(tech.name)}
              className={`cursor-pointer select-none transition-all ${
                icon ? "tech" : "tech tech-plain"
              } ${
                isActive
                  ? "text-signal font-semibold border-b-2 border-signal"
                  : "border-b border-transparent"
              }`}
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
            </button>
          </li>
        );
      })}
    </ul>
  );
}
