"use client";

import React from "react";
import { ICONS } from "@/content/icons.generated";
import type { Tech } from "@/content/types";
import { projects } from "@/content/projects";
import { useTechFilter, setTechFilter, techMatches } from "@/lib/filterState";
import { sound } from "@/lib/sound";
import {
  Database,
  ArrowLeftRight,
  Gauge,
  Binary,
  MapPin,
  Zap,
  Workflow,
  Layers,
  Palette,
  ScrollText,
  ScanText,
  Tags,
  Volume2,
  Bug,
  HardDrive,
  Cog,
  SquareTerminal,
} from "lucide-react";

/**
 * Fallback semantic icons for practice/architecture keycaps that lack a Simple Icon.
 * Rendered in semantic vivid tones (teal, orange, violet, emerald) so no keycap looks bare.
 */
export const PRACTICE_ICONS: Record<
  string,
  { icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>; color: string }
> = {
  SQL: { icon: Database, color: "#0284C7" },
  "REST design": { icon: ArrowLeftRight, color: "#10B981" },
  "Rate limiting": { icon: Gauge, color: "#FF5500" },
  pgvector: { icon: Binary, color: "#7C3AED" },
  PostGIS: { icon: MapPin, color: "#0F5C6E" },
  Groq: { icon: Zap, color: "#FF5500" },
  "RAG pipelines": { icon: Workflow, color: "#7C3AED" },
  Embeddings: { icon: Layers, color: "#0F5C6E" },
  "ComfyUI (Flux)": { icon: Palette, color: "#D946EF" },
  "Smart contracts": { icon: ScrollText, color: "#7C3AED" },
  "OCR extraction": { icon: ScanText, color: "#0F5C6E" },
  NER: { icon: Tags, color: "#10B981" },
  "Text to speech": { icon: Volume2, color: "#7C3AED" },
  "Mutation testing": { icon: Bug, color: "#FF5500" },
  "Btrfs / Snapper": { icon: HardDrive, color: "#0F5C6E" },
  systemd: { icon: Cog, color: "#10B981" },
  "Shell scripting": { icon: SquareTerminal, color: "#FF5500" },
};

/**
 * Returns the vivid official brand color (or tuned contrast-safe hex for light surfaces).
 */
export function getTechBrandColor(name: string, iconSlug?: string): string {
  if (PRACTICE_ICONS[name]) return PRACTICE_ICONS[name].color;

  const lower = name.toLowerCase();
  switch (lower) {
    case "javascript":
      return "#EAB308"; // Contrast-safe vivid gold on light theme
    case "java":
      return "#E76F00"; // Java official orange
    case "react":
      return "#087EA4"; // React contrast blue
    case "langchain":
      return "#10B981"; // LangChain vivid emerald
    case "biobert":
      return "#F59E0B"; // Hugging Face amber
    case "solidity":
      return "#627EEA"; // Ethereum purple-blue
    case "next.js":
    case "next.js 14":
    case "vercel":
    case "github":
      return "#111318"; // Crisp ink for dark monochrome marks
    case "railway":
      return "#8B5CF6";
    case "linux":
      return "#EAB308";
    case "bigquery":
      return "#4285F4";
  }

  if (iconSlug && ICONS[iconSlug as keyof typeof ICONS]) {
    const icon = ICONS[iconSlug as keyof typeof ICONS];
    const brandStr = icon.brand as string;
    if (
      brandStr === "#000000" ||
      brandStr === "#0B0D0E" ||
      brandStr === "#181717"
    ) {
      return "#111318";
    }
    return icon.brand;
  }

  return "#0F5C6E";
}

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
        const practice = PRACTICE_ICONS[tech.name];
        const PracticeIcon = practice?.icon;
        const brandColor = getTechBrandColor(tech.name, tech.icon);

        const isActive = techMatches(activeFilter, tech.name);
        const matchCount = projects.filter((p) =>
          p.tech.some((t) => techMatches(tech.name, t.name))
        ).length;

        if (isKeycap) {
          return (
            <li key={tech.name} className="inline-flex">
              <button
                type="button"
                aria-pressed={isActive}
                onClick={() => handleTechClick(tech.name)}
                className={`keycap group cursor-pointer select-none inline-flex items-center gap-1.5 px-3 py-1.5 text-tiny font-narrow uppercase tracking-eyebrow transition-all ${
                  isActive ? "active-keycap font-semibold text-ink" : "text-ink"
                }`}
                style={{ "--brand-color": brandColor } as React.CSSProperties}
              >
                {icon ? (
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="size-3.5 shrink-0 transition-transform group-hover:scale-110"
                    fill={brandColor}
                  >
                    <path d={icon.path} />
                  </svg>
                ) : PracticeIcon ? (
                  <PracticeIcon
                    className="size-3.5 shrink-0 transition-transform group-hover:scale-110"
                    style={{ color: brandColor }}
                  />
                ) : null}
                <span>{tech.name}</span>
                {matchCount > 0 && (
                  <span
                    className={`ml-0.5 rounded px-1 py-0.2 text-[9.5px] tabular-nums font-mono border transition-colors ${
                      isActive
                        ? "border-current bg-current/15 font-bold"
                        : "border-rule bg-ground/80 text-muted group-hover:border-current"
                    }`}
                    style={isActive ? { color: brandColor } : undefined}
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
                icon || PracticeIcon ? "tech" : "tech tech-plain"
              } ${
                isActive
                  ? "text-signal font-semibold border-b-2 border-signal"
                  : "border-b border-transparent hover:text-signal"
              }`}
              style={
                {
                  "--brand": brandColor,
                  "--brand-color": brandColor,
                } as React.CSSProperties
              }
            >
              {icon ? (
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  fill={brandColor}
                  className="size-3.5 shrink-0"
                >
                  <path d={icon.path} />
                </svg>
              ) : PracticeIcon ? (
                <PracticeIcon
                  className="size-3.5 shrink-0"
                  style={{ color: brandColor }}
                />
              ) : null}
              <span>{tech.name}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
