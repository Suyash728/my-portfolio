"use client";

import React, { useState } from "react";
import { Panel } from "@/components/Panel";
import { RigBlueprint } from "@/components/illustrations/RigBlueprint";
import { InteractiveTerminal } from "@/components/InteractiveTerminal";
import { SpotlightCard } from "@/components/SpotlightCard";
import { sound } from "@/lib/sound";
import { Cpu, Activity, Flame, ShieldCheck, HardDrive, Terminal } from "lucide-react";

interface TraitDetail {
  id: string;
  pinNumber: number;
  traitName: string;
  category: string;
  statement: string;
  deepDive: string;
  metrics: string[];
  statusNote: string;
  icon: React.ElementType;
}

const TRAITS: Record<string, TraitDetail> = {
  gpu: {
    id: "gpu",
    pinNumber: 1,
    traitName: "PC Building & Hardware Craft",
    category: "Primary Anchor · Silicon & Thermals",
    statement:
      "Build and tune my own desktop; comfortable with component selection, thermals and OS-level optimisation.",
    deepDive:
      "Engineered personal workstation on a Gigabyte B550M AORUS platform paired with an NVIDIA GeForce RTX 5060 Ti (16GB VRAM). Configured dedicated thermal headroom and stepped PWM acoustic fan curves to sustain sub-62°C temperatures during heavy local LLM batch inference.",
    metrics: ["RTX 5060 Ti 16GB", "Sub-62°C Sustained Load", "PCIe 4.0 Bus", "Acoustic Tuning"],
    statusNote: "Hosts local vLLM inference node resident in 14.1 GB VRAM",
    icon: Cpu,
  },
  cpu: {
    id: "cpu",
    pinNumber: 2,
    traitName: "Thermal & Acoustic Engineering",
    category: "Cooling & Power Management",
    statement:
      "Comfortable with precision thermal compound application, heatpipe dissipation limits, and acoustic fan curve calibration.",
    deepDive:
      "AMD Ryzen 5 5600 6-core/12-thread processor tuned for single-core boost stability and multi-threaded compilation. Custom BIOS voltage offsets minimize thermal throttling while maintaining whisper-quiet operation during 24/7 autonomous agent execution.",
    metrics: ["Ryzen 5 5600 (4.5 GHz)", "BIOS Voltage Offset", "Acoustic <28 dBA", "Sub-60°C Idle"],
    statusNote: "Tuned for low-noise multi-threaded build cycles",
    icon: Flame,
  },
  kernel: {
    id: "kernel",
    pinNumber: 3,
    traitName: "Game & System Performance",
    category: "Systems Craft · Linux & Latency",
    statement: "Tune system and game settings for performance and stability.",
    deepDive:
      "Approached purely through performance engineering: targeting 0.1% low frametime consistency rather than vanity peak averages. Tuned CachyOS Linux kernel with the BORE (Burst-Oriented Response Enhancer) scheduler, Wayland compositor synchronization, and Proton GE shader pipelines for sub-1.2ms frametime variance at 2560x1440 @ 180Hz.",
    metrics: ["CachyOS Kernel 7.3", "BORE Scheduler", "Wayland 1440p @ 180Hz", "Frametime σ < 1.2ms"],
    statusNote: "Proton GE + Wayland tearing-free low-latency pipeline",
    icon: Activity,
  },
  memory: {
    id: "memory",
    pinNumber: 4,
    traitName: "Curiosity & Emerging Silicon",
    category: "Architecture Tracking · High Bandwidth",
    statement: "Follow AI and hardware developments closely.",
    deepDive:
      "Continuously tracking silicon breakthroughs, low-bit weight quantization (NVFP4, FP8, AWQ), KV cache compression, and unified memory interconnects. Evaluates how memory bandwidth bottlenecks impact real-world agent tool-calling latency.",
    metrics: ["32GB DDR4 Memory", "NVFP4 / FP8 Precision", "PCIe NVMe M.2", "Silicon Tracking"],
    statusNote: "Tracking quantization papers & memory architectures",
    icon: HardDrive,
  },
  swarm: {
    id: "swarm",
    pinNumber: 5,
    traitName: "Local AI & Deterministic Systems",
    category: "Autonomous Swarms · Constraint Philosophy",
    statement:
      "The part I care about is deciding what the model is not allowed to do. Rules live in typed code; models provide explanations, not decisions.",
    deepDive:
      "Architect autonomous agent loops on local open-weights LLMs (vLLM NVFP4 on RTX 5060 Ti) governed by strict deterministic AST validators. Mission-critical branching and safety policies are executed in immutable TypeScript rules, restricting probabilistic models strictly to synthesis and natural language explanation.",
    metrics: ["vLLM Port 8001", "14.1GB NVFP4 Allocation", "Deterministic Rule AST", "Zero Cloud Lag"],
    statusNote: "CodeFusion 1st Place architectural foundation",
    icon: ShieldCheck,
  },
};

export function HardwareLab() {
  const [activePinId, setActivePinId] = useState<string>("gpu");
  const [viewMode, setViewMode] = useState<"terminal" | "schematic">("terminal");

  const activeTrait = TRAITS[activePinId] || TRAITS.gpu;

  return (
    <Panel
      id="hardware"
      heading="Hardware Lab & Systems Craft"
      intro="Physical architecture and low-level performance tuning form the foundation of everything I build. Here is my daily driver workstation, tuned for local AI inference, low-latency execution, and thermal stability."
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: The 5 Systems Engineering Pillars */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="border border-rule bg-raised/70 p-4 transition-colors">
            <h3 className="font-narrow text-tiny uppercase tracking-eyebrow text-muted font-bold mb-3 flex items-center justify-between">
              <span>The 5 Engineering Pillars</span>
              <span className="text-signal">Select to Inspect</span>
            </h3>

            <div className="space-y-2">
              {Object.values(TRAITS).map((trait) => {
                const isActive = activePinId === trait.id;
                const Icon = trait.icon;

                return (
                  <button
                    key={trait.id}
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setActivePinId(trait.id);
                    }}
                    className={`relative w-full text-left p-3 transition-colors border ${
                      isActive
                        ? "border-signal bg-raised"
                        : "border-rule/60 bg-ground/40 hover:bg-raised hover:border-rule-strong"
                    }`}
                  >
                    {isActive && (
                      <div
                        className="absolute left-0 top-0 bottom-0 w-1 bg-signal"
                        aria-hidden="true"
                      />
                    )}

                    <div className="flex items-start gap-3">
                      <div
                        className={`mt-0.5 p-1.5 border ${
                          isActive
                            ? "bg-signal text-raised border-signal"
                            : "bg-ground text-muted border-rule"
                        }`}
                      >
                        <Icon className="size-4" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-sans text-small font-semibold text-ink truncate">
                            {trait.traitName}
                          </span>
                          <span className="font-narrow text-tiny uppercase tracking-eyebrow text-muted shrink-0 tabular-nums">
                            PILLAR 0{trait.pinNumber}
                          </span>
                        </div>

                        <p className="mt-1 font-sans text-tiny text-muted line-clamp-2 leading-relaxed">
                          {trait.statement}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Pillar Deep-Dive Card */}
          <SpotlightCard className="p-4.5 bg-raised/90">
            <div className="flex items-center justify-between border-b border-rule-soft pb-2 mb-3">
              <span className="font-narrow text-tiny uppercase tracking-eyebrow font-bold text-signal">
                {activeTrait.category}
              </span>
              <span className="inline-flex items-center gap-1 font-narrow text-tiny text-muted">
                <span className="size-1.5 bg-signal breathe" />
                {activeTrait.statusNote}
              </span>
            </div>

            <p className="font-sans text-small text-muted leading-relaxed mb-4">
              {activeTrait.deepDive}
            </p>

            <div className="flex flex-wrap gap-1.5">
              {activeTrait.metrics.map((metric) => (
                <span
                  key={metric}
                  className="inline-flex items-center gap-1 border border-rule bg-ground px-2 py-0.5 font-narrow text-meta tracking-rail text-ink"
                >
                  <span className="text-signal font-bold">#</span>
                  {metric}
                </span>
              ))}
            </div>
          </SpotlightCard>
        </div>

        {/* Right Column: Interactive Terminal REPL & Blueprint Toggle */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* View Switcher Bar */}
          <div className="flex items-center justify-between border-b border-rule-soft pb-2 font-narrow text-meta tracking-rail">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  sound.playSwitch();
                  setViewMode("terminal");
                }}
                className={`inline-flex items-center gap-1.5 px-3 py-1 text-tiny uppercase tracking-eyebrow font-semibold border transition-colors ${
                  viewMode === "terminal"
                    ? "bg-signal text-raised border-signal"
                    : "bg-ground text-muted hover:text-ink hover:bg-raised border-rule-strong"
                }`}
              >
                <Terminal className="size-3.5" />
                Live Terminal REPL
              </button>

              <button
                type="button"
                onClick={() => {
                  sound.playSwitch();
                  setViewMode("schematic");
                }}
                className={`inline-flex items-center gap-1.5 px-3 py-1 text-tiny uppercase tracking-eyebrow font-semibold border transition-colors ${
                  viewMode === "schematic"
                    ? "bg-signal text-raised border-signal"
                    : "bg-ground text-muted hover:text-ink hover:bg-raised border-rule-strong"
                }`}
              >
                <Cpu className="size-3.5" />
                Rig Blueprint Schematic
              </button>
            </div>

            <span className="hidden sm:inline font-narrow text-tiny text-muted">
              {viewMode === "terminal"
                ? "Interactive CLI Simulation"
                : "Chassis Hotspot Explorer"}
            </span>
          </div>

          {/* Viewport: Terminal REPL or Schematic with Spotlight Shader */}
          {viewMode === "terminal" ? (
            <InteractiveTerminal />
          ) : (
            <SpotlightCard className="p-3 bg-raised/70">
              <RigBlueprint
                activePinId={activePinId}
                onSelectPin={(id) => setActivePinId(id)}
              />
            </SpotlightCard>
          )}
        </div>
      </div>
    </Panel>
  );
}
