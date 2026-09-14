import { Panel } from "@/components/Panel";
import { Row, RowList } from "@/components/Row";
import { Todo } from "@/components/Todo";
import { coursework } from "@/content/coursework";

export function Coursework() {
  return (
    <Panel
      id="coursework"
      heading="Coursework"
      intro="By theme, not by semester."
    >
      <RowList>
        {coursework.map((group, index) => (
          <Row key={group.label} marker={group.label} first={index === 0}>
            {group.subjects ?? <Todo>todo — subject list</Todo>}
          </Row>
        ))}
      </RowList>
    </Panel>
  );
}
