"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
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
  { id: "mistral", name: "Mistral-7B", vram: 8.4, total: 16.0, format: "Q8 Uncompressed" },
];

export function BattlestationBento() {
  const [activeVram, setActiveVram] = useState<VramPreset>(VRAM_PRESETS[0]);

  return (
    <Panel
      id="battlestation"
      heading="Systems & Rig Telemetry"
      intro="Hardware configured strictly for zero-host-spill local AI inference and low-latency Linux gaming."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card 1: 16GB Blackwell VRAM Gauge */}
        <div className="oled-well p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-oled-rule pb-2 mb-3">
              <div className="flex items-center gap-2">
                <Cpu className="size-4 text-[#2dd4bf]" />
                <h3 className="font-sans text-small font-semibold text-oled-ink">
                  16GB VRAM Gauge
                </h3>
              </div>
              <span className="font-narrow text-tiny uppercase tracking-eyebrow font-semibold text-[#2dd4bf] border border-[#2dd4bf]/40 bg-[#0f5c6e]/30 px-2 py-0.5 rounded">
                0.0 GB Host Offload
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
                  className={`flex-1 rounded-md py-1 px-1.5 font-narrow text-[11px] uppercase tracking-eyebrow border text-center transition-all ${
                    activeVram.id === preset.id
                      ? "border-[#2dd4bf] bg-[#1d2026] text-white font-semibold"
                      : "border-oled-rule bg-[#101216] text-oled-muted hover:text-oled-ink"
                  }`}
                >
                  {preset.name}
                </button>
              ))}
            </div>

            {/* Segmented VRAM Bar */}
            <div className="p-3 bg-[#101216] rounded-lg border border-oled-rule font-mono mb-2">
              <div className="flex items-center justify-between text-[11px] mb-2">
                <span className="flex items-center gap-1.5 text-oled-muted">
                  <span className="size-1.5 rounded-full bg-[#2dd4bf] animate-pulse" />
                  Format: {activeVram.format}
                </span>
                <span className="font-semibold text-oled-ink tabular-nums text-tiny">
                  {activeVram.vram} / {activeVram.total} GiB ({Math.round((activeVram.vram / activeVram.total) * 100)}%)
                </span>
              </div>

              {/* Glowing Segmented Bar */}
              <div className="h-3.5 w-full bg-[#181a1f] rounded overflow-hidden p-0.5 border border-oled-rule flex gap-0.5">
                <motion.div
                  className="h-full rounded-xs bg-[#f97316] shadow-[0_0_8px_rgba(249,115,22,0.6)]"
                  initial={false}
                  animate={{ width: `${((activeVram.vram * 0.75) / activeVram.total) * 100}%` }}
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                />
                <motion.div
                  className="h-full rounded-xs bg-[#22d3ee] shadow-[0_0_8px_rgba(34,211,238,0.6)]"
                  initial={false}
                  animate={{ width: `${((activeVram.vram * 0.25) / activeVram.total) * 100}%` }}
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                />
                <div className="flex-1 h-full rounded-xs bg-[#1a1d24] opacity-50" />
              </div>

              <div className="flex items-center justify-between text-[10.5px] mt-2 pt-2 border-t border-oled-rule/60">
                <span className="text-[#fb923c]">Weights: {(activeVram.vram * 0.75).toFixed(1)} GB</span>
                <span className="text-[#67e8f9]">KV: {(activeVram.vram * 0.25).toFixed(1)} GB</span>
                <span className="text-oled-muted">Free: {(activeVram.total - activeVram.vram).toFixed(1)} GB</span>
              </div>
            </div>
          </div>

          <p className="font-narrow text-tiny tracking-rail text-oled-muted pt-1">
            Weights and KV cache fit strictly inside silicon. Zero host memory spill.
          </p>
        </div>

        {/* Card 2: Hardware & CachyOS Spec Strip */}
        <div className="oled-well p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-oled-rule pb-2 mb-3">
              <div className="flex items-center gap-2">
                <Terminal className="size-4 text-[#2dd4bf]" />
                <h3 className="font-sans text-small font-semibold text-oled-ink">
                  Hardware &amp; CachyOS
                </h3>
              </div>
              <span className="font-mono text-tiny text-oled-muted">
                Fish Shell 4.0
              </span>
            </div>

            <div className="space-y-2">
              <div className="p-2 rounded-md bg-[#101216] border border-oled-rule flex items-center justify-between text-tiny">
                <span className="flex items-center gap-2 text-oled-ink font-medium">
                  <Layers className="size-3.5 text-[#2dd4bf]" />
                  Lancool 217 INF + RTX 5060 Ti 16GB
                </span>
                <span className="text-oled-muted text-[11px] font-mono">Dual 140mm Mesh</span>
              </div>

              <div className="p-2 rounded-md bg-[#101216] border border-oled-rule flex items-center justify-between text-tiny">
                <span className="flex items-center gap-2 text-oled-ink font-medium">
                  <Monitor className="size-3.5 text-[#2dd4bf]" />
                  27&quot; MSI 1440p @ 180Hz Fast IPS
                </span>
                <span className="text-[#2dd4bf] text-[11px] font-mono">Wayland Sub-1ms</span>
              </div>

              <div className="p-2 rounded-md bg-[#101216] border border-oled-rule flex items-center justify-between text-tiny">
                <span className="flex items-center gap-2 text-oled-ink font-medium">
                  <Terminal className="size-3.5 text-[#2dd4bf]" />
                  CachyOS Linux x86_64
                </span>
                <span className="text-oled-muted text-[11px] font-mono">7.3 BORE Kernel</span>
              </div>

              <div className="p-2 rounded-md bg-[#101216] border border-oled-rule flex items-center justify-between text-tiny">
                <span className="flex items-center gap-2 text-oled-ink font-medium">
                  <Gamepad2 className="size-3.5 text-[#f97316]" />
                  8BitDo Ultimate 2C + G304
                </span>
                <span className="text-[#f97316] text-[11px] font-mono">Hall Effect Sticks</span>
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
