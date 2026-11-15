"use client";

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { sound } from "@/lib/sound";
import {
  Cpu,
  FolderGit2,
  Layers,
  Mail,
  Search,
  Volume2,
  VolumeX,
} from "lucide-react";

const NAV_ITEMS = [
  { id: "battlestation", label: "Rig", icon: Cpu },
  { id: "projects", label: "Shipped", icon: FolderGit2 },
  { id: "stack", label: "Stack", icon: Layers },
  { id: "contact", label: "Contact", icon: Mail },
];

export function MobileNav() {
  const [current, setCurrent] = useState<string>("battlestation");
  const [isMuted, setIsMuted] = useState(() =>
    typeof window !== "undefined" ? sound.isMuted() : false
  );

  useEffect(() => {
    const nodes = NAV_ITEMS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null
    );

    let queued = false;
    const spy = () => {
      queued = false;
      const probe = window.innerHeight * 0.4;
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
    <nav
      aria-label="Mobile Navigation Dock"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 wide:hidden select-none print:hidden pointer-events-auto"
    >
      <div className="flex items-center gap-1 rounded-full border border-rule-strong/40 bg-surface/92 backdrop-blur-md px-2 py-1.5 shadow-2xl ring-1 ring-black/5">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = current === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNavClick(item.id)}
              aria-current={isActive ? "true" : undefined}
              className={`relative min-h-[44px] min-w-[44px] flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full font-narrow text-tiny uppercase tracking-eyebrow transition-all ${
                isActive
                  ? "bg-signal-teal text-surface font-semibold shadow-xs"
                  : "text-muted hover:text-ink hover:bg-ground/60"
              }`}
            >
              <Icon className="size-3.5 shrink-0" />
              <span>{item.label}</span>
              {isActive && (
                <motion.div
                  layoutId="activeMobileDockIndicator"
                  className="absolute inset-0 rounded-full border border-signal-teal pointer-events-none"
                  transition={{ type: "spring", stiffness: 450, damping: 30 }}
                />
              )}
            </button>
          );
        })}

        <div className="h-4 w-px bg-rule mx-0.5" />

        {/* Quick Cmd+K Trigger on Mobile */}
        <button
          type="button"
          onClick={openCommandPalette}
          title="Open Quick Launcher (⌘K)"
          aria-label="Open command palette"
          className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full text-muted hover:text-ink hover:bg-ground/60 transition-colors"
        >
          <Search className="size-4 text-signal-teal" />
        </button>

        {/* Audio Mute/Unmute Toggle on Mobile */}
        <button
          type="button"
          onClick={handleToggleSound}
          title={isMuted ? "Unmute tactile audio" : "Mute tactile audio"}
          aria-label={isMuted ? "Unmute audio" : "Mute audio"}
          className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full text-muted hover:text-ink hover:bg-ground/60 transition-colors"
        >
          {isMuted ? (
            <VolumeX className="size-4" />
          ) : (
            <Volume2 className="size-4 text-signal-teal" />
          )}
        </button>
      </div>
    </nav>
  );
}
