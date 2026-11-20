"use client";

import React, { useEffect, useState } from "react";
import { sound } from "@/lib/sound";
import { profile } from "@/content/profile";
import { Search, Volume2, VolumeX, FileDown } from "lucide-react";

const NAV_LINKS = [
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "stack", label: "Stack" },
  { id: "battlestation", label: "Systems Lab" },
  { id: "contact", label: "Contact" },
];

export function TopNav() {
  const [activeSection, setActiveSection] = useState<string>("projects");
  const [isMuted, setIsMuted] = useState(() =>
    typeof window !== "undefined" ? sound.isMuted() : true
  );
  const [istTime, setIstTime] = useState<string | null>(null);

  // Live Asia/Kolkata Clock ticking every second (hydration-safe)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      setIstTime(`${formatter.format(now)} IST`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Section Scroll Spy
  useEffect(() => {
    const sectionElements = NAV_LINKS.map((link) =>
      document.getElementById(link.id)
    ).filter((el): el is HTMLElement => el !== null);

    let queued = false;
    const handleScroll = () => {
      queued = false;
      const probe = window.innerHeight * 0.35;
      let currentId = "projects";
      let maxTop = -Infinity;

      for (const el of sectionElements) {
        const { top } = el.getBoundingClientRect();
        if (top <= probe && top > maxTop) {
          maxTop = top;
          currentId = el.id;
        }
      }
      setActiveSection(currentId);
    };

    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    sound.playClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const openCommandPalette = () => {
    sound.playSwitch();
    const event = new KeyboardEvent("keydown", { key: "k", metaKey: true });
    document.dispatchEvent(event);
  };

  const handleToggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  return (
    <header className="sticky top-4 z-40 w-full px-4 sm:px-6 pointer-events-none select-none print:hidden">
      <nav
        aria-label="Primary Navigation Bar"
        className="mx-auto max-w-5xl h-12 rounded-full border border-rule bg-surface/95 backdrop-blur-md px-3 sm:px-4 shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex items-center justify-between pointer-events-auto transition-all"
      >
        {/* Brand Mark + Availability Dot */}
        <a
          href="#main"
          onClick={(e) => {
            e.preventDefault();
            sound.playClick();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-2 group shrink-0"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="font-narrow text-small font-semibold tracking-rail uppercase text-ink group-hover:text-signal-teal transition-colors">
            Suyash Kerkar
          </span>
        </a>

        {/* Center Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                aria-current={isActive ? "true" : undefined}
                className={`relative px-3 py-1 rounded-full font-narrow text-tiny uppercase tracking-eyebrow transition-all ${
                  isActive
                    ? "bg-ground text-ink font-semibold shadow-xs"
                    : "text-muted hover:text-ink hover:bg-ground/60"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        {/* Right Tools: Clock + Command Trigger + Resume + Sound */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Live Asia/Kolkata Clock (hidden on small mobile) */}
          <span className="hidden lg:inline-flex items-center font-mono text-[11px] tabular-nums text-muted bg-surface-sunken px-2 py-0.5 rounded border border-rule-soft">
            {istTime ?? "IST"}
          </span>

          {/* Quick Launcher ⌘K Trigger */}
          <button
            type="button"
            onClick={openCommandPalette}
            title="Search command menu (⌘K)"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-rule hover:border-rule-strong bg-surface hover:bg-surface-sunken text-muted hover:text-ink font-narrow text-tiny uppercase tracking-eyebrow transition-colors"
          >
            <Search className="size-3 text-signal-teal" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="text-[10px] font-sans font-semibold text-ink px-1 rounded bg-ground">
              ⌘K
            </kbd>
          </button>

          {/* Resume CTA */}
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-ink text-surface hover:bg-accent-orange font-narrow text-tiny uppercase tracking-eyebrow font-semibold transition-colors"
          >
            <FileDown className="size-3" />
            <span>Resume</span>
          </a>

          {/* Audio Toggle */}
          <button
            type="button"
            onClick={handleToggleSound}
            title={isMuted ? "Unmute tactile audio" : "Mute tactile audio"}
            aria-label={isMuted ? "Unmute audio" : "Mute audio"}
            className="size-8 flex items-center justify-center rounded-full border border-rule hover:border-rule-strong text-muted hover:text-ink transition-colors"
          >
            {isMuted ? (
              <VolumeX className="size-3.5" />
            ) : (
              <Volume2 className="size-3.5 text-signal-teal" />
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}
