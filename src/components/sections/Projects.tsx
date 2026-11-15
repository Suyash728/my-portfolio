"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { LinkIcon } from "@/components/LinkIcon";
import { Panel } from "@/components/Panel";
import { TechList } from "@/components/TechList";
import { Todo } from "@/components/Todo";
import { SystemSchematic } from "@/components/SystemSchematic";
import { projects } from "@/content/projects";
import { useTechFilter, clearTechFilter } from "@/lib/filterState";
import { sound } from "@/lib/sound";
import type { Project } from "@/content/types";

/**
 * Where the project's heading leads. The repository if there is one, otherwise
 * whichever link actually resolves.
 */
function headlineLink(project: Project) {
  const resolved = project.links.filter((link) => link.href !== null);
  return resolved.find((link) => link.icon === "repo") ?? resolved[0] ?? null;
}

export function Projects() {
  const [openSchematics, setOpenSchematics] = useState<Record<string, boolean>>({
    medisync: true,
  });
  const [activeFilter] = useTechFilter();

  const toggleSchematic = (slug: string) => {
    sound.playClick();
    setOpenSchematics((prev) => ({
      ...prev,
      [slug]: !prev[slug],
    }));
  };

  const handleTrophyClick = () => {
    sound.playSuccess();
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.6 },
      colors: ["#8A6414", "#1F4B6E", "#8A877F"],
    });
  };

  const matchingProjectsCount = activeFilter
    ? projects.filter((p) =>
        p.tech.some(
          (t) => t.name.toLowerCase() === activeFilter.toLowerCase()
        )
      ).length
    : projects.length;

  return (
    <Panel
      id="projects"
      heading="Shipped Systems & Engineering Decisions"
      intro="Six production systems architected so deterministic rules live in code and probabilistic models are strictly confined to synthesis."
    >
      {/* Active Request-Path Filter Banner */}
      {activeFilter && (
        <div
          role="status"
          aria-live="polite"
          className="mb-4 flex flex-wrap items-center justify-between gap-2 border border-signal bg-raised p-3 font-narrow text-meta tracking-rail"
        >
          <div className="flex items-center gap-2 text-ink">
            <span className="size-2 bg-signal flex-none" aria-hidden="true" />
            <span>
              Request-path filter:{" "}
              <strong className="text-signal">{activeFilter}</strong> (active in{" "}
              <span className="tabular-nums font-semibold">
                {matchingProjectsCount}
              </span>{" "}
              of {projects.length} systems)
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              sound.playClick();
              clearTechFilter();
            }}
            className="border border-rule-strong bg-ground px-2.5 py-1 text-tiny font-narrow uppercase tracking-eyebrow text-muted hover:border-signal hover:text-ink transition-colors"
          >
            Clear Filter [×]
          </button>
        </div>
      )}

      {projects.map((project, index) => {
        const headline = headlineLink(project);
        const isMediSync = project.slug === "medisync";
        const isSchematicOpen = !!openSchematics[project.slug];
        const isFilteredMatch = activeFilter
          ? project.tech.some(
              (t) => t.name.toLowerCase() === activeFilter.toLowerCase()
            )
          : true;

        return (
          <article
            key={project.slug}
            className={`edge group py-6 transition-opacity duration-200 ${
              index === 0 ? "" : "border-t border-rule-soft"
            } ${isFilteredMatch ? "opacity-100" : "opacity-40"}`}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <div className="flex items-center gap-3">
                <h3 className="text-lead font-semibold tracking-tight">
                  {headline?.href ? (
                    <a
                      href={headline.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => sound.playClick()}
                      className="title-link"
                      aria-label={`${project.name}, ${headline.label.toLowerCase()}, opens in a new tab`}
                    >
                      {project.name}
                      <LinkIcon name="arrow" className="size-[15px] flex-none" />
                    </a>
                  ) : (
                    project.name
                  )}
                </h3>

                {isMediSync && (
                  <button
                    type="button"
                    onClick={handleTrophyClick}
                    title="1st Place, CodeFusion 2026. Click to verify victory telemetry."
                    className="border border-flag/40 bg-flag/10 px-2 py-0.5 font-narrow text-tiny uppercase tracking-eyebrow text-flag hover:border-flag transition-colors"
                  >
                    ★ Winner
                  </button>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span
                  onClick={isMediSync ? handleTrophyClick : undefined}
                  className={`font-narrow text-meta tracking-rail whitespace-nowrap ${
                    project.outcome.tone === "award"
                      ? "text-flag font-semibold"
                      : "text-signal"
                  }`}
                >
                  {project.outcome.label}
                </span>

                {project.schematic && (
                  <button
                    type="button"
                    onClick={() => toggleSchematic(project.slug)}
                    aria-expanded={isSchematicOpen}
                    aria-controls={`schematic-${project.slug}`}
                    className={`ml-2 inline-flex items-center gap-1 border px-2.5 py-1 text-tiny font-narrow uppercase tracking-eyebrow transition-colors ${
                      isSchematicOpen
                        ? "border-signal bg-signal text-raised"
                        : "border-rule-strong bg-raised text-muted hover:border-signal hover:text-ink"
                    }`}
                  >
                    <span>{isSchematicOpen ? "[-] Schematic" : "[+] Schematic"}</span>
                  </button>
                )}
              </div>
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

            {/* Expandable Deterministic System Schematic */}
            {project.schematic && isSchematicOpen && (
              <div id={`schematic-${project.slug}`}>
                <SystemSchematic
                  schematic={project.schematic}
                  projectName={project.name}
                />
              </div>
            )}

            <TechList items={project.tech} className="mt-4" />

            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 font-narrow text-meta tracking-rail">
              {project.links.map((link) =>
                link.href ? (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playClick()}
                    className="link-draw inline-flex items-center gap-1.5 text-signal"
                  >
                    <LinkIcon name={link.icon} />
                    {link.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : (
                  <span
                    key={link.label}
                    className="inline-flex items-center gap-1.5 text-muted"
                  >
                    <LinkIcon name={link.icon} />
                    {link.label}{" "}
                    <Todo todoContext={link.todoContext} />
                  </span>
                )
              )}
            </div>
          </article>
        );
      })}
    </Panel>
  );
}
