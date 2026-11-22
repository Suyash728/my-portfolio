"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Panel } from "@/components/Panel";
import { sound } from "@/lib/sound";
import { Cpu, Terminal, Layers, Monitor, Gamepad2 } from "lucide-react";

interface VramPreset {
  id: string;
  name: string;
  vram: number;
  total: number;
  format: string;
}

const VRAM_PRESETS: VramPreset[] = [
  { id: "qwen", name: "Qwen3-14B", vram: 14.1, total: 16.0, format: "NVFP4 Native" },
  { id: "devstral", name: "Devstral-24B", vram: 14.8, total: 16.0, format: "Q4_K_M Quant" },
  { id: "mistral", name: "Mistral-7B", vram: 8.4, total: 16.0, format: "Q8_0 Quant" },
];

export function BattlestationBento() {
  const [activeVram, setActiveVram] = useState<VramPreset>(VRAM_PRESETS[0]);
  const reduceMotion = useReducedMotion();

  return (
    <Panel
      id="battlestation"
      heading="Systems & Rig Telemetry"
      intro="The rig I run local models on, so private data and test code never leave the machine."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card 1: 16GB Blackwell VRAM Gauge */}
        <div className="oled-well p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-oled-rule pb-2 mb-3">
              <div className="flex items-center gap-2">
                <Cpu className="size-4 text-oled-teal" />
                <h3 className="font-sans text-small font-semibold text-oled-ink">
                  16GB VRAM Gauge
                </h3>
              </div>
              <span className="font-narrow text-tiny uppercase tracking-eyebrow font-semibold text-oled-teal border border-oled-teal/40 bg-signal-teal/30 px-2 py-0.5 rounded">
                All Layers On GPU
              </span>
            </div>

            {/* Model Presets Selector */}
            <div className="flex gap-1.5 mb-3">
              {VRAM_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setActiveVram(preset);
                  }}
                  className={`flex-1 rounded-md py-1 px-1.5 font-narrow text-tiny uppercase tracking-eyebrow border text-center transition-all ${
                    activeVram.id === preset.id
                      ? "border-oled-teal bg-oled-surface text-oled-ink font-semibold"
                      : "border-oled-rule bg-oled-deep text-oled-muted hover:text-oled-ink"
                  }`}
                >
                  {preset.name}
                </button>
              ))}
            </div>

            {/* Segmented VRAM Bar */}
            <div className="p-3 bg-oled-deep rounded-lg border border-oled-rule font-narrow tabular-nums mb-2">
              <div className="flex items-center justify-between text-tiny mb-2">
                <span className="flex items-center gap-1.5 text-oled-muted">
                  <span className="size-1.5 rounded-full bg-oled-teal animate-pulse" />
                  Format: {activeVram.format}
                </span>
                <span className="font-semibold text-oled-ink tabular-nums text-tiny">
                  {activeVram.vram} / {activeVram.total} GiB ({Math.round((activeVram.vram / activeVram.total) * 100)}%)
                </span>
              </div>

              {/* Glowing Segmented Bar */}
              <div className="h-3.5 w-full bg-oled-track rounded overflow-hidden p-0.5 border border-oled-rule flex gap-0.5">
                <motion.div
                  className="h-full rounded-xs bg-oled-orange shadow-[0_0_8px_color-mix(in_srgb,var(--color-oled-orange)_60%,transparent)]"
                  initial={false}
                  animate={{ width: `${(activeVram.vram / activeVram.total) * 100}%` }}
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 380, damping: 30 }
                  }
                />
                <div className="flex-1 h-full rounded-xs bg-oled-surface opacity-50" />
              </div>

              <div className="flex items-center justify-between text-tiny mt-2 pt-2 border-t border-oled-rule/60">
                <span className="text-oled-orange-soft">Weights + KV: {activeVram.vram.toFixed(1)} GB</span>
                <span className="text-oled-muted">Free: {(activeVram.total - activeVram.vram).toFixed(1)} GB</span>
              </div>
            </div>
          </div>

          <p className="font-narrow text-tiny tracking-rail text-oled-muted pt-1">
            Approximate footprint; KV cache grows with context length.
          </p>
        </div>

        {/* Card 2: Hardware & CachyOS Spec Strip */}
        <div className="oled-well p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-oled-rule pb-2 mb-3">
              <div className="flex items-center gap-2">
                <Terminal className="size-4 text-oled-teal" />
                <h3 className="font-sans text-small font-semibold text-oled-ink">
                  Hardware &amp; CachyOS
                </h3>
              </div>
              <span className="font-narrow text-tiny text-oled-muted">
                Fish Shell 4.0
              </span>
            </div>

            <div className="space-y-2">
              <div className="p-2 rounded-md bg-oled-deep border border-oled-rule flex items-center justify-between text-tiny">
                <span className="flex items-center gap-2 text-oled-ink font-medium">
                  <Layers className="size-3.5 text-oled-teal" />
                  White Lancool 217 INF + RTX 5060 Ti 16GB
                </span>
                <span className="text-oled-muted text-tiny font-narrow">2× 170mm ARGB</span>
              </div>

              <div className="p-2 rounded-md bg-oled-deep border border-oled-rule flex items-center justify-between text-tiny">
                <span className="flex items-center gap-2 text-oled-ink font-medium">
                  <Monitor className="size-3.5 text-oled-teal" />
                  27&quot; MSI 1440p @ 180Hz Rapid IPS
                </span>
                <span className="text-oled-teal text-tiny font-narrow">1ms GtG</span>
              </div>

              <div className="p-2 rounded-md bg-oled-deep border border-oled-rule flex items-center justify-between text-tiny">
                <span className="flex items-center gap-2 text-oled-ink font-medium">
                  <Terminal className="size-3.5 text-oled-teal" />
                  CachyOS Linux x86_64
                </span>
                <span className="text-oled-muted text-tiny font-narrow">7.3 BORE Kernel</span>
              </div>

              <div className="p-2 rounded-md bg-oled-deep border border-oled-rule flex items-center justify-between text-tiny">
                <span className="flex items-center gap-2 text-oled-ink font-medium">
                  <Gamepad2 className="size-3.5 text-oled-orange" />
                  8BitDo Ultimate 2C + G304
                </span>
                <span className="text-oled-orange text-tiny font-narrow">Hall Effect Sticks</span>
              </div>
            </div>
          </div>

          <p className="font-narrow text-tiny tracking-rail text-oled-muted pt-2 border-t border-oled-rule/60 mt-2">
            Low-latency Wayland desktop tuned for compile speed and competitive FPS pacing.
          </p>
        </div>
      </div>
    </Panel>
  );
}
