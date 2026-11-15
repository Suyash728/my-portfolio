"use client";

import React, { useState } from "react";
import { Terminal, Check, Copy, Cpu, Flame, ShieldCheck, Activity } from "lucide-react";
import { sound } from "@/lib/sound";

interface CommandPreset {
  id: string;
  command: string;
  label: string;
  icon: React.ElementType;
  output: string;
  statusBadge: string;
}

const COMMANDS: CommandPreset[] = [
  {
    id: "vllm",
    command: "vllm status --verbose",
    label: "vLLM Inference Node",
    icon: Flame,
    statusBadge: "14.1 GiB NVFP4 Resident",
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
    id: "rules",
    command: "test-rule --module medisync --strict",
    label: "Deterministic Rule AST",
    icon: ShieldCheck,
    statusBadge: "0% Hallucination Policy",
    output: `🛡️ Deterministic AST Rule Evaluation [MediSync 2.0]
  Input Scenario:    [Prescription A: Warfarin] + [Prescription B: Aspirin]
  Rule Lookup Table: ContraindicationSchema.ts:L42
  Rule Evaluation:   [CRITICAL_MATCH] Major bleed risk contraindication triggered
  System Action:     REJECT_CONCURRENT_PRESCRIPTION (Executed in typed TypeScript)
  Model Role:        CONFINED_EXPLANATION_ONLY (Zero unsupervised decision discretion)
  Compliance:        100% ABDM Structured Health Data Schema Compliant`,
  },
  {
    id: "cachyos",
    command: "cachyos-profile --pacing",
    label: "Kernel & Frame-Pacing",
    icon: Activity,
    statusBadge: "180Hz · σ < 0.84ms",
    output: `⚡ Linux Kernel 7.3.3-cachyos (x86_64)
  CPU Governor:      performance (AMD Ryzen 5 5600 6C/12T @ 4.5 GHz)
  Process Scheduler: BORE (Burst-Oriented Response Enhancer)
  Compositor:        KDE Plasma 6.8 Wayland (2560x1440 @ 180Hz)
  Frametime Stats:   Average 5.55ms | Variance: 0.84ms | 0.1% low: 177.2 FPS
  Thermals:          38.4°C Idle / 61.2°C Full Load (<28 dBA stepped acoustic fan curve)`,
  },
  {
    id: "nvidia",
    command: "nvidia-smi --query",
    label: "RTX 5060 Ti Telemetry",
    icon: Cpu,
    statusBadge: "Driver 620.70 · CUDA 13",
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
    <div className="w-full border border-rule bg-raised/80 overflow-hidden">
      {/* Terminal Window Chrome: Instrument Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rule bg-ground/80 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="size-2 bg-signal flex-none" aria-hidden="true" />
          <span className="font-narrow text-meta font-semibold uppercase tracking-rail text-ink">
            suyash@cachyos: ~/telemetry
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="border border-rule-strong bg-ground px-2 py-0.5 font-narrow text-tiny uppercase tracking-eyebrow text-signal font-semibold">
            {activeCmd.statusBadge}
          </span>

          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1 border border-rule-strong bg-raised px-2 py-0.5 text-tiny font-narrow uppercase tracking-eyebrow text-muted hover:text-ink hover:border-signal transition-colors"
            aria-label="Copy terminal diagnostics"
          >
            {copied ? <Check className="size-3 text-signal" /> : <Copy className="size-3" />}
            <span>{copied ? "Copied" : "Copy"}</span>
          </button>
        </div>
      </div>

      {/* Preset Command Chips: Instrument Buttons */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-rule-soft bg-ground/40 p-2.5 font-narrow text-meta tracking-rail">
        <span className="text-tiny uppercase tracking-eyebrow text-muted mr-1 pl-1">
          Telemetry:
        </span>
        {COMMANDS.map((cmd) => {
          const isSelected = activeId === cmd.id;
          const Icon = cmd.icon;
          return (
            <button
              key={cmd.id}
              type="button"
              onClick={() => {
                sound.playClick();
                setActiveId(cmd.id);
              }}
              className={`inline-flex items-center gap-1.5 border px-2.5 py-1 text-tiny uppercase tracking-eyebrow transition-colors ${
                isSelected
                  ? "border-signal bg-signal text-raised font-semibold"
                  : "border-rule bg-ground text-muted hover:text-ink hover:bg-raised hover:border-rule-strong"
              }`}
            >
              <Icon className="size-3" />
              <span>{cmd.label}</span>
            </button>
          );
        })}
      </div>

      {/* Terminal Viewport: Control Room Light Instrument Display */}
      <div className="bg-ground/90 p-4 text-small leading-relaxed text-ink min-h-[220px] overflow-x-auto border-b border-rule">
        <div className="flex items-center gap-2 text-ink font-semibold mb-3 border-b border-rule-soft pb-2 font-narrow text-meta tracking-rail">
          <span className="text-signal uppercase">suyash@cachyos</span>
          <span className="text-muted">/</span>
          <span className="text-flag uppercase">telemetry</span>
          <span className="text-muted">$</span>
          <span className="text-ink font-sans tabular-nums">{activeCmd.command}</span>
        </div>

        <pre className="font-sans text-small leading-relaxed whitespace-pre font-normal text-ink tabular-nums">
          {activeCmd.output}
        </pre>
      </div>

      {/* Terminal Footer Info */}
      <div className="flex items-center justify-between border-t border-rule bg-ground px-4 py-2 font-narrow text-tiny text-muted tracking-rail">
        <span>Click any telemetry module above to inspect diagnostics</span>
        <span className="tabular-nums">UTF-8 · CachyOS x86_64</span>
      </div>
    </div>
  );
}
