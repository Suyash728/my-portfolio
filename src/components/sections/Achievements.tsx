import { Panel } from "@/components/Panel";
import { Row, RowList } from "@/components/Row";
import { achievements, activities } from "@/content/achievements";

export function Achievements() {
  return (
    <Panel id="achievements" heading="Achievements">
      <RowList>
        {achievements.map((item, index) => (
          <Row key={item.title} marker={item.marker} first={index === 0}>
            <h3 className="text-lead font-semibold tracking-tight">
              {item.title}
            </h3>
            {item.detail ? (
              <p className="mt-1 text-small text-muted">{item.detail}</p>
            ) : null}
          </Row>
        ))}
        {activities.map((item) => (
          <Row key={item.marker} marker={item.marker}>
            <p className="text-small text-muted">{item.text}</p>
          </Row>
        ))}
      </RowList>
    </Panel>
  );
}
