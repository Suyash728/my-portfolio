import { Panel } from "@/components/Panel";
import { TechList } from "@/components/TechList";
import { Todo } from "@/components/Todo";
import { projects } from "@/content/projects";

export function Projects() {
  return (
    <Panel id="projects" heading="Projects">
      {projects.map((project, index) => (
        <article
          key={project.slug}
          className={`edge group py-[22px] ${
            index === 0 ? "" : "border-t border-rule-soft"
          }`}
        >
          <div className="flex flex-wrap items-baseline justify-between gap-5">
            <h3 className="text-lead font-semibold tracking-tight">
              {project.name}
            </h3>
            <span
              className={`font-narrow text-meta tracking-rail whitespace-nowrap ${
                project.outcome.tone === "award" ? "text-flag" : "text-signal"
              }`}
            >
              {project.outcome.label}
            </span>
          </div>

          <p className="mt-2 max-w-[66ch] text-muted">{project.problem}</p>

          <p className="mt-3 max-w-[66ch] border-l-2 border-rule pl-[15px] transition-colors duration-300 group-hover:border-signal">
            {project.decision}
          </p>

          {project.detail ? (
            <p className="mt-3 max-w-[70ch] text-small text-muted">
              {project.detail}
            </p>
          ) : null}

          <TechList items={project.tech} className="mt-4" />

          <div className="mt-4 flex flex-wrap gap-5 font-narrow text-meta tracking-rail">
            {project.links.map((link) =>
              link.href ? (
                <a
                  key={link.label}
                  href={link.href}
                  className="link-draw text-signal"
                >
                  {link.label}
                </a>
              ) : (
                <span key={link.label} className="text-muted">
                  {link.label} <Todo />
                </span>
              ),
            )}
          </div>
        </article>
      ))}
    </Panel>
  );
}
