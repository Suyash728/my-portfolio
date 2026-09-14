import { LinkIcon } from "@/components/LinkIcon";
import { Panel } from "@/components/Panel";
import { TechList } from "@/components/TechList";
import { Todo } from "@/components/Todo";
import { projects } from "@/content/projects";
import type { Project } from "@/content/types";

/**
 * Where the project's heading leads. The repository if there is one, otherwise
 * whichever link actually resolves — and nothing at all when none do, because a
 * heading that looks clickable and isn't is worse than a plain one.
 */
function headlineLink(project: Project) {
  const resolved = project.links.filter((link) => link.href !== null);
  return resolved.find((link) => link.icon === "repo") ?? resolved[0] ?? null;
}

export function Projects() {
  return (
    <Panel id="projects" heading="Projects">
      {projects.map((project, index) => {
        const headline = headlineLink(project);

        return (
          <article
            key={project.slug}
            className={`edge group py-[22px] ${
              index === 0 ? "" : "border-t border-rule-soft"
            }`}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-5">
              <h3 className="text-lead font-semibold tracking-tight">
                {headline?.href ? (
                  <a
                    href={headline.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="title-link"
                    aria-label={`${project.name}, ${headline.label.toLowerCase()}`}
                  >
                    {project.name}
                    <LinkIcon name="arrow" className="size-[15px] flex-none" />
                  </a>
                ) : (
                  project.name
                )}
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

            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 font-narrow text-meta tracking-rail">
              {project.links.map((link) =>
                link.href ? (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-draw inline-flex items-center gap-1.5 text-signal"
                  >
                    <LinkIcon name={link.icon} />
                    {link.label}
                  </a>
                ) : (
                  <span
                    key={link.label}
                    className="inline-flex items-center gap-1.5 text-muted"
                  >
                    <LinkIcon name={link.icon} />
                    {link.label} <Todo />
                  </span>
                ),
              )}
            </div>
          </article>
        );
      })}
    </Panel>
  );
}
