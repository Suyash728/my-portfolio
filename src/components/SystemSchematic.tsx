"use client";

import React from "react";
import type { Schematic } from "@/content/types";
import { sound } from "@/lib/sound";

interface SystemSchematicProps {
  schematic: Schematic;
  projectName: string;
}

export function SystemSchematic({ schematic, projectName }: SystemSchematicProps) {
  const triggerGateHover = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("control-room-ping", { detail: { intensity: 1.0 } })
      );
    }
  };

  return (
    <div
      role="region"
      aria-label={`${projectName} pipeline schematic`}
      className="mt-3 bento-well p-3.5 bg-surface-sunken/80 transition-colors"
    >
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rule pb-2 mb-3 font-narrow text-tiny uppercase tracking-eyebrow">
        <span className="flex items-center gap-2 text-ink font-semibold">
          <span className="led-teal" aria-hidden="true" />
          Deterministic Verification Pipeline
        </span>
        <span className="text-muted tracking-rail tabular-nums">
          {schematic.stages.length} Verified Stages
        </span>
      </div>

      {/* Pipeline Sequence: Responsive 5-Stage Bus spanning full width on desktop */}
      <ol className="m-0 p-0 list-none grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 items-stretch">
        {schematic.stages.map((stage, idx) => {
          const isGate = stage.isGate;
          const stepNum = (idx + 1).toString().padStart(2, "0");
          const isLast = idx === schematic.stages.length - 1;

          return (
            <li
              key={stage.label}
              onMouseEnter={isGate ? triggerGateHover : undefined}
              className={`relative rounded-lg border p-3 flex flex-col justify-between transition-all ${
                isGate
                  ? "border-signal-teal bg-surface text-ink ring-2 ring-signal-teal/20 shadow-xs"
                  : "border-rule bg-surface/90 text-muted hover:border-rule-strong hover:text-ink"
              }`}
            >
              <div>
                <div className="flex items-center justify-between font-narrow text-tiny uppercase tracking-eyebrow mb-1.5">
                  <span className="tabular-nums text-muted font-sans font-medium">
                    STAGE {stepNum}
                  </span>
                  {isGate && (
                    <span className="border border-signal-teal bg-signal-teal/15 px-1.5 py-0.5 rounded text-[10px] text-signal-teal font-bold tracking-eyebrow">
                      GATE
                    </span>
                  )}
                </div>

                <div className="font-sans text-small font-semibold text-ink leading-snug">
                  {stage.label}
                </div>
              </div>

              {stage.sublabel && (
                <div className="font-narrow text-tiny tracking-rail text-muted mt-2 pt-1 border-t border-rule-soft/60">
                  {stage.sublabel}
                </div>
              )}

              {/* Connecting Desktop Arrow */}
              {!isLast && (
                <span
                  aria-hidden="true"
                  className="hidden md:flex absolute -right-2 top-1/2 -translate-y-1/2 z-10 size-4 items-center justify-center rounded-full bg-surface border border-rule text-muted text-[10px] shadow-xs"
                >
                  →
                </span>
              )}
            </li>
          );
        })}
      </ol>

      {/* Engineering Boundary Thesis Callout */}
      <div className="mt-3 border-t border-rule pt-2.5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 font-narrow text-meta tracking-rail">
        <div className="text-muted text-small font-sans max-w-[62ch]">
          <strong className="text-ink font-semibold">
            {schematic.boundaryRule}
          </strong>{" "}
          <span className="text-muted text-tiny block sm:inline mt-0.5 sm:mt-0">
            — {schematic.gateNote}
          </span>
        </div>

        <button
          type="button"
          onClick={() => {
            sound.playClick();
            triggerGateHover();
          }}
          className="self-start sm:self-auto shrink-0 rounded border border-rule-strong bg-surface px-2.5 py-1 text-tiny font-narrow uppercase tracking-eyebrow text-signal-teal hover:border-signal-teal hover:text-ink transition-colors"
          title="Verify gate telemetry signal"
        >
          Verify Gate
        </button>
      </div>
    </div>
  );
}
