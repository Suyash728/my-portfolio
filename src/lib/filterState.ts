"use client";

import { useEffect, useState } from "react";

let currentFilter: string | null = null;
const listeners = new Set<(filter: string | null) => void>();

export function setTechFilter(techName: string | null) {
  currentFilter = currentFilter === techName ? null : techName;
  listeners.forEach((listener) => listener(currentFilter));
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("control-room-ping", { detail: { intensity: 0.8 } })
    );
  }
}

export function clearTechFilter() {
  currentFilter = null;
  listeners.forEach((listener) => listener(null));
}

export function getTechFilter(): string | null {
  return currentFilter;
}

/**
 * Normalized tech stack matcher.
 * Ensures:
 * - "Next.js" matches "Next.js 14" and "Next.js" (count = 2)
 * - "Gemini API" matches "Gemini" and "Gemini 2.5 Flash"
 * - Case-insensitive exact or normalized matching
 */
export function techMatches(filter: string | null | undefined, projectTechName: string): boolean {
  if (!filter) return false;
  const a = filter.toLowerCase().trim();
  const b = projectTechName.toLowerCase().trim();
  if (a === b) return true;

  // Next.js family
  if (a === "next.js" && b.startsWith("next.js")) return true;
  if (b === "next.js" && a.startsWith("next.js")) return true;

  // Gemini family
  if ((a === "gemini api" || a === "gemini") && b.includes("gemini")) return true;
  if ((b === "gemini api" || b === "gemini") && a.includes("gemini")) return true;

  return false;
}

export function useTechFilter() {
  const [filter, setFilter] = useState<string | null>(currentFilter);

  useEffect(() => {
    const handleUpdate = (newFilter: string | null) => setFilter(newFilter);
    listeners.add(handleUpdate);
    return () => {
      listeners.delete(handleUpdate);
    };
  }, []);

  return [filter, setTechFilter] as const;
}
