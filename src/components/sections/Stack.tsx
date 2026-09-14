import { Panel } from "@/components/Panel";
import { TechList } from "@/components/TechList";
import { stack } from "@/content/stack";

export function Stack() {
  return (
    <Panel
      id="stack"
      heading="Stack"
      intro="Grouped by where it sits in a request, not by logo."
    >
      <dl className="flex flex-col gap-[22px]">
        {stack.map((group) => (
          <div
            key={group.label}
            className="grid grid-cols-1 items-start gap-1.5 wide:grid-cols-[150px_minmax(0,1fr)] wide:gap-5"
          >
            <dt className="font-narrow text-meta tracking-label text-muted uppercase wide:pt-[7px]">
              {group.label}
            </dt>
            <dd className="m-0">
              <TechList items={group.items} />
            </dd>
          </div>
        ))}
      </dl>
    </Panel>
  );
}
