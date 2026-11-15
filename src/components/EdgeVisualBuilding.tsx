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
 * Edge Visual 2: "Building the White Rig — Open Chassis"
 *
 * Architectural Invariants:
 * - Deterministic 30° Isometric 3D Voxel Engine (IsoBox & projected planes).
 * - Correct Spatial Layout: WIDE OPEN SIDE BAY of the case faces the viewer (front-right).
 *   Standing voxel character stands directly IN FRONT of the open bay and reaches inside
 *   with an orange precision screwdriver tightening the horizontal RTX 5060 Ti GPU!
 * - White Lian Li LANCOOL 207 (LAN207RW) realistic mid-tower proportions:
 *   Narrow width (W = 22), Deep front-to-back (D = 45), Tall height (H = 48).
 *   Front narrow face has 2 stacked perspective-projected 140mm circular ARGB fans.
 *   Open side reveals white PSU bottom shroud (height=11) with 2x 120mm upward fans,
 *   motherboard, CPU cooler, and horizontal RTX 5060 Ti with PCIe bracket screw.
 * - Detached clear tempered-glass side panel (#E0F2FE 35% translucent) leaning to the right.
 * - Clean Crossy-Road / Minecraft-Dungeons style 3D voxel character (no alien goggles or beak!).
 * - Interactive ⚡ TEST BOOT: Spins all 4 fans, lights up ARGB halos, triggers green POST OK LED,
 *   and shows a floating "+0.0 GB Offload · 61°C" badge!
 */

export function EdgeVisualBuilding() {
  const [isBooted, setIsBooted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Projection origin and scale calibrated for 460x480 viewBox
  const origin: Point2D = { x: 230, y: 310 };
  const scale = 2.4;

  const handleToggleBoot = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playSwitch();
    if (!isBooted) {
      setTimeout(() => sound.playClick(), 180);
    }
    setIsBooted((prev) => !prev);
  };

  return (
    <aside
      aria-label="Hands-On PC Build Assembly Visual"
      className="w-full pointer-events-none select-none print:hidden transition-transform duration-300"
    >
      <div
        className="relative group pointer-events-auto"
        onMouseEnter={() => {
          sound.playClick();
          setIsHovered(true);
        }}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleToggleBoot}
      >
        {/* Subtle Hover Status Badge */}
        <div className="flex items-center justify-between mb-1.5 px-2">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border bg-surface/95 px-2.5 py-0.5 font-narrow text-[10px] uppercase tracking-eyebrow shadow-xs backdrop-blur-xs transition-colors ${
              isHovered ? "border-[#FF5500] text-[#FF5500]" : "border-rule text-ink"
            }`}
          >
            <span
              className={`size-1.5 rounded-full ${
                isBooted ? "bg-[#22C55E] animate-ping" : "bg-[#FF5500] animate-pulse"
              }`}
            />
            {isBooted ? "Rig Booted OK" : "Custom Built Rig"}
          </span>
          <span className="font-mono text-[9.5px] text-muted tabular-nums">
            {isBooted ? "POST 00" : "0.0 GB Offload"}
          </span>
        </div>

        {/* 2.5D Isometric Diorama SVG */}
        <div className="relative transition-transform duration-300 group-hover:-translate-y-1 cursor-pointer">
          <svg
            viewBox="0 0 460 480"
            className="w-full h-auto drop-shadow-md"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            shapeRendering="geometricPrecision"
          >
            <defs>
              {/* ARGB Glow Gradient */}
              <linearGradient id="scene2Argb" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#00F0FF" />
                <stop offset="50%" stopColor="#FF5500" />
                <stop offset="100%" stopColor="#00F0FF" />
              </linearGradient>

              {/* Translucent Leaning Glass Sheen */}
              <linearGradient id="leaningGlass" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="rgba(224, 242, 254, 0.45)" />
                <stop offset="40%" stopColor="rgba(255, 255, 255, 0.2)" />
                <stop offset="70%" stopColor="rgba(0, 240, 255, 0.15)" />
                <stop offset="100%" stopColor="rgba(224, 242, 254, 0.35)" />
              </linearGradient>

              <style>{`
                @keyframes buildSpin {
                  from { transform: rotate(0deg); }
                  to { transform: rotate(360deg); }
                }
                @keyframes postPing {
                  0%, 100% { opacity: 0.3; transform: scale(0.9); }
                  50% { opacity: 1; transform: scale(1.3); }
                }
                .build-fan-spin {
                  animation: buildSpin 1.8s linear infinite;
                }
                .post-led-pulse {
                  animation: postPing 1.2s ease-in-out infinite;
                }
              `}</style>
            </defs>

            {/* ========================================================
                1. ISOMETRIC ESD WORKBENCH PLINTH (Technical Dark Mat)
                ======================================================== */}
            <IsoBox
              x={0}
              y={0}
              z={0}
              dx={110}
              dy={95}
              dz={4}
              topColor="#181B22"
              leftColor="#111318"
              rightColor="#14171E"
              stroke="#333D4F"
              strokeWidth={0.75}
              origin={origin}
              scale={scale}
            />

            {/* Printed Cyan ESD Grid Hairlines on Workbench Top */}
            {(() => {
              const lines = [
                { p1: { x: 10, y: 10, z: 4.1 }, p2: { x: 100, y: 10, z: 4.1 } },
                { p1: { x: 10, y: 30, z: 4.1 }, p2: { x: 100, y: 30, z: 4.1 } },
                { p1: { x: 10, y: 50, z: 4.1 }, p2: { x: 100, y: 50, z: 4.1 } },
                { p1: { x: 10, y: 70, z: 4.1 }, p2: { x: 100, y: 70, z: 4.1 } },
                { p1: { x: 10, y: 10, z: 4.1 }, p2: { x: 10, y: 85, z: 4.1 } },
                { p1: { x: 40, y: 10, z: 4.1 }, p2: { x: 40, y: 85, z: 4.1 } },
                { p1: { x: 70, y: 10, z: 4.1 }, p2: { x: 70, y: 85, z: 4.1 } },
                { p1: { x: 100, y: 10, z: 4.1 }, p2: { x: 100, y: 85, z: 4.1 } },
              ];
              return lines.map((l, i) => {
                const s1 = project(l.p1, origin, scale);
                const s2 = project(l.p2, origin, scale);
                return (
                  <line
                    key={i}
                    x1={s1.x}
                    y1={s1.y}
                    x2={s2.x}
                    y2={s2.y}
                    stroke="rgba(15, 92, 110, 0.25)"
                    strokeWidth={0.75}
                    strokeDasharray="2,2"
                  />
                );
              });
            })()}

            {/* Coiled Teal Grounding Wrist Strap on Workbench */}
            {(() => {
              const p = project({ x: 12, y: 75, z: 4.2 }, origin, scale);
              return (
                <g transform={`translate(${p.x}, ${p.y})`}>
                  <ellipse cx="6" cy="4" rx="8" ry="4" fill="none" stroke="#00F0FF" strokeWidth="1.2" />
                  <rect x="12" y="2" width="4" height="3" fill="#FF5500" rx="0.5" />
                </g>
              );
            })()}

            {/* ========================================================
                2. WHITE LIAN LI LANCOOL 207 (OPEN BAY FACING VIEWER!)
                ======================================================== */}
            {/* Case Dimensions: Narrow width dy=22, Deep dx=45, Tall dz=48 */}
            {/* Positioned at x=22..67, y=14..36, z=4..52 */}

            {/* Chassis Back Wall & Outer Shell */}
            <IsoBox
              x={22}
              y={14}
              z={4}
              dx={45}
              dy={22}
              dz={48}
              topColor="#FFFFFF"
              leftColor="#E2E8F0"
              rightColor="#F8FAFC"
              stroke="#CBD5E1"
              strokeWidth={0.8}
              origin={origin}
              scale={scale}
            />

            {/* --- WIDE OPEN INTERIOR BAY (at y=36, facing front-right toward viewer!) --- */}
            {/* Recessed Dark Interior Chamber */}
            <IsoBox
              x={23}
              y={15}
              z={4}
              dx={43}
              dy={20.8}
              dz={47}
              topColor="#111622"
              leftColor="#0F131C"
              rightColor="#111622"
              origin={origin}
              scale={scale}
            />

            {/* White Bottom PSU Shroud (height=11, z=4..15) */}
            <IsoBox
              x={23}
              y={15}
              z={4}
              dx={43}
              dy={21}
              dz={11}
              topColor="#F1F5F9"
              leftColor="#FFFFFF"
              rightColor="#E2E8F0"
              stroke="#CBD5E1"
              strokeWidth={0.6}
              origin={origin}
              scale={scale}
            />

            {/* TWO 120mm INTAKE FANS ON TOP OF PSU SHROUD (at z=15, blowing upward) */}
            <g transform={getIsoPlaneTransform("top", { x: 30, y: 22, z: 15.2 }, origin, scale)}>
              {/* Fan 1 (Left) */}
              <circle cx="6" cy="6" r="5" fill="none" stroke={isBooted ? "#00F0FF" : "#64748B"} strokeWidth="1" />
              <g className={isBooted ? "build-fan-spin" : ""} style={{ transformOrigin: "6px 6px" }}>
                <line x1="2" y1="6" x2="10" y2="6" stroke="#FFFFFF" strokeWidth="1" />
                <line x1="6" y1="2" x2="6" y2="10" stroke="#FFFFFF" strokeWidth="1" />
              </g>
              {/* Fan 2 (Right) */}
              <circle cx="20" cy="6" r="5" fill="none" stroke={isBooted ? "#FF5500" : "#64748B"} strokeWidth="1" />
              <g className={isBooted ? "build-fan-spin" : ""} style={{ transformOrigin: "20px 6px", animationDirection: "reverse" }}>
                <line x1="16" y1="6" x2="24" y2="6" stroke="#FFFFFF" strokeWidth="1" />
                <line x1="20" y1="2" x2="20" y2="10" stroke="#FFFFFF" strokeWidth="1" />
              </g>
            </g>

            {/* Dark ATX Motherboard on Back Wall */}
            <IsoBox
              x={32}
              y={15.5}
              z={15}
              dx={32}
              dy={1}
              dz={34}
              topColor="#1E293B"
              leftColor="#1E293B"
              rightColor="#0F172A"
              origin={origin}
              scale={scale}
            />

            {/* Silver Motherboard VRM Heatsinks */}
            <IsoBox
              x={36}
              y={16.5}
              z={40}
              dx={10}
              dy={1.5}
              dz={6}
              topColor="#94A3B8"
              leftColor="#64748B"
              rightColor="#475569"
              origin={origin}
              scale={scale}
            />

            {/* Dual RAM Modules with RGB Top Bars */}
            <IsoBox
              x={48}
              y={16.5}
              z={34}
              dx={2}
              dy={1.5}
              dz={12}
              topColor={isBooted ? "#00F0FF" : "#475569"}
              leftColor="#334155"
              rightColor="#1E293B"
              origin={origin}
              scale={scale}
            />
            <IsoBox
              x={51}
              y={16.5}
              z={34}
              dx={2}
              dy={1.5}
              dz={12}
              topColor={isBooted ? "#FF5500" : "#475569"}
              leftColor="#334155"
              rightColor="#1E293B"
              origin={origin}
              scale={scale}
            />

            {/* CPU Cooler Tower Block with ARGB Ring */}
            <IsoBox
              x={38}
              y={17}
              z={28}
              dx={11}
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
            {/* CPU Fan ARGB Ring */}
            <g transform={getIsoPlaneTransform("front-right", { x: 38, y: 29.2, z: 39 }, origin, scale)}>
              <circle
                cx="5.5"
                cy="5.5"
                r="4.5"
                fill="none"
                stroke={isBooted ? "#00F0FF" : "#475569"}
                strokeWidth="1.2"
              />
            </g>

            {/* MOTHERBOARD DIAGNOSTIC POST LEDs */}
            <g transform={getIsoPlaneTransform("front-right", { x: 60, y: 17, z: 45 }, origin, scale)}>
              <circle cx="1" cy="1" r="0.8" fill={isBooted ? "#22C55E" : "#475569"} />
              <circle cx="3" cy="1" r="0.8" fill={isBooted ? "#22C55E" : "#EF4444"} />
              <circle cx="5" cy="1" r="0.8" fill={isBooted ? "#22C55E" : "#F59E0B"} />
              {isBooted && (
                <circle cx="1" cy="1" r="2.5" fill="#22C55E" className="post-led-pulse" opacity="0.6" />
              )}
            </g>

            {/* HORIZONTAL GIGABYTE RTX 5060 Ti 16GB GPU BRICK (Being seated into PCIe) */}
            <IsoBox
              x={25}
              y={18}
              z={22}
              dx={32}
              dy={14}
              dz={6}
              topColor="#1E293B"
              leftColor="#111827"
              rightColor="#141C2B"
              stroke="#334155"
              strokeWidth={0.6}
              origin={origin}
              scale={scale}
            />

            {/* PCIe Golden Finger Slot Pins */}
            <g transform={getIsoPlaneTransform("top", { x: 28, y: 18, z: 22.2 }, origin, scale)}>
              <line x1="2" y1="1" x2="22" y2="1" stroke="#F59E0B" strokeWidth="1" strokeDasharray="1,1" />
            </g>

            {/* Glowing GEFORCE RTX Side Strip */}
            <g transform={getIsoPlaneTransform("front-right", { x: 25, y: 32.2, z: 27 }, origin, scale)}>
              <rect x="2" y="1" width="18" height="3.5" fill={isBooted ? "#00F0FF" : "#334155"} rx="0.5" />
              <text x="3" y="3.4" fill={isBooted ? "#0A0C10" : "#94A3B8"} fontSize="2" fontFamily="monospace" fontWeight="bold">
                GEFORCE RTX
              </text>
            </g>

            {/* PCIe Metal Mounting Bracket at x=25 (Touching Screwdriver Tip) */}
            <IsoBox
              x={24.2}
              y={26}
              z={21}
              dx={1.2}
              dy={6}
              dz={8}
              topColor="#CBD5E1"
              leftColor="#94A3B8"
              rightColor="#A8B4C4"
              origin={origin}
              scale={scale}
            />

            {/* --- Front Narrow Mesh Face (at x=22, facing down-left) --- */}
            {/* Dual 140mm Circular ARGB Fans (Perspective-Projected on Front Face) */}
            <g
              transform={getIsoPlaneTransform(
                "front-left",
                { x: 22, y: 14, z: 52 },
                origin,
                scale
              )}
            >
              {/* White Mesh Recess (Width along Y: 22, Height down along Z: 48) */}
              <rect x="1" y="2" width="20" height="44" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="0.6" />

              {/* Upper 140mm Fan (Center: 11, 14, Radius: 7.5) */}
              <g transform="translate(11, 14)">
                <circle
                  cx="0"
                  cy="0"
                  r="7.5"
                  fill="none"
                  stroke={isBooted ? "url(#scene2Argb)" : "#94A3B8"}
                  strokeWidth="1.6"
                  opacity={isBooted ? 1 : 0.4}
                />
                <circle cx="0" cy="0" r="6.2" fill={isBooted ? "rgba(0,240,255,0.08)" : "none"} />
                <g className={isBooted ? "build-fan-spin" : ""} style={{ transformOrigin: "0 0" }}>
                  <path d="M-6,-1 C-3,-3 3,-3 6,1 C3,3 -3,3 -6,-1 Z" fill="#FFFFFF" opacity={isBooted ? 0.95 : 0.4} />
                  <path d="M-1,-6 C3,-3 3,3 -1,6 C-3,3 -3,-3 -1,-6 Z" fill="#F1F5F9" opacity={isBooted ? 0.95 : 0.4} />
                </g>
                <circle cx="0" cy="0" r="2.2" fill="#1E293B" stroke={isBooted ? "#FF5500" : "#64748B"} strokeWidth="0.6" />
              </g>

              {/* Lower 140mm Fan (Center: 11, 32, Radius: 7.5) */}
              <g transform="translate(11, 32)">
                <circle
                  cx="0"
                  cy="0"
                  r="7.5"
                  fill="none"
                  stroke={isBooted ? "url(#scene2Argb)" : "#94A3B8"}
                  strokeWidth="1.6"
                  opacity={isBooted ? 1 : 0.4}
                />
                <circle cx="0" cy="0" r="6.2" fill={isBooted ? "rgba(255,85,0,0.08)" : "none"} />
                <g className={isBooted ? "build-fan-spin" : ""} style={{ transformOrigin: "0 0", animationDirection: "reverse" }}>
                  <path d="M-6,-1 C-3,-3 3,-3 6,1 C3,3 -3,3 -6,-1 Z" fill="#FFFFFF" opacity={isBooted ? 0.95 : 0.4} />
                  <path d="M-1,-6 C3,-3 3,3 -1,6 C-3,3 -3,-3 -1,-6 Z" fill="#F1F5F9" opacity={isBooted ? 0.95 : 0.4} />
                </g>
                <circle cx="0" cy="0" r="2.2" fill="#1E293B" stroke={isBooted ? "#00F0FF" : "#64748B"} strokeWidth="0.6" />
              </g>
            </g>

            {/* ========================================================
                3. DETACHED CLEAR TEMPERED GLASS PANEL (Leaning to the right)
                ======================================================== */}
            {/* Positioned upright beside the case: x=72..86, y=20..36, z=4..46 */}
            <g opacity="0.9">
              {/* Glass Slab */}
              <IsoBox
                x={72}
                y={20}
                z={4}
                dx={14}
                dy={16}
                dz={40}
                topColor="rgba(224, 242, 254, 0.4)"
                leftColor="rgba(224, 242, 254, 0.35)"
                rightColor="rgba(224, 242, 254, 0.25)"
                stroke="rgba(255, 255, 255, 0.6)"
                strokeWidth={0.8}
                origin={origin}
                scale={scale}
              />
              {/* White Steel Top and Bottom Trim Strips */}
              <IsoBox
                x={72}
                y={20}
                z={42}
                dx={14}
                dy={16}
                dz={2}
                topColor="#FFFFFF"
                leftColor="#E2E8F0"
                rightColor="#F8FAFC"
                stroke="#CBD5E1"
                strokeWidth={0.5}
                origin={origin}
                scale={scale}
              />
              <IsoBox
                x={72}
                y={20}
                z={4}
                dx={14}
                dy={16}
                dz={2}
                topColor="#FFFFFF"
                leftColor="#E2E8F0"
                rightColor="#F8FAFC"
                stroke="#CBD5E1"
                strokeWidth={0.5}
                origin={origin}
                scale={scale}
              />
            </g>

            {/* ========================================================
                4. STANDING VOXEL GUY (Standing in front of OPEN bay!)
                ======================================================== */}
            {/* Position: x=46..58, y=46..56, z=4..54 (Looking INTO open bay) */}

            {/* White / Orange Sneakers on Mat Floor */}
            <IsoBox
              x={46}
              y={48}
              z={4}
              dx={4}
              dy={5}
              dz={3}
              topColor="#FFFFFF"
              leftColor="#FF5500"
              rightColor="#E2E8F0"
              origin={origin}
              scale={scale}
            />
            <IsoBox
              x={52}
              y={48}
              z={4}
              dx={4}
              dy={5}
              dz={3}
              topColor="#FFFFFF"
              leftColor="#FF5500"
              rightColor="#E2E8F0"
              origin={origin}
              scale={scale}
            />

            {/* Dark Slate Work Trousers (Legs standing straight) */}
            <IsoBox
              x={46.5}
              y={49}
              z={7}
              dx={3.5}
              dy={3.5}
              dz={18}
              topColor="#1F242D"
              leftColor="#141820"
              rightColor="#1A1F26"
              origin={origin}
              scale={scale}
            />
            <IsoBox
              x={52}
              y={49}
              z={7}
              dx={3.5}
              dy={3.5}
              dz={18}
              topColor="#1F242D"
              leftColor="#141820"
              rightColor="#1A1F26"
              origin={origin}
              scale={scale}
            />

            {/* Torso: Dark Navy Crew-Neck Tee (z=25..41) tilted toward case */}
            <IsoBox
              x={46}
              y={46}
              z={25}
              dx={10}
              dy={8}
              dz={16}
              topColor="#182232"
              leftColor="#111827"
              rightColor="#141C2B"
              stroke="#0A0E17"
              strokeWidth={0.6}
              origin={origin}
              scale={scale}
            />

            {/* Left Arm: Steadying the top white chassis edge (x=36, y=36, z=52) */}
            <IsoBox
              x={42}
              y={42}
              z={35}
              dx={4}
              dy={6}
              dz={4}
              topColor="#182232"
              leftColor="#111827"
              rightColor="#141C2B"
              origin={origin}
              scale={scale}
            />
            {/* Left Hand: Warm skin voxel resting on chassis top frame */}
            <IsoBox
              x={38}
              y={36}
              z={50}
              dx={4}
              dy={4}
              dz={2.5}
              topColor="#E8B490"
              leftColor="#D49B75"
              rightColor="#DE9E78"
              origin={origin}
              scale={scale}
            />

            {/* Right Arm: Extended down & forward into PCIe GPU mount */}
            <IsoBox
              x={36}
              y={38}
              z={28}
              dx={10}
              dy={8}
              dz={4}
              topColor="#182232"
              leftColor="#111827"
              rightColor="#141C2B"
              origin={origin}
              scale={scale}
            />
            {/* Right Hand: Holding Screwdriver reaching into GPU bay */}
            <IsoBox
              x={30}
              y={34}
              z={26}
              dx={4}
              dy={4}
              dz={3}
              topColor="#E8B490"
              leftColor="#D49B75"
              rightColor="#DE9E78"
              origin={origin}
              scale={scale}
            />

            {/* PRECISION MAGNETIC SCREWDRIVER */}
            {/* Safety Orange Grip Handle */}
            <IsoBox
              x={28}
              y={32}
              z={26}
              dx={3}
              dy={5}
              dz={2.5}
              topColor="#FF5500"
              leftColor="#C2410C"
              rightColor="#EA580C"
              stroke="#9A3412"
              strokeWidth={0.4}
              origin={origin}
              scale={scale}
            />
            {/* Chrome Silver Shaft reaching into PCIe Screw Bracket */}
            {(() => {
              const pStart = project({ x: 28, y: 32, z: 27 }, origin, scale);
              const pEnd = project({ x: 25, y: 28, z: 24 }, origin, scale);
              return (
                <line
                  x1={pStart.x}
                  y1={pStart.y}
                  x2={pEnd.x}
                  y2={pEnd.y}
                  stroke="#E2E8F0"
                  strokeWidth={2}
                  strokeLinecap="round"
                />
              );
            })()}

            {/* Voxel Head (Warm skin tone, tilted forward looking into case) */}
            <IsoBox
              x={47}
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

            {/* Dark Espresso Voxel Hair Blocks on top & back */}
            <IsoBox
              x={46.5}
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
              x={47.5}
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

            {/* Dark Pixel Glasses Frame on face looking down-left into the case */}
            <g transform={getIsoPlaneTransform("front-left", { x: 47, y: 52, z: 48 }, origin, scale)}>
              <rect x="0.8" y="0.8" width="3.2" height="2.5" fill="#111318" rx="0.3" />
              <rect x="4.5" y="0.8" width="3.2" height="2.5" fill="#111318" rx="0.3" />
              <line x1="4.0" y1="1.8" x2="4.5" y2="1.8" stroke="#111318" strokeWidth="0.6" />
              {/* Pupils + Catchlight */}
              <rect x="1.4" y="1.4" width="1.6" height="1.4" fill="#182232" />
              <rect x="1.6" y="1.4" width="0.6" height="0.6" fill="#FFFFFF" />
              <rect x="5.1" y="1.4" width="1.6" height="1.4" fill="#182232" />
              <rect x="5.3" y="1.4" width="0.6" height="0.6" fill="#FFFFFF" />
            </g>

            {/* ========================================================
                5. WORKBENCH ACCESSORIES (Screw Tray & GPU Box)
                ======================================================== */}
            {/* Magnetic Parts / Screw Tray (Front-Left corner) */}
            <IsoBox
              x={12}
              y={64}
              z={4}
              dx={8}
              dy={8}
              dz={1.5}
              topColor="#0F172A"
              leftColor="#020617"
              rightColor="#0B0F19"
              stroke="#334155"
              strokeWidth={0.5}
              origin={origin}
              scale={scale}
            />
            {/* Tiny Metallic Screws inside tray */}
            <g transform={getIsoPlaneTransform("top", { x: 13, y: 65, z: 5.6 }, origin, scale)}>
              <circle cx="2" cy="2" r="0.8" fill="#CBD5E1" />
              <circle cx="5" cy="3" r="0.8" fill="#CBD5E1" />
              <circle cx="3" cy="5" r="0.8" fill="#CBD5E1" />
            </g>

            {/* RTX 5060 Ti GPU Carton Packaging Box */}
            <IsoBox
              x={22}
              y={68}
              z={4}
              dx={14}
              dy={16}
              dz={10}
              topColor="#111827"
              leftColor="#0B0F19"
              rightColor="#1F2937"
              stroke="#374151"
              strokeWidth={0.5}
              origin={origin}
              scale={scale}
            />
            {/* Box GeForce Green & Silver Artwork */}
            <g transform={getIsoPlaneTransform("top", { x: 23, y: 69, z: 14.1 }, origin, scale)}>
              <rect x="1" y="1" width="12" height="4" fill="#22C55E" />
              <text x="2" y="3.6" fill="#0A0C10" fontSize="2.2" fontFamily="monospace" fontWeight="bold">
                GEFORCE RTX
              </text>
            </g>

            {/* Floating Live Boot Capability Tag when Booted */}
            {isBooted && (
              <g transform={getIsoPlaneTransform("front-right", { x: 30, y: 38, z: 62 }, origin, scale)}>
                <rect x="0" y="0" width="28" height="7" fill="#0A0E17" rx="1.5" stroke="#22C55E" strokeWidth="0.8" />
                <circle cx="3" cy="3.5" r="1.2" fill="#22C55E" className="post-led-pulse" />
                <text x="6" y="4.5" fill="#22C55E" fontSize="2.4" fontFamily="monospace" fontWeight="bold">
                  POST PASS · 61°C
                </text>
              </g>
            )}
          </svg>
        </div>

        {/* Interactive "Test Boot ⚡" Action Bar */}
        <div className="mt-2 flex items-center justify-between gap-1.5 px-2">
          <button
            type="button"
            onClick={handleToggleBoot}
            className={`w-full py-1 px-2.5 rounded-lg border font-mono text-[9.5px] uppercase tracking-label font-semibold flex items-center justify-center gap-1.5 transition-all shadow-xs ${
              isBooted
                ? "bg-[#22C55E]/15 border-[#22C55E] text-[#166534]"
                : "bg-surface border-rule-strong/40 text-ink hover:border-[#FF5500] hover:text-[#FF5500]"
            }`}
          >
            <span>{isBooted ? "⚡ POST PASS (00)" : "⚡ TEST BOOT"}</span>
            <span
              className={`size-1.5 rounded-full ${
                isBooted ? "bg-[#22C55E]" : "bg-[#FF5500]"
              }`}
            />
          </button>
        </div>
      </div>
    </aside>
  );
}
