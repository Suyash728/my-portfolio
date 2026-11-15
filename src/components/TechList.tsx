"use client";

import React from "react";
import { ICONS } from "@/content/icons.generated";
import type { Tech } from "@/content/types";
import { projects } from "@/content/projects";
import { useTechFilter, setTechFilter } from "@/lib/filterState";
import { sound } from "@/lib/sound";

/**
 * Technology chips and mechanical keycaps.
 * Fully interactive and WCAG list-compliant: wraps an operable button inside
 * standard <li> list items so list semantics are preserved.
 */
export function TechList({
  items,
  variant = "default",
  className = "",
}: {
  items: Tech[];
  variant?: "default" | "keycap";
  className?: string;
}) {
  const [activeFilter] = useTechFilter();

  const handleTechClick = (name: string) => {
    sound.playClick();
    setTechFilter(name);
  };

  const isKeycap = variant === "keycap";

  return (
    <ul
      className={`flex list-none flex-wrap ${
        isKeycap ? "gap-2" : "gap-x-5 gap-y-2.5"
      } p-0 ${className}`}
    >
      {items.map((tech) => {
        const icon = tech.icon ? ICONS[tech.icon] : undefined;
        const isActive = activeFilter?.toLowerCase() === tech.name.toLowerCase();
        const matchCount = projects.filter((p) =>
          p.tech.some((t) => t.name.toLowerCase() === tech.name.toLowerCase())
        ).length;

        if (isKeycap) {
          return (
            <li key={tech.name} className="inline-flex">
              <button
                type="button"
                aria-pressed={isActive}
                onClick={() => handleTechClick(tech.name)}
                className={`keycap cursor-pointer select-none inline-flex items-center gap-1.5 px-3 py-1.5 text-tiny font-narrow uppercase tracking-eyebrow transition-all active:translate-y-[2px] ${
                  isActive
                    ? "bg-surface-sunken border-signal-teal border-b-2 border-b-signal-teal text-signal-teal font-semibold shadow-[0_0_12px_rgba(15,92,110,0.25)]"
                    : "text-ink hover:text-signal-teal"
                }`}
                style={
                  icon ? ({ "--brand": icon.hex } as React.CSSProperties) : undefined
                }
              >
                {icon ? (
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="size-3 shrink-0"
                    fill="currentColor"
                  >
                    <path d={icon.path} />
                  </svg>
                ) : null}
                <span>{tech.name}</span>
                {matchCount > 0 && (
                  <span
                    className={`ml-0.5 rounded px-1 py-0.2 text-[9.5px] tabular-nums font-mono border ${
                      isActive
                        ? "border-signal-teal/40 bg-signal-teal/15 text-signal-teal font-bold"
                        : "border-rule bg-ground/80 text-muted"
                    }`}
                  >
                    {matchCount}
                  </span>
                )}
              </button>
            </li>
          );
        }

        return (
          <li key={tech.name} className="inline-flex">
            <button
              type="button"
              aria-pressed={isActive}
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
