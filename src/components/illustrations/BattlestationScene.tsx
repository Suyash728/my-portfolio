"use client";

import React, { useState } from "react";
import Image from "next/image";
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
      <div className="relative border border-rule bg-raised/80 p-5">
        {/* Workstation Tactical Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rule-soft pb-3 mb-4">
          <div className="flex items-center gap-2.5">
            {/* Tactile PC Power Toggle */}
            <button
              type="button"
              onClick={() => {
                sound.playSwitch();
                setIsPowerOn(!isPowerOn);
              }}
              className={`inline-flex items-center gap-1.5 border px-2.5 py-1 font-narrow text-tiny uppercase tracking-eyebrow font-bold transition-colors ${
                isPowerOn
                  ? "bg-signal/15 text-signal border-signal"
                  : "bg-ground text-muted border-rule hover:text-ink"
              }`}
              title="Click to toggle workstation power state"
              aria-label={
                isPowerOn
                  ? "RIG: ONLINE - Toggle workstation power state"
                  : "RIG: STANDBY - Toggle workstation power state"
              }
            >
              <Power className={`size-3 ${isPowerOn ? "text-signal" : "text-muted"}`} />
              <span>{isPowerOn ? "RIG: ONLINE" : "RIG: STANDBY"}</span>
            </button>

            {/* Power Wattage Indicator */}
            <span className="hidden sm:inline-flex items-center gap-1 border border-rule bg-ground px-2 py-0.5 text-tiny font-sans tabular-nums text-muted">
              <Zap className="size-3 text-flag" />
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
              type="button"
              onClick={() => {
                sound.playClick();
                setFanProfile(fanProfile === "quiet" ? "performance" : "quiet");
              }}
              className={`inline-flex items-center gap-1.5 border px-2.5 py-1 font-narrow text-tiny uppercase tracking-eyebrow font-semibold transition-colors ${
                fanProfile === "performance"
                  ? "bg-signal text-raised border-signal"
                  : "bg-ground text-muted border-rule-strong hover:text-ink hover:bg-raised"
              }`}
              title="Toggle between Quiet Acoustic and Full Performance Profile"
            >
              <Fan className={`size-3 ${fanProfile === "performance" ? "animate-spin" : ""}`} />
              <span>{fanProfile === "performance" ? "Acoustic: 2400 RPM" : "Quiet: 0 RPM"}</span>
            </button>
          </div>
        </div>

        {/* Studio Character Illustration Frame */}
        <div className="relative mx-auto aspect-square max-w-[420px] overflow-hidden bg-ground p-2 border border-rule-soft bg-grain">
          {/* High-Resolution Studio Character Asset */}
          <div className="relative h-full w-full">
            <Image
              src="/images/practical_psych_suyash.webp"
              alt="Suyash Kerkar at custom PC workstation"
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
              <div className="border border-rule-strong bg-raised/95 p-2 transition-colors group-hover:border-signal">
                <div className="flex items-center gap-1.5 font-narrow text-tiny uppercase tracking-eyebrow text-signal font-bold">
                  <Cpu className="size-3" />
                  <span>RTX 5060 Ti 16GB</span>
                </div>
                <div className="font-sans text-small text-ink font-semibold tabular-nums mt-0.5">
                  {isPowerOn
                    ? fanProfile === "performance"
                      ? "61°C · 14.1GB NVFP4"
                      : "38°C · Passive Fan"
                    : "0 RPM · Offline"}
                </div>
                <div className="font-narrow text-tiny text-signal tracking-rail mt-0.5 uppercase">
                  SWITCH PROFILE →
                </div>
              </div>
            </div>

            {/* Interactive Monitor Overlay Screen: Control Room Light Readout */}
            <div
              onClick={() => {
                sound.playClick();
                const nextView =
                  monitorView === "vllm" ? "kernel" : monitorView === "kernel" ? "rules" : "vllm";
                setMonitorView(nextView);
              }}
              className="absolute bottom-6 left-6 cursor-pointer group max-w-[200px]"
              title="Click monitor to switch displayed subsystem"
            >
              <div className="border border-rule-strong bg-raised p-2.5 transition-colors group-hover:border-signal">
                <div className="flex items-center justify-between text-tiny text-muted border-b border-rule-soft pb-1 mb-1.5">
                  <span className="flex items-center gap-1 text-ink font-narrow uppercase tracking-rail">
                    <Monitor className="size-3 text-signal" />
                    <span>Display 180Hz</span>
                  </span>
                  <span className="text-signal font-semibold font-narrow text-tiny">CYCLE</span>
                </div>

                {monitorView === "vllm" && (
                  <div className="font-sans text-small leading-tight tabular-nums">
                    <div className="text-ink font-semibold">vLLM Inference [OK]</div>
                    <div className="text-muted text-tiny mt-0.5">Qwen3-14B NVFP4 Port 8001</div>
                    <div className="text-signal font-semibold text-tiny">Hermes Parser: Active</div>
                  </div>
                )}

                {monitorView === "kernel" && (
                  <div className="font-sans text-small leading-tight tabular-nums">
                    <div className="text-ink font-semibold">CachyOS BORE Kernel</div>
                    <div className="text-muted text-tiny mt-0.5">Frametime σ: 0.84ms</div>
                    <div className="text-signal font-semibold text-tiny">Wayland 1440p @ 180Hz</div>
                  </div>
                )}

                {monitorView === "rules" && (
                  <div className="font-sans text-small leading-tight tabular-nums">
                    <div className="text-ink font-semibold">Rule Table &gt; LLM</div>
                    <div className="text-muted text-tiny mt-0.5">Deterministic Guardrail</div>
                    <div className="text-flag font-semibold text-tiny">Zero Hallucination</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Live Interaction Action Bar */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-rule-soft">
          <button
            type="button"
            onClick={handlePing}
            disabled={!isPowerOn || isPinging}
            className="inline-flex items-center gap-1.5 border border-signal bg-signal px-3 py-1.5 font-narrow text-tiny uppercase tracking-eyebrow font-semibold text-raised hover:bg-signal/90 transition-colors disabled:opacity-50"
          >
            <Sparkles className={`size-3 ${isPinging ? "animate-spin" : ""}`} />
            <span>{isPinging ? "Dispatching Query..." : "Ping Local Agent Swarm"}</span>
          </button>

          <span className="font-narrow text-tiny text-muted tabular-nums">
            {lastPingTime ? `Last response: ${lastPingTime} (18.2ms TTFT)` : "Interactive battlestation online"}
          </span>
        </div>
      </div>
    </div>
  );
}
