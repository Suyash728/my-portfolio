import { Panel } from "@/components/Panel";
import { Row, RowList } from "@/components/Row";
import { education } from "@/content/education";

export function Education({ className = "" }: { className?: string }) {
  return (
    <Panel id="education" heading="Education" className={className}>
      <RowList>
        {education.map((qualification, index) => (
          <Row
            key={qualification.award}
            marker={qualification.meta}
            first={index === 0}
          >
            <h3 className="font-sans text-lead font-semibold tracking-tight text-ink">
              {qualification.award}
            </h3>
            <p className="font-narrow text-meta tracking-rail text-muted">
              {qualification.institution}
            </p>
            {qualification.focus ? (
              <p className="mt-2 text-small text-muted">
                Coursework — {qualification.focus}
              </p>
            ) : null}
          </Row>
        ))}
      </RowList>
    </Panel>
  );
}
