"use client";

import React from "react";
import { Panel } from "@/components/Panel";
import { TechList } from "@/components/TechList";
import { AgentSwarmVisualizer } from "@/components/AgentSwarmVisualizer";
import { stack } from "@/content/stack";
import { useTechFilter, clearTechFilter } from "@/lib/filterState";
import { sound } from "@/lib/sound";

export function Stack() {
  const [activeFilter] = useTechFilter();

  return (
    <Panel
      id="stack"
      heading="Stack & Systems Infrastructure"
      intro="Grouped by where each tool executes in a production request pipeline. Click any technology to filter and highlight matching shipped systems above."
    >
      <div className="flex flex-col gap-8">
        {/* Interactive Autonomous Multi-Agent Topology */}
        <AgentSwarmVisualizer />

        {/* Stack Categorized Readouts */}
        <div className="border border-rule bg-raised/70 p-5">
          {activeFilter && (
            <div className="mb-4 flex items-center justify-between border-b border-rule-soft pb-3 font-narrow text-meta tracking-rail">
              <span className="text-signal">
                Filtering by <strong>{activeFilter}</strong> · Highlighting active request paths across projects
              </span>
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  clearTechFilter();
                }}
                className="border border-rule-strong bg-ground px-2 py-0.5 text-tiny uppercase tracking-eyebrow text-muted hover:border-signal hover:text-ink transition-colors"
              >
                Clear Filter [×]
              </button>
            </div>
          )}

          <dl className="flex flex-col gap-6">
            {stack.map((group) => (
              <div
                key={group.label}
                className="grid grid-cols-1 items-baseline gap-2 wide:grid-cols-[170px_minmax(0,1fr)] wide:gap-6 border-b border-rule-soft pb-4 last:border-b-0 last:pb-0"
              >
                <dt className="font-narrow text-meta font-semibold tracking-eyebrow text-signal uppercase flex items-center gap-1.5">
                  <span className="size-1.5 bg-signal flex-none" aria-hidden="true" />
                  {group.label}
                </dt>
                <dd className="m-0">
                  <TechList items={group.items} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Panel>
  );
}
