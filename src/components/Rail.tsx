"use client";

import { useEffect, useState } from "react";
import { profile, sections, statuses } from "@/content/profile";

const DOT_TONE = {
  live: "bg-signal breathe",
  award: "bg-flag",
  plain: "bg-signal",
} as const;

/**
 * The fixed identity rail — the one place this direction spends its boldness.
 * Client-side only for the scroll-spy; everything it renders is static content.
 */
export function Rail() {
  const [current, setCurrent] = useState<string | null>(null);

  useEffect(() => {
    const nodes = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

    // Nearest section whose top has passed the upper third of the viewport.
    // An IntersectionObserver alone misreports this when a short section sits
    // between two tall ones, so read positions directly on a rAF-throttled scroll.
    let queued = false;
    const spy = () => {
      queued = false;
      const probe = window.innerHeight * 0.3;
      let best: string | null = null;
      let bestTop = -Infinity;
      for (const el of nodes) {
        const { top } = el.getBoundingClientRect();
        if (top <= probe && top > bestTop) {
          bestTop = top;
          best = el.id;
        }
      }
      setCurrent(best);
    };

    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(spy);
    };

    spy();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <header className="flex flex-col gap-4 border-b border-rule px-5 py-6 wide:sticky wide:top-0 wide:h-screen wide:gap-[26px] wide:self-start wide:overflow-y-auto wide:border-r wide:border-b-0 wide:px-[26px] wide:pt-[34px] wide:pb-10">
      <div className="rise [animation-delay:0.02s]">
        <p className="font-narrow text-title leading-[1.1] font-semibold tracking-rail uppercase">
          Suyash
          <br />
          Kerkar
        </p>
        <p className="mt-2.5 font-narrow text-meta tracking-rail text-muted">
          {profile.identity.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>
      </div>

      <div className="rise h-px bg-rule [animation-delay:0.02s]" />

      <ul className="rise flex list-none flex-row flex-wrap gap-x-4 gap-y-1.5 p-0 font-narrow text-meta tracking-rail wide:flex-col wide:gap-[7px] [animation-delay:0.06s]">
        {statuses.map((status) => (
          <li key={status.label} className="flex items-baseline gap-[9px] text-muted">
            <span
              aria-hidden="true"
              className={`size-1.5 flex-none -translate-y-px ${DOT_TONE[status.tone]}`}
            />
            {status.label}
          </li>
        ))}
      </ul>

      <div className="rise h-px bg-rule [animation-delay:0.06s]" />

      <nav
        aria-label="Sections"
        className="rise flex flex-row flex-wrap gap-x-[18px] wide:flex-col wide:gap-0 [animation-delay:0.1s]"
      >
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="rail-link"
            aria-current={current === section.id ? "true" : "false"}
          >
            {section.label}
          </a>
        ))}
      </nav>

      <a
        href={profile.resume}
        download
        className="rise btn text-center wide:mt-auto [animation-delay:0.14s]"
      >
        Download resume
      </a>

      <div className="rise flex flex-row flex-wrap gap-4 font-narrow text-meta tracking-rail wide:flex-col wide:gap-1.5 [animation-delay:0.18s]">
        <a
          href={profile.github}
          className="w-fit border-b border-transparent text-muted transition-colors hover:border-signal hover:text-signal"
        >
          github.com/Suyash728
        </a>
        <a
          href={profile.linkedin}
          className="w-fit border-b border-transparent text-muted transition-colors hover:border-signal hover:text-signal"
        >
          linkedin.com/in/suyashkerkar
        </a>
        <a
          href={`mailto:${profile.email}`}
          className="w-fit border-b border-transparent text-muted transition-colors hover:border-signal hover:text-signal"
        >
          {profile.email}
        </a>
      </div>
    </header>
  );
}
