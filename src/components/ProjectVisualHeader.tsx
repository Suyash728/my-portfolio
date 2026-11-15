"use client";

import React from "react";

interface ProjectVisualHeaderProps {
  slug: string;
}

export function ProjectVisualHeader({ slug }: ProjectVisualHeaderProps) {
  if (slug === "medisync") {
    return (
      <div
        aria-hidden="true"
        className="oled-well h-36 mb-4 p-3.5 flex flex-col justify-between overflow-hidden select-none"
      >
        {/* Header bar */}
        <div className="flex items-center justify-between font-mono text-[10.5px] text-oled-muted border-b border-oled-rule pb-2">
          <span className="flex items-center gap-1.5 text-oled-ink font-medium">
            <span className="size-1.5 rounded-full bg-[#2dd4bf] animate-pulse" />
            RX CLINICAL CONFLICT ENGINE · AST EVALUATOR
          </span>
          <span className="text-[#2dd4bf] tabular-nums font-semibold">LATENCY: 0.0ms</span>
        </div>

        {/* 3-Step Conflict Pipeline Readout */}
        <div className="flex items-center justify-between gap-2 my-auto overflow-x-auto py-1">
          {/* Step 1: Scan Ingest */}
          <div className="flex flex-col gap-0.5 rounded-md bg-[#101216] border border-oled-rule p-2 shrink-0">
            <div className="text-[9px] uppercase tracking-wider text-oled-muted font-mono">01 · INGEST</div>
            <div className="text-[11px] font-mono text-[#f4f2ee] font-medium">Rx Scan #8491</div>
          </div>

          <span className="text-[#2dd4bf] text-sm font-bold shrink-0">→</span>

          {/* Step 2: Glowing AST Conflict Alert */}
          <div className="flex flex-col gap-0.5 rounded-md border border-red-500/80 bg-red-950/70 p-2 shadow-[0_0_12px_rgba(239,68,68,0.35)] shrink-0">
            <div className="flex items-center gap-1.5 text-[9.5px] uppercase tracking-wider text-red-300 font-mono font-bold">
              <span className="size-1.5 rounded-full bg-red-400 animate-ping" />
              AST DRUG RULE MATCH
            </div>
            <div className="text-[11px] font-mono font-bold text-white">
              [FLAG: WARFARIN + ASPIRIN]
            </div>
          </div>

          <span className="text-[#2dd4bf] text-sm font-bold shrink-0">→</span>

          {/* Step 3: Verified Citation Gate */}
          <div className="flex flex-col gap-0.5 rounded-md border border-[#0f5c6e] bg-[#0f5c6e]/40 p-2 shrink-0">
            <div className="text-[9px] uppercase tracking-wider text-[#2dd4bf] font-mono font-bold">03 · VERIFIED</div>
            <div className="text-[11px] font-mono text-[#5eead4] font-medium">GATE: BLOCKED</div>
          </div>
        </div>

        {/* Footer annotation */}
        <div className="flex items-center justify-between font-mono text-[10px] text-oled-muted border-t border-oled-rule/70 pt-1.5">
          <span className="text-oled-muted">Deterministic Drug-Matrix Gate</span>
          <span className="text-[#2dd4bf]">Ref: NCBI StatPearls DDI-04</span>
        </div>
      </div>
    );
  }

  if (slug === "aeromed") {
    return (
      <div
        aria-hidden="true"
        className="oled-well h-36 mb-4 p-3.5 flex flex-col justify-between overflow-hidden select-none"
      >
        {/* Header bar */}
        <div className="flex items-center justify-between font-mono text-[10.5px] text-oled-muted border-b border-oled-rule pb-2">
          <span className="flex items-center gap-1.5 text-oled-ink font-medium">
            <span className="size-1.5 rounded-full bg-[#f97316] animate-pulse" />
            CPCB ATMOSPHERIC ML · DELHI-NCR SURGE RADAR
          </span>
          <span className="text-[#f97316] tabular-nums font-semibold">R² = 0.9879</span>
        </div>

        {/* SVG Atmospheric Surge Curve crossing statutory CAQM threshold */}
        <div className="relative h-16 w-full my-auto overflow-hidden">
          <svg viewBox="0 0 340 58" preserveAspectRatio="none" className="w-full h-full">
            {/* Statutory Stage-III threshold line */}
            <line
              x1="0"
              y1="22"
              x2="340"
              y2="22"
              stroke="#ef4444"
              strokeWidth="1.2"
              strokeDasharray="4 3"
              opacity="0.85"
            />
            <text x="6" y="16" fill="#f87171" fontSize="8" fontFamily="monospace" fontWeight="bold">
              CAQM GRAP STAGE-III STATUTORY TRIGGER (400 AQI)
            </text>

            {/* Gradient Area under curve */}
            <defs>
              <linearGradient id="aqiGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f97316" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0,48 Q70,44 140,36 T230,18 T300,10 L340,8 L340,58 L0,58 Z"
              fill="url(#aqiGrad)"
            />

            {/* Rising curve path */}
            <path
              d="M0,48 Q70,44 140,36 T230,18 T300,10 L340,8"
              fill="none"
              stroke="#fb923c"
              strokeWidth="2.2"
              strokeLinecap="round"
            />

            {/* Pulsing peak marker */}
            <circle cx="300" cy="10" r="3.5" fill="#ef4444" />
            <circle cx="300" cy="10" r="6" fill="#ef4444" opacity="0.4" className="animate-ping" />
            <text x="180" y="44" fill="#fdba74" fontSize="9" fontFamily="monospace" fontWeight="bold">
              +42% 48-HR ADMISSION SURGE
            </text>
          </svg>
        </div>

        {/* Footer annotation */}
        <div className="flex items-center justify-between font-mono text-[10px] text-oled-muted border-t border-oled-rule/70 pt-1.5">
          <span>Statutory GRAP Trigger Engaged</span>
          <span className="text-[#2dd4bf] font-medium">Triage Dispatched (12 Native Langs)</span>
        </div>
      </div>
    );
  }

  if (slug === "kisanchain") {
    return (
      <div
        aria-hidden="true"
        className="oled-well h-36 mb-4 p-3.5 flex flex-col justify-between overflow-hidden select-none"
      >
        {/* Header bar */}
        <div className="flex items-center justify-between font-mono text-[10.5px] text-oled-muted border-b border-oled-rule pb-2">
          <span className="flex items-center gap-1.5 text-oled-ink font-medium">
            <span className="size-1.5 rounded-full bg-[#a855f7] animate-pulse" />
            POLYGON PoS · SMART CONTRACT ESCROW SETTLEMENT
          </span>
          <span className="text-[#c084fc] tabular-nums font-semibold">AMOY 80002</span>
        </div>

        {/* 3-Step Sensor to Polygon Escrow Settlement */}
        <div className="flex items-center justify-between gap-2 my-auto overflow-x-auto py-1">
          <div className="flex flex-col gap-0.5 rounded-md bg-[#101216] border border-oled-rule p-2 shrink-0">
            <div className="text-[9px] uppercase tracking-wider text-oled-muted font-mono">01 · TELEMETRY</div>
            <div className="text-[11px] font-mono text-[#22d3ee] font-medium">DHT11 4.2°C [PASS]</div>
          </div>

          <span className="text-[#c084fc] text-sm font-bold shrink-0">→</span>

          <div className="flex flex-col gap-0.5 rounded-md border border-[#22c55e]/50 bg-[#22c55e]/15 p-2 shrink-0">
            <div className="text-[9px] uppercase tracking-wider text-[#4ade80] font-mono font-bold">02 · ORACLE</div>
            <div className="text-[11px] font-mono text-[#86efac] font-bold">TRUST: 0.97</div>
          </div>

          <span className="text-[#c084fc] text-sm font-bold shrink-0">→</span>

          <div className="flex flex-col gap-0.5 rounded-md border border-[#a855f7]/60 bg-[#a855f7]/25 p-2 shadow-[0_0_10px_rgba(168,85,247,0.3)] shrink-0">
            <div className="text-[9px] uppercase tracking-wider text-[#d8b4fe] font-mono font-bold">03 · SETTLED</div>
            <div className="text-[11px] font-mono text-[#f3e8ff] font-bold">0x7a8f...9d21</div>
          </div>
        </div>

        {/* Footer annotation */}
        <div className="flex items-center justify-between font-mono text-[10px] text-oled-muted border-t border-oled-rule/70 pt-1.5">
          <span>Automated Arbitrator Slashing</span>
          <span className="text-[#c084fc] font-medium">Zero Intermediary Escrow</span>
        </div>
      </div>
    );
  }

  if (slug === "trustlayer") {
    return (
      <div
        aria-hidden="true"
        className="oled-well h-36 mb-4 p-3.5 flex flex-col justify-between overflow-hidden select-none"
      >
        {/* Header bar */}
        <div className="flex items-center justify-between font-mono text-[10.5px] text-oled-muted border-b border-oled-rule pb-2">
          <span className="flex items-center gap-1.5 text-oled-ink font-medium">
            <span className="size-1.5 rounded-full bg-[#eab308] animate-pulse" />
            AGENT DETERMINISM HARNESS · MUTATION TESTING
          </span>
          <span className="text-[#fde047] tabular-nums font-semibold">94% KILL RATE</span>
        </div>

        {/* Live Mini Code-Diff Strip */}
        <div className="flex items-center justify-between gap-3 my-auto font-mono text-[11px] leading-tight overflow-x-auto py-1">
          <div className="space-y-1 shrink-0">
            <div className="text-red-400 bg-red-950/50 px-2 py-0.5 rounded border border-red-900/70 font-medium">
              - if patient.creatinine &gt;= 1.5:
            </div>
            <div className="text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-900/70 font-medium">
              + if patient.creatinine &gt;  1.5:
            </div>
          </div>

          <div className="flex flex-col items-center justify-center rounded-md border border-[#f97316] bg-[#f97316]/25 p-2 shadow-[0_0_12px_rgba(249,115,22,0.35)] shrink-0">
            <span className="text-[10px] uppercase tracking-wider text-orange-300 font-mono font-bold">ZAPPED</span>
            <span className="text-[11.5px] font-mono font-bold text-white">[MUTANT KILLED]</span>
          </div>
        </div>

        {/* Footer annotation */}
        <div className="flex items-center justify-between font-mono text-[10px] text-oled-muted border-t border-oled-rule/70 pt-1.5">
          <span>Boundary Invariant Enforced</span>
          <span className="text-emerald-400 font-medium">0 Leaked Non-Deterministic Decisions</span>
        </div>
      </div>
    );
  }

  return null;
}
