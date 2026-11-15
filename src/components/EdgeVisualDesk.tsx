"use client";

import React, { useState } from "react";
import { sound } from "@/lib/sound";

export function EdgeVisualDesk() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <aside
      aria-label="Daily Driver Desk Setup Visual"
      className="w-full pointer-events-none select-none print:hidden transition-opacity duration-300"
    >
      <div
        className="relative group pointer-events-auto"
        onMouseEnter={() => {
          sound.playClick();
          setIsHovered(true);
        }}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Subtle Hover Status Badge */}
        <div className="flex items-center justify-between mb-1.5 px-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-rule bg-surface/90 px-2 py-0.5 font-narrow text-[10px] uppercase tracking-eyebrow text-muted shadow-xs">
            <span className="size-1.5 rounded-full bg-signal-teal animate-pulse" />
            Daily Driver Rig
          </span>
          <span className="font-mono text-[9.5px] text-muted tabular-nums">
            1440p · 180Hz
          </span>
        </div>

        {/* Clean Transparent Vector SVG Vignette (No big bounding box) */}
        <svg
          viewBox="0 0 500 420"
          className="w-full h-auto drop-shadow-sm filter"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="edgeArgb" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2DD4BF" />
              <stop offset="100%" stopColor="#F97316" />
            </linearGradient>
          </defs>

          {/* Desk Surface Ledge */}
          <rect x="20" y="360" width="460" height="14" rx="3" fill="#E2DDD5" stroke="#181A1F" strokeWidth="2.5" />
          <rect x="60" y="374" width="22" height="42" rx="2" fill="#2E333D" stroke="#181A1F" strokeWidth="2" />
          <rect x="420" y="374" width="22" height="42" rx="2" fill="#2E333D" stroke="#181A1F" strokeWidth="2" />

          {/* Ergonomic Chair Back */}
          <rect x="50" y="200" width="80" height="170" rx="18" fill="#252A34" stroke="#181A1F" strokeWidth="2.5" />

          {/* Monitor Stand */}
          <rect x="250" y="330" width="50" height="30" rx="3" fill="#2D333F" stroke="#181A1F" strokeWidth="2" />
          <rect x="270" y="270" width="10" height="65" fill="#181A1F" />

          {/* 27" Frameless Monitor angled toward character */}
          <g filter="drop-shadow(0 4px 6px rgba(0,0,0,0.1))">
            <rect x="175" y="140" width="200" height="135" rx="4" fill="#181A1F" stroke="#181A1F" strokeWidth="2.5" />
            <rect x="178" y="143" width="194" height="129" rx="2" fill="#111318" />

            {/* Monitor Screen: Mini 3-Pane Terminal Layout */}
            {/* Top Bar */}
            <rect x="178" y="143" width="194" height="12" fill="#1A1D24" />
            <circle cx="186" cy="149" r="2" fill="#EF4444" />
            <circle cx="192" cy="149" r="2" fill="#F59E0B" />
            <circle cx="198" cy="149" r="2" fill="#10B981" />
            <text x="206" y="152" fill="#9BA1AE" fontSize="6" fontFamily="monospace">
              vllm · Qwen3-14B · 84 t/s
            </text>

            {/* Pane 1: LLM Inference Output */}
            <rect x="182" y="158" width="186" height="40" rx="1.5" fill="#16181F" />
            <text x="186" y="167" fill="#4ADE80" fontSize="5.5" fontFamily="monospace">
              suyash@cachyos: vllm serve --nvfp4
            </text>
            <text x="186" y="176" fill="#94A3B8" fontSize="5" fontFamily="monospace">
              VRAM: 14.1/16.0 GiB · 0.0 GB Spill
            </text>
            <text x="186" y="185" fill="#2DD4BF" fontSize="5" fontFamily="monospace">
              Throughput: 84 tok/s · P99: 14.2ms
            </text>

            {/* Pane 2: GPU Telemetry Sparkline */}
            <rect x="182" y="201" width="91" height="66" rx="1.5" fill="#14161C" />
            <text x="185" y="210" fill="#CBD5E1" fontSize="5" fontFamily="monospace">
              nvtop: 61°C · 145W
            </text>
            <path
              d="M185,224 Q205,214 225,220 T265,212"
              fill="none"
              stroke="#F97316"
              strokeWidth="1.2"
            />
            <text x="185" y="235" fill="#94A3B8" fontSize="4.5" fontFamily="monospace">
              2400 RPM · 28dBA
            </text>

            {/* Pane 3: Neovim Deterministic Checks */}
            <rect x="277" y="201" width="91" height="66" rx="1.5" fill="#14161C" />
            <text x="280" y="210" fill="#2DD4BF" fontSize="5" fontFamily="monospace">
              nvim: verify_ast.py
            </text>
            <text x="280" y="220" fill="#4ADE80" fontSize="4.5" fontFamily="monospace">
              ✓ test_drug_ast [PASS]
            </text>
            <text x="280" y="228" fill="#4ADE80" fontSize="4.5" fontFamily="monospace">
              ✓ test_caqm_grap [PASS]
            </text>
            <text x="280" y="236" fill="#4ADE80" fontSize="4.5" fontFamily="monospace">
              ✓ test_mutants_94% [PASS]
            </text>
          </g>

          {/* Lian Li Lancool 207 Case (on desk to the right) */}
          <g filter="drop-shadow(0 4px 6px rgba(0,0,0,0.12))">
            <rect x="385" y="160" width="85" height="200" rx="4" fill="#181A1F" stroke="#181A1F" strokeWidth="2" />
            {/* Mesh Front Panel */}
            <rect x="387" y="163" width="22" height="194" rx="2" fill="#20242D" />
            {/* Spinning Dual 140mm Fans behind mesh */}
            <circle cx="398" cy="205" r="9" fill="none" stroke="url(#edgeArgb)" strokeWidth="2" />
            <g className="animate-spin" style={{ transformOrigin: "398px 205px", animationDuration: "1.2s" }}>
              <line x1="398" y1="198" x2="398" y2="212" stroke="#2DD4BF" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="391" y1="205" x2="405" y2="205" stroke="#2DD4BF" strokeWidth="1.5" strokeLinecap="round" />
            </g>
            <circle cx="398" cy="250" r="9" fill="none" stroke="url(#edgeArgb)" strokeWidth="2" />
            <g className="animate-spin" style={{ transformOrigin: "398px 250px", animationDuration: "1.2s" }}>
              <line x1="398" y1="243" x2="398" y2="257" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="391" y1="250" x2="405" y2="250" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" />
            </g>

            {/* Glass Side Chamber with RTX 5060 Ti inside */}
            <rect x="411" y="163" width="57" height="194" rx="2" fill="#121419" />
            {/* GPU Horizontal Card */}
            <rect x="415" y="240" width="49" height="18" rx="2" fill="#1E222B" stroke="#333A48" strokeWidth="1" />
            <rect x="418" y="244" width="30" height="4" rx="1" fill="#D94E0F" />
            <text x="420" y="248" fill="#FFFFFF" fontSize="3.5" fontFamily="monospace">
              RTX 5060 Ti
            </text>
            {/* Anti-sag post */}
            <line x1="460" y1="258" x2="460" y2="310" stroke="#4B5563" strokeWidth="1.2" />
            {/* Shroud floor */}
            <rect x="411" y="305" width="57" height="52" fill="#16181E" />
            <circle cx="425" cy="298" r="5" fill="#20242D" stroke="#0F5C6E" strokeWidth="1" />
            <circle cx="445" cy="298" r="5" fill="#20242D" stroke="#0F5C6E" strokeWidth="1" />
          </g>

          {/* Mechanical Keyboard & Mouse on desk */}
          <rect x="180" y="352" width="60" height="8" rx="2" fill="#2E333D" stroke="#181A1F" strokeWidth="1.5" />
          <line x1="185" y1="355" x2="235" y2="355" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="3 2" />
          <ellipse cx="260" cy="356" rx="6" ry="4" fill="#181A1F" />

          {/* Teal 8BitDo Wireless Controller */}
          <rect x="135" y="350" width="22" height="12" rx="5" fill="#0F5C6E" stroke="#181A1F" strokeWidth="1.5" />
          <circle cx="140" cy="355" r="2" fill="#181A1F" />
          <circle cx="152" cy="355" r="1.5" fill="#2DD4BF" />

          {/* Character: Suyash at desk */}
          {/* Torso: Navy Crew-Neck T-Shirt */}
          <path
            d="M60,265 C60,230 85,215 115,215 C145,215 170,230 172,265 L175,360 L55,360 Z"
            fill="#1E293B"
            stroke="#181A1F"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <path d="M102,216 Q115,226 128,216" fill="none" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />

          {/* Left Arm to Keyboard */}
          <path
            d="M75,255 C85,285 130,315 185,348"
            fill="none"
            stroke="#1E293B"
            strokeWidth="20"
            strokeLinecap="round"
          />
          <path
            d="M75,255 C85,285 130,315 185,348"
            fill="none"
            stroke="#181A1F"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <ellipse cx="190" cy="350" rx="8" ry="6" fill="#FAD5BA" stroke="#181A1F" strokeWidth="1.8" />

          {/* Right Arm to Mouse */}
          <path
            d="M150,260 C175,285 220,315 258,352"
            fill="none"
            stroke="#1E293B"
            strokeWidth="18"
            strokeLinecap="round"
          />
          <path
            d="M150,260 C175,285 220,315 258,352"
            fill="none"
            stroke="#181A1F"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <ellipse cx="260" cy="354" rx="7" ry="5" fill="#FAD5BA" stroke="#181A1F" strokeWidth="1.8" />

          {/* Head & Neck */}
          <rect x="105" y="190" width="18" height="26" rx="4" fill="#F0C09F" stroke="#181A1F" strokeWidth="2" />
          <circle cx="115" cy="170" r="28" fill="#FAD5BA" stroke="#181A1F" strokeWidth="2.5" />

          {/* Friendly Minimal Facial Features */}
          <circle cx="125" cy="168" r="2.5" fill="#181A1F" />
          <circle cx="137" cy="167" r="2.5" fill="#181A1F" />
          <path d="M121,162 Q127,160 131,162" fill="none" stroke="#181A1F" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M135,160 Q140,158 144,160" fill="none" stroke="#181A1F" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M134,171 Q138,175 135,178" fill="none" stroke="#181A1F" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M127,183 Q134,188 141,184" fill="none" stroke="#181A1F" strokeWidth="1.8" strokeLinecap="round" />

          {/* Spiky Swept-Up Dark Brown Hair */}
          <path
            d="M87,160 C83,130 100,110 125,115 C138,100 155,105 160,122 C168,122 172,135 168,148 C163,143 158,142 153,145 C153,139 146,135 141,139 C134,135 128,137 123,142 C113,139 102,146 99,155 Z"
            fill="#2D1F17"
            stroke="#181A1F"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
        </svg>

        {/* Floating Tooltip Callout on Hover */}
        <div
          className={`mt-1 text-center font-narrow text-[10px] uppercase tracking-eyebrow text-muted transition-opacity duration-200 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="bg-surface/95 border border-rule px-2 py-0.5 rounded shadow-xs text-ink font-semibold">
            Daily Driver · Lancool 207 + RTX 5060 Ti
          </span>
        </div>
      </div>
    </aside>
  );
}
