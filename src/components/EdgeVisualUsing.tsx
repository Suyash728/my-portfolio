"use client";

import React, { useState } from "react";
import { sound } from "@/lib/sound";

/**
 * Edge Visual 1: "Using the White Rig — Multi-Terminal Flow"
 *
 * Style Invariants:
 * - Crisp 2.5D Isometric Geometric / High-Bit Pixel-Art Diorama (30° isometric projection).
 * - Exact Hardware: WHITE Lian Li LANCOOL 207 (LAN207RW) snow-white chassis with dual 140mm ARGB front fans
 *   and dual 120mm PSU shroud intake fans.
 * - 27" Frameless MSI Monitor displaying 3 live-animated OLED terminal panes (Fish prompt, btop VRAM, test runner).
 * - Stylized geometric character (Suyash) in dark navy crew-neck tee, spiky dark hair, warm skin tone.
 * - Teal wireless controller (8BitDo Ultimate 2C), mechanical keyboard, wireless mouse.
 */
export function EdgeVisualUsing() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <aside
      aria-label="Daily Driver White Rig Setup Visual"
      className="w-full pointer-events-none select-none print:hidden transition-transform duration-300"
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
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border bg-surface/95 px-2.5 py-0.5 font-narrow text-[10px] uppercase tracking-eyebrow shadow-xs backdrop-blur-xs transition-colors ${
              isHovered ? "border-signal-teal text-signal-teal" : "border-rule text-ink"
            }`}
          >
            <span className="size-1.5 rounded-full bg-signal-teal animate-pulse" />
            White Lancool 207
          </span>
          <span className="font-mono text-[9.5px] text-muted tabular-nums">
            RTX 5060 Ti · 16GB
          </span>
        </div>

        {/* 2.5D Isometric Diorama SVG */}
        <div className="relative transition-transform duration-300 group-hover:-translate-y-1">
          <svg
            viewBox="0 0 460 480"
            className="w-full h-auto drop-shadow-md"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            shapeRendering="geometricPrecision"
          >
            <defs>
              {/* ARGB Glow Gradients */}
              <linearGradient id="argbGlow" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#00F0FF" />
                <stop offset="50%" stopColor="#FF5500" />
                <stop offset="100%" stopColor="#00F0FF" />
              </linearGradient>

              <linearGradient id="gpuLogoGlow" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#22C55E" />
                <stop offset="100%" stopColor="#00F0FF" />
              </linearGradient>

              {/* Glass Reflection */}
              <linearGradient id="glassReflect" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="rgba(255,255,255,0.35)" />
                <stop offset="45%" stopColor="rgba(255,255,255,0.05)" />
                <stop offset="55%" stopColor="rgba(0,240,255,0.12)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.2)" />
              </linearGradient>

              {/* Isometric Shading Styles */}
              <style>{`
                @keyframes spinBlade {
                  from { transform: rotate(0deg); }
                  to { transform: rotate(360deg); }
                }
                @keyframes cursorBlink {
                  0%, 100% { opacity: 1; }
                  50% { opacity: 0; }
                }
                @keyframes barPulse {
                  0%, 100% { width: 52px; }
                  50% { width: 68px; }
                }
                @keyframes codeScroll {
                  0% { transform: translateY(0); }
                  100% { transform: translateY(-18px); }
                }
                .fan-rotor {
                  transform-origin: center;
                  animation: spinBlade 2.4s linear infinite;
                }
                .cursor-pulse {
                  animation: cursorBlink 0.9s steps(1) infinite;
                }
                .bar-glow {
                  animation: barPulse 2.8s ease-in-out infinite;
                }
              `}</style>
            </defs>

            {/* ========================================================
                1. ISOMETRIC FLOATING DESK PLINTH (Light Birch / Anodized)
                ======================================================== */}
            {/* Ambient drop shadow under desk */}
            <polygon
              points="230,450 395,385 230,320 65,385"
              fill="rgba(17, 19, 24, 0.08)"
            />

            {/* Desk Slab Left Bevel (Shadowed) */}
            <polygon
              points="65,370 230,435 230,448 65,383"
              fill="#D4CEC2"
              stroke="#B3ACA0"
              strokeWidth="1"
            />

            {/* Desk Slab Right Bevel */}
            <polygon
              points="230,435 395,370 395,383 230,448"
              fill="#C2BCB0"
              stroke="#A8A296"
              strokeWidth="1"
            />

            {/* Desk Top Face */}
            <polygon
              points="230,305 395,370 230,435 65,370"
              fill="#F4F0E8"
              stroke="#D4CEC2"
              strokeWidth="1.25"
            />

            {/* Sleek Aluminum Desk Frame Trim */}
            <polyline
              points="65,370 230,435 395,370"
              stroke="#FFFFFF"
              strokeWidth="1"
            />

            {/* Technical Oversized Desk Mat (Dark Slate with Teal Stitching) */}
            <polygon
              points="210,328 345,382 205,432 90,380"
              fill="#1A1F29"
              stroke="#0F5C6E"
              strokeWidth="1.2"
            />
            {/* Inner Desk Mat Hairline */}
            <polygon
              points="210,332 340,382 205,428 95,380"
              fill="#151922"
              stroke="#2A3342"
              strokeWidth="0.75"
            />

            {/* ========================================================
                2. 8BITDO ULTIMATE 2C WIRELESS CONTROLLER (Mint Teal)
                ======================================================== */}
            {/* Located at front-left corner of desk mat */}
            <g transform="translate(115, 396)">
              {/* Controller Body Shadow */}
              <ellipse cx="18" cy="12" rx="16" ry="7" fill="rgba(0,0,0,0.25)" />
              {/* Controller Main Chassis (Mint Teal #14B8A6) */}
              <polygon
                points="2,10 18,2 34,8 32,16 18,18 4,16"
                fill="#14B8A6"
                stroke="#0D9488"
                strokeWidth="0.8"
              />
              <polygon
                points="2,10 18,18 18,20 2,12"
                fill="#0F766E"
              />
              <polygon
                points="18,18 32,16 32,18 18,20"
                fill="#115E59"
              />
              {/* D-Pad (White cross) */}
              <rect x="9" y="8" width="5" height="2" fill="#FFFFFF" />
              <rect x="10.5" y="6.5" width="2" height="5" fill="#FFFFFF" />
              {/* Thumbsticks (Dark graphite) */}
              <circle cx="16" cy="11" r="2.2" fill="#1E293B" stroke="#0F172A" strokeWidth="0.5" />
              <circle cx="24" cy="9" r="2.2" fill="#1E293B" stroke="#0F172A" strokeWidth="0.5" />
              {/* Face Buttons (ABXY tiny dots) */}
              <circle cx="28" cy="6" r="1" fill="#FFFFFF" />
              <circle cx="26" cy="4.5" r="1" fill="#FFFFFF" />
            </g>

            {/* ========================================================
                3. MECHANICAL KEYBOARD & WIRELESS MOUSE (G304)
                ======================================================== */}
            {/* 65% Compact Keyboard in Navy & White */}
            <g transform="translate(150, 362)">
              {/* Shadow */}
              <polygon points="12,14 48,0 72,9 36,23" fill="rgba(0,0,0,0.3)" />
              {/* Base Housing */}
              <polygon points="10,12 46,0 68,9 32,21" fill="#202633" stroke="#333D4F" strokeWidth="0.8" />
              <polygon points="10,12 32,21 32,24 10,15" fill="#141822" />
              <polygon points="32,21 68,9 68,12 32,24" fill="#181D28" />
              {/* Keycaps Grid (Isometric rows) */}
              <polygon points="13,11 44,1 64,9 33,19" fill="#111620" />
              {/* Alpha Keycaps (Crisp off-white) */}
              <polygon points="18,11 38,4 52,9 32,16" fill="#F8FAFC" />
              {/* Accent Keys (Safety Orange Esc & Teal Enter) */}
              <rect x="14" y="9" width="3" height="2" fill="#FF5500" />
              <rect x="48" y="11" width="5" height="2" fill="#00F0FF" />
            </g>

            {/* Logitech G304 Style Wireless Mouse (Pure White) */}
            <g transform="translate(236, 386)">
              <ellipse cx="6" cy="6" rx="7" ry="4" fill="rgba(0,0,0,0.25)" />
              {/* Mouse Shell */}
              <path
                d="M1,6 C1,3 4,1 7,2 C10,3 12,5 12,7 C12,9 9,10 6,9 C3,8 1,8 1,6 Z"
                fill="#FFFFFF"
                stroke="#CBD5E1"
                strokeWidth="0.75"
              />
              {/* Scroll wheel */}
              <rect x="6.5" y="3.5" width="1.2" height="2.5" fill="#1E293B" rx="0.5" />
            </g>

            {/* ========================================================
                4. 27-INCH FRAMELESS MSI MONITOR (With 3 Terminal Panes)
                ======================================================== */}
            {/* Stand Base */}
            <polygon
              points="155,335 185,322 195,327 165,340"
              fill="#2A303C"
              stroke="#1E232E"
              strokeWidth="0.8"
            />
            {/* Stand Neck (Vertical Aluminum Stem) */}
            <polygon
              points="174,328 178,326 178,260 174,262"
              fill="#4B5563"
            />
            <polygon
              points="178,326 182,324 182,258 178,260"
              fill="#374151"
            />

            {/* Monitor Bezel & Display Face (Angled 30° toward viewer) */}
            <g transform="translate(100, 160)">
              {/* Bezel Rear/Top Housing */}
              <polygon
                points="15,48 125,0 130,2 20,50"
                fill="#374151"
              />
              <polygon
                points="125,0 130,2 130,85 125,83"
                fill="#1F2937"
              />

              {/* Front Screen Bezel */}
              <polygon
                points="12,50 125,0 125,83 12,133"
                fill="#111318"
                stroke="#2E333D"
                strokeWidth="1.5"
              />

              {/* Active OLED Display Surface */}
              <polygon
                points="14,52 123,3 123,81 14,130"
                fill="#0A0C10"
              />

              {/* --- OLED PANE 1: Fish Prompt + LLM Eval (Top) --- */}
              <g transform="translate(18, 48)">
                {/* Header line */}
                <circle cx="2" cy="0" r="1.5" fill="#22C55E" />
                <line x1="6" y1="0" x2="68" y2="-28" stroke="#334155" strokeWidth="0.8" />
                <text
                  x="7"
                  y="-1"
                  fill="#94A3B8"
                  fontSize="5.5"
                  fontFamily="monospace"
                  transform="skewY(-24)"
                >
                  suyash@cachyos: ~ (vllm)
                </text>
                {/* Command & Blinking Cursor */}
                <text
                  x="7"
                  y="10"
                  fill="#22C55E"
                  fontSize="5"
                  fontFamily="monospace"
                  transform="skewY(-24)"
                >
                  &gt; eval --model 70b-fp8
                </text>
                <rect
                  x="82"
                  y="-22"
                  width="2.5"
                  height="5.5"
                  fill="#00F0FF"
                  className="cursor-pulse"
                  transform="skewY(-24)"
                />
              </g>

              {/* Divider between panes */}
              <line x1="16" y1="92" x2="120" y2="45" stroke="#1E293B" strokeWidth="0.75" />
              <line x1="68" y1="68" x2="68" y2="108" stroke="#1E293B" strokeWidth="0.75" />

              {/* --- OLED PANE 2: btop Telemetry (Bottom Left) --- */}
              <g transform="translate(18, 92)">
                <text
                  x="0"
                  y="2"
                  fill="#CBD5E1"
                  fontSize="4.8"
                  fontFamily="monospace"
                  transform="skewY(-24)"
                >
                  VRAM 15.9G [99%]
                </text>
                {/* Telemetry Bar (Safety Orange to Cyan) */}
                <rect
                  x="0"
                  y="6"
                  width="38"
                  height="3"
                  fill="#1E293B"
                  transform="skewY(-24)"
                />
                <rect
                  x="0"
                  y="6"
                  width="35"
                  height="3"
                  fill="#FF5500"
                  className="bar-glow"
                  transform="skewY(-24)"
                />
                <text
                  x="0"
                  y="16"
                  fill="#64748B"
                  fontSize="4.2"
                  fontFamily="monospace"
                  transform="skewY(-24)"
                >
                  0.0 GB OFFLOAD
                </text>
              </g>

              {/* --- OLED PANE 3: AST Mutation Test Runner (Bottom Right) --- */}
              <g transform="translate(72, 70)">
                <text
                  x="0"
                  y="0"
                  fill="#00F0FF"
                  fontSize="4.6"
                  fontFamily="monospace"
                  transform="skewY(-24)"
                >
                  TEST SUITE
                </text>
                <text
                  x="0"
                  y="8"
                  fill="#22C55E"
                  fontSize="4.2"
                  fontFamily="monospace"
                  transform="skewY(-24)"
                >
                  ✓ AST-MUT 94%
                </text>
                <text
                  x="0"
                  y="15"
                  fill="#22C55E"
                  fontSize="4.2"
                  fontFamily="monospace"
                  transform="skewY(-24)"
                >
                  ✓ CAQM 100%
                </text>
                <text
                  x="0"
                  y="22"
                  fill="#22C55E"
                  fontSize="4.2"
                  fontFamily="monospace"
                  transform="skewY(-24)"
                >
                  ✓ ESCROW OK
                </text>
              </g>

              {/* Screen Specular Corner Glare */}
              <polygon
                points="14,52 60,32 14,92"
                fill="url(#glassReflect)"
                opacity="0.3"
              />
            </g>

            {/* ========================================================
                5. ERGONOMIC CHAIR & CHARACTER (Suyash Kerkar)
                ======================================================== */}
            {/* Chair 5-Star Caster Base */}
            <g transform="translate(130, 420)">
              <ellipse cx="20" cy="12" rx="28" ry="10" fill="rgba(0,0,0,0.22)" />
              {/* Spoke Legs */}
              <line x1="20" y1="8" x2="4" y2="16" stroke="#2B3240" strokeWidth="2.5" />
              <line x1="20" y1="8" x2="36" y2="16" stroke="#2B3240" strokeWidth="2.5" />
              <line x1="20" y1="8" x2="20" y2="20" stroke="#2B3240" strokeWidth="2.5" />
              {/* Central Cylinder */}
              <rect x="18" y="0" width="4" height="9" fill="#475569" />
            </g>

            {/* Ergonomic Mesh Chair High-Back & Lumbar */}
            <g transform="translate(112, 270)">
              {/* Backrest Spine (Graphite Grey) */}
              <polygon
                points="12,30 28,22 32,80 16,88"
                fill="#1E232E"
                stroke="#333D4F"
                strokeWidth="1"
              />
              {/* Breathable Mesh Membrane */}
              <polygon
                points="14,32 26,26 30,76 18,82"
                fill="#2A3241"
              />
              {/* Adjustable Lumbar Pad */}
              <polygon
                points="16,56 26,51 28,66 18,71"
                fill="#0F172A"
              />
              {/* Headrest */}
              <polygon
                points="16,14 26,9 28,24 18,29"
                fill="#1E232E"
                stroke="#333D4F"
                strokeWidth="0.8"
              />
            </g>

            {/* Character Suyash: Seated in Navy Tee with Spiky Hair & Glasses */}
            <g transform="translate(130, 260)">
              {/* Torso: Dark Navy Crew-Neck Tee (Isometric Shading) */}
              {/* Main Chest Face */}
              <polygon
                points="14,48 42,34 50,78 22,92"
                fill="#162032"
                stroke="#0F172A"
                strokeWidth="1"
              />
              {/* Left Torso Shaded Face */}
              <polygon
                points="42,34 54,40 58,84 50,78"
                fill="#0F172A"
              />
              {/* Crew-Neck Ribbing */}
              <ellipse cx="28" cy="41" rx="7" ry="3" fill="#0A0E17" />

              {/* Right Arm: Resting forward to keyboard */}
              <polygon
                points="14,48 20,45 32,68 26,72"
                fill="#162032"
              />
              {/* Forearm (Warm Golden Skin Tone #C68B59) */}
              <polygon
                points="26,72 32,68 46,92 40,96"
                fill="#C68B59"
                stroke="#9A6538"
                strokeWidth="0.5"
              />
              {/* Hand on keys */}
              <polygon points="40,96 46,92 50,96 44,100" fill="#D4A373" />

              {/* Left Arm: Forearm reaching toward wireless mouse */}
              <polygon
                points="42,34 52,39 60,62 50,60"
                fill="#0F172A"
              />
              <polygon
                points="50,60 60,62 82,90 74,94"
                fill="#B07246"
              />
              <polygon points="74,94 82,90 86,94 78,98" fill="#C68B59" />

              {/* Head & Neck */}
              <polygon points="26,38 34,34 36,46 28,50" fill="#B07246" />

              {/* Head/Jaw (Crisp Geometric Chibi Chiseled Form) */}
              <polygon
                points="20,18 36,10 44,24 28,32"
                fill="#C68B59"
                stroke="#9A6538"
                strokeWidth="0.75"
              />
              <polygon
                points="36,10 46,15 50,30 44,24"
                fill="#A66735"
              />

              {/* Geometric Minimalist Glasses (#111318) */}
              <rect x="25" y="18" width="8" height="5" rx="1" fill="#0F172A" />
              <rect x="35" y="14" width="7" height="5" rx="1" fill="#0F172A" />
              <line x1="33" y1="18" x2="35" y2="17" stroke="#00F0FF" strokeWidth="0.8" />
              {/* Lens Glare */}
              <rect x="26.5" y="19" width="5" height="3" fill="#00F0FF" opacity="0.8" />
              <rect x="36.5" y="15" width="4" height="3" fill="#00F0FF" opacity="0.8" />

              {/* Dark Spiky Geometric Hair (#1E1B18) */}
              <polygon
                points="16,14 26,4 34,8 44,2 48,12 40,16 34,10 22,18"
                fill="#1E1B18"
                stroke="#111318"
                strokeWidth="0.8"
              />
              {/* Spikes Facets */}
              <polygon points="26,4 34,8 30,12" fill="#2E2824" />
              <polygon points="34,8 44,2 42,9" fill="#2E2824" />
              <polygon points="44,2 48,12 45,15" fill="#141210" />
            </g>

            {/* ========================================================
                6. WHITE LIAN LI LANCOOL 207 (LAN207RW) PC CASE
                ======================================================== */}
            {/* Base position on desk: Right side */}
            <g transform="translate(265, 175)">
              {/* Case Ambient Shadow on Desk */}
              <polygon
                points="0,175 75,138 150,175 75,212"
                fill="rgba(0,0,0,0.3)"
              />

              {/* Chassis Feet (White Rubber-Padded Risers) */}
              <rect x="10" y="174" width="8" height="6" fill="#CBD5E1" rx="1" />
              <rect x="68" y="204" width="8" height="6" fill="#94A3B8" rx="1" />
              <rect x="132" y="174" width="8" height="6" fill="#CBD5E1" rx="1" />

              {/* --- A. SNOW-WHITE TOP PANEL (Exhaust & Front I/O) --- */}
              <polygon
                points="0,38 75,0 150,38 75,75"
                fill="#FFFFFF"
                stroke="#CBD5E1"
                strokeWidth="1.2"
              />
              {/* Top Fine Mesh Recess */}
              <polygon
                points="12,38 75,7 138,38 75,69"
                fill="#F1F5F9"
                stroke="#E2E8F0"
                strokeWidth="0.8"
              />
              {/* Power Button & Front I/O Ports */}
              <circle cx="28" cy="41" r="2.2" fill="#00F0FF" stroke="#0F5C6E" strokeWidth="0.5" />
              <rect x="34" y="42" width="3.5" height="1.8" fill="#1E293B" rx="0.4" />
              <rect x="40" y="45" width="3.5" height="1.8" fill="#1E293B" rx="0.4" />

              {/* --- B. FRONT PANEL (Facing Left: White Mesh + Dual 140mm ARGB Fans) --- */}
              {/* Front White Outer Bezel Frame */}
              <polygon
                points="0,38 75,75 75,208 0,171"
                fill="#F8FAFC"
                stroke="#CBD5E1"
                strokeWidth="1.2"
              />

              {/* White High-Airflow Fine Mesh Recessed Grill */}
              <polygon
                points="6,46 69,78 69,198 6,166"
                fill="#E2E8F0"
              />

              {/* Mesh Texture Lines */}
              <line x1="12" y1="60" x2="12" y2="160" stroke="#CBD5E1" strokeWidth="0.5" strokeDasharray="1,1" />
              <line x1="24" y1="66" x2="24" y2="170" stroke="#CBD5E1" strokeWidth="0.5" strokeDasharray="1,1" />
              <line x1="38" y1="73" x2="38" y2="180" stroke="#CBD5E1" strokeWidth="0.5" strokeDasharray="1,1" />
              <line x1="52" y1="80" x2="52" y2="190" stroke="#CBD5E1" strokeWidth="0.5" strokeDasharray="1,1" />

              {/* DUAL 140mm ARGB FRONT INTAKE FANS (Spinning Behind Mesh) */}
              {/* Fan 1 (Upper 140mm) */}
              <g transform="translate(38, 102)">
                {/* Outer ARGB Glowing Halo Ring */}
                <ellipse cx="0" cy="0" rx="24" ry="14" fill="none" stroke="url(#argbGlow)" strokeWidth="2.5" opacity="0.9" />
                <ellipse cx="0" cy="0" rx="20" ry="11" fill="rgba(0,240,255,0.08)" />
                {/* 4 Spinning Rotor Blades */}
                <g className="fan-rotor">
                  <path d="M-14,-2 C-8,-6 8,-6 14,2 C8,6 -8,6 -14,-2 Z" fill="#FFFFFF" opacity="0.85" />
                  <path d="M-2,-10 C6,-6 6,6 -2,10 C-6,6 -6,-6 -2,-10 Z" fill="#F1F5F9" opacity="0.85" />
                </g>
                {/* Central Motor Hub */}
                <circle cx="0" cy="0" r="4.5" fill="#1E293B" stroke="#FF5500" strokeWidth="1" />
              </g>

              {/* Fan 2 (Lower 140mm) */}
              <g transform="translate(38, 150)">
                {/* Outer ARGB Glowing Halo Ring */}
                <ellipse cx="0" cy="0" rx="24" ry="14" fill="none" stroke="url(#argbGlow)" strokeWidth="2.5" opacity="0.9" />
                <ellipse cx="0" cy="0" rx="20" ry="11" fill="rgba(255,85,0,0.08)" />
                {/* 4 Spinning Rotor Blades */}
                <g className="fan-rotor" style={{ animationDirection: "reverse" }}>
                  <path d="M-14,-2 C-8,-6 8,-6 14,2 C8,6 -8,6 -14,-2 Z" fill="#FFFFFF" opacity="0.85" />
                  <path d="M-2,-10 C6,-6 6,6 -2,10 C-6,6 -6,-6 -2,-10 Z" fill="#F1F5F9" opacity="0.85" />
                </g>
                {/* Central Motor Hub */}
                <circle cx="0" cy="0" r="4.5" fill="#1E293B" stroke="#00F0FF" strokeWidth="1" />
              </g>

              {/* --- C. LEFT SIDE PANEL (Clear Tempered Glass Window & White Bezels) --- */}
              {/* Interior Chassis Bay Behind Glass */}
              <polygon
                points="75,75 150,38 150,208 75,245"
                fill="#0F172A"
              />

              {/* White Ventilated Bottom PSU Shroud (Signature Lancool 207) */}
              <polygon
                points="75,185 150,148 150,208 75,245"
                fill="#FFFFFF"
                stroke="#E2E8F0"
                strokeWidth="1"
              />
              <polygon
                points="75,185 150,148 142,144 83,181"
                fill="#F8FAFC"
              />
              {/* Subtle "LIAN LI" silkscreen logo on shroud */}
              <text
                x="88"
                y="222"
                fill="#94A3B8"
                fontSize="4.8"
                fontWeight="bold"
                letterSpacing="0.1em"
                transform="skewY(26)"
              >
                LIAN LI
              </text>

              {/* DUAL 120mm INTAKE FANS ON TOP OF SHROUD (Blowing UP into GPU) */}
              <g transform="translate(100, 168)">
                <ellipse cx="0" cy="0" rx="14" ry="7" fill="none" stroke="#00F0FF" strokeWidth="1.2" opacity="0.8" />
                <line x1="0" y1="0" x2="0" y2="-8" stroke="#00F0FF" strokeWidth="1" strokeDasharray="1,1" />
              </g>
              <g transform="translate(128, 154)">
                <ellipse cx="0" cy="0" rx="14" ry="7" fill="none" stroke="#FF5500" strokeWidth="1.2" opacity="0.8" />
                <line x1="0" y1="0" x2="0" y2="-8" stroke="#FF5500" strokeWidth="1" strokeDasharray="1,1" />
              </g>

              {/* Dark ATX Motherboard PCB */}
              <polygon
                points="84,88 144,58 144,142 84,172"
                fill="#1E293B"
              />
              {/* Silver VRM Heatsinks */}
              <rect x="92" y="82" width="14" height="6" fill="#94A3B8" transform="skewY(-26)" />
              {/* Dual RAM Sticks (G.Skill Ripjaws with RGB tops) */}
              <rect x="115" y="65" width="2.5" height="14" fill="#00F0FF" transform="skewY(-26)" />
              <rect x="119" y="63" width="2.5" height="14" fill="#FF5500" transform="skewY(-26)" />

              {/* HORIZONTAL RTX 5060 Ti 16GB GPU (With Silver Anti-Sag Bracket) */}
              <g transform="translate(82, 126)">
                {/* GPU Card Block */}
                <polygon
                  points="2,14 62,-16 62,4 2,34"
                  fill="#111827"
                  stroke="#374151"
                  strokeWidth="0.8"
                />
                {/* Silver Triple Heatpipes */}
                <line x1="8" y1="18" x2="56" y2="-6" stroke="#CBD5E1" strokeWidth="1.2" />
                <line x1="8" y1="22" x2="56" y2="-2" stroke="#CBD5E1" strokeWidth="1.2" />
                {/* Glowing "GEFORCE RTX" Side Badge */}
                <polygon
                  points="12,18 44,2 44,7 12,23"
                  fill="url(#gpuLogoGlow)"
                />
                {/* White Lian Li Anti-Sag Pillar */}
                <rect x="58" y="-12" width="3" height="30" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="0.5" />
              </g>

              {/* CPU Tower Cooler (Silver Fins + Glowing Fan) */}
              <g transform="translate(94, 76)">
                <polygon
                  points="0,18 24,6 24,32 0,44"
                  fill="#64748B"
                  stroke="#94A3B8"
                  strokeWidth="0.8"
                />
                <circle cx="12" cy="25" r="8" fill="none" stroke="#00F0FF" strokeWidth="1.5" opacity="0.85" />
              </g>

              {/* Tempered Glass Specular Light Reflection Sheen */}
              <polygon
                points="78,74 146,39 146,204 78,239"
                fill="url(#glassReflect)"
                opacity="0.45"
              />

              {/* White Steel Border Frame of Glass Panel */}
              <polyline
                points="75,75 150,38 150,208 75,245 75,75"
                stroke="#FFFFFF"
                strokeWidth="1.5"
              />
              <polyline
                points="75,75 75,245"
                stroke="#E2E8F0"
                strokeWidth="1"
              />
            </g>
          </svg>
        </div>

        {/* Live Hardware Capability Telemetry Capsule */}
        <div className="mt-2 flex items-center justify-between px-2 font-mono text-[9px] text-muted">
          <span className="flex items-center gap-1">
            <span className="size-1 rounded-full bg-signal-teal" />
            Dual 140mm ARGB
          </span>
          <span className="text-ink font-semibold">1440p @ 180Hz</span>
          <span className="flex items-center gap-1 text-[#FF5500]">
            0.0 Offload
          </span>
        </div>
      </div>
    </aside>
  );
}
