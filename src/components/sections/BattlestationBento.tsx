"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Panel } from "@/components/Panel";
import { BattlestationStage } from "@/components/BattlestationStage";
import { sound } from "@/lib/sound";
import {
  Cpu,
  Gamepad2,
  Terminal,
  Layers,
  Monitor,
  Mouse,
} from "lucide-react";

interface VramPreset {
  id: string;
  name: string;
  vram: number; // in GB
  total: number;
  offload: number;
  format: string;
}

const VRAM_PRESETS: VramPreset[] = [
  { id: "qwen", name: "Qwen3-14B", vram: 14.1, total: 16.0, offload: 0.0, format: "NVFP4 Native" },
  { id: "devstral", name: "Devstral-24B", vram: 14.8, total: 16.0, offload: 0.0, format: "Q4_K_M Quant" },
  { id: "mistral", name: "Mistral-7B", vram: 8.4, total: 16.0, offload: 0.0, format: "Q8 Uncompressed" },
];

const GEAR_ITEMS = [
  { name: "Lancool 207 Chassis", detail: "Dual 140mm front mesh + dual 120mm upward shroud intake", icon: Layers },
  { name: "27\" MSI Frameless IPS", detail: "1440p @ 180Hz · Wayland tearing-free refresh", icon: Monitor },
  { name: "RTX 5060 Ti 16GB", detail: "Blackwell sm_120 silicon · 0.0 GB host memory offload", icon: Cpu },
  { name: "Teal 8BitDo 2C + G304", detail: "Hall effect magnetic sticks + sub-1ms optical tracking", icon: Mouse },
  { name: "CachyOS Linux + Fish", detail: "7.3 BORE low-latency kernel · KDE Plasma 6.8", icon: Terminal },
];

const GAMES = [
  { name: "Valorant", note: "180Hz sub-1ms frame pacing" },
  { name: "EA Sports FC 26", note: "Tactical simulation engine" },
  { name: "Spider-Man", note: "Ray-traced frame traversal" },
  { name: "Cities: Skylines 2", note: "Complex systems simulation" },
];

export function BattlestationBento() {
  const [activeVram, setActiveVram] = useState<VramPreset>(VRAM_PRESETS[0]);
  const [gearTab, setGearTab] = useState<"gear" | "gaming">("gear");

  return (
    <Panel
      id="battlestation"
      heading="Battlestation & Systems Rig"
      intro="My daily driver workstation, custom-tuned for local AI batch inference, low-latency Linux gaming, and thermal stability."
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* =========================================================================
            LEFT COLUMN (8 COLS): Centerpiece Dual-Mode 2-Scene Interactive Stage
        ========================================================================= */}
        <div className="lg:col-span-8">
          <BattlestationStage />
        </div>

        {/* =========================================================================
            RIGHT COLUMN (4 COLS): 2 Ultra-Sleek Jet-Black OLED Bento Widgets
        ========================================================================= */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {/* Widget 1: Live 16GB VRAM Allocation Bar */}
          <div className="oled-well p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-oled-rule pb-2.5 mb-3">
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

              {/* OLED Telemetry Readout */}
              <div className="p-3 bg-[#101216] rounded-lg border border-oled-rule font-mono mb-3">
                <div className="flex items-center justify-between text-[11px] mb-2">
                  <span className="flex items-center gap-1.5 text-oled-muted">
                    <span className="size-1.5 rounded-full bg-[#2dd4bf] animate-pulse" />
                    Format: {activeVram.format}
                  </span>
                  <span className="font-semibold text-oled-ink tabular-nums text-tiny">
                    {activeVram.vram} / {activeVram.total} GiB ({Math.round((activeVram.vram / activeVram.total) * 100)}%)
                  </span>
                </div>

                {/* Glowing Segmented VRAM Bar */}
                <div className="h-4 w-full bg-[#181a1f] rounded-md overflow-hidden p-0.5 border border-oled-rule flex gap-0.5">
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

                <div className="flex flex-wrap items-center justify-between text-[11px] mt-2 pt-2 border-t border-oled-rule/60">
                  <span className="flex items-center gap-1 text-[#fb923c]">
                    <span className="size-1.5 rounded-full bg-[#f97316]" />
                    Weights: {(activeVram.vram * 0.75).toFixed(1)} GB
                  </span>
                  <span className="flex items-center gap-1 text-[#67e8f9]">
                    <span className="size-1.5 rounded-full bg-[#22d3ee]" />
                    KV Cache: {(activeVram.vram * 0.25).toFixed(1)} GB
                  </span>
                  <span className="text-oled-muted">
                    Headroom: {(activeVram.total - activeVram.vram).toFixed(1)} GB
                  </span>
                </div>
              </div>
            </div>

            <p className="font-narrow text-tiny tracking-rail text-oled-muted border-t border-oled-rule/60 pt-2">
              Weights and KV cache fit strictly inside silicon. Zero host memory spill.
            </p>
          </div>

          {/* Widget 2: Gear & Gaming Switcher */}
          <div className="oled-well p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-oled-rule pb-2.5 mb-3">
                <div className="flex items-center gap-2">
                  <Gamepad2 className="size-4 text-[#f97316]" />
                  <h3 className="font-sans text-small font-semibold text-oled-ink">
                    Gear &amp; Gaming
                  </h3>
                </div>

                {/* Tab Switcher */}
                <div className="flex p-0.5 rounded-md bg-[#101216] border border-oled-rule">
                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setGearTab("gear");
                    }}
                    className={`px-2 py-0.5 font-narrow text-tiny uppercase tracking-eyebrow rounded transition-colors ${
                      gearTab === "gear" ? "bg-[#1d2026] text-white font-semibold" : "text-oled-muted hover:text-oled-ink"
                    }`}
                  >
                    Rig Gear
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setGearTab("gaming");
                    }}
                    className={`px-2 py-0.5 font-narrow text-tiny uppercase tracking-eyebrow rounded transition-colors ${
                      gearTab === "gaming" ? "bg-[#1d2026] text-white font-semibold" : "text-oled-muted hover:text-oled-ink"
                    }`}
                  >
                    Off-Clock
                  </button>
                </div>
              </div>

              {/* View: Gear or Gaming */}
              <AnimatePresence mode="wait">
                {gearTab === "gear" ? (
                  <motion.div
                    key="gear"
                    initial={{ opacity: 0, y: 3 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="space-y-1.5"
                  >
                    {GEAR_ITEMS.map((item) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={item.name}
                          className="p-2 rounded-md bg-[#101216] border border-oled-rule flex items-start gap-2.5 hover:border-[#2dd4bf]/40 transition-colors"
                        >
                          <Icon className="size-3.5 text-[#2dd4bf] shrink-0 mt-0.5" />
                          <div className="min-w-0">
                            <div className="font-sans text-tiny font-semibold text-oled-ink truncate">
                              {item.name}
                            </div>
                            <div className="font-narrow text-[11px] text-oled-muted truncate">
                              {item.detail}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </motion.div>
                ) : (
                  <motion.div
                    key="gaming"
                    initial={{ opacity: 0, y: 3 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="space-y-1.5"
                  >
                    <div className="grid grid-cols-2 gap-1.5">
                      {GAMES.map((game) => (
                        <div
                          key={game.name}
                          className="p-2 rounded-md bg-[#101216] border border-oled-rule"
                        >
                          <div className="font-sans text-tiny font-semibold text-oled-ink">
                            {game.name}
                          </div>
                          <div className="font-narrow text-[10.5px] text-oled-muted truncate mt-0.5">
                            {game.note}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* GTA VI Anticipation Pill */}
                    <div className="p-2 rounded-md bg-[#101216] border border-[#f97316]/40 flex items-center justify-between mt-2">
                      <span className="flex items-center gap-1.5 font-narrow text-tiny uppercase tracking-eyebrow text-oled-ink font-semibold">
                        <span className="size-1.5 rounded-full bg-[#f97316] animate-pulse" />
                        GTA VI Anticipation
                      </span>
                      <span className="font-narrow text-[10.5px] uppercase tracking-eyebrow text-[#f97316] font-bold">
                        Target: Fall 2026
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <p className="font-narrow text-tiny tracking-rail text-oled-muted border-t border-oled-rule/60 pt-2 mt-3">
              Fast Wayland refresh pacing balanced with local deep-learning inference.
            </p>
          </div>
        </div>
      </div>
    </Panel>
  );
}
