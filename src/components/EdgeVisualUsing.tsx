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
 * Architectural Invariants:
 * - Deterministic 30° Isometric 3D Voxel Engine (IsoBox & projected planes).
 * - Correct Spatial Layout: Character sits in ergonomic chair on the viewer side (front)
 *   FACING the 27" MSI monitor and typing on the mechanical keyboard. ZERO clipping through desk!
 * - White Lian Li LANCOOL 207 (LAN207RW) on back-right corner of desk:
 *   Narrow front mesh face with 2 stacked perspective-projected 140mm ARGB spinning fans;
 *   Long side tempered glass panel displaying the illuminated RTX 5060 Ti & dual shroud fans.
 * - 27" MSI 1440p 180Hz Monitor displaying 3 live-animated OLED terminal panes.
 * - 75% Mechanical Keyboard, G304 Mouse, and Mint-Teal 8BitDo Ultimate 2C Wireless Controller.
 * - Clean Crossy-Road / Minecraft-Dungeons style 3D voxel character (no alien goggles or beak!).
 */

export function EdgeVisualUsing() {
  const [isHovered, setIsHovered] = useState(false);

  // Projection origin and scale calibrated for 460x480 viewBox
  const origin: Point2D = { x: 230, y: 310 };
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
              {/* ARGB Glow Gradient */}
              <linearGradient id="scene1Argb" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#00F0FF" />
                <stop offset="50%" stopColor="#FF5500" />
                <stop offset="100%" stopColor="#00F0FF" />
              </linearGradient>

              {/* Glass Sheen */}
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

            {/* Subtle floor ambient shadow under desk & chair */}
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
            {/* Left Steel Leg Frame */}
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
            {/* Right Steel Leg Frame */}
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

            {/* White Ash Tabletop Slab */}
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
              dx={52}
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

            {/* 27" Frameless Display Enclosure */}
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
              {/* Recessed OLED Screen Area (Width 43, Height 24 in local units) */}
              <rect x="0" y="0" width="43" height="24" fill="#0A0C10" />

              {/* --- Top-Left Pane: Fish Prompt & Test Suite --- */}
              <rect x="0.8" y="0.8" width="26" height="13.2" fill="#11141B" stroke="#1E232E" strokeWidth="0.4" />
              <circle cx="2.2" cy="2.2" r="0.8" fill="#22C55E" />
              <text x="3.8" y="2.7" fill="#94A3B8" fontSize="1.8" fontFamily="monospace">
                fish ~ (vllm)
              </text>
              <text x="1.6" y="5.8" fill="#22C55E" fontSize="1.7" fontFamily="monospace">
                &gt; eval 70b-fp8
              </text>
              <rect x="15" y="4.5" width="1.2" height="1.8" fill="#00F0FF" className="cursor-pulse" />
              <text x="1.6" y="8.8" fill="#64748B" fontSize="1.5" fontFamily="monospace">
                ✓ ast-mutation 94%
              </text>
              <text x="1.6" y="11.6" fill="#64748B" fontSize="1.5" fontFamily="monospace">
                ✓ caqm-rule 100%
              </text>

              {/* --- Bottom-Left Pane: btop VRAM Telemetry --- */}
              <rect x="0.8" y="14.8" width="26" height="8.4" fill="#11141B" stroke="#1E232E" strokeWidth="0.4" />
              <text x="1.6" y="17.2" fill="#E2E8F0" fontSize="1.6" fontFamily="monospace">
                VRAM: 14.1 / 16G
              </text>
              {/* VRAM Bar */}
              <rect x="1.6" y="18.5" width="24" height="2" fill="#1E293B" rx="0.5" />
              <rect x="1.6" y="18.5" width="21" height="2" fill="#FF5500" rx="0.5" className="vram-pulse" />
              <text x="1.6" y="22.2" fill="#00F0FF" fontSize="1.4" fontFamily="monospace">
                0.0 GB HOST OFFLOAD
              </text>

              {/* --- Right Pane: Live Telemetry Sparkline --- */}
              <rect x="27.6" y="0.8" width="14.6" height="22.4" fill="#11141B" stroke="#1E232E" strokeWidth="0.4" />
              <text x="28.4" y="2.7" fill="#00F0FF" fontSize="1.6" fontFamily="monospace">
                RTX 5060Ti
              </text>
              <text x="28.4" y="5.2" fill="#64748B" fontSize="1.4" fontFamily="monospace">
                180Hz · 1ms
              </text>
              {/* Mini Sparkline */}
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
                4. WHITE LIAN LI LANCOOL 207 (LAN207RW) MID-TOWER
                ======================================================== */}
            {/* Positioned on back-right corner: dx=22, dy=40, dz=48 */}
            {/* Case Main Chassis Block */}
            <IsoBox
              x={72}
              y={12}
              z={31}
              dx={22}
              dy={40}
              dz={48}
              topColor="#FFFFFF"
              leftColor="#F8FAFC"
              rightColor="#E2E8F0"
              stroke="#CBD5E1"
              strokeWidth={0.8}
              origin={origin}
              scale={scale}
            />

            {/* --- Clear Tempered Glass Side Window on Left Face (at x=72) --- */}
            {/* Dark Interior Bay */}
            <IsoBox
              x={72.2}
              y={14}
              z={33}
              dx={0.5}
              dy={36}
              dz={44}
              topColor="#111622"
              leftColor="#111622"
              rightColor="#0B0E14"
              origin={origin}
              scale={scale}
            />

            {/* White Bottom PSU Shroud (height=11) */}
            <IsoBox
              x={72.3}
              y={14}
              z={33}
              dx={0.5}
              dy={36}
              dz={11}
              topColor="#F1F5F9"
              leftColor="#FFFFFF"
              rightColor="#E2E8F0"
              stroke="#CBD5E1"
              strokeWidth={0.6}
              origin={origin}
              scale={scale}
            />

            {/* Dual 120mm Fans on top of PSU Shroud blowing upward */}
            <g transform={getIsoPlaneTransform("top", { x: 72.4, y: 20, z: 44 }, origin, scale)}>
              <ellipse cx="6" cy="6" rx="5" ry="5" fill="none" stroke="#00F0FF" strokeWidth="0.8" opacity="0.85" />
              <ellipse cx="22" cy="6" rx="5" ry="5" fill="none" stroke="#FF5500" strokeWidth="0.8" opacity="0.85" />
            </g>

            {/* Dark ATX Motherboard PCB */}
            <IsoBox
              x={75}
              y={16}
              z={44}
              dx={16}
              dy={1}
              dz={30}
              topColor="#1E293B"
              leftColor="#1E293B"
              rightColor="#0F172A"
              origin={origin}
              scale={scale}
            />

            {/* Horizontal Gigabyte RTX 5060 Ti 16GB GPU Brick */}
            <IsoBox
              x={72.5}
              y={20}
              z={50}
              dx={18}
              dy={24}
              dz={6}
              topColor="#1E293B"
              leftColor="#111827"
              rightColor="#141C2B"
              stroke="#334155"
              strokeWidth={0.5}
              origin={origin}
              scale={scale}
            />
            {/* Glowing GEFORCE RTX Side Badge */}
            <g transform={getIsoPlaneTransform("front-left", { x: 72.6, y: 44, z: 55 }, origin, scale)}>
              <rect x="4" y="1" width="16" height="3" fill="#00F0FF" rx="0.5" />
              <text x="5" y="3.2" fill="#0A0C10" fontSize="1.8" fontFamily="monospace" fontWeight="bold">
                RTX 5060 Ti
              </text>
            </g>

            {/* CPU Tower Cooler Block with ARGB Ring */}
            <IsoBox
              x={78}
              y={26}
              z={59}
              dx={10}
              dy={12}
              dz={12}
              topColor="#64748B"
              leftColor="#475569"
              rightColor="#525E70"
              stroke="#94A3B8"
              strokeWidth={0.5}
              origin={origin}
              scale={scale}
            />

            {/* Tempered Glass Specular Light Reflection */}
            {(() => {
              const g1 = project({ x: 72.1, y: 14, z: 33 }, origin, scale);
              const g2 = project({ x: 72.1, y: 50, z: 33 }, origin, scale);
              const g3 = project({ x: 72.1, y: 50, z: 77 }, origin, scale);
              const g4 = project({ x: 72.1, y: 14, z: 77 }, origin, scale);
              return (
                <polygon
                  points={`${g1.x},${g1.y} ${g2.x},${g2.y} ${g3.x},${g3.y} ${g4.x},${g4.y}`}
                  fill="url(#glassSheen)"
                  opacity="0.35"
                />
              );
            })()}

            {/* --- Front Narrow Mesh Face (at y=52, facing down-left) --- */}
            {/* Dual 140mm Perspective-Projected ARGB Circular Fans on Front Face */}
            <g
              transform={getIsoPlaneTransform(
                "front-right",
                { x: 72, y: 52.2, z: 79 },
                origin,
                scale
              )}
            >
              {/* White Mesh Recess Frame (Width along X: 22, Height down along Z: 48) */}
              <rect x="1" y="2" width="20" height="44" fill="#F1F5F9" stroke="#E2E8F0" strokeWidth="0.5" />

              {/* Upper 140mm Fan (Center: 11, 14, Radius: 7.5) */}
              <g transform="translate(11, 14)">
                {/* Outer Glowing ARGB Halo Ring */}
                <circle cx="0" cy="0" r="7.5" fill="none" stroke="url(#scene1Argb)" strokeWidth="1.6" />
                <circle cx="0" cy="0" r="6.2" fill="rgba(0,240,255,0.06)" />
                {/* 4 Spinning Rotor Blades */}
                <g className="fan-rotor-using" style={{ transformOrigin: "0 0" }}>
                  <path d="M-6,-1 C-3,-3 3,-3 6,1 C3,3 -3,3 -6,-1 Z" fill="#FFFFFF" opacity="0.9" />
                  <path d="M-1,-6 C3,-3 3,3 -1,6 C-3,3 -3,-3 -1,-6 Z" fill="#F1F5F9" opacity="0.9" />
                </g>
                <circle cx="0" cy="0" r="2.2" fill="#1E293B" stroke="#FF5500" strokeWidth="0.6" />
              </g>

              {/* Lower 140mm Fan (Center: 11, 32, Radius: 7.5) */}
              <g transform="translate(11, 32)">
                <circle cx="0" cy="0" r="7.5" fill="none" stroke="url(#scene1Argb)" strokeWidth="1.6" />
                <circle cx="0" cy="0" r="6.2" fill="rgba(255,85,0,0.06)" />
                <g className="fan-rotor-using" style={{ transformOrigin: "0 0", animationDirection: "reverse" }}>
                  <path d="M-6,-1 C-3,-3 3,-3 6,1 C3,3 -3,3 -6,-1 Z" fill="#FFFFFF" opacity="0.9" />
                  <path d="M-1,-6 C3,-3 3,3 -1,6 C-3,3 -3,-3 -1,-6 Z" fill="#F1F5F9" opacity="0.9" />
                </g>
                <circle cx="0" cy="0" r="2.2" fill="#1E293B" stroke="#00F0FF" strokeWidth="0.6" />
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
            {/* Mouse Dark Scroll Wheel */}
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
            {/* D-Pad White Cross */}
            <g transform={getIsoPlaneTransform("top", { x: 19, y: 29.5, z: 33.5 }, origin, scale)}>
              <rect x="1" y="2" width="4" height="1.4" fill="#FFFFFF" />
              <rect x="2.3" y="0.7" width="1.4" height="4" fill="#FFFFFF" />
              {/* Dual Dark Analog Thumbsticks */}
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
            {/* Left Hand: Warm skin voxel resting on keycaps */}
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
            {/* Right Hand: Warm skin voxel resting on white mouse */}
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

            {/* Dark Espresso Voxel Hair Blocks on top & back of head */}
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
            {/* Spiky Textured Top Tuft */}
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

            {/* Dark Pixel Glasses Frame on front-right face looking at monitor */}
            <g transform={getIsoPlaneTransform("front-right", { x: 35, y: 44, z: 48 }, origin, scale)}>
              {/* Clean Dark Glasses Frame */}
              <rect x="0.5" y="0.8" width="3.2" height="2.5" fill="#111318" rx="0.3" />
              <rect x="4.2" y="0.8" width="3.2" height="2.5" fill="#111318" rx="0.3" />
              <line x1="3.7" y1="1.8" x2="4.2" y2="1.8" stroke="#111318" strokeWidth="0.6" />
              {/* Eyes & Catchlight (No weird glowing cyan bug-eyes!) */}
              <rect x="1.2" y="1.4" width="1.6" height="1.4" fill="#182232" />
              <rect x="1.4" y="1.4" width="0.6" height="0.6" fill="#FFFFFF" />
              <rect x="4.8" y="1.4" width="1.6" height="1.4" fill="#182232" />
              <rect x="5.0" y="1.4" width="0.6" height="0.6" fill="#FFFFFF" />
            </g>

            {/* Ergonomic Chair Backrest (Lumbar frame behind lower back, leaves shoulders/head crisp) */}
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
