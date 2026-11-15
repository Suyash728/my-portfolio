"use client";

import React, { useEffect, useState } from "react";
import { sections } from "@/content/profile";
import { sound } from "@/lib/sound";

export function MobileNav() {
  const [current, setCurrent] = useState<string>("hardware");

  useEffect(() => {
    const nodes = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

    let queued = false;
    const spy = () => {
      queued = false;
      const probe = window.innerHeight * 0.35;
      let best: string | null = null;
      let bestTop = -Infinity;
      for (const el of nodes) {
        const { top } = el.getBoundingClientRect();
        if (top <= probe && top > bestTop) {
          bestTop = top;
          best = el.id;
        }
      }
      if (best) setCurrent(best);
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

  const handleNavClick = (id: string) => {
    sound.playClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      aria-label="Mobile Section Jump Navigation"
      className="sticky top-0 z-30 wide:hidden border-b border-rule bg-raised/95 backdrop-blur-xs px-3 py-1 overflow-x-auto select-none print:hidden"
    >
      <div className="flex items-center gap-1.5 min-w-max">
        {sections.map((section) => {
          const isActive = current === section.id;
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(section.id);
              }}
              className={`min-h-[44px] min-w-[44px] inline-flex items-center justify-center px-3 py-2 font-narrow text-tiny uppercase tracking-eyebrow border transition-colors ${
                isActive
                  ? "border-signal bg-ground text-ink font-semibold"
                  : "border-transparent text-muted hover:text-ink hover:border-rule"
              }`}
              aria-current={isActive ? "true" : undefined}
            >
              {section.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
