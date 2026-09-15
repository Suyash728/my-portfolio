import { Panel } from "@/components/Panel";
import { Row, RowList } from "@/components/Row";
import { roles } from "@/content/experience";

export function Experience() {
  return (
    <Panel id="experience" heading="Experience">
      <RowList>
        {roles.map((role, index) => (
          <Row key={role.org} marker={role.period} first={index === 0}>
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-4">
              <h3 className="text-lead font-semibold tracking-tight">
                {role.title}
              </h3>
              <span className="font-narrow text-meta tracking-rail whitespace-nowrap text-muted">
                {role.kind}
              </span>
            </div>
            <ul className="mt-2 flex list-none flex-col gap-[7px] p-0">
              {role.points.map((point) => (
                <li
                  key={point}
                  className="relative pl-[17px] text-muted before:absolute before:top-[0.68em] before:left-0 before:h-px before:w-2 before:bg-rule"
                >
                  {point}
                </li>
              ))}
            </ul>
          </Row>
        ))}
      </RowList>
    </Panel>
  );
}
