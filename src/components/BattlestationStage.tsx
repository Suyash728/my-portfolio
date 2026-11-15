"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { sound } from "@/lib/sound";
import {
  Wrench,
  Zap,
  RotateCcw,
  CheckCircle2,
  Terminal,
} from "lucide-react";

type StageMode = "using" | "building";

interface PinCallout {
  id: string;
  x: number; // percentage
  y: number; // percentage
  title: string;
  badge: string;
  detail: string;
}

const USING_PINS: PinCallout[] = [
  {
    id: "monitor",
    x: 54,
    y: 28,
    title: "27-inch MSI Frameless IPS",
    badge: "1440p @ 180Hz",
    detail: "Fast IPS panel calibrated for KDE Wayland tearing-free desktop refresh and competitive FPS pacing.",
  },
  {
    id: "case",
    x: 86,
    y: 42,
    title: "Lian Li Lancool 207 Chassis",
    badge: "Dual 140mm Mesh Intake",
    detail: "Compact micro-ATX chassis with 2x 140mm front mesh fans + 2x 120mm PSU shroud fans directing fresh air into the GPU.",
  },
  {
    id: "gpu",
    x: 88,
    y: 62,
    title: "RTX 5060 Ti 16GB GPU",
    badge: "Blackwell sm_120",
    detail: "16GB VRAM Blackwell silicon running local 14B models natively in NVFP4 with zero host memory spill.",
  },
  {
    id: "controller",
    x: 27,
    y: 84,
    title: "Teal 8BitDo Ultimate 2C",
    badge: "Hall Effect Sticks",
    detail: "Off-clock low-latency controller with zero-drift magnetic analog sticks for Valorant, EA Sports FC 26, and Spider-Man.",
  },
];

const BUILDING_PINS: PinCallout[] = [
  {
    id: "pcie-gpu",
    x: 68,
    y: 46,
    title: "RTX 5060 Ti 16GB Seating",
    badge: "PCIe 4.0 x16",
    detail: "Guiding the 16GB card into the reinforced primary slot with dedicated anti-sag bracket support.",
  },
  {
    id: "front-fans",
    x: 88,
    y: 38,
    title: "Dual 140mm ARGB Fans",
    badge: "High-CFM Intake",
    detail: "Direct airflow through fine-mesh front panel maintaining positive case pressure and dust resistance.",
  },
  {
    id: "shroud-fans",
    x: 74,
    y: 66,
    title: "Dual 120mm Shroud Fans",
    badge: "Direct GPU Airflow",
    detail: "Two dedicated PWM fans positioned directly above the ventilated PSU shroud feeding fresh air to the GPU fans.",
  },
  {
    id: "motherboard",
    x: 58,
    y: 36,
    title: "Ryzen 5 5600 + B550M",
    badge: "BIOS Tuned",
    detail: "AM4 platform tuned with PBO curve optimizer for sub-60°C compilation thermals under continuous batch inference.",
  },
];

export function BattlestationStage() {
  const [mode, setMode] = useState<StageMode>("using");
  const [activePin, setActivePin] = useState<string | null>(null);
  const [powerTestActive, setPowerTestActive] = useState<boolean>(false);
  const [powerTestToast, setPowerTestToast] = useState<boolean>(false);

  const handleModeSwitch = (newMode: StageMode) => {
    sound.playSwitch();
    setMode(newMode);
    setActivePin(null);
  };

  const handlePowerTest = () => {
    sound.playSuccess();
    setPowerTestActive(true);
    setPowerTestToast(true);

    setTimeout(() => {
      setPowerTestToast(false);
    }, 4000);

    setTimeout(() => {
      setPowerTestActive(false);
    }, 6000);
  };

  const currentPins = mode === "using" ? USING_PINS : BUILDING_PINS;

  return (
    <div className="bento-card overflow-hidden border-rule-strong/80 shadow-md">
      {/* =========================================================================
          SLEEK INSTRUMENT BAR (ABOVE THE VIEWPORT)
      ========================================================================= */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rule bg-surface p-3 sm:px-4 font-narrow text-tiny uppercase tracking-eyebrow">
        {/* Mode Switcher Tabs */}
        <div className="flex items-center gap-1.5 bento-well p-1 bg-surface-sunken">
          <button
            type="button"
            onClick={() => handleModeSwitch("using")}
            className={`relative flex items-center gap-1.5 rounded-md px-3 py-1 font-semibold transition-colors ${
              mode === "using" ? "text-ink" : "text-muted hover:text-ink"
            }`}
          >
            {mode === "using" && (
              <motion.div
                layoutId="stageModePill"
                className="absolute inset-0 rounded-md bg-surface border border-rule-strong/40 shadow-xs z-0"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <span className="led-teal" />
              <span>01 · Running Terminals</span>
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleModeSwitch("building")}
            className={`relative flex items-center gap-1.5 rounded-md px-3 py-1 font-semibold transition-colors ${
              mode === "building" ? "text-ink" : "text-muted hover:text-ink"
            }`}
          >
            {mode === "building" && (
              <motion.div
                layoutId="stageModePill"
                className="absolute inset-0 rounded-md bg-surface border border-rule-strong/40 shadow-xs z-0"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <span className="led-orange" />
              <span>02 · Building The Rig</span>
            </span>
          </button>
        </div>

        {/* Action Controls & Telemetry Pills */}
        <div className="flex items-center gap-2">
          {mode === "building" ? (
            <button
              type="button"
              onClick={handlePowerTest}
              className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1 font-narrow font-bold text-tiny uppercase tracking-eyebrow transition-all shadow-xs ${
                powerTestActive
                  ? "border-accent-orange bg-accent-orange text-white ring-2 ring-accent-orange/30"
                  : "border-signal-teal bg-surface text-signal-teal hover:bg-signal-teal hover:text-white"
              }`}
              title="Test PSU, fan PWM curves, and motherboard POST signal"
            >
              <Zap className={`size-3.5 ${powerTestActive ? "animate-bounce" : ""}`} />
              <span>{powerTestActive ? "4/4 Fans Spun Up!" : "Power-On Test ⚡"}</span>
            </button>
          ) : (
            <span className="hidden sm:inline-flex items-center gap-2 text-muted text-tiny font-mono">
              <span className="size-1.5 rounded-full bg-[#2dd4bf] animate-pulse" />
              <span>KDE Plasma 6.8 · CachyOS BORE Kernel · Wayland</span>
            </span>
          )}

          <button
            type="button"
            onClick={() => handleModeSwitch(mode === "using" ? "building" : "using")}
            className="bento-well hover:border-signal-teal px-2.5 py-1 text-muted hover:text-ink transition-colors flex items-center gap-1"
            title="Toggle between daily workflow and PC building scenes"
          >
            <RotateCcw className="size-3" />
            <span className="hidden md:inline">Switch Scene</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          THE MAIN STAGE VIEWPORT (16:10 WIDE FRAMING)
      ========================================================================= */}
      <div className="relative aspect-[16/10] w-full bg-[#F4F1EA] overflow-hidden select-none">
        {/* Subtle dot matrix background */}
        <div className="absolute inset-0 bg-dot-matrix opacity-40 pointer-events-none" />

        <AnimatePresence mode="wait">
          {mode === "using" ? (
            /* ===================================================================
               SCENE 1: DAILY DRIVER — MULTI-TERMINAL WORKFLOW
            =================================================================== */
            <motion.div
              key="scene-using"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.01 }}
              transition={{ duration: 0.35, ease: [0.2, 0.7, 0.3, 1] }}
              className="absolute inset-0"
            >
              <svg
                viewBox="0 0 1000 625"
                className="w-full h-full"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  {/* Subtle shadows and gradients */}
                  <linearGradient id="deskGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#EDE8DF" />
                    <stop offset="100%" stopColor="#DFD8CD" />
                  </linearGradient>
                  <linearGradient id="meshGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#1E2024" />
                    <stop offset="100%" stopColor="#121316" />
                  </linearGradient>
                  <linearGradient id="argbGlow" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#0F5C6E" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#D94E0F" stopOpacity="0.8" />
                  </linearGradient>
                  <linearGradient id="glassSheen" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.25" />
                    <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.05" />
                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.15" />
                  </linearGradient>
                  <filter id="subtleDrop" x="-5%" y="-5%" width="110%" height="110%">
                    <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#181A1F" floodOpacity="0.08" />
                  </filter>
                </defs>

                {/* --- ROOM / BACKGROUND ACCENTS --- */}
                {/* Horizontal architectural baseboard */}
                <line x1="0" y1="520" x2="1000" y2="520" stroke="#D5CEC2" strokeWidth="2" />
                <rect x="0" y="522" width="1000" height="103" fill="#E8E2D6" opacity="0.6" />

                {/* --- DESK SURFACE & LEGS --- */}
                {/* Desk Legs */}
                <rect x="140" y="470" width="18" height="155" rx="3" fill="#1C1E22" stroke="#181A1F" strokeWidth="2.5" />
                <rect x="880" y="470" width="18" height="155" rx="3" fill="#1C1E22" stroke="#181A1F" strokeWidth="2.5" />
                {/* Main Desk Slab */}
                <polygon
                  points="60,430 940,430 980,480 20,480"
                  fill="url(#deskGrad)"
                  stroke="#181A1F"
                  strokeWidth="3"
                  strokeLinejoin="round"
                />
                {/* Desk Edge Bevel */}
                <polygon points="20,480 980,480 980,496 20,496" fill="#CFC7B9" stroke="#181A1F" strokeWidth="3" strokeLinejoin="round" />

                {/* Wide Stitched Desk Mat */}
                <polygon
                  points="180,442 820,442 840,476 160,476"
                  fill="#181A1F"
                  stroke="#2E333D"
                  strokeWidth="2"
                  rx="4"
                />
                <line x1="184" y1="445" x2="816" y2="445" stroke="#3D4452" strokeWidth="1" strokeDasharray="3 3" />

                {/* --- 27-INCH MSI FRAMELESS MONITOR (CENTER-RIGHT) --- */}
                {/* Monitor Stand Base & Column */}
                <polygon points="490,444 570,444 580,460 480,460" fill="#24272E" stroke="#181A1F" strokeWidth="2.5" />
                <rect x="522" y="320" width="18" height="126" fill="#181A1F" rx="2" stroke="#181A1F" strokeWidth="2" />

                {/* Monitor Outer Chassis (27-inch 16:9, angled slightly toward character) */}
                <g filter="url(#subtleDrop)">
                  <rect
                    x="360"
                    y="100"
                    width="390"
                    height="244"
                    rx="6"
                    fill="#181A1F"
                    stroke="#181A1F"
                    strokeWidth="3.5"
                  />
                  {/* Subtle stand neck shadow */}
                  <rect x="365" y="105" width="380" height="234" rx="4" fill="#101216" />

                  {/* 180Hz / MSI badge detail */}
                  <rect x="532" y="338" width="46" height="5" rx="1.5" fill="#2E333D" />
                </g>

                {/* --- LIVE ANIMATED MULTI-TERMINAL SCREEN (OLED 3-PANE LAYOUT) --- */}
                {/* PANE 1: Top vLLM Engine */}
                <rect x="372" y="112" width="366" height="98" rx="3" fill="#14161A" stroke="#242831" strokeWidth="1" />
                {/* Pane 1 Header */}
                <rect x="372" y="112" width="366" height="15" rx="3" fill="#1B1E24" />
                <circle cx="382" cy="119.5" r="2.5" fill="#EF4444" />
                <circle cx="390" cy="119.5" r="2.5" fill="#EAB308" />
                <circle cx="398" cy="119.5" r="2.5" fill="#22C55E" />
                <text x="410" y="123" fill="#9BA1AE" fontSize="8" fontFamily="monospace">
                  suyash@cachyos: vllm serve Qwen3-14B-NVFP4
                </text>
                {/* Pane 1 Terminal Lines */}
                <text x="380" y="140" fill="#4ADE80" fontSize="8.5" fontFamily="monospace" fontWeight="600">
                  suyash@cachyos ~&gt; <tspan fill="#F4F2EE">vllm serve Qwen3-14B-NVFP4 --kv-cache-dtype fp8</tspan>
                </text>
                <text x="380" y="156" fill="#9BA1AE" fontSize="8" fontFamily="monospace">
                  INFO: 16GB VRAM Blackwell silicon allocated · Host Offload: 0.0 GB
                </text>
                {/* Live Ticking VRAM & Token throughput status bar */}
                <rect x="380" y="166" width="350" height="20" rx="2" fill="#1A1D24" stroke="#2E333D" strokeWidth="0.8" />
                <circle cx="390" cy="176" r="3" fill="#2DD4BF" className="animate-pulse" />
                <text x="398" y="179" fill="#2DD4BF" fontSize="8.5" fontFamily="monospace" fontWeight="bold">
                  84 tok/s
                </text>
                <text x="446" y="179" fill="#9BA1AE" fontSize="8" fontFamily="monospace">
                  | VRAM: 14.1/16.0 GiB (88%) | P99: 14.2ms | 0 Errors
                </text>

                {/* PANE 2: Bottom-Left nvtop / GPU Telemetry */}
                <rect x="372" y="216" width="180" height="114" rx="3" fill="#14161A" stroke="#242831" strokeWidth="1" />
                <rect x="372" y="216" width="180" height="14" rx="3" fill="#1B1E24" />
                <text x="380" y="226" fill="#9BA1AE" fontSize="7.5" fontFamily="monospace">
                  nvtop — RTX 5060 Ti 16GB
                </text>
                <text x="380" y="244" fill="#F4F2EE" fontSize="8" fontFamily="monospace">
                  GPU Core: <tspan fill="#F97316" fontWeight="bold">98%</tspan> · 61°C · 145W
                </text>
                {/* Segmented GPU bar */}
                <rect x="380" y="252" width="164" height="6" rx="1.5" fill="#1C1F26" />
                <rect x="380" y="252" width="158" height="6" rx="1.5" fill="#F97316" />
                <text x="380" y="272" fill="#9BA1AE" fontSize="7.5" fontFamily="monospace">
                  Fan: 2400 RPM · 28dBA curve
                </text>
                {/* Live sparkline wave */}
                <path
                  d="M380,314 L395,304 L410,310 L425,296 L440,302 L455,290 L470,298 L485,286 L500,292 L515,284 L530,288 L544,280"
                  fill="none"
                  stroke="#2DD4BF"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />

                {/* PANE 3: Bottom-Right Neovim / AST Test Runner */}
                <rect x="558" y="216" width="180" height="114" rx="3" fill="#14161A" stroke="#242831" strokeWidth="1" />
                <rect x="558" y="216" width="180" height="14" rx="3" fill="#1B1E24" />
                <text x="566" y="226" fill="#9BA1AE" fontSize="7.5" fontFamily="monospace">
                  nvim: verify_gates.py
                </text>
                <text x="566" y="244" fill="#4ADE80" fontSize="8" fontFamily="monospace">
                  ✓ test_drug_ast_gate [PASS]
                </text>
                <text x="566" y="258" fill="#4ADE80" fontSize="8" fontFamily="monospace">
                  ✓ test_caqm_stage3   [PASS]
                </text>
                <text x="566" y="272" fill="#4ADE80" fontSize="8" fontFamily="monospace">
                  ✓ test_polygon_pos   [PASS]
                </text>
                <text x="566" y="286" fill="#4ADE80" fontSize="8" fontFamily="monospace">
                  ✓ test_mutation_94%  [PASS]
                </text>
                <text x="566" y="306" fill="#2DD4BF" fontSize="7.5" fontFamily="monospace" fontWeight="bold">
                  All 42 gates deterministic.
                </text>
                {/* Blinking cursor */}
                <rect x="566" y="312" width="6" height="10" fill="#4ADE80" className="animate-pulse" />

                {/* --- LIAN LI LANCOOL 207 CHASSIS (ON RIGHT SIDE OF DESK) --- */}
                <g filter="url(#subtleDrop)">
                  {/* Case Outer Frame */}
                  <rect
                    x="770"
                    y="130"
                    width="186"
                    height="325"
                    rx="6"
                    fill="#181A1F"
                    stroke="#181A1F"
                    strokeWidth="3"
                  />
                  {/* Ventilated Fine Mesh Front Panel (x=770..812) */}
                  <rect x="774" y="134" width="38" height="317" rx="3" fill="#1E2127" stroke="#2D323C" strokeWidth="1" />
                  {/* Mesh dot pattern */}
                  <line x1="782" y1="140" x2="782" y2="445" stroke="#282C35" strokeWidth="2" strokeDasharray="3 3" />
                  <line x1="792" y1="140" x2="792" y2="445" stroke="#282C35" strokeWidth="2" strokeDasharray="3 3" />
                  <line x1="802" y1="140" x2="802" y2="445" stroke="#282C35" strokeWidth="2" strokeDasharray="3 3" />

                  {/* Dual 140mm Front ARGB Intake Fans spinning behind mesh */}
                  {/* Top 140mm Fan */}
                  <circle cx="793" cy="200" r="16" fill="none" stroke="url(#argbGlow)" strokeWidth="3" opacity="0.9" />
                  <circle cx="793" cy="200" r="4" fill="#0F5C6E" />
                  {/* Kinetic rotating fan blades */}
                  <g className="animate-spin" style={{ transformOrigin: "793px 200px", animationDuration: "1.2s" }}>
                    <line x1="793" y1="188" x2="793" y2="212" stroke="#2DD4BF" strokeWidth="2" strokeLinecap="round" />
                    <line x1="781" y1="200" x2="805" y2="200" stroke="#2DD4BF" strokeWidth="2" strokeLinecap="round" />
                  </g>

                  {/* Bottom 140mm Fan */}
                  <circle cx="793" cy="275" r="16" fill="none" stroke="url(#argbGlow)" strokeWidth="3" opacity="0.9" />
                  <circle cx="793" cy="275" r="4" fill="#D94E0F" />
                  <g className="animate-spin" style={{ transformOrigin: "793px 275px", animationDuration: "1.2s" }}>
                    <line x1="793" y1="263" x2="793" y2="287" stroke="#F97316" strokeWidth="2" strokeLinecap="round" />
                    <line x1="781" y1="275" x2="805" y2="275" stroke="#F97316" strokeWidth="2" strokeLinecap="round" />
                  </g>

                  {/* Tempered Glass Side Chamber (x=816..952) */}
                  <rect x="816" y="134" width="136" height="317" rx="3" fill="#121418" />

                  {/* Internal Hardware Visible Through Glass */}
                  {/* Twin-Tower CPU Cooler */}
                  <rect x="836" y="170" width="46" height="52" rx="3" fill="#2B303A" stroke="#3E4452" strokeWidth="1.5" />
                  <line x1="844" y1="170" x2="844" y2="222" stroke="#4F5666" strokeWidth="1" />
                  <line x1="854" y1="170" x2="854" y2="222" stroke="#4F5666" strokeWidth="1" />
                  <line x1="864" y1="170" x2="864" y2="222" stroke="#4F5666" strokeWidth="1" />
                  <line x1="874" y1="170" x2="874" y2="222" stroke="#4F5666" strokeWidth="1" />

                  {/* 32GB Dual Channel RAM sticks */}
                  <rect x="888" y="180" width="5" height="36" rx="1" fill="#2DD4BF" opacity="0.8" />
                  <rect x="896" y="180" width="5" height="36" rx="1" fill="#2DD4BF" opacity="0.8" />

                  {/* Horizontal RTX 5060 Ti 16GB with Illuminated Side Logo */}
                  <rect x="826" y="250" width="108" height="32" rx="3" fill="#1C1F26" stroke="#2D333F" strokeWidth="2" />
                  {/* GPU illuminated backplate & side badge */}
                  <rect x="836" y="258" width="60" height="7" rx="1.5" fill="#D94E0F" opacity="0.9" />
                  <text x="838" y="264" fill="#FFFFFF" fontSize="5.5" fontFamily="monospace" fontWeight="bold">
                    RTX 5060 Ti 16GB
                  </text>
                  {/* Anti-sag support bracket */}
                  <line x1="930" y1="282" x2="930" y2="350" stroke="#4A5263" strokeWidth="2" strokeLinecap="round" />

                  {/* Perforated PSU Shroud Floor */}
                  <rect x="816" y="348" width="136" height="103" fill="#181A1F" stroke="#252A33" strokeWidth="1" />
                  <line x1="822" y1="358" x2="946" y2="358" stroke="#2A2F3A" strokeWidth="1.5" strokeDasharray="3 3" />

                  {/* Dual 120mm PWM Fans on Top of Shroud blowing UP into GPU */}
                  <circle cx="850" cy="336" r="10" fill="#1A1D24" stroke="#0F5C6E" strokeWidth="1.5" />
                  <circle cx="890" cy="336" r="10" fill="#1A1D24" stroke="#0F5C6E" strokeWidth="1.5" />
                  {/* Upward airflow indicators */}
                  <path d="M850,324 L850,314 M847,317 L850,313 L853,317" stroke="#2DD4BF" strokeWidth="1.2" strokeLinecap="round" />
                  <path d="M890,324 L890,314 M887,317 L890,313 L893,317" stroke="#2DD4BF" strokeWidth="1.2" strokeLinecap="round" />

                  {/* 4mm Tempered Glass Sheen Overlay */}
                  <polygon points="816,134 890,134 830,451 816,451" fill="url(#glassSheen)" />
                </g>

                {/* --- THE GUY (DAILY WORKFLOW POSE) --- */}
                {/* Ergonomic Office Chair */}
                <rect x="130" y="250" width="90" height="190" rx="20" fill="#242831" stroke="#181A1F" strokeWidth="3" />
                <path d="M140,240 Q175,225 210,240" fill="none" stroke="#181A1F" strokeWidth="4" strokeLinecap="round" />

                {/* Body / Torso (Navy Crew-Neck T-shirt) */}
                <g filter="url(#subtleDrop)">
                  {/* Neck tucked under collar */}
                  <rect x="198" y="248" width="24" height="44" rx="6" fill="#F0C09F" stroke="#181A1F" strokeWidth="2.5" />

                  <path
                    d="M145,340 C145,300 170,285 210,285 C250,285 275,300 280,340 L285,470 L140,470 Z"
                    fill="#1E293B"
                    stroke="#181A1F"
                    strokeWidth="3.2"
                    strokeLinejoin="round"
                  />
                  {/* Crew-neck collar */}
                  <path d="M192,285 Q210,298 228,285" fill="none" stroke="#334155" strokeWidth="3" strokeLinecap="round" />

                  {/* Left Arm extended forward to keyboard */}
                  <path
                    d="M165,330 C180,370 240,410 335,432"
                    fill="none"
                    stroke="#1E293B"
                    strokeWidth="30"
                    strokeLinecap="round"
                  />
                  <path
                    d="M165,330 C180,370 240,410 335,432"
                    fill="none"
                    stroke="#181A1F"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                  />
                  {/* Left Hand on Mechanical Keyboard */}
                  <ellipse cx="342" cy="434" rx="14" ry="10" fill="#FAD5BA" stroke="#181A1F" strokeWidth="2.5" />

                  {/* Right Arm extended to mouse */}
                  <path
                    d="M260,335 C285,370 370,415 520,442"
                    fill="none"
                    stroke="#1E293B"
                    strokeWidth="28"
                    strokeLinecap="round"
                  />
                  <path
                    d="M260,335 C285,370 370,415 520,442"
                    fill="none"
                    stroke="#181A1F"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                  />
                  {/* Right Hand on Mouse */}
                  <ellipse cx="530" cy="444" rx="13" ry="9" fill="#FAD5BA" stroke="#181A1F" strokeWidth="2.5" />

                  {/* Head Oval */}
                  <circle cx="210" cy="225" r="38" fill="#FAD5BA" stroke="#181A1F" strokeWidth="3.2" />

                  {/* Facial Features (Clean Minimalist Editorial Style) */}
                  {/* Dot Eyes looking at monitor */}
                  <circle cx="225" cy="222" r="3.2" fill="#181A1F" />
                  <circle cx="242" cy="220" r="3.2" fill="#181A1F" />
                  {/* Eye catchlights */}
                  <circle cx="226" cy="221" r="1" fill="#FFFFFF" />
                  <circle cx="243" cy="219" r="1" fill="#FFFFFF" />
                  {/* Eyebrows (focused, determined) */}
                  <path d="M220,214 Q228,211 233,214" fill="none" stroke="#181A1F" strokeWidth="2.4" strokeLinecap="round" />
                  <path d="M238,212 Q246,209 250,212" fill="none" stroke="#181A1F" strokeWidth="2.4" strokeLinecap="round" />
                  {/* Nose curve */}
                  <path d="M239,224 Q244,228 240,232" fill="none" stroke="#181A1F" strokeWidth="2" strokeLinecap="round" />
                  {/* Smile */}
                  <path d="M230,238 Q238,244 246,239" fill="none" stroke="#181A1F" strokeWidth="2.4" strokeLinecap="round" />
                  {/* Ear */}
                  <circle cx="174" cy="228" r="7.5" fill="#FAD5BA" stroke="#181A1F" strokeWidth="2.5" />

                  {/* Signature Spiky Swept-Up Dark Brown Hair */}
                  <path
                    d="M174,212 C168,175 190,150 220,155 C235,140 255,145 260,165 C270,165 275,180 270,195 C265,190 258,188 252,192 C252,185 244,180 238,185 C230,180 222,182 216,188 C205,185 192,192 188,202 Z"
                    fill="#2D1F17"
                    stroke="#181A1F"
                    strokeWidth="3.2"
                    strokeLinejoin="round"
                  />
                  {/* Hair facet shadow lines */}
                  <path d="M205,170 Q225,185 240,165" fill="none" stroke="#1A120D" strokeWidth="2" />
                  <path d="M235,160 Q250,175 258,180" fill="none" stroke="#1A120D" strokeWidth="2" />
                </g>

                {/* --- DESK ACCESSORIES (KEYBOARD, MOUSE, 8BITDO CONTROLLER) --- */}
                {/* Mechanical Keyboard */}
                <rect x="330" y="425" width="135" height="38" rx="4" fill="#2B2F38" stroke="#181A1F" strokeWidth="2.5" />
                <rect x="335" y="429" width="125" height="29" rx="2" fill="#1C1E24" />
                {/* Orange Esc Key */}
                <rect x="338" y="432" width="9" height="6" rx="1" fill="#D94E0F" />
                {/* White/grey Keycaps */}
                <rect x="350" y="432" width="8" height="6" rx="1" fill="#E2E8F0" />
                <rect x="360" y="432" width="8" height="6" rx="1" fill="#E2E8F0" />
                <rect x="370" y="432" width="8" height="6" rx="1" fill="#E2E8F0" />
                <rect x="380" y="432" width="8" height="6" rx="1" fill="#E2E8F0" />
                <rect x="390" y="432" width="8" height="6" rx="1" fill="#E2E8F0" />
                <rect x="400" y="432" width="8" height="6" rx="1" fill="#E2E8F0" />

                {/* Logitech G304 Wireless Mouse */}
                <ellipse cx="536" cy="444" rx="15" ry="20" fill="#1C1F26" stroke="#181A1F" strokeWidth="2" />
                <line x1="536" y1="426" x2="536" y2="442" stroke="#3D4554" strokeWidth="1.5" />
                <circle cx="536" cy="434" r="3" fill="#2DD4BF" opacity="0.8" />

                {/* Teal 8BitDo Ultimate 2C Controller on Desk Mat Corner */}
                <g filter="url(#subtleDrop)" className="transition-transform hover:scale-105 cursor-pointer">
                  {/* Controller Body (Teal #0F5C6E / #00A896) */}
                  <rect x="236" y="475" width="84" height="46" rx="18" fill="#0F5C6E" stroke="#181A1F" strokeWidth="2.5" />
                  {/* Left & Right Grip Outlines */}
                  <circle cx="254" cy="498" r="15" fill="#0E5464" />
                  <circle cx="302" cy="498" r="15" fill="#0E5464" />
                  {/* Hall-Effect Analog Sticks (Black with center concave ring) */}
                  <circle cx="262" cy="498" r="8" fill="#181A1F" stroke="#2D333F" strokeWidth="1" />
                  <circle cx="288" cy="506" r="8" fill="#181A1F" stroke="#2D333F" strokeWidth="1" />
                  {/* D-Pad */}
                  <rect x="246" y="488" width="10" height="4" rx="1" fill="#181A1F" />
                  <rect x="249" y="485" width="4" height="10" rx="1" fill="#181A1F" />
                  {/* ABXY buttons (Purple/Lilac accents) */}
                  <circle cx="298" cy="488" r="2.5" fill="#C084FC" />
                  <circle cx="304" cy="493" r="2.5" fill="#C084FC" />
                  <circle cx="304" cy="483" r="2.5" fill="#C084FC" />
                  <circle cx="310" cy="488" r="2.5" fill="#C084FC" />
                </g>
              </svg>
            </motion.div>
          ) : (
            /* ===================================================================
               SCENE 2: HANDS-ON SILICON — BUILDING THE PC
            =================================================================== */
            <motion.div
              key="scene-building"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.01 }}
              transition={{ duration: 0.35, ease: [0.2, 0.7, 0.3, 1] }}
              className="absolute inset-0"
            >
              <svg
                viewBox="0 0 1000 625"
                className="w-full h-full"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <linearGradient id="esdMat" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1E3A8A" />
                    <stop offset="100%" stopColor="#172554" />
                  </linearGradient>
                  <linearGradient id="pcbGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#181F2C" />
                    <stop offset="100%" stopColor="#0F141E" />
                  </linearGradient>
                  <linearGradient id="goldTrace" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#F59E0B" />
                    <stop offset="100%" stopColor="#FBBF24" />
                  </linearGradient>
                </defs>

                {/* --- BENCH SURFACE --- */}
                <rect x="0" y="470" width="1000" height="155" fill="#DFD8CD" stroke="#181A1F" strokeWidth="3" />

                {/* Blue Anti-Static ESD Build Mat */}
                <rect
                  x="260"
                  y="260"
                  width="690"
                  height="250"
                  rx="8"
                  fill="url(#esdMat)"
                  stroke="#181A1F"
                  strokeWidth="2.5"
                />
                {/* ESD Grid lines & grounding snap */}
                <circle cx="280" cy="280" r="5" fill="#CBD5E1" stroke="#181A1F" strokeWidth="1.5" />
                <line x1="280" y1="285" x2="280" y2="510" stroke="#0284C7" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="260" y1="360" x2="950" y2="360" stroke="#1E40AF" strokeWidth="0.8" opacity="0.6" />

                {/* --- STAGED HARDWARE ON LEFT (MONITOR & CONTROLLER STAGED) --- */}
                {/* 27" Monitor angled away during build */}
                <rect x="70" y="160" width="160" height="230" rx="4" fill="#181A1F" stroke="#181A1F" strokeWidth="2.5" />
                <rect x="74" y="164" width="152" height="222" rx="2" fill="#14161A" />
                <text x="86" y="270" fill="#64748B" fontSize="9" fontFamily="monospace">
                  MSI 27&quot; 180Hz (STAGED)
                </text>
                <rect x="135" y="390" width="30" height="90" fill="#2E333D" stroke="#181A1F" strokeWidth="2" />

                {/* Motherboard & GPU Packaging Boxes */}
                <polygon points="170,110 240,80 240,240 170,260" fill="#3B4252" stroke="#181A1F" strokeWidth="2" />
                <polygon points="100,135 170,110 170,260 100,285" fill="#4C566A" stroke="#181A1F" strokeWidth="2" />
                <polygon points="100,135 170,110 240,80 170,105" fill="#5E81AC" stroke="#181A1F" strokeWidth="2" />
                <text x="110" y="200" fill="#ECEFF4" fontSize="8" fontFamily="monospace" fontWeight="bold">
                  B550M
                </text>

                {/* Thermal Paste Syringe on ESD Mat */}
                <rect x="290" y="445" width="46" height="8" rx="2" fill="#94A3B8" stroke="#181A1F" strokeWidth="1.5" />
                <rect x="282" y="447" width="8" height="4" fill="#CBD5E1" stroke="#181A1F" strokeWidth="1" />
                <rect x="336" y="446" width="18" height="6" fill="#475569" />
                <text x="294" y="452" fill="#0F172A" fontSize="5" fontFamily="monospace" fontWeight="bold">
                  NT-H1
                </text>

                {/* Magnetic Parts Tray with Screws */}
                <ellipse cx="370" cy="460" rx="22" ry="12" fill="#0284C7" stroke="#181A1F" strokeWidth="2" />
                <circle cx="365" cy="458" r="2.5" fill="#E2E8F0" stroke="#181A1F" strokeWidth="1" />
                <circle cx="375" cy="462" r="2.5" fill="#E2E8F0" stroke="#181A1F" strokeWidth="1" />
                <circle cx="372" cy="456" r="2" fill="#E2E8F0" />

                {/* --- OPEN LIAN LI LANCOOL 207 CHASSIS (TOOL-FREE GLASS REMOVED) --- */}
                {/* Unlatched Tempered Glass Leaning Neatly Against Bench Bumper */}
                <polygon
                  points="905,140 935,140 955,470 925,470"
                  fill="url(#glassSheen)"
                  stroke="#181A1F"
                  strokeWidth="2.5"
                />
                <circle cx="930" cy="155" r="4" fill="#2E333D" />

                {/* Main Open Case Structure */}
                <g id="openChassis">
                  <rect
                    x="480"
                    y="110"
                    width="410"
                    height="380"
                    rx="8"
                    fill="#101216"
                    stroke="#181A1F"
                    strokeWidth="3.5"
                  />

                  {/* Fine Mesh Front Panel & Dual 140mm Intake Fans */}
                  <rect x="850" y="115" width="34" height="370" rx="4" fill="#1C1F26" stroke="#2E333D" strokeWidth="1.5" />
                  {/* Front Fan 1 (140mm) */}
                  <circle
                    cx="867"
                    cy="190"
                    r="24"
                    fill="#181A1F"
                    stroke={powerTestActive ? "url(#argbGlow)" : "#2E333D"}
                    strokeWidth="3"
                  />
                  <g
                    className={powerTestActive ? "animate-spin" : ""}
                    style={{ transformOrigin: "867px 190px", animationDuration: "0.4s" }}
                  >
                    <line x1="867" y1="170" x2="867" y2="210" stroke={powerTestActive ? "#2DD4BF" : "#3E4554"} strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="847" y1="190" x2="887" y2="190" stroke={powerTestActive ? "#F97316" : "#3E4554"} strokeWidth="2.5" strokeLinecap="round" />
                  </g>

                  {/* Front Fan 2 (140mm) */}
                  <circle
                    cx="867"
                    cy="290"
                    r="24"
                    fill="#181A1F"
                    stroke={powerTestActive ? "url(#argbGlow)" : "#2E333D"}
                    strokeWidth="3"
                  />
                  <g
                    className={powerTestActive ? "animate-spin" : ""}
                    style={{ transformOrigin: "867px 290px", animationDuration: "0.4s" }}
                  >
                    <line x1="867" y1="270" x2="867" y2="310" stroke={powerTestActive ? "#2DD4BF" : "#3E4554"} strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="847" y1="290" x2="887" y2="290" stroke={powerTestActive ? "#F97316" : "#3E4554"} strokeWidth="2.5" strokeLinecap="round" />
                  </g>

                  {/* Internal Motherboard Tray (B550M PCB) */}
                  <rect x="500" y="125" width="330" height="240" rx="4" fill="url(#pcbGrad)" stroke="#222834" strokeWidth="1.5" />

                  {/* Motherboard Trace Details */}
                  <line x1="510" y1="140" x2="620" y2="140" stroke="#00A896" strokeWidth="0.8" opacity="0.4" />
                  <line x1="510" y1="150" x2="580" y2="150" stroke="#00A896" strokeWidth="0.8" opacity="0.4" />

                  {/* AM4 CPU Socket with Twin-Tower Air Cooler */}
                  <rect x="530" y="145" width="85" height="95" rx="4" fill="#2B303A" stroke="#3E4554" strokeWidth="2" />
                  <line x1="545" y1="145" x2="545" y2="240" stroke="#505869" strokeWidth="1.5" />
                  <line x1="565" y1="145" x2="565" y2="240" stroke="#505869" strokeWidth="1.5" />
                  <line x1="585" y1="145" x2="585" y2="240" stroke="#505869" strokeWidth="1.5" />
                  <line x1="605" y1="145" x2="605" y2="240" stroke="#505869" strokeWidth="1.5" />

                  {/* Dual DDR4 RAM with Teal LEDs */}
                  <rect x="635" y="150" width="7" height="60" rx="1.5" fill={powerTestActive ? "#2DD4BF" : "#242933"} stroke="#333A48" strokeWidth="1" />
                  <rect x="647" y="150" width="7" height="60" rx="1.5" fill={powerTestActive ? "#2DD4BF" : "#242933"} stroke="#333A48" strokeWidth="1" />

                  {/* PCIe 4.0 x16 Primary Slot (Gold retention contacts visible) */}
                  <rect x="520" y="278" width="220" height="12" rx="2" fill="#0C0D10" stroke="#374151" strokeWidth="1.5" />
                  <line x1="530" y1="284" x2="710" y2="284" stroke="url(#goldTrace)" strokeWidth="2" strokeDasharray="3 2" />
                  {/* PCIe retention latch */}
                  <rect x="735" y="274" width="8" height="18" rx="2" fill="#00A896" />

                  {/* Perforated PSU Shroud Floor with Dual 120mm Fans */}
                  <rect x="495" y="375" width="345" height="105" rx="3" fill="#181A1F" stroke="#282E3A" strokeWidth="1.5" />
                  <line x1="505" y1="385" x2="830" y2="385" stroke="#252A36" strokeWidth="2" strokeDasharray="4 4" />

                  {/* Shroud Fan 1 (120mm) */}
                  <circle
                    cx="580"
                    cy="420"
                    r="20"
                    fill="#101216"
                    stroke={powerTestActive ? "#00A896" : "#2E333D"}
                    strokeWidth="2.5"
                  />
                  <g
                    className={powerTestActive ? "animate-spin" : ""}
                    style={{ transformOrigin: "580px 420px", animationDuration: "0.5s" }}
                  >
                    <line x1="580" y1="404" x2="580" y2="436" stroke={powerTestActive ? "#2DD4BF" : "#3E4554"} strokeWidth="2" />
                    <line x1="564" y1="420" x2="596" y2="420" stroke={powerTestActive ? "#2DD4BF" : "#3E4554"} strokeWidth="2" />
                  </g>

                  {/* Shroud Fan 2 (120mm) */}
                  <circle
                    cx="650"
                    cy="420"
                    r="20"
                    fill="#101216"
                    stroke={powerTestActive ? "#00A896" : "#2E333D"}
                    strokeWidth="2.5"
                  />
                  <g
                    className={powerTestActive ? "animate-spin" : ""}
                    style={{ transformOrigin: "650px 420px", animationDuration: "0.5s" }}
                  >
                    <line x1="650" y1="404" x2="650" y2="436" stroke={powerTestActive ? "#2DD4BF" : "#3E4554"} strokeWidth="2" />
                    <line x1="634" y1="420" x2="666" y2="420" stroke={powerTestActive ? "#2DD4BF" : "#3E4554"} strokeWidth="2" />
                  </g>

                  {/* Motherboard POST Diagnostic LEDs */}
                  <g id="postLeds">
                    <circle cx="730" cy="140" r="3" fill={powerTestActive ? "#22C55E" : "#374151"} className={powerTestActive ? "animate-ping" : ""} />
                    <circle cx="730" cy="140" r="3" fill={powerTestActive ? "#22C55E" : "#374151"} />
                    <text x="738" y="143" fill={powerTestActive ? "#4ADE80" : "#64748B"} fontSize="6" fontFamily="monospace" fontWeight="bold">
                      {powerTestActive ? "POST OK" : "BOOT LED"}
                    </text>
                  </g>
                </g>

                {/* --- THE GUY (HANDS-ON BUILDER POSE) --- */}
                <g id="guyBuildingPose" filter="url(#subtleDrop)">
                  {/* Neck tucked under collar */}
                  <rect x="260" y="195" width="28" height="55" rx="6" fill="#F0C09F" stroke="#181A1F" strokeWidth="2.5" />

                  {/* Leaning Torso (Navy Crew-Neck T-Shirt) */}
                  <path
                    d="M180,310 C180,260 220,240 270,240 C320,240 360,265 375,310 L410,480 L180,480 Z"
                    fill="#1E293B"
                    stroke="#181A1F"
                    strokeWidth="3.2"
                    strokeLinejoin="round"
                  />
                  {/* Collar */}
                  <path d="M255,242 Q275,255 295,242" fill="none" stroke="#334155" strokeWidth="3" strokeLinecap="round" />

                  {/* Left Arm holding & aligning the RTX 5060 Ti GPU */}
                  <path
                    d="M230,300 C270,330 380,335 520,310"
                    fill="none"
                    stroke="#1E293B"
                    strokeWidth="28"
                    strokeLinecap="round"
                  />
                  <path
                    d="M230,300 C270,330 380,335 520,310"
                    fill="none"
                    stroke="#181A1F"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                  />
                  {/* Left Hand steadying the GPU PCB */}
                  <ellipse cx="528" cy="308" rx="14" ry="10" fill="#FAD5BA" stroke="#181A1F" strokeWidth="2.5" />

                  {/* --- THE RTX 5060 Ti 16GB GPU BEING INSERTED --- */}
                  <g id="gpuBeingSeated" className="transition-transform hover:translate-y-[-2px]">
                    <rect
                      x="510"
                      y="266"
                      width="210"
                      height="46"
                      rx="4"
                      fill="#1E222B"
                      stroke="#181A1F"
                      strokeWidth="2.5"
                    />
                    {/* Metal PCIe Bracket on Left */}
                    <rect x="502" y="250" width="8" height="68" rx="2" fill="#94A3B8" stroke="#181A1F" strokeWidth="2" />
                    {/* GPU Side Trim & Glowing Logo */}
                    <rect x="530" y="280" width="105" height="12" rx="2" fill="#12151B" stroke="#2D333F" strokeWidth="1" />
                    <text x="536" y="289" fill={powerTestActive ? "#F97316" : "#CBD5E1"} fontSize="7.5" fontFamily="monospace" fontWeight="bold">
                      RTX 5060 Ti 16GB
                    </text>
                    {/* Gold Contact Fingers entering slot */}
                    <rect x="525" y="278" width="180" height="4" fill="url(#goldTrace)" />
                  </g>

                  {/* Right Arm wielding precision magnetic screwdriver */}
                  <path
                    d="M340,300 C390,340 460,320 502,260"
                    fill="none"
                    stroke="#1E293B"
                    strokeWidth="26"
                    strokeLinecap="round"
                  />
                  <path
                    d="M340,300 C390,340 460,320 502,260"
                    fill="none"
                    stroke="#181A1F"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                  />
                  {/* Right Hand gripping screwdriver */}
                  <ellipse cx="504" cy="256" rx="13" ry="10" fill="#FAD5BA" stroke="#181A1F" strokeWidth="2.5" />

                  {/* Precision Magnetic Screwdriver */}
                  {/* Knurled Aluminum Handle */}
                  <rect x="480" y="246" width="34" height="9" rx="3" fill="#64748B" stroke="#181A1F" strokeWidth="1.5" />
                  <line x1="490" y1="246" x2="490" y2="255" stroke="#334155" strokeWidth="1" />
                  <line x1="500" y1="246" x2="500" y2="255" stroke="#334155" strokeWidth="1" />
                  {/* Steel Shaft & Magnetized Phillips Head */}
                  <line x1="514" y1="250" x2="540" y2="250" stroke="#CBD5E1" strokeWidth="3" strokeLinecap="round" />
                  <polygon points="540,248 546,250 540,252" fill="#94A3B8" stroke="#181A1F" strokeWidth="1" />

                  {/* Head Oval (Attentive 45-degree leaning angle) */}
                  <circle cx="274" cy="170" r="38" fill="#FAD5BA" stroke="#181A1F" strokeWidth="3.2" />

                  {/* Builder Focused Expression */}
                  <circle cx="292" cy="168" r="3.2" fill="#181A1F" />
                  <circle cx="308" cy="166" r="3.2" fill="#181A1F" />
                  <circle cx="293" cy="167" r="1" fill="#FFFFFF" />
                  <circle cx="309" cy="165" r="1" fill="#FFFFFF" />
                  {/* Concentrated Eyebrows */}
                  <path d="M286,160 Q294,158 300,161" fill="none" stroke="#181A1F" strokeWidth="2.4" strokeLinecap="round" />
                  <path d="M305,158 Q313,155 318,158" fill="none" stroke="#181A1F" strokeWidth="2.4" strokeLinecap="round" />
                  <path d="M305,170 Q310,174 306,178" fill="none" stroke="#181A1F" strokeWidth="2" strokeLinecap="round" />
                  {/* Focused Smile */}
                  <path d="M296,184 Q305,190 314,185" fill="none" stroke="#181A1F" strokeWidth="2.4" strokeLinecap="round" />
                  <circle cx="236" cy="172" r="7.5" fill="#FAD5BA" stroke="#181A1F" strokeWidth="2.5" />

                  {/* Signature Spiky Swept-Up Hair */}
                  <path
                    d="M236,155 C230,120 252,95 282,100 C297,85 317,90 322,110 C332,110 337,125 332,140 C327,135 320,133 314,137 C314,130 306,125 300,130 C292,125 284,127 278,133 C267,130 254,137 250,147 Z"
                    fill="#2D1F17"
                    stroke="#181A1F"
                    strokeWidth="3.2"
                    strokeLinejoin="round"
                  />
                  <path d="M268,115 Q288,130 302,110" fill="none" stroke="#1A120D" strokeWidth="2" />
                  <path d="M298,105 Q312,120 320,125" fill="none" stroke="#1A120D" strokeWidth="2" />
                </g>
              </svg>
            </motion.div>
          )}
        </AnimatePresence>

        {/* =========================================================================
            INTERACTIVE PULSING HOVER PINS (+) OVER HARDWARE
        ========================================================================= */}
        {currentPins.map((pin) => {
          const isActive = activePin === pin.id;
          return (
            <div
              key={pin.id}
              style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
            >
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setActivePin(isActive ? null : pin.id);
                }}
                onMouseEnter={() => setActivePin(pin.id)}
                onMouseLeave={() => setActivePin(null)}
                aria-label={`Inspect ${pin.title}`}
                className={`relative group flex size-6 sm:size-7 items-center justify-center rounded-full border transition-all ${
                  isActive
                    ? "border-accent-orange bg-accent-orange text-white scale-125 shadow-md ring-4 ring-accent-orange/20"
                    : "border-rule-strong bg-surface/95 text-ink hover:border-signal-teal hover:text-signal-teal shadow-sm"
                }`}
              >
                {/* Outer subtle pulse ring */}
                {!isActive && (
                  <span className="absolute inset-0 rounded-full border border-signal-teal animate-ping opacity-30" />
                )}
                <span className="text-[12px] font-bold leading-none select-none">
                  {isActive ? "×" : "+"}
                </span>
              </button>

              {/* Floating Tooltip Callout */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 sm:w-72 bento-card p-3 shadow-xl z-30 pointer-events-none"
                  >
                    <div className="flex items-center justify-between border-b border-rule pb-1.5 mb-1.5 font-narrow text-tiny uppercase tracking-eyebrow">
                      <span className="font-semibold text-ink truncate mr-2">{pin.title}</span>
                      <span className="border border-signal-teal bg-signal-teal/10 px-1.5 py-0.2 rounded text-[10px] text-signal-teal font-bold shrink-0">
                        {pin.badge}
                      </span>
                    </div>
                    <p className="font-sans text-tiny text-muted leading-relaxed">
                      {pin.detail}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}

        {/* Power On Test Success Toast */}
        <AnimatePresence>
          {powerTestToast && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 rounded-lg border border-[#22c55e] bg-[#14161a] px-3.5 py-2 text-tiny font-mono text-[#4ade80] shadow-2xl"
            >
              <CheckCircle2 className="size-4 shrink-0 text-[#22c55e]" />
              <span>⚡ BTM POST OK: 4/4 Fans Spun Up · PCIe Link Gen 4 x16 Stable · 0 Errors</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* =========================================================================
          SLEEK INSTRUMENT BAR (BELOW THE VIEWPORT)
      ========================================================================= */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-rule bg-surface p-3 sm:px-4 font-narrow text-tiny uppercase tracking-eyebrow text-muted">
        {mode === "using" ? (
          <>
            <div className="flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-1.5 text-ink font-semibold">
                <span className="size-2 rounded-full bg-signal-teal" />
                Lancool 207 Mesh
              </span>
              <span>·</span>
              <span>RTX 5060 Ti 16GB</span>
              <span>·</span>
              <span>1440p @ 180Hz MSI IPS</span>
              <span>·</span>
              <span>8BitDo Ultimate 2C</span>
            </div>
            <div className="flex items-center gap-2 text-signal-teal font-medium">
              <Terminal className="size-3" />
              <span>Inference Throughput: 84 tok/s</span>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-1.5 text-ink font-semibold">
                <span className="size-2 rounded-full bg-accent-orange" />
                AM4 Build Bench
              </span>
              <span>·</span>
              <span>Dual 140mm Mesh Intake</span>
              <span>·</span>
              <span>Dual 120mm Shroud Flow</span>
              <span>·</span>
              <span>Tool-Free Glass Removed</span>
            </div>
            <div className="flex items-center gap-2 text-accent-orange font-medium">
              <Wrench className="size-3" />
              <span>PCIe Gen4 x16 Aligned · Ready for POST</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
