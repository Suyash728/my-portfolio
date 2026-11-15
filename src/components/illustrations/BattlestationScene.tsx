"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Cpu, Power, Zap, Fan, Monitor, Sparkles } from "lucide-react";
import { sound } from "@/lib/sound";

type MonitorView = "vllm" | "kernel" | "rules";
type FanProfile = "quiet" | "performance";

export function BattlestationScene() {
  const [isPowerOn, setIsPowerOn] = useState(true);
  const [fanProfile, setFanProfile] = useState<FanProfile>("performance");
  const [monitorView, setMonitorView] = useState<MonitorView>("vllm");
  const [lastPingTime, setLastPingTime] = useState<string | null>(null);
  const [isPinging, setIsPinging] = useState(false);

  const handlePing = () => {
    sound.playSwitch();
    setIsPinging(true);
    setLastPingTime(new Date().toLocaleTimeString());
    setTimeout(() => {
      sound.playSuccess();
      setIsPinging(false);
    }, 700);
  };

  return (
    <div className="relative w-full select-none">
      <div className="relative rounded-2xl border border-rule bg-raised/80 p-5 shadow-sm backdrop-blur-md">
        {/* Workstation Tactical Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rule-soft pb-3 mb-4">
          <div className="flex items-center gap-2.5">
            {/* Tactile PC Power Toggle */}
            <button
              onClick={() => {
                sound.playSwitch();
                setIsPowerOn(!isPowerOn);
              }}
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-narrow text-tiny uppercase tracking-eyebrow font-bold transition-all border ${
                isPowerOn
                  ? "bg-emerald-500/15 text-emerald-700 border-emerald-500/40 shadow-xs"
                  : "bg-ground text-muted border-rule hover:text-ink"
              }`}
              title="Click to toggle workstation power state"
              aria-label="Toggle workstation power state"
            >
              <Power className={`size-3 ${isPowerOn ? "text-emerald-600" : "text-muted"}`} />
              <span>{isPowerOn ? "RIG: ONLINE" : "RIG: STANDBY"}</span>
            </button>

            {/* Power Wattage Indicator */}
            <span className="hidden sm:inline-flex items-center gap-1 rounded bg-ground px-2 py-0.5 font-mono text-[11px] text-muted border border-rule">
              <Zap className="size-3 text-amber-500" />
              {isPowerOn
                ? fanProfile === "performance"
                  ? "145W Load"
                  : "58W Idle"
                : "12W Sleep"}
            </span>
          </div>

          {/* Subsystem Mode Switches */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sound.playClick();
                setFanProfile(fanProfile === "quiet" ? "performance" : "quiet");
              }}
              className={`inline-flex items-center gap-1.5 rounded px-2.5 py-1 font-narrow text-tiny uppercase tracking-eyebrow font-semibold border transition-all ${
                fanProfile === "performance"
                  ? "bg-signal text-raised border-signal"
                  : "bg-ground text-muted border-rule hover:text-ink hover:bg-raised"
              }`}
              title="Toggle between Quiet Acoustic and Full Performance Profile"
            >
              <Fan className={`size-3 ${fanProfile === "performance" ? "animate-spin" : ""}`} />
              <span>{fanProfile === "performance" ? "Acoustic: 2400 RPM" : "Quiet: 0 RPM"}</span>
            </button>
          </div>
        </div>

        {/* Studio Character Illustration Frame */}
        <div className="relative mx-auto aspect-square max-w-[420px] overflow-hidden rounded-xl bg-gradient-to-b from-ground/40 to-ground/80 p-2 border border-rule-soft bg-grain">
          {/* High-Resolution Studio Character Asset */}
          <div className="relative h-full w-full">
            <Image
              src="/images/practical_psych_suyash.webp"
              alt="Suyash Kerkar in Practical Psychology art style at custom PC battlestation"
              width={832}
              height={832}
              priority
              className={`h-full w-full object-contain transition-all duration-300 ${
                isPowerOn ? "opacity-100" : "opacity-60 grayscale-[40%]"
              }`}
            />

            {/* Interactive PC Tower Hotspot Overlay */}
            <div
              onClick={() => setFanProfile(fanProfile === "quiet" ? "performance" : "quiet")}
              className="absolute top-8 right-6 cursor-pointer group"
              title="Click PC Tower to toggle cooling profile"
            >
              <div className="rounded-lg border border-rule/90 bg-raised/95 p-2 shadow-md backdrop-blur-md transition-transform group-hover:scale-105">
                <div className="flex items-center gap-1.5 font-narrow text-[10px] uppercase tracking-eyebrow text-emerald-600 font-bold">
                  <Cpu className="size-3" />
                  <span>RTX 5060 Ti 16GB</span>
                </div>
                <div className="font-mono text-[11px] text-ink font-semibold">
                  {isPowerOn
                    ? fanProfile === "performance"
                      ? "61°C · 14.1GB NVFP4"
                      : "38°C · Passive Fan"
                    : "0 RPM · Offline"}
                </div>
                <div className="font-narrow text-[9px] text-signal tracking-rail mt-0.5">
                  CLICK TO SWITCH PROFILE →
                </div>
              </div>
            </div>

            {/* Interactive Monitor Overlay Screen */}
            <div
              onClick={() => {
                sound.playClick();
                const nextView =
                  monitorView === "vllm" ? "kernel" : monitorView === "kernel" ? "rules" : "vllm";
                setMonitorView(nextView);
              }}
              className="absolute bottom-6 left-6 cursor-pointer group max-w-[195px]"
              title="Click monitor to switch displayed subsystem"
            >
              <div className="rounded-lg border-2 border-signal/60 bg-[#12151B]/95 p-2.5 shadow-lg backdrop-blur-md text-[#E2E8F0] transition-transform group-hover:scale-105">
                <div className="flex items-center justify-between font-mono text-[9px] text-muted border-b border-white/10 pb-1 mb-1.5">
                  <span className="flex items-center gap-1 text-[#38BDF8]">
                    <Monitor className="size-2.5" />
                    <span>Display 180Hz</span>
                  </span>
                  <span className="text-amber-400 font-bold">CLICK TO CYCLE</span>
                </div>

                <AnimatePresence mode="wait">
                  {monitorView === "vllm" && (
                    <motion.div
                      key="vllm"
                      initial={{ opacity: 0, y: 2 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="font-mono text-[10px] leading-tight"
                    >
                      <div className="text-emerald-400 font-bold">vLLM Inference [OK]</div>
                      <div className="text-slate-300 text-[9px] mt-0.5">Qwen3-14B NVFP4 Port 8001</div>
                      <div className="text-amber-400 text-[8.5px]">Hermes Parser: Active</div>
                    </motion.div>
                  )}

                  {monitorView === "kernel" && (
                    <motion.div
                      key="kernel"
                      initial={{ opacity: 0, y: 2 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="font-mono text-[10px] leading-tight"
                    >
                      <div className="text-[#38BDF8] font-bold">CachyOS BORE Kernel</div>
                      <div className="text-slate-300 text-[9px] mt-0.5">Frametime σ: 0.84ms</div>
                      <div className="text-emerald-400 text-[8.5px]">Wayland 1440p @ 180Hz</div>
                    </motion.div>
                  )}

                  {monitorView === "rules" && (
                    <motion.div
                      key="rules"
                      initial={{ opacity: 0, y: 2 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="font-mono text-[10px] leading-tight"
                    >
                      <div className="text-flag font-bold">Rule Table &gt; LLM</div>
                      <div className="text-slate-300 text-[9px] mt-0.5">Deterministic Guardrail</div>
                      <div className="text-emerald-400 text-[8.5px]">Zero Hallucination</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Live Interaction Action Bar */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-rule-soft">
          <button
            onClick={handlePing}
            disabled={!isPowerOn || isPinging}
            className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 font-narrow text-tiny uppercase tracking-eyebrow font-semibold transition-all ${
              isPinging
                ? "bg-emerald-600 text-raised"
                : "bg-signal text-raised hover:bg-signal/90 shadow-xs active:scale-98"
            }`}
          >
            <Sparkles className={`size-3 ${isPinging ? "animate-spin" : ""}`} />
            <span>{isPinging ? "Dispatching Query..." : "Ping Local Agent Swarm"}</span>
          </button>

          <span className="font-narrow text-tiny text-muted">
            {lastPingTime ? `Last response: ${lastPingTime} (18.2ms TTFT)` : "Interactive battlestation online"}
          </span>
        </div>
      </div>
    </div>
  );
}
