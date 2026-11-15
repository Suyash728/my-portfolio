import React from "react";

/**
 * A visible, transparent placeholder. Every outstanding piece of content on the site
 * renders through this, so nothing can quietly ship as a dead link or an empty section.
 *
 * Refined for the hackathon with hairline dashed rule-strong borders, Inter/Archivo
 * typography, and rich contextual specification notes (e.g. pending paper windows or
 * local-first boundaries).
 */
export function Todo({
  children = "todo",
  todoContext,
}: {
  children?: string;
  todoContext?: string;
}) {
  return (
    <span
      title={todoContext ?? "Artifact in development; verified specification"}
      aria-label={
        todoContext
          ? `Specification status: ${todoContext}`
          : "Specification status: in progress"
      }
      className={`inline-block border border-dashed border-rule-strong/80 px-1.5 align-[1px] font-narrow text-tiny tracking-eyebrow text-muted transition-colors uppercase select-none ${
        todoContext ? "cursor-help hover:border-signal hover:text-ink" : ""
      }`}
    >
      {children}
    </span>
  );
}
