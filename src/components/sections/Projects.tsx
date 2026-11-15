"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { LinkIcon } from "@/components/LinkIcon";
import { Panel } from "@/components/Panel";
import { TechList } from "@/components/TechList";
import { Todo } from "@/components/Todo";
import { MediSyncArchitecture } from "@/components/illustrations/MediSyncArchitecture";
import { TrophyAvatar } from "@/components/illustrations/TrophyAvatar";
import { projects } from "@/content/projects";
import { sound } from "@/lib/sound";
import type { Project } from "@/content/types";
import { Sparkles } from "lucide-react";

/**
 * Where the project's heading leads. The repository if there is one, otherwise
 * whichever link actually resolves.
 */
function headlineLink(project: Project) {
  const resolved = project.links.filter((link) => link.href !== null);
  return resolved.find((link) => link.icon === "repo") ?? resolved[0] ?? null;
}

export function Projects() {
  const [openArchSlug, setOpenArchSlug] = useState<string | null>("medisync");

  const handleTrophyClick = () => {
    sound.playSuccess();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.5 },
      colors: ["#8A6414", "#F59E0B", "#1F4B6E"],
    });
  };

  return (
    <Panel id="projects" heading="Shipped Systems & Engineering Decisions">
      {projects.map((project, index) => {
        const headline = headlineLink(project);
        const isMediSync = project.slug === "medisync";
        const isArchOpen = openArchSlug === project.slug;

        return (
          <article
            key={project.slug}
            className={`edge group py-6 ${
              index === 0 ? "" : "border-t border-rule-soft"
            }`}
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
                    onClick={handleTrophyClick}
                    title="1st Place Winner, CodeFusion 2026! Click for celebration"
                    className="inline-flex items-center -my-2 transition-transform hover:scale-115 active:scale-95"
                  >
                    <TrophyAvatar className="w-8 h-8" />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <span
                  onClick={isMediSync ? handleTrophyClick : undefined}
                  className={`font-narrow text-meta tracking-rail whitespace-nowrap ${
                    project.outcome.tone === "award"
                      ? "text-flag font-bold cursor-pointer hover:underline"
                      : "text-signal"
                  }`}
                >
                  {project.outcome.label}
                </span>

                {isMediSync && (
                  <button
                    onClick={() => {
                      sound.playClick();
                      setOpenArchSlug(isArchOpen ? null : project.slug);
                    }}
                    className="ml-2 inline-flex items-center gap-1.5 rounded-md bg-raised px-2.5 py-1 text-tiny font-narrow uppercase tracking-eyebrow text-signal border border-rule hover:border-signal transition-colors shadow-2xs"
                    aria-expanded={isArchOpen}
                  >
                    <Sparkles className="size-3 text-flag" />
                    <span>{isArchOpen ? "Hide Architecture" : "Inspect Decision Tree"}</span>
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

            {/* Expandable Architecture Decision Tree for Flagship Projects */}
            {isMediSync && isArchOpen && (
              <div className="mt-3 animate-fadeIn">
                <MediSyncArchitecture />
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
