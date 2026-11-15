import { Panel } from "@/components/Panel";
import { TechList } from "@/components/TechList";
import { AgentSwarmVisualizer } from "@/components/AgentSwarmVisualizer";
import { stack } from "@/content/stack";

export function Stack() {
  return (
    <Panel
      id="stack"
      heading="Stack & Systems Infrastructure"
      intro="Grouped by where it executes in an applied request pipeline, grounded by local inference and deterministic rule ASTs."
    >
      <div className="flex flex-col gap-8">
        {/* Interactive Autonomous Multi-Agent Topology */}
        <AgentSwarmVisualizer />

        {/* Stack Categorized Readouts */}
        <div className="rounded-xl border border-rule bg-raised/70 p-5 shadow-xs">
          <dl className="flex flex-col gap-6">
            {stack.map((group) => (
              <div
                key={group.label}
                className="grid grid-cols-1 items-baseline gap-2 wide:grid-cols-[170px_minmax(0,1fr)] wide:gap-6 border-b border-rule-soft pb-4 last:border-b-0 last:pb-0"
              >
                <dt className="font-narrow text-meta font-semibold tracking-eyebrow text-signal uppercase flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-signal" />
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
