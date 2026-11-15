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
