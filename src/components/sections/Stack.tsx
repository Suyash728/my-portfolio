"use client";

import React from "react";
import { Panel } from "@/components/Panel";
import { TechList } from "@/components/TechList";
import { stack } from "@/content/stack";
import { useTechFilter, clearTechFilter } from "@/lib/filterState";
import { sound } from "@/lib/sound";
import { X } from "lucide-react";

export function Stack() {
  const [activeFilter] = useTechFilter();

  return (
    <Panel
      id="stack"
      heading="Technology Stack & Pipeline Roles"
      intro="Categorized strictly by where each tool executes in a production request. Click any technology to filter matching Spotlight and Archive systems."
    >
      <div className="bento-card p-5">
        {/* Active Filter Callout Bar */}
        {activeFilter && (
          <div className="mb-5 flex items-center justify-between bento-well p-3 border-signal-teal font-narrow text-meta tracking-rail">
            <span className="flex items-center gap-2 text-ink">
              <span className="led-teal" />
              <span>
                Filtering systems deployed with{" "}
                <strong className="text-signal-teal font-semibold">{activeFilter}</strong>
              </span>
            </span>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                clearTechFilter();
              }}
              className="inline-flex items-center gap-1 rounded border border-rule-strong bg-surface px-2.5 py-1 text-tiny font-narrow uppercase tracking-eyebrow text-muted hover:border-signal-teal hover:text-ink transition-colors"
            >
              <span>Clear Filter</span>
              <X className="size-3" />
            </button>
          </div>
        )}

        <dl className="grid grid-cols-1 gap-5">
          {stack.map((group) => (
            <div
              key={group.label}
              className="grid grid-cols-1 items-baseline gap-2 wide:grid-cols-[160px_minmax(0,1fr)] wide:gap-6 border-b border-rule-soft pb-4 last:border-b-0 last:pb-0"
            >
              <dt className="font-narrow text-meta font-semibold tracking-eyebrow text-signal-teal uppercase flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-signal-teal" aria-hidden="true" />
                <span>{group.label}</span>
              </dt>
              <dd className="m-0">
                <TechList items={group.items} variant="keycap" />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Panel>
  );
}
