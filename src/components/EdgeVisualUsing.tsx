"use client";

import React, { useState } from "react";
import { sound } from "@/lib/sound";
import {
  IsoBox,
  project,
  getIsoPlaneTransform,
  Point2D,
} from "./isoPrimitives";

/**
 * Edge Visual 1: "Using the White Rig — Multi-Terminal Flow"
 *
 * Upgrades:
 * - Top Hardware Spec Readout HUD framing Visual #1:
 *   CPU: Ryzen 5 5600 · RAM: 32GB DDR4 · GPU: RTX 5060 Ti · VRAM: 16GB GDDR7.
 * - Concise footer: "White Lancool 217 INF · 1440p 180Hz · 0.0 GB Offload".
 * - Realistic Mid-Tower Scale: White PC case is ~40% human height (dz=24, dx=12, dy=22).
 *   Sits lower than the top bezel of the 27" MSI monitor (no giant fridge case!).
 * - Low-profile AMD Wraith Stealth stock circular ring cooler inside on motherboard.
 * - Zero stray circles floating on shroud.
 * - Replaced "eval 70b-fp8" with "vllm serve Qwen3-14B-NVFP4".
 * - Tightened viewBox="15 0 440 375" (zero dead air gap).
 */

export function EdgeVisualUsing() {
  const [isHovered, setIsHovered] = useState(false);

  // Origin shifted up to y=120 to eliminate top dead air gap completely
  const origin: Point2D = { x: 225, y: 120 };
  const scale = 2.4;

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
        {/* Hardware Spec Readout HUD */}
        <div
          className={`mb-2 rounded-xl border bg-surface/95 p-2 shadow-xs backdrop-blur-xs transition-colors ${
            isHovered ? "border-signal-teal" : "border-rule"
          }`}
        >
          <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-rule-soft">
            <span className="inline-flex items-center gap-1.5 font-narrow text-tiny uppercase tracking-eyebrow font-semibold text-ink whitespace-nowrap">
              <span className="size-1.5 rounded-full bg-signal-teal animate-pulse" />
              Daily Driver Rig
            </span>
            <span className="font-narrow text-tiny text-accent-orange font-semibold tabular-nums whitespace-nowrap">
              0.0 GB Offload
            </span>
          </div>

          <dl className="grid grid-cols-2 gap-1 font-narrow text-tiny">
            {[
              ["CPU", "Ryzen 5 5600"],
              ["RAM", "32GB DDR4"],
              ["GPU", "RTX 5060 Ti"],
              ["VRAM", "16GB GDDR7"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="min-w-0 flex flex-col px-1.5 py-1 rounded bg-surface-sunken/60 leading-tight"
              >
                <dt className="text-muted uppercase tracking-eyebrow">{label}</dt>
                <dd className={`truncate font-semibold ${label === "VRAM" ? "text-signal-teal" : "text-ink"}`}>
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* 2.5D Isometric Diorama SVG (Tightened Framing: viewBox="15 0 440 375") */}
        <div className="relative transition-transform duration-300 group-hover:-translate-y-1">
          <svg
            viewBox="15 0 440 375"
            className="w-full h-auto drop-shadow-md"
            aria-hidden="true"
            focusable="false"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            shapeRendering="geometricPrecision"
          >
            <defs>
              <linearGradient id="scene1Argb" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#00F0FF" />
                <stop offset="50%" stopColor="#FF5500" />
                <stop offset="100%" stopColor="#00F0FF" />
              </linearGradient>

              <linearGradient id="glassSheen" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
                <stop offset="35%" stopColor="rgba(255,255,255,0.08)" />
                <stop offset="65%" stopColor="rgba(0,240,255,0.15)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.25)" />
              </linearGradient>

              <style>{`
                @keyframes rotorSpin {
                  from { transform: rotate(0deg); }
                  to { transform: rotate(360deg); }
                }
                @keyframes cursorBlink {
                  0%, 100% { opacity: 1; }
                  50% { opacity: 0; }
                }
                @keyframes vramPulse {
                  0%, 100% { width: 18px; }
                  50% { width: 23px; }
                }
                .fan-rotor-using {
                  animation: rotorSpin 2.2s linear infinite;
                }
                .cursor-pulse {
                  animation: cursorBlink 0.9s steps(1) infinite;
                }
                .vram-pulse {
                  animation: vramPulse 2.6s ease-in-out infinite;
                }
              `}</style>
            </defs>

            {/* ========================================================
                1. ISOMETRIC FLOOR PLINTH (Warm Architectural Oak)
                ======================================================== */}
            <IsoBox
              x={0}
              y={0}
              z={0}
              dx={110}
              dy={95}
              dz={4}
              topColor="#F5F1E9"
              leftColor="#DDD6C9"
              rightColor="#CEC6B7"
              stroke="#BDB4A4"
              strokeWidth={0.75}
              origin={origin}
              scale={scale}
            />

            {/* Floor ambient shadow under desk & chair */}
            {(() => {
              const p1 = project({ x: 12, y: 12, z: 4.1 }, origin, scale);
              const p2 = project({ x: 96, y: 12, z: 4.1 }, origin, scale);
              const p3 = project({ x: 96, y: 72, z: 4.1 }, origin, scale);
              const p4 = project({ x: 12, y: 72, z: 4.1 }, origin, scale);
              return (
                <polygon
                  points={`${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y} ${p4.x},${p4.y}`}
                  fill="rgba(17, 19, 24, 0.06)"
                />
              );
            })()}

            {/* ========================================================
                2. MODERN DESK (Dark Steel Legs + White Ash Top)
                ======================================================== */}
            <IsoBox
              x={18}
              y={14}
              z={4}
              dx={4}
              dy={26}
              dz={24}
              topColor="#333D4F"
              leftColor="#1A202C"
              rightColor="#252D3D"
              origin={origin}
              scale={scale}
            />
            <IsoBox
              x={88}
              y={14}
              z={4}
              dx={4}
              dy={26}
              dz={24}
              topColor="#333D4F"
              leftColor="#1A202C"
              rightColor="#252D3D"
              origin={origin}
              scale={scale}
            />

            {/* White Ash Tabletop Slab (z=28..31) */}
            <IsoBox
              x={14}
              y={12}
              z={28}
              dx={82}
              dy={30}
              dz={3}
              topColor="#FFFFFF"
              leftColor="#E2E8F0"
              rightColor="#F1F5F9"
              stroke="#CBD5E1"
              strokeWidth={0.8}
              origin={origin}
              scale={scale}
            />

            {/* Technical Dark Deskpad */}
            <IsoBox
              x={18}
              y={15}
              z={31}
              dx={54}
              dy={25}
              dz={0.6}
              topColor="#161920"
              leftColor="#0F1218"
              rightColor="#12161F"
              stroke="#0F5C6E"
              strokeWidth={0.6}
              origin={origin}
              scale={scale}
            />

            {/* ========================================================
                3. 27" MSI FRAMELESS MONITOR (Facing front-right toward user)
                ======================================================== */}
            {/* Aluminum Monitor Stand Base */}
            <IsoBox
              x={40}
              y={14}
              z={31.6}
              dx={8}
              dy={5}
              dz={0.8}
              topColor="#475569"
              leftColor="#334155"
              rightColor="#3B4758"
              origin={origin}
              scale={scale}
            />
            {/* Stand Vertical Stem */}
            <IsoBox
              x={43}
              y={15}
              z={32.4}
              dx={2}
              dy={2}
              dz={14}
              topColor="#64748B"
              leftColor="#334155"
              rightColor="#475569"
              origin={origin}
              scale={scale}
            />

            {/* 27" Frameless Display Enclosure (top edge at z=67) */}
            <IsoBox
              x={22}
              y={17}
              z={42}
              dx={44}
              dy={2.5}
              dz={25}
              topColor="#1E293B"
              leftColor="#0F172A"
              rightColor="#1A2234"
              stroke="#334155"
              strokeWidth={0.75}
              origin={origin}
              scale={scale}
            />

            {/* 3 LIVE TILED OLED TERMINAL PANES (Projected on front screen face) */}
            <g
              transform={getIsoPlaneTransform(
                "front-right",
                { x: 22.5, y: 19.5, z: 66.5 },
                origin,
                scale
              )}
            >
              <rect x="0" y="0" width="43" height="24" fill="#0A0C10" />

              {/* --- Top-Left Pane: Qwen3-14B vLLM Server Prompt --- */}
              <rect x="0.8" y="0.8" width="26" height="13.2" fill="#11141B" stroke="#1E232E" strokeWidth="0.4" />
              <circle cx="2.2" cy="2.2" r="0.8" fill="#22C55E" />
              <text x="3.8" y="2.7" fill="#94A3B8" fontSize="1.8" fontFamily="monospace">
                fish ~ (cachyos)
              </text>
              <text x="1.6" y="5.8" fill="#22C55E" fontSize="1.6" fontFamily="monospace">
                &gt; vllm serve Qwen3-14B-NVFP4
              </text>
              <rect x="23.2" y="4.5" width="1.2" height="1.8" fill="#00F0FF" className="cursor-pulse" />
              <text x="1.6" y="8.8" fill="#64748B" fontSize="1.5" fontFamily="monospace">
                ✓ engine ready [0.0 offload]
              </text>
              <text x="1.6" y="11.6" fill="#64748B" fontSize="1.5" fontFamily="monospace">
                ✓ 1440p @ 180Hz wayland
              </text>

              {/* --- Bottom-Left Pane: btop VRAM Telemetry --- */}
              <rect x="0.8" y="14.8" width="26" height="8.4" fill="#11141B" stroke="#1E232E" strokeWidth="0.4" />
              <text x="1.6" y="17.2" fill="#E2E8F0" fontSize="1.6" fontFamily="monospace">
                VRAM: 14.1 / 16GB NVFP4
              </text>
              <rect x="1.6" y="18.5" width="24" height="2" fill="#1E293B" rx="0.5" />
              <rect x="1.6" y="18.5" width="21" height="2" fill="#FF5500" rx="0.5" className="vram-pulse" />
              <text x="1.6" y="22.2" fill="#00F0FF" fontSize="1.4" fontFamily="monospace">
                0.0 GB HOST SPILL
              </text>

              {/* --- Right Pane: Live Telemetry Sparkline --- */}
              <rect x="27.6" y="0.8" width="14.6" height="22.4" fill="#11141B" stroke="#1E232E" strokeWidth="0.4" />
              <text x="28.4" y="2.7" fill="#00F0FF" fontSize="1.6" fontFamily="monospace">
                RTX 5060 Ti
              </text>
              <text x="28.4" y="5.2" fill="#64748B" fontSize="1.4" fontFamily="monospace">
                180Hz · 1ms
              </text>
              <polyline
                points="28.5,14 31,11 34,13 36,9 39,11 41,7"
                fill="none"
                stroke="#00F0FF"
                strokeWidth="0.6"
              />
              <text x="28.4" y="18" fill="#22C55E" fontSize="1.4" fontFamily="monospace">
                POST 00
              </text>
              <text x="28.4" y="21" fill="#E2E8F0" fontSize="1.4" fontFamily="monospace">
                61°C · 145W
              </text>
            </g>

            {/* ========================================================
                4. WHITE LIAN LI LANCOOL 217 INF (PROPERLY SCALED!)
                Case is dx=12 narrow, dy=22 deep, dz=24 tall (sits at z=31..55,
                BELOW monitor top bezel at z=67!)
                ======================================================== */}
            {/* Chassis Outer Shell */}
            <IsoBox
              x={76}
              y={15}
              z={31}
              dx={12}
              dy={22}
              dz={24}
              topColor="#FFFFFF"
              leftColor="#F8FAFC"
              rightColor="#E2E8F0"
              stroke="#CBD5E1"
              strokeWidth={0.75}
              origin={origin}
              scale={scale}
            />

            {/* Left Tempered Glass Window Chamber (at x=76) */}
            <IsoBox
              x={76.2}
              y={16}
              z={32}
              dx={0.4}
              dy={20}
              dz={22}
              topColor="#111622"
              leftColor="#111622"
              rightColor="#0B0E14"
              origin={origin}
              scale={scale}
            />

            {/* White Bottom PSU Shroud (height=6, z=31..37) */}
            <IsoBox
              x={76.3}
              y={16}
              z={31}
              dx={0.4}
              dy={20}
              dz={6}
              topColor="#F1F5F9"
              leftColor="#FFFFFF"
              rightColor="#E2E8F0"
              stroke="#CBD5E1"
              strokeWidth={0.5}
              origin={origin}
              scale={scale}
            />

            {/* Motherboard Backplate */}
            <IsoBox
              x={78}
              y={17}
              z={37}
              dx={9.5}
              dy={0.8}
              dz={16}
              topColor="#1E293B"
              leftColor="#1E293B"
              rightColor="#0F172A"
              origin={origin}
              scale={scale}
            />

            {/* AMD Wraith Stealth Stock Cooler (Low-profile circular ring cooler) */}
            <g transform={getIsoPlaneTransform("front-left", { x: 78.5, y: 25, z: 49 }, origin, scale)}>
              {/* Outer circular heatsink ring */}
              <circle cx="0" cy="0" r="3.6" fill="#333D4F" stroke="#94A3B8" strokeWidth="0.7" />
              {/* Inner fan hub & ARGB accent */}
              <circle cx="0" cy="0" r="2.2" fill="#1E293B" />
              <circle cx="0" cy="0" r="1.5" fill="#FF5500" opacity="0.8" />
            </g>

            {/* Horizontal Gigabyte RTX 5060 Ti 16GB GPU Brick */}
            <IsoBox
              x={76.5}
              y={18}
              z={39}
              dx={10}
              dy={15}
              dz={3.5}
              topColor="#1E293B"
              leftColor="#111827"
              rightColor="#141C2B"
              stroke="#334155"
              strokeWidth={0.5}
              origin={origin}
              scale={scale}
            />
            {/* Glowing GEFORCE RTX Side Strip */}
            <g transform={getIsoPlaneTransform("front-left", { x: 76.6, y: 32, z: 41.5 }, origin, scale)}>
              <rect x="0" y="0" width="10" height="2" fill="#00F0FF" rx="0.4" />
              <text x="1" y="1.5" fill="#0A0C10" fontSize="1.2" fontFamily="monospace" fontWeight="bold">
                RTX 5060 Ti
              </text>
            </g>

            {/* Tempered Glass Reflection */}
            {(() => {
              const g1 = project({ x: 76.1, y: 16, z: 32 }, origin, scale);
              const g2 = project({ x: 76.1, y: 36, z: 32 }, origin, scale);
              const g3 = project({ x: 76.1, y: 36, z: 54 }, origin, scale);
              const g4 = project({ x: 76.1, y: 16, z: 54 }, origin, scale);
              return (
                <polygon
                  points={`${g1.x},${g1.y} ${g2.x},${g2.y} ${g3.x},${g3.y} ${g4.x},${g4.y}`}
                  fill="url(#glassSheen)"
                  opacity="0.32"
                />
              );
            })()}

            {/* --- Front Glass Face (at y=37, facing front-right) --- */}
            {/* Dual 170mm infinity-mirror ARGB intake fans behind the glass front */}
            <g
              transform={getIsoPlaneTransform(
                "front-right",
                { x: 76, y: 37.1, z: 55 },
                origin,
                scale
              )}
            >
              <rect x="0.8" y="1" width="10.4" height="22" fill="#F1F5F9" stroke="#E2E8F0" strokeWidth="0.4" />

              {/* Upper 170mm Fan (Center: 6, 6.5, Radius: 4.2) */}
              <g transform="translate(6, 6.5)">
                <circle cx="0" cy="0" r="4.2" fill="none" stroke="url(#scene1Argb)" strokeWidth="1.2" />
                <circle cx="0" cy="0" r="3.2" fill="rgba(0,240,255,0.06)" />
                <g className="fan-rotor-using" style={{ transformOrigin: "0 0" }}>
                  <path d="M-3.5,-0.6 C-1.8,-1.8 1.8,-1.8 3.5,0.6 C1.8,1.8 -1.8,1.8 -3.5,-0.6 Z" fill="#FFFFFF" opacity="0.9" />
                  <path d="M-0.6,-3.5 C1.8,-1.8 1.8,1.8 -0.6,3.5 C-1.8,1.8 -1.8,-1.8 -0.6,-3.5 Z" fill="#F1F5F9" opacity="0.9" />
                </g>
                <circle cx="0" cy="0" r="1.4" fill="#1E293B" stroke="#FF5500" strokeWidth="0.5" />
              </g>

              {/* Lower 170mm Fan (Center: 6, 16.5, Radius: 4.2) */}
              <g transform="translate(6, 16.5)">
                <circle cx="0" cy="0" r="4.2" fill="none" stroke="url(#scene1Argb)" strokeWidth="1.2" />
                <circle cx="0" cy="0" r="3.2" fill="rgba(255,85,0,0.06)" />
                <g className="fan-rotor-using" style={{ transformOrigin: "0 0", animationDirection: "reverse" }}>
                  <path d="M-3.5,-0.6 C-1.8,-1.8 1.8,-1.8 3.5,0.6 C1.8,1.8 -1.8,1.8 -3.5,-0.6 Z" fill="#FFFFFF" opacity="0.9" />
                  <path d="M-0.6,-3.5 C1.8,-1.8 1.8,1.8 -0.6,3.5 C-1.8,1.8 -1.8,-1.8 -0.6,-3.5 Z" fill="#F1F5F9" opacity="0.9" />
                </g>
                <circle cx="0" cy="0" r="1.4" fill="#1E293B" stroke="#00F0FF" strokeWidth="0.5" />
              </g>
            </g>

            {/* ========================================================
                5. PERIPHERALS (75% Keyboard + Mouse + Teal Controller)
                ======================================================== */}
            {/* 75% Mechanical Keyboard Housing (White Case) */}
            <IsoBox
              x={28}
              y={26}
              z={31.6}
              dx={20}
              dy={8}
              dz={1.6}
              topColor="#FFFFFF"
              leftColor="#CBD5E1"
              rightColor="#E2E8F0"
              stroke="#94A3B8"
              strokeWidth={0.5}
              origin={origin}
              scale={scale}
            />
            {/* Keycaps Matrix */}
            <IsoBox
              x={29}
              y={27}
              z={33.2}
              dx={18}
              dy={6.2}
              dz={0.8}
              topColor="#1E293B"
              leftColor="#0F172A"
              rightColor="#141C2B"
              origin={origin}
              scale={scale}
            />
            {/* Accent Orange Esc Keycap */}
            <IsoBox
              x={29.2}
              y={27.2}
              z={34}
              dx={1.8}
              dy={1.4}
              dz={0.5}
              topColor="#FF5500"
              leftColor="#C2410C"
              rightColor="#EA580C"
              origin={origin}
              scale={scale}
            />
            {/* Accent Teal Enter Keycap */}
            <IsoBox
              x={44.8}
              y={29}
              z={34}
              dx={2}
              dy={3}
              dz={0.5}
              topColor="#00F0FF"
              leftColor="#0891B2"
              rightColor="#06B6D4"
              origin={origin}
              scale={scale}
            />

            {/* Logitech G304 Wireless Mouse (White Pebble) */}
            <IsoBox
              x={53}
              y={28}
              z={31.6}
              dx={5}
              dy={7}
              dz={1.8}
              topColor="#FFFFFF"
              leftColor="#CBD5E1"
              rightColor="#F1F5F9"
              stroke="#94A3B8"
              strokeWidth={0.5}
              origin={origin}
              scale={scale}
            />
            <IsoBox
              x={55}
              y={29}
              z={33.4}
              dx={1}
              dy={2}
              dz={0.6}
              topColor="#1E293B"
              leftColor="#0F172A"
              rightColor="#1E293B"
              origin={origin}
              scale={scale}
            />

            {/* Mint Teal 8BitDo Ultimate 2C Wireless Controller */}
            <IsoBox
              x={18}
              y={28}
              z={31.6}
              dx={8}
              dy={9}
              dz={1.8}
              topColor="#14B8A6"
              leftColor="#0D9488"
              rightColor="#0F766E"
              stroke="#042F2E"
              strokeWidth={0.5}
              origin={origin}
              scale={scale}
            />
            <g transform={getIsoPlaneTransform("top", { x: 19, y: 29.5, z: 33.5 }, origin, scale)}>
              <rect x="1" y="2" width="4" height="1.4" fill="#FFFFFF" />
              <rect x="2.3" y="0.7" width="1.4" height="4" fill="#FFFFFF" />
              <circle cx="2" cy="6" r="1.3" fill="#1E293B" />
              <circle cx="5" cy="5" r="1.3" fill="#1E293B" />
            </g>

            {/* ========================================================
                6. ERGONOMIC CHAIR (Placed strictly IN FRONT OF desk, y=46..60)
                ======================================================== */}
            {/* 5-Star Caster Wheel Base on floor (z=4) */}
            <IsoBox
              x={35}
              y={49}
              z={4}
              dx={8}
              dy={8}
              dz={1.5}
              topColor="#334155"
              leftColor="#1E293B"
              rightColor="#273242"
              origin={origin}
              scale={scale}
            />
            {/* Hydraulic Cylinder */}
            <IsoBox
              x={37.5}
              y={51.5}
              z={5.5}
              dx={3}
              dy={3}
              dz={12}
              topColor="#64748B"
              leftColor="#334155"
              rightColor="#475569"
              origin={origin}
              scale={scale}
            />

            {/* Chair Ergonomic Seat Cushion (z=17.5..21) */}
            <IsoBox
              x={32}
              y={46}
              z={17.5}
              dx={14}
              dy={14}
              dz={3.5}
              topColor="#252D3D"
              leftColor="#161C26"
              rightColor="#1E2430"
              stroke="#333D4F"
              strokeWidth={0.6}
              origin={origin}
              scale={scale}
            />

            {/* ========================================================
                7. SEATED VOXEL GUY (Facing the monitor & keyboard!)
                ======================================================== */}
            {/* Thighs / Pelvis resting on chair seat (Dark charcoal trousers) */}
            <IsoBox
              x={34}
              y={44}
              z={21}
              dx={10}
              dy={12}
              dz={5}
              topColor="#1F242D"
              leftColor="#141820"
              rightColor="#1A1F26"
              origin={origin}
              scale={scale}
            />

            {/* Shins / Legs dropping down to floor sneakers */}
            <IsoBox
              x={34.5}
              y={42}
              z={4}
              dx={3.5}
              dy={3.5}
              dz={17}
              topColor="#1F242D"
              leftColor="#141820"
              rightColor="#1A1F26"
              origin={origin}
              scale={scale}
            />
            <IsoBox
              x={40}
              y={42}
              z={4}
              dx={3.5}
              dy={3.5}
              dz={17}
              topColor="#1F242D"
              leftColor="#141820"
              rightColor="#1A1F26"
              origin={origin}
              scale={scale}
            />
            {/* White / Orange Sneakers */}
            <IsoBox
              x={34}
              y={40}
              z={4}
              dx={4}
              dy={5}
              dz={2.5}
              topColor="#FFFFFF"
              leftColor="#FF5500"
              rightColor="#E2E8F0"
              origin={origin}
              scale={scale}
            />
            <IsoBox
              x={40}
              y={40}
              z={4}
              dx={4}
              dy={5}
              dz={2.5}
              topColor="#FFFFFF"
              leftColor="#FF5500"
              rightColor="#E2E8F0"
              origin={origin}
              scale={scale}
            />

            {/* Torso: Dark Navy Crew-Neck Tee (z=26..42) */}
            <IsoBox
              x={34}
              y={46}
              z={26}
              dx={10}
              dy={8}
              dz={15}
              topColor="#182232"
              leftColor="#111827"
              rightColor="#141C2B"
              stroke="#0A0E17"
              strokeWidth={0.6}
              origin={origin}
              scale={scale}
            />

            {/* Left Arm: Reaching forward to keyboard */}
            <IsoBox
              x={30.5}
              y={40}
              z={31}
              dx={3.5}
              dy={12}
              dz={4}
              topColor="#182232"
              leftColor="#111827"
              rightColor="#141C2B"
              origin={origin}
              scale={scale}
            />
            <IsoBox
              x={31}
              y={34}
              z={33.5}
              dx={3}
              dy={6}
              dz={2}
              topColor="#E8B490"
              leftColor="#D49B75"
              rightColor="#DE9E78"
              origin={origin}
              scale={scale}
            />

            {/* Right Arm: Reaching forward to mouse */}
            <IsoBox
              x={44}
              y={38}
              z={31}
              dx={3.5}
              dy={12}
              dz={4}
              topColor="#182232"
              leftColor="#111827"
              rightColor="#141C2B"
              origin={origin}
              scale={scale}
            />
            <IsoBox
              x={52}
              y={30}
              z={33.5}
              dx={4}
              dy={5}
              dz={2}
              topColor="#E8B490"
              leftColor="#D49B75"
              rightColor="#DE9E78"
              origin={origin}
              scale={scale}
            />

            {/* Voxel Head (Warm skin tone, tilted forward facing monitor) */}
            <IsoBox
              x={35}
              y={44}
              z={41}
              dx={8}
              dy={8}
              dz={9}
              topColor="#E8B490"
              leftColor="#D49B75"
              rightColor="#DE9E78"
              stroke="#B57A54"
              strokeWidth={0.5}
              origin={origin}
              scale={scale}
            />

            {/* Dark Espresso Voxel Hair Blocks */}
            <IsoBox
              x={34.5}
              y={45}
              z={49}
              dx={9}
              dy={8}
              dz={3.5}
              topColor="#26211D"
              leftColor="#181512"
              rightColor="#1E1A16"
              origin={origin}
              scale={scale}
            />
            <IsoBox
              x={35.5}
              y={44}
              z={52}
              dx={5}
              dy={4}
              dz={2.5}
              topColor="#332B25"
              leftColor="#1E1A16"
              rightColor="#28221D"
              origin={origin}
              scale={scale}
            />

            {/* Clean Dark Pixel Glasses Frame on front-right face */}
            <g transform={getIsoPlaneTransform("front-right", { x: 35, y: 44, z: 48 }, origin, scale)}>
              <rect x="0.5" y="0.8" width="3.2" height="2.5" fill="#111318" rx="0.3" />
              <rect x="4.2" y="0.8" width="3.2" height="2.5" fill="#111318" rx="0.3" />
              <line x1="3.7" y1="1.8" x2="4.2" y2="1.8" stroke="#111318" strokeWidth="0.6" />
              <rect x="1.2" y="1.4" width="1.6" height="1.4" fill="#182232" />
              <rect x="1.4" y="1.4" width="0.6" height="0.6" fill="#FFFFFF" />
              <rect x="4.8" y="1.4" width="1.6" height="1.4" fill="#182232" />
              <rect x="5.0" y="1.4" width="0.6" height="0.6" fill="#FFFFFF" />
            </g>

            {/* Ergonomic Chair Backrest (Lumbar frame behind lower back) */}
            <IsoBox
              x={33}
              y={55}
              z={18}
              dx={12}
              dy={2}
              dz={12}
              topColor="#333D4F"
              leftColor="#1E293B"
              rightColor="#273242"
              stroke="#475569"
              strokeWidth={0.6}
              origin={origin}
              scale={scale}
            />
          </svg>
        </div>

        {/* Secondary Footer Strip (offload already shown in the HUD) */}
        <div className="mt-1.5 flex flex-wrap items-center justify-between gap-x-2 px-2 font-narrow text-tiny text-muted">
          <span className="flex items-center gap-1.5 text-ink font-medium whitespace-nowrap">
            <span className="size-1 rounded-full bg-signal-teal" />
            White Lancool 217 INF
          </span>
          <span className="tabular-nums whitespace-nowrap">27&quot; 1440p · 180Hz</span>
        </div>
      </div>
    </aside>
  );
}
