import { Panel } from "@/components/Panel";
import { Row, RowList } from "@/components/Row";
import { Todo } from "@/components/Todo";
import { education } from "@/content/education";

export function Education() {
  return (
    <Panel id="education" heading="Education">
      <RowList>
        {education.map((qualification, index) => (
          <Row
            key={qualification.award}
            marker={qualification.meta}
            first={index === 0}
          >
            <h3 className="text-lead font-semibold tracking-tight">
              {qualification.award}
            </h3>
            <p className="mt-1 text-small text-muted">
              {qualification.institution}
            </p>
            {/* Only where subjects mean something. `undefined` is a level that
                has none; `null` is a list that is still outstanding. */}
            {qualification.focus !== undefined ? (
              <p className="mt-2 text-small text-muted">
                Coursework — {qualification.focus ?? <Todo>todo — subject list</Todo>}
              </p>
            ) : null}
          </Row>
        ))}
      </RowList>
    </Panel>
  );
}
