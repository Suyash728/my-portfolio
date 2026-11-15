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
      aria-label={`${projectName} system architecture schematic`}
      className="mt-3 border border-rule bg-raised/70 p-4 transition-colors"
    >
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rule-soft pb-2.5 mb-3 font-narrow text-tiny uppercase tracking-eyebrow">
        <span className="flex items-center gap-2 text-ink font-semibold">
          <span className="size-1.5 bg-signal" aria-hidden="true" />
          Deterministic Pipeline &amp; Verification Gate
        </span>
        <span className="text-muted tracking-rail">
          {schematic.stages.length} Verified Stages
        </span>
      </div>

      {/* Pipeline Sequence: Responsive Flex on desktop, Vertical Stepped Bus on mobile */}
      <ol className="m-0 p-0 list-none grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-2.5">
        {schematic.stages.map((stage, idx) => {
          const isGate = stage.isGate;
          const stepNum = (idx + 1).toString().padStart(2, "0");

          return (
            <li
              key={stage.label}
              onMouseEnter={isGate ? triggerGateHover : undefined}
              className={`relative border p-2.5 transition-colors ${
                isGate
                  ? "border-signal bg-ground/90 text-ink ring-1 ring-signal/30"
                  : "border-rule bg-ground/50 text-muted hover:border-rule-strong hover:text-ink"
              }`}
            >
              <div className="flex items-center justify-between font-narrow text-tiny uppercase tracking-eyebrow mb-1">
                <span className="tabular-nums text-muted">
                  STAGE {stepNum}
                </span>
                {isGate && (
                  <span className="border border-signal bg-signal/10 px-1 py-0.5 text-signal font-semibold tracking-rail">
                    GATE
                  </span>
                )}
              </div>

              <div className="font-sans text-small font-semibold text-ink leading-snug">
                {stage.label}
              </div>

              {stage.sublabel && (
                <div className="font-narrow text-tiny tracking-rail text-muted mt-1">
                  {stage.sublabel}
                </div>
              )}
            </li>
          );
        })}
      </ol>

      {/* Engineering Boundary Thesis Callout */}
      <div className="mt-3 border-t border-rule-soft pt-2.5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 font-narrow text-meta tracking-rail">
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
          className="self-start sm:self-auto shrink-0 border border-rule-strong bg-raised px-2.5 py-1 text-tiny font-narrow uppercase tracking-eyebrow text-signal hover:border-signal hover:text-ink transition-colors"
          title="Verify system telemetry signal"
        >
          Verify Gate
        </button>
      </div>
    </div>
  );
}
