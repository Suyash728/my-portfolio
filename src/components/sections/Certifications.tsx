import { Panel } from "@/components/Panel";
import { Row, RowList } from "@/components/Row";
import { Todo } from "@/components/Todo";
import { certifications } from "@/content/certifications";

export function Certifications() {
  return (
    <Panel id="certifications" heading="Certifications">
      <RowList>
        {certifications.map((cert, index) => (
          <Row key={cert.name} marker={cert.issuer} first={index === 0}>
            {cert.credential ? (
              <a href={cert.credential} className="link-draw text-signal">
                {cert.name}
              </a>
            ) : (
              <span>
                {cert.name} <Todo>todo — credential link</Todo>
              </span>
            )}
          </Row>
        ))}
        <Row marker={<Todo />}>
          Remaining certifications — issuer, date, credential link
        </Row>
      </RowList>
    </Panel>
  );
}
