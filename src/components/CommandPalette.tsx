"use client";

import React, { useEffect, useState } from "react";
import { Command } from "cmdk";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  Cpu,
  FolderGit2,
  Briefcase,
  GraduationCap,
  Layers,
  Trophy,
  Mail,
  Volume2,
  VolumeX,
  ExternalLink,
  FileText,
} from "lucide-react";
import { profile } from "@/content/profile";
import { sound } from "@/lib/sound";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(() =>
    typeof window !== "undefined" ? sound.isMuted() : false
  );

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (
        (e.key === "k" && (e.metaKey || e.ctrlKey)) ||
        (e.key === "/" &&
          !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName))
      ) {
        e.preventDefault();
        setOpen((prev) => {
          if (!prev) sound.playSwitch();
          return !prev;
        });
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (action: () => void) => {
    sound.playClick();
    action();
    setOpen(false);
  };

  const jumpTo = (id: string) => {
    runCommand(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    });
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-ink/40 backdrop-blur-xs"
            />

            {/* Modal Box: Tactile Bento Surface with 12px radius & shadow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: -6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -6 }}
              transition={{ duration: 0.16, ease: "easeOut" }}
              className="relative w-full max-w-xl rounded-xl border border-rule-strong bg-surface shadow-2xl overflow-hidden z-10"
            >
              <Command
                label="Global Command Menu"
                className="w-full bg-transparent font-sans"
              >
                {/* Search Input Bar */}
                <div className="flex items-center gap-3 border-b border-rule px-4 py-3.5">
                  <Search className="size-4 text-muted shrink-0" />
                  <Command.Input
                    autoFocus
                    placeholder="Search sections, systems, or execute action..."
                    className="w-full bg-transparent font-sans text-body text-ink placeholder:text-muted focus:outline-hidden"
                  />
                  <kbd className="hidden sm:inline-block rounded border border-rule bg-ground px-1.5 py-0.5 font-sans text-tiny tabular-nums text-muted">
                    ESC
                  </kbd>
                </div>

                {/* Command Items List */}
                <Command.List className="max-h-[360px] overflow-y-auto p-2 font-narrow text-meta tracking-rail divide-y divide-rule-soft/50">
                  <Command.Empty className="py-6 text-center text-muted font-sans text-small">
                    No matching commands found.
                  </Command.Empty>

                  {/* Section Jumps */}
                  <Command.Group
                    heading="Navigation"
                    className="px-2 py-1.5 text-tiny font-bold uppercase tracking-eyebrow text-muted"
                  >
                    <Command.Item
                      onSelect={() => jumpTo("battlestation")}
                      className="flex items-center gap-2.5 rounded-md px-2.5 py-2 text-ink aria-selected:bg-signal-teal aria-selected:text-[#fff8f5] cursor-pointer transition-colors"
                    >
                      <Cpu className="size-4" />
                      <span className="font-sans font-medium">
                        Battlestation &amp; Local AI Rig
                      </span>
                      <span className="ml-auto font-sans text-tiny tabular-nums opacity-70">
                        #battlestation
                      </span>
                    </Command.Item>

                    <Command.Item
                      onSelect={() => jumpTo("projects")}
                      className="flex items-center gap-2.5 rounded-md px-2.5 py-2 text-ink aria-selected:bg-signal-teal aria-selected:text-[#fff8f5] cursor-pointer transition-colors"
                    >
                      <FolderGit2 className="size-4" />
                      <span className="font-sans font-medium">
                        Systems (Spotlight &amp; Earlier Builds)
                      </span>
                      <span className="ml-auto font-sans text-tiny tabular-nums opacity-70">
                        #projects
                      </span>
                    </Command.Item>

                    <Command.Item
                      onSelect={() => jumpTo("experience")}
                      className="flex items-center gap-2.5 rounded-md px-2.5 py-2 text-ink aria-selected:bg-signal-teal aria-selected:text-[#fff8f5] cursor-pointer transition-colors"
                    >
                      <Briefcase className="size-4" />
                      <span className="font-sans font-medium">
                        Work Experience &amp; Research
                      </span>
                      <span className="ml-auto font-sans text-tiny tabular-nums opacity-70">
                        #experience
                      </span>
                    </Command.Item>

                    <Command.Item
                      onSelect={() => jumpTo("education")}
                      className="flex items-center gap-2.5 rounded-md px-2.5 py-2 text-ink aria-selected:bg-signal-teal aria-selected:text-[#fff8f5] cursor-pointer transition-colors"
                    >
                      <GraduationCap className="size-4" />
                      <span className="font-sans font-medium">
                        Education &amp; Qualifications
                      </span>
                      <span className="ml-auto font-sans text-tiny tabular-nums opacity-70">
                        #education
                      </span>
                    </Command.Item>

                    <Command.Item
                      onSelect={() => jumpTo("stack")}
                      className="flex items-center gap-2.5 rounded-md px-2.5 py-2 text-ink aria-selected:bg-signal-teal aria-selected:text-[#fff8f5] cursor-pointer transition-colors"
                    >
                      <Layers className="size-4" />
                      <span className="font-sans font-medium">
                        Technology Stack &amp; Infrastructure
                      </span>
                      <span className="ml-auto font-sans text-tiny tabular-nums opacity-70">
                        #stack
                      </span>
                    </Command.Item>

                    <Command.Item
                      onSelect={() => jumpTo("achievements")}
                      className="flex items-center gap-2.5 rounded-md px-2.5 py-2 text-ink aria-selected:bg-signal-teal aria-selected:text-[#fff8f5] cursor-pointer transition-colors"
                    >
                      <Trophy className="size-4" />
                      <span className="font-sans font-medium">
                        Achievements &amp; Hackathons
                      </span>
                      <span className="ml-auto font-sans text-tiny tabular-nums opacity-70">
                        #achievements
                      </span>
                    </Command.Item>

                    <Command.Item
                      onSelect={() => jumpTo("contact")}
                      className="flex items-center gap-2.5 rounded-md px-2.5 py-2 text-ink aria-selected:bg-signal-teal aria-selected:text-[#fff8f5] cursor-pointer transition-colors"
                    >
                      <Mail className="size-4" />
                      <span className="font-sans font-medium">
                        Contact &amp; Inquiries
                      </span>
                      <span className="ml-auto font-sans text-tiny tabular-nums opacity-70">
                        #contact
                      </span>
                    </Command.Item>
                  </Command.Group>

                  {/* Spotlight Systems */}
                  <Command.Group
                    heading="Spotlight Systems"
                    className="px-2 py-1.5 text-tiny font-bold uppercase tracking-eyebrow text-muted pt-2"
                  >
                    <Command.Item
                      onSelect={() => jumpTo("project-medisync")}
                      className="flex items-center gap-2.5 rounded-md px-2.5 py-2 text-ink aria-selected:bg-signal-teal aria-selected:text-[#fff8f5] cursor-pointer transition-colors"
                    >
                      <FolderGit2 className="size-4 text-signal-teal" />
                      <span className="font-sans font-medium">
                        MediSync 2.0 (Clinical Triage &amp; Conflict Gate)
                      </span>
                      <span className="ml-auto font-sans text-tiny opacity-70">
                        1st @ CodeFusion
                      </span>
                    </Command.Item>

                    <Command.Item
                      onSelect={() => jumpTo("project-aeromed-india")}
                      className="flex items-center gap-2.5 rounded-md px-2.5 py-2 text-ink aria-selected:bg-signal-teal aria-selected:text-[#fff8f5] cursor-pointer transition-colors"
                    >
                      <FolderGit2 className="size-4 text-signal-teal" />
                      <span className="font-sans font-medium">
                        AeroMed India (Air Quality &amp; CAQM GRAP Gate)
                      </span>
                      <span className="ml-auto font-sans text-tiny opacity-70">
                        INNOVATE &apos;26
                      </span>
                    </Command.Item>

                    <Command.Item
                      onSelect={() => jumpTo("project-kisanchain")}
                      className="flex items-center gap-2.5 rounded-md px-2.5 py-2 text-ink aria-selected:bg-signal-teal aria-selected:text-[#fff8f5] cursor-pointer transition-colors"
                    >
                      <FolderGit2 className="size-4 text-signal-teal" />
                      <span className="font-sans font-medium">
                        KisanChain (Decentralized Agri-Produce)
                      </span>
                      <span className="ml-auto font-sans text-tiny opacity-70">
                        Polygon PoS
                      </span>
                    </Command.Item>

                    <Command.Item
                      onSelect={() => jumpTo("project-trustlayer")}
                      className="flex items-center gap-2.5 rounded-md px-2.5 py-2 text-ink aria-selected:bg-signal-teal aria-selected:text-[#fff8f5] cursor-pointer transition-colors"
                    >
                      <FolderGit2 className="size-4 text-signal-teal" />
                      <span className="font-sans font-medium">
                        TrustLayer (Agent Determinism Harness)
                      </span>
                      <span className="ml-auto font-sans text-tiny opacity-70">
                        Mutation 94%
                      </span>
                    </Command.Item>
                  </Command.Group>

                  {/* Actions & Utilities */}
                  <Command.Group
                    heading="Actions"
                    className="px-2 py-1.5 text-tiny font-bold uppercase tracking-eyebrow text-muted pt-2"
                  >
                    <Command.Item
                      onSelect={() => {
                        const newMuted = sound.toggleMute();
                        setIsMuted(newMuted);
                      }}
                      className="flex items-center gap-2.5 rounded-md px-2.5 py-2 text-ink aria-selected:bg-signal-teal aria-selected:text-[#fff8f5] cursor-pointer transition-colors"
                    >
                      {isMuted ? (
                        <VolumeX className="size-4" />
                      ) : (
                        <Volume2 className="size-4" />
                      )}
                      <span className="font-sans font-medium">
                        Toggle Auditory Haptics
                      </span>
                      <span className="ml-auto text-tiny font-semibold font-narrow uppercase tracking-rail">
                        {isMuted ? "MUTED" : "SOUND ON"}
                      </span>
                    </Command.Item>

                    <Command.Item
                      onSelect={() => {
                        runCommand(() => {
                          window.open(profile.resume, "_blank");
                        });
                      }}
                      className="flex items-center gap-2.5 rounded-md px-2.5 py-2 text-ink aria-selected:bg-signal-teal aria-selected:text-[#fff8f5] cursor-pointer transition-colors"
                    >
                      <FileText className="size-4" />
                      <span className="font-sans font-medium">
                        Download Resume (CV 2026)
                      </span>
                      <ExternalLink className="size-3.5 ml-auto opacity-70" />
                    </Command.Item>

                    <Command.Item
                      onSelect={() => {
                        runCommand(() => {
                          navigator.clipboard.writeText(profile.email);
                          sound.playSuccess();
                        });
                      }}
                      className="flex items-center gap-2.5 rounded-md px-2.5 py-2 text-ink aria-selected:bg-signal-teal aria-selected:text-[#fff8f5] cursor-pointer transition-colors"
                    >
                      <Mail className="size-4" />
                      <span className="font-sans font-medium">
                        Copy Email Address
                      </span>
                      <span className="ml-auto text-tiny font-sans opacity-70">
                        {profile.email}
                      </span>
                    </Command.Item>
                  </Command.Group>
                </Command.List>

                {/* Footer bar */}
                <div className="flex items-center justify-between border-t border-rule bg-ground px-4 py-2 text-tiny font-narrow text-muted tracking-rail">
                  <span>Navigation: ↑ ↓ Enter</span>
                  <span>Suyash Kerkar · Navi Mumbai</span>
                </div>
              </Command>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
  );
}
