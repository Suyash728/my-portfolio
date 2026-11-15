"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Terminal, Check, Copy, Cpu, Flame, ShieldCheck, Activity } from "lucide-react";
import { sound } from "@/lib/sound";

interface CommandPreset {
  id: string;
  command: string;
  label: string;
  icon: React.ElementType;
  output: string;
  statusBadge: string;
  badgeTone: "emerald" | "amber" | "sky";
}

const COMMANDS: CommandPreset[] = [
  {
    id: "vllm",
    command: "vllm status --verbose",
    label: "vLLM Inference Node",
    icon: Flame,
    statusBadge: "14.1 GiB NVFP4 Resident",
    badgeTone: "emerald",
    output: `● vLLM Inference Node [ONLINE @ 127.0.0.1:8001]
  Architecture:      NVIDIA Blackwell sm_120
  Model:             nvidia/Qwen3-14B-NVFP4
  VRAM Allocation:   14.1 GiB / 16.0 GiB (Pure NVFP4 weights, zero host offload)
  KV Cache:          FP8 (Native high-throughput allocation)
  Prefix Caching:    ACTIVE (Hit rate: 84.2% across agent loops)
  Tool Calling:      Hermes structured schema parser (100% Deterministic)
  Concurrency:       1 active sequence | Latency: 18.2ms TTFT`,
  },
  {
    id: "cachyos",
    command: "cachyos-profile --pacing",
    label: "Kernel & Frame-Pacing",
    icon: Activity,
    statusBadge: "180Hz · σ < 0.84ms",
    badgeTone: "sky",
    output: `⚡ Linux Kernel 7.3.3-cachyos (x86_64)
  CPU Governor:      performance (AMD Ryzen 5 5600 6C/12T @ 4.5 GHz)
  Process Scheduler: BORE (Burst-Oriented Response Enhancer)
  Compositor:        KDE Plasma 6.8 Wayland (2560x1440 @ 180Hz)
  Frametime Stats:   Average 5.55ms | Variance: 0.84ms | 0.1% low: 177.2 FPS
  Thermals:          38.4°C Idle / 61.2°C Full Load (<28 dBA stepped acoustic fan curve)`,
  },
  {
    id: "rules",
    command: "test-rule --module medisync --strict",
    label: "Deterministic Rule AST",
    icon: ShieldCheck,
    statusBadge: "0% Hallucination Policy",
    badgeTone: "emerald",
    output: `🛡️ Deterministic AST Rule Evaluation [MediSync 2.0]
  Input Scenario:    [Prescription A: Warfarin] + [Prescription B: Aspirin]
  Rule Lookup Table: ContraindicationSchema.ts:L42
  Rule Evaluation:   [CRITICAL_MATCH] Major bleed risk contraindication triggered
  System Action:     REJECT_CONCURRENT_PRESCRIPTION (Executed in typed TypeScript)
  Model Role:        CONFINED_EXPLANATION_ONLY (Zero unsupervised decision discretion)
  Compliance:        100% ABDM Structured Health Data Schema Compliant`,
  },
  {
    id: "nvidia",
    command: "nvidia-smi --query",
    label: "RTX 5060 Ti Telemetry",
    icon: Cpu,
    statusBadge: "Driver 620.70 · CUDA 13",
    badgeTone: "amber",
    output: `+-----------------------------------------------------------------------------------------+
| NVIDIA-SMI 620.70.06              Driver Version: 620.70.06      CUDA Version: 13.0     |
|-----------------------------------------+------------------------+----------------------+
| GPU  Name                  Persistence-M | Bus-Id          Disp.A | Volatile Uncorr. ECC |
| Fan  Temp   Perf          Pwr:Usage/Cap |           Memory-Usage | GPU-Util  Compute M. |
|=========================================+========================+======================|
|   0  NVIDIA GeForce RTX 5060 Ti     On  |   00000000:01:00.0  On |                  N/A |
| 32%   54C    P2             68W / 165W |   14438MiB / 16311MiB  |      0%      Default |
+-----------------------------------------+------------------------+----------------------+`,
  },
  {
    id: "specs",
    command: "inxi -b --rig-telemetry",
    label: "Workstation Topology",
    icon: Terminal,
    statusBadge: "Gigabyte B550M AORUS",
    badgeTone: "sky",
    output: `SYSTEM RIG // HARDWARE TOPOLOGY
  Chassis:           Custom M-ATX High-Airflow Enclosure with Tempered Glass
  Motherboard:       Gigabyte B550M AORUS ELITE AX (PCIe 4.0 / Resizable BAR: ON)
  CPU:               AMD Ryzen 5 5600 (6 Cores / 12 Threads, 4.5 GHz Boost)
  GPU:               NVIDIA GeForce RTX 5060 Ti (16 GB Blackwell NVFP4)
  Memory:            32 GiB High-Speed DDR4 Dual-Channel (Low-Latency Timings)
  Storage:           1.4 TB NVMe Gen4 High-IOPS M.2
  Operating System:  CachyOS Linux x86_64 (Kernel 7.3.3-1-cachyos, BORE scheduler)`,
  },
];

export function InteractiveTerminal() {
  const [activeId, setActiveId] = useState<string>("vllm");
  const [copied, setCopied] = useState(false);

  const activeCmd = COMMANDS.find((c) => c.id === activeId) || COMMANDS[0];

  const handleCopy = () => {
    sound.playSuccess();
    navigator.clipboard.writeText(`$ ${activeCmd.command}\n\n${activeCmd.output}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full rounded-xl border border-rule bg-raised/80 shadow-md backdrop-blur-sm overflow-hidden">
      {/* Terminal Window Chrome */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rule bg-ground/80 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#EF4444]/90 border border-[#DC2626]" />
            <span className="h-3 w-3 rounded-full bg-[#F59E0B]/90 border border-[#D97706]" />
            <span className="h-3 w-3 rounded-full bg-[#10B981]/90 border border-[#059669]" />
          </div>
          <span className="ml-2 font-mono text-[12px] font-medium text-muted tracking-wide">
            suyash@cachyos: ~/telemetry
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-narrow text-tiny uppercase tracking-eyebrow font-semibold ${
              activeCmd.badgeTone === "emerald"
                ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/30"
                : activeCmd.badgeTone === "amber"
                  ? "bg-amber-500/10 text-amber-600 border border-amber-500/30"
                  : "bg-sky-500/10 text-sky-600 border border-sky-500/30"
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
            {activeCmd.statusBadge}
          </span>

          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1 rounded border border-rule bg-raised px-2 py-1 text-tiny font-narrow text-muted hover:text-ink transition-colors"
            aria-label="Copy terminal output"
          >
            {copied ? <Check className="size-3 text-emerald-600" /> : <Copy className="size-3" />}
            <span>{copied ? "Copied" : "Copy"}</span>
          </button>
        </div>
      </div>

      {/* Preset Command Chips with Framer Motion Layout Springs */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-rule-soft bg-ground/40 p-2.5 font-narrow text-meta tracking-rail">
        <span className="text-tiny uppercase tracking-eyebrow text-muted mr-1.5 pl-1">
          Execute Telemetry:
        </span>
        {COMMANDS.map((cmd) => {
          const isSelected = activeId === cmd.id;
          const Icon = cmd.icon;
          return (
            <button
              key={cmd.id}
              onClick={() => {
                sound.playClick();
                setActiveId(cmd.id);
              }}
              className={`relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-tiny transition-colors ${
                isSelected ? "text-raised font-semibold" : "text-muted hover:text-ink hover:bg-raised/70"
              }`}
            >
              {isSelected && (
                <motion.div
                  layoutId="activeTerminalTab"
                  className="absolute inset-0 rounded-md bg-signal shadow-xs"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <Icon className="size-3.5" />
                {cmd.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Terminal Viewport */}
      <div className="bg-[#12151B] p-5 font-mono text-[13px] leading-relaxed text-[#E2E8F0] min-h-[220px] overflow-x-auto">
        <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-3">
          <span className="text-[#38BDF8]">suyash@cachyos</span>
          <span className="text-[#64748B]">:</span>
          <span className="text-[#F59E0B]">~</span>
          <span className="text-[#94A3B8]">$</span>
          <span className="text-white">{activeCmd.command}</span>
        </div>

        <AnimatePresence mode="wait">
          <motion.pre
            key={activeCmd.id}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="font-mono text-[12.5px] leading-relaxed whitespace-pre font-normal text-[#CBD5E1]"
          >
            {activeCmd.output}
          </motion.pre>
        </AnimatePresence>
      </div>

      {/* Terminal Footer Info */}
      <div className="flex items-center justify-between border-t border-rule bg-ground/90 px-4 py-2 font-narrow text-tiny text-muted tracking-rail">
        <span>Press any telemetry chip above to execute real-time diagnostics stream</span>
        <span className="font-mono text-[11px] text-muted">UTF-8 · ANSI Color · x86_64</span>
      </div>
    </div>
  );
}
