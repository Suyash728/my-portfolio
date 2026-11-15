"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { LinkIcon, type GlyphName } from "@/components/LinkIcon";
import { profile, sections, statuses } from "@/content/profile";
import { sound } from "@/lib/sound";
import { Volume2, VolumeX, Search } from "lucide-react";

const CONTACTS: { icon: GlyphName; href: string; label: string }[] = [
  { icon: "github", href: profile.github, label: strip(profile.github) },
  { icon: "linkedin", href: profile.linkedin, label: strip(profile.linkedin) },
  {
    icon: "mail",
    href: `mailto:${profile.email}`,
    label: profile.email,
  },
];

function strip(url: string) {
  return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}

export function Rail() {
  const [current, setCurrent] = useState<string>("battlestation");
  const [isMuted, setIsMuted] = useState(() =>
    typeof window !== "undefined" ? sound.isMuted() : false
  );
  const [istTime, setIstTime] = useState<string | null>(null);

  // Live IST (Asia/Kolkata) clock with tabular figures, hydration-safe
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
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Mechanical Scroll-Spy
  useEffect(() => {
    const nodes = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

    let queued = false;
    let prevSection: string | null = null;

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

      if (best) {
        setCurrent(best);
        if (best !== prevSection) {
          prevSection = best;
          if (typeof window !== "undefined") {
            window.dispatchEvent(
              new CustomEvent("control-room-ping", { detail: { intensity: 0.6 } })
            );
          }
        }
      }
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

  const handleToggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  const openCommandPalette = () => {
    sound.playSwitch();
    const event = new KeyboardEvent("keydown", { key: "k", metaKey: true });
    document.dispatchEvent(event);
  };

  return (
    <header className="flex flex-col gap-4 border-b border-rule bg-surface/50 px-5 py-6 wide:sticky wide:top-0 wide:h-screen wide:gap-[20px] wide:self-start wide:overflow-y-auto wide:border-r wide:border-b-0 wide:px-[24px] wide:pt-[30px] wide:pb-8">
      {/* Identity block & tactile audio toggle */}
      <div className="flex items-start justify-between">
        <div>
          <p className="font-narrow text-title leading-[1.1] font-semibold tracking-rail uppercase text-ink">
            Suyash
            <br />
            Kerkar
          </p>
          <p className="mt-2 font-narrow text-meta tracking-rail text-muted">
            {profile.identity.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
        </div>

        {/* Tactile Audio Switch: 8px radius, WCAG 3:1 border */}
        <button
          type="button"
          onClick={handleToggleSound}
          title={isMuted ? "Unmute tactile sound haptics" : "Mute tactile sound haptics"}
          className="bento-well p-2 text-muted hover:text-ink hover:border-signal-teal transition-colors"
          aria-label={isMuted ? "Unmute sound" : "Mute sound"}
        >
          {isMuted ? (
            <VolumeX className="size-4" />
          ) : (
            <Volume2 className="size-4 text-signal-teal" />
          )}
        </button>
      </div>

      <div className="h-px bg-rule" />

      {/* Recessed Status Well & Clock */}
      <div className="bento-well p-3 flex flex-col gap-2 font-narrow text-meta tracking-rail">
        <ul className="flex list-none flex-row flex-wrap gap-x-3 gap-y-1.5 p-0 wide:flex-col wide:gap-[6px]">
          {statuses.map((status) => (
            <li key={status.label} className="flex items-center gap-2 text-muted">
              <span className={status.tone === "live" ? "led-orange" : "led-teal"} />
              <span>{status.label}</span>
            </li>
          ))}
        </ul>

        {/* Telemetry Clock */}
        <div className="mt-1 border-t border-rule-soft pt-2 text-tiny text-muted flex items-center justify-between">
          <span className="uppercase tracking-eyebrow">SYSTEM TIME</span>
          <span className="tabular-nums font-sans font-semibold text-ink">
            {istTime ?? "19:30:00 IST"}
          </span>
        </div>
      </div>

      {/* Quick Cmd+K Hardware Launcher Button */}
      <button
        type="button"
        onClick={openCommandPalette}
        className="flex items-center justify-between bento-well px-3 py-2 font-narrow text-tiny uppercase tracking-eyebrow text-muted hover:text-ink hover:border-signal-teal transition-colors"
      >
        <span className="flex items-center gap-1.5">
          <Search className="size-3.5 text-signal-teal" />
          <span>Quick Launcher</span>
        </span>
        <kbd className="border border-rule bg-surface px-1.5 py-0.5 rounded text-tiny font-sans tabular-nums text-ink">
          ⌘K
        </kbd>
      </button>

      <div className="h-px bg-rule" />

      {/* Navigation Links with Smooth Spring LayoutId Active Pill */}
      <nav
        aria-label="Sections"
        className="relative flex flex-row flex-wrap gap-1 wide:flex-col wide:gap-1"
      >
        {sections.map((section) => {
          const isActive = current === section.id;
          return (
            <button
              key={section.id}
              type="button"
              onClick={() => handleNavClick(section.id)}
              className={`relative text-left px-3 py-2 rounded-lg font-narrow text-meta tracking-rail transition-colors ${
                isActive ? "text-ink font-semibold" : "text-muted hover:text-ink"
              }`}
              aria-current={isActive ? "true" : undefined}
            >
              {isActive && (
                <motion.div
                  layoutId="activeRailTab"
                  className="absolute inset-0 rounded-lg bg-surface-sunken border border-rule z-0"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center justify-between">
                <span>{section.label}</span>
                {isActive && (
                  <span className="h-1.5 w-1.5 rounded-full bg-signal-teal" />
                )}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Resume CTA */}
      <a
        href={profile.resume}
        download
        onClick={() => sound.playClick()}
        className="btn btn-orange text-center wide:mt-auto"
      >
        Download Resume
      </a>

      {/* Contact Links */}
      <div className="flex flex-row flex-wrap gap-x-4 gap-y-2 font-narrow text-meta tracking-rail wide:flex-col wide:gap-2">
        {CONTACTS.map((contact) => {
          const external = !contact.href.startsWith("mailto:");
          return (
            <a
              key={contact.href}
              href={contact.href}
              onClick={() => sound.playClick()}
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="group flex w-fit items-center gap-[7px] text-muted transition-colors hover:text-signal-teal"
            >
              <LinkIcon name={contact.icon} className="size-[14px] flex-none" />
              <span className="border-b border-transparent transition-colors group-hover:border-signal-teal">
                {contact.label}
              </span>
            </a>
          );
        })}
      </div>
    </header>
  );
}
