"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LinkIcon } from "@/components/LinkIcon";
import { Panel } from "@/components/Panel";
import { TechList } from "@/components/TechList";
import { SystemSchematic } from "@/components/SystemSchematic";
import { ProjectVisualHeader } from "@/components/ProjectVisualHeader";
import { projects } from "@/content/projects";
import { useTechFilter, clearTechFilter, techMatches } from "@/lib/filterState";
import { sound } from "@/lib/sound";
import { ChevronDown, ArrowUpRight } from "lucide-react";

export function Projects() {
  const [openSchematicSlug, setOpenSchematicSlug] = useState<string | null>(null);
  const [openArchiveSlug, setOpenArchiveSlug] = useState<string | null>(null);
  const [activeFilter] = useTechFilter();

  const spotlightProjects = projects.filter((p) => p.spotlight);
  const archiveProjects = projects.filter((p) => !p.spotlight);

  const toggleSchematic = (slug: string) => {
    sound.playClick();
    setOpenSchematicSlug((prev) => (prev === slug ? null : slug));
  };

  const toggleArchive = (slug: string) => {
    sound.playClick();
    setOpenArchiveSlug((prev) => (prev === slug ? null : slug));
  };

  const matchingCount = activeFilter
    ? projects.filter((p) =>
        p.tech.some((t) => techMatches(activeFilter, t.name))
      ).length
    : projects.length;

  return (
    <Panel
      id="projects"
      heading="Systems & Engineering Decisions"
      intro="Four flagship spotlight systems and three compact archive builds. Designed so deterministic rules live in code and LLMs strictly synthesize."
    >
      {/* Active Request-Path Filter Banner */}
      {activeFilter && (
        <div
          role="status"
          aria-live="polite"
          className="mb-6 flex flex-wrap items-center justify-between gap-2 bento-well p-3 border-signal-teal font-narrow text-meta tracking-rail"
        >
          <div className="flex items-center gap-2 text-ink">
            <span className="led-teal" aria-hidden="true" />
            <span>
              Request-path filter:{" "}
              <strong className="text-signal-teal font-semibold">{activeFilter}</strong> (active in{" "}
              <span className="tabular-nums font-semibold">{matchingCount}</span> of {projects.length} systems)
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              sound.playClick();
              clearTechFilter();
            }}
            className="rounded border border-rule-strong bg-surface px-2.5 py-1 text-tiny font-narrow uppercase tracking-eyebrow text-muted hover:border-signal-teal hover:text-ink transition-colors"
          >
            Clear Filter [×]
          </button>
        </div>
      )}

      {/* =========================================================================
          TOP GRID: 4 Spotlight Bento Cards (2x2 on desktop, 1-col on mobile)
      ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
        {spotlightProjects.map((project) => {
          const isSchematicOpen = openSchematicSlug === project.slug;
          const isFilteredMatch = activeFilter
            ? project.tech.some(
                (t) => techMatches(activeFilter, t.name)
              )
            : true;

          return (
            <motion.article
              layout
              id={`project-${project.slug}`}
              key={project.slug}
              className={`bento-card p-5 flex flex-col justify-between transition-all duration-300 scroll-mt-24 ${
                isSchematicOpen
                  ? "md:col-span-2 shadow-md ring-1 ring-signal-teal/30"
                  : "md:col-span-1"
              } ${
                isFilteredMatch ? "opacity-100" : "opacity-40"
              }`}
            >
              <div>
                {/* Header: Title + Badge */}
                <div className="flex flex-wrap items-start justify-between gap-2 border-b border-rule-soft pb-3 mb-3">
                  <h3 className="font-sans text-lead font-semibold tracking-tight text-ink">
                    {project.name}
                  </h3>

                  <span
                    className={`inline-flex items-center rounded-md px-2.5 py-0.5 font-narrow text-tiny uppercase tracking-eyebrow font-semibold border ${
                      project.outcome.tone === "award"
                        ? "border-accent-orange/50 bg-surface text-accent-orange"
                        : "border-signal-teal/50 bg-surface text-signal-teal"
                    }`}
                  >
                    {project.outcome.label}
                  </span>
                </div>

                {/* Micro-UI Visual Preview Banner */}
                <ProjectVisualHeader slug={project.slug} />

                {/* Problem + decision, under 28 words */}
                <p className="font-sans text-small text-muted leading-relaxed mb-2">
                  {project.problem}
                </p>

                <p className="font-sans text-small text-ink font-medium leading-relaxed border-l-2 border-signal-teal/60 pl-3 mb-4">
                  {project.decision}
                </p>

                {/* Tech Chips */}
                <div className="mb-4">
                  <TechList items={project.tech} />
                </div>
              </div>

              {/* Bottom Action Bar */}
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-rule-soft">
                  <div className="flex items-center gap-3 font-narrow text-meta tracking-rail">
                    {project.links.map((link) =>
                      link.href ? (
                        <a
                          key={link.label}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => sound.playClick()}
                          className="inline-flex items-center gap-1.5 text-signal-teal hover:text-ink transition-colors font-medium"
                        >
                          <LinkIcon name={link.icon} />
                          <span>{link.label}</span>
                          <ArrowUpRight className="size-3 opacity-60" />
                        </a>
                      ) : link.statusPill ? (
                        <span
                          key={link.label}
                          className="inline-flex items-center gap-1.5 text-muted text-tiny uppercase tracking-eyebrow bento-well px-2 py-0.5"
                        >
                          <LinkIcon name={link.icon} />
                          <span>{link.statusPill}</span>
                        </span>
                      ) : null
                    )}
                  </div>

                  {project.schematic && (
                    <button
                      type="button"
                      onClick={() => toggleSchematic(project.slug)}
                      aria-expanded={isSchematicOpen}
                      className={`inline-flex items-center gap-1 rounded-lg border px-3 py-1 font-narrow text-tiny uppercase tracking-eyebrow transition-all ${
                        isSchematicOpen
                          ? "border-signal-teal bg-signal-teal text-surface font-semibold"
                          : "border-rule bg-surface text-muted hover:text-ink hover:border-rule-strong"
                      }`}
                    >
                      <span>{isSchematicOpen ? "Hide Architecture" : "Inspect Architecture"}</span>
                      <ChevronDown
                        className={`size-3 transition-transform ${
                          isSchematicOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  )}
                </div>

                {/* Expandable Pipeline Schematic & Build Notes */}
                <AnimatePresence>
                  {project.schematic && isSchematicOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <SystemSchematic
                        schematic={project.schematic}
                        projectName={project.name}
                      />
                      {project.detail && (
                        <p className="mt-2.5 text-tiny font-sans text-muted leading-relaxed p-2 bento-well">
                          <strong className="text-ink">Build Detail:</strong> {project.detail}
                        </p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.article>
          );
        })}
      </div>

      {/* =========================================================================
          BOTTOM LIST: Earlier builds (Interactive Accordion Rows)
      ========================================================================= */}
      <div>
        <div className="flex items-center justify-between border-b border-rule pb-2 mb-3">
          <h3 className="font-narrow text-tiny uppercase tracking-eyebrow text-muted font-bold">
            Earlier Builds ({archiveProjects.length})
          </h3>
          <span className="font-narrow text-tiny text-muted">
            Click row to inspect decision
          </span>
        </div>

        <div className="space-y-2">
          {archiveProjects.map((archive) => {
            const isArchiveOpen = openArchiveSlug === archive.slug;
            const isFilteredMatch = activeFilter
              ? archive.tech.some(
                  (t) => techMatches(activeFilter, t.name)
                )
              : true;

            return (
              <div
                id={`project-${archive.slug}`}
                key={archive.slug}
                className={`bento-well transition-all scroll-mt-24 ${
                  isFilteredMatch ? "opacity-100" : "opacity-40"
                } ${isArchiveOpen ? "border-signal-teal bg-surface" : "hover:border-rule-strong"}`}
              >
                {/* Accordion Row Header */}
                <button
                  type="button"
                  onClick={() => toggleArchive(archive.slug)}
                  aria-expanded={isArchiveOpen}
                  className="w-full p-3.5 flex flex-wrap items-center justify-between gap-4 text-left"
                >
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="font-sans text-small font-semibold text-ink">
                      {archive.name}
                    </span>
                    <span className="font-narrow text-tiny uppercase tracking-eyebrow text-muted bento-well px-2 py-0.5">
                      {archive.outcome.label}
                    </span>
                  </div>

                  {/* Widened summary allowing clean wrapping without mid-word clipping */}
                  <div className="flex-1 min-w-[200px] max-w-[480px] hidden sm:block">
                    <p className="font-sans text-tiny text-muted leading-relaxed line-clamp-2">
                      {archive.decision}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="font-narrow text-tiny uppercase tracking-eyebrow text-signal-teal font-medium hidden md:inline">
                      {isArchiveOpen ? "Collapse" : "Inspect"}
                    </span>
                    <div
                      className={`size-6 rounded-md flex items-center justify-center border transition-all ${
                        isArchiveOpen
                          ? "bg-signal-teal text-surface border-signal-teal rotate-180"
                          : "bg-surface text-muted border-rule"
                      }`}
                    >
                      <ChevronDown className="size-3.5" />
                    </div>
                  </div>
                </button>

                {/* Expanded Detail Panel */}
                <AnimatePresence>
                  {isArchiveOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.18 }}
                      className="overflow-hidden border-t border-rule-soft px-4 py-3 bg-ground/40"
                    >
                      <p className="font-sans text-small text-muted mb-2">
                        <strong className="text-ink">Problem:</strong> {archive.problem}
                      </p>
                      <p className="font-sans text-small text-ink font-medium mb-3">
                        <strong className="text-signal-teal">Decision:</strong> {archive.decision}
                      </p>
                      {archive.detail && (
                        <p className="font-sans text-tiny text-muted mb-3 leading-relaxed">
                          {archive.detail}
                        </p>
                      )}

                      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-rule-soft">
                        <TechList items={archive.tech} />

                        <div className="flex items-center gap-2 font-narrow text-meta tracking-rail">
                          {archive.links.map((link) =>
                            link.href ? (
                              <a
                                key={link.label}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => sound.playClick()}
                                className="inline-flex items-center gap-1 text-signal-teal hover:text-ink font-medium"
                              >
                                <LinkIcon name={link.icon} />
                                <span>{link.label}</span>
                                <ArrowUpRight className="size-3 opacity-60" />
                              </a>
                            ) : link.statusPill ? (
                              <span
                                key={link.label}
                                className="bento-well px-2 py-0.5 text-tiny font-narrow uppercase tracking-eyebrow text-muted"
                              >
                                {link.statusPill}
                              </span>
                            ) : null
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </Panel>
  );
}
