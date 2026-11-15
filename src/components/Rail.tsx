"use client";

import { useEffect, useState } from "react";
import { LinkIcon, type GlyphName } from "@/components/LinkIcon";
import { profile, sections, statuses } from "@/content/profile";
import { sound } from "@/lib/sound";
import { Volume2, VolumeX, Search } from "lucide-react";

/**
 * The three ways to reach him. Each carries its own mark so the rows read as
 * destinations rather than three lines of grey URL.
 */
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

const DOT_TONE = {
  live: "bg-signal breathe",
  award: "bg-flag",
  plain: "bg-signal",
} as const;

export function Rail() {
  const [current, setCurrent] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(() =>
    typeof window !== "undefined" ? sound.isMuted() : false
  );

  useEffect(() => {
    const nodes = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

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
    <header className="flex flex-col gap-4 border-b border-rule px-5 py-6 wide:sticky wide:top-0 wide:h-screen wide:gap-[22px] wide:self-start wide:overflow-y-auto wide:border-r wide:border-b-0 wide:px-[26px] wide:pt-[34px] wide:pb-10">
      {/* Identity block & quick audio toggle */}
      <div className="rise flex items-start justify-between [animation-delay:0.02s]">
        <div>
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

        {/* Tactile Audio Switch in Rail */}
        <button
          onClick={handleToggleSound}
          title={isMuted ? "Unmute tactile sound haptics" : "Mute tactile sound haptics"}
          className="rounded-full border border-rule bg-raised/80 p-2 text-muted hover:text-ink hover:border-signal transition-colors shadow-2xs"
          aria-label={isMuted ? "Unmute sound" : "Mute sound"}
        >
          {isMuted ? <VolumeX className="size-3.5" /> : <Volume2 className="size-3.5 text-signal" />}
        </button>
      </div>

      <div className="rise h-px bg-rule [animation-delay:0.02s]" />

      {/* Live System Status Lines */}
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

      {/* Quick Cmd+K Command Search in Rail */}
      <button
        onClick={openCommandPalette}
        className="rise flex items-center justify-between rounded-lg border border-rule bg-raised/60 px-3 py-1.5 font-narrow text-tiny uppercase tracking-eyebrow text-muted hover:text-ink hover:border-signal transition-colors [animation-delay:0.08s]"
      >
        <span className="flex items-center gap-1.5">
          <Search className="size-3 text-signal" />
          <span>Quick Menu</span>
        </span>
        <kbd className="rounded bg-ground px-1 font-mono text-[10px] text-ink border border-rule">
          ⌘K
        </kbd>
      </button>

      <div className="rise h-px bg-rule [animation-delay:0.08s]" />

      {/* Navigation Links with Scroll Spy */}
      <nav
        aria-label="Sections"
        className="rise flex flex-row flex-wrap gap-x-[18px] wide:flex-col wide:gap-0 [animation-delay:0.1s]"
      >
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick(section.id);
            }}
            className="rail-link"
            aria-current={current === section.id ? "true" : "false"}
          >
            {section.label}
          </a>
        ))}
      </nav>

      {/* Resume CTA */}
      <a
        href={profile.resume}
        download
        onClick={() => sound.playClick()}
        className="rise btn text-center wide:mt-auto [animation-delay:0.14s]"
      >
        Download resume
      </a>

      {/* Contact Links */}
      <div className="rise flex flex-row flex-wrap gap-x-4 gap-y-2 font-narrow text-meta tracking-rail wide:flex-col wide:gap-2 [animation-delay:0.18s]">
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
              className="group flex w-fit items-center gap-[7px] text-muted transition-colors hover:text-signal"
            >
              <LinkIcon name={contact.icon} className="size-[14px] flex-none" />
              <span className="border-b border-transparent transition-colors group-hover:border-signal">
                {contact.label}
              </span>
            </a>
          );
        })}
      </div>
    </header>
  );
}
