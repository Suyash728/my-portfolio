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
 * Upgrades:
 * - Proper Human vs. PC Scale: Standing voxel builder (height=54) working at a
 *   waist-high ESD workbench table (z=0..25).
 * - White Lian Li LANCOOL 217 INF mid-tower (dz=23, dx=38, dy=20) sits at chest/waist
 *   height (~42% of human height, no giant fridge case!).
 * - Active Mid-Assembly Action:
 *   * Default: Character actively lowering/seating the horizontal RTX 5060 Ti GPU into the
 *     PCIe slot with alignment guides, right hand holding orange magnetic screwdriver on bracket.
 *   * Interactive ⚡ TEST BOOT: GPU snaps into PCIe slot, power cable connects, dual front 140mm
 *     fans + CPU stock cooler fan + dual shroud fans spin with ARGB glow, green POST OK LED pulses,
 *     and button toggles to "✓ POST OK · 16GB READY".
 * - Authentic PC-Building Props:
 *   1. Gigabyte RTX retail packaging box on workbench,
 *   2. Thin 1-unit translucent tempered-glass panel (dx=1, not a solid cube!),
 *   3. Thermal paste tube + magnetic screw tray with tiny metallic screws.
 * - Single clean "GEFORCE RTX" label (no duplicates).
 * - Tightened viewBox="20 0 440 330" (zero dead air gap).
 */

export function EdgeVisualBuilding() {
  const [isBooted, setIsBooted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Origin shifted up to y=75 to eliminate top dead air gap completely
  const origin: Point2D = { x: 225, y: 75 };
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

        {/* 2.5D Isometric Diorama SVG (Tightened Framing: viewBox="20 0 440 330") */}
        <div className="relative transition-transform duration-300 group-hover:-translate-y-1 cursor-pointer">
          <svg
            viewBox="20 0 440 330"
            className="w-full h-auto drop-shadow-md"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            shapeRendering="geometricPrecision"
          >
            <defs>
              <linearGradient id="scene2Argb" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#00F0FF" />
                <stop offset="50%" stopColor="#FF5500" />
                <stop offset="100%" stopColor="#00F0FF" />
              </linearGradient>

              <linearGradient id="thinGlass" x1="0" y1="0" x2="1" y2="1">
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
                @keyframes gpuSlotHover {
                  0%, 100% { transform: translateY(0); }
                  50% { transform: translateY(-2px); }
                }
                .build-fan-spin {
                  animation: buildSpin 1.8s linear infinite;
                }
                .post-led-pulse {
                  animation: postPing 1.2s ease-in-out infinite;
                }
                .gpu-hovering {
                  animation: gpuSlotHover 2s ease-in-out infinite;
                }
              `}</style>
            </defs>

            {/* ========================================================
                1. ISOMETRIC FLOOR PLINTH
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

            {/* Floor ambient shadow under table */}
            {(() => {
              const p1 = project({ x: 8, y: 8, z: 4.1 }, origin, scale);
              const p2 = project({ x: 100, y: 8, z: 4.1 }, origin, scale);
              const p3 = project({ x: 100, y: 46, z: 4.1 }, origin, scale);
              const p4 = project({ x: 8, y: 46, z: 4.1 }, origin, scale);
              return (
                <polygon
                  points={`${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y} ${p4.x},${p4.y}`}
                  fill="rgba(0, 0, 0, 0.28)"
                />
              );
            })()}

            {/* ========================================================
                2. WAIST-HIGH WORKBENCH / ESD TABLE (z=4..25)
                Sturdy industrial steel legs + dark ESD mat tabletop
                ======================================================== */}
            {/* 4 Steel Workbench Legs */}
            <IsoBox x={12} y={10} z={4} dx={3} dy={3} dz={18} topColor="#333D4F" leftColor="#1A202C" rightColor="#252D3D" origin={origin} scale={scale} />
            <IsoBox x={93} y={10} z={4} dx={3} dy={3} dz={18} topColor="#333D4F" leftColor="#1A202C" rightColor="#252D3D" origin={origin} scale={scale} />
            <IsoBox x={12} y={39} z={4} dx={3} dy={3} dz={18} topColor="#333D4F" leftColor="#1A202C" rightColor="#252D3D" origin={origin} scale={scale} />
            <IsoBox x={93} y={39} z={4} dx={3} dy={3} dz={18} topColor="#333D4F" leftColor="#1A202C" rightColor="#252D3D" origin={origin} scale={scale} />

            {/* Dark Technical ESD Tabletop Slab (z=22..25, waist height) */}
            <IsoBox
              x={10}
              y={8}
              z={22}
              dx={88}
              dy={36}
              dz={3}
              topColor="#1C202A"
              leftColor="#12151C"
              rightColor="#161922"
              stroke="#333D4F"
              strokeWidth={0.8}
              origin={origin}
              scale={scale}
            />

            {/* Printed Cyan ESD Grid Hairlines on Workbench Top */}
            {(() => {
              const lines = [
                { p1: { x: 12, y: 10, z: 25.1 }, p2: { x: 96, y: 10, z: 25.1 } },
                { p1: { x: 12, y: 22, z: 25.1 }, p2: { x: 96, y: 22, z: 25.1 } },
                { p1: { x: 12, y: 34, z: 25.1 }, p2: { x: 96, y: 34, z: 25.1 } },
                { p1: { x: 20, y: 10, z: 25.1 }, p2: { x: 20, y: 42, z: 25.1 } },
                { p1: { x: 62, y: 10, z: 25.1 }, p2: { x: 62, y: 42, z: 25.1 } },
                { p1: { x: 86, y: 10, z: 25.1 }, p2: { x: 86, y: 42, z: 25.1 } },
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
                    stroke="rgba(15, 92, 110, 0.3)"
                    strokeWidth={0.7}
                    strokeDasharray="2,2"
                  />
                );
              });
            })()}

            {/* ========================================================
                3. WHITE LIAN LI LANCOOL 217 INF (ON WORKBENCH, z=25..48)
                Scaled to ~42% of human height (dz=23, dx=38, dy=20)
                ======================================================== */}
            {/* Case Outer Shell */}
            <IsoBox
              x={22}
              y={14}
              z={25}
              dx={38}
              dy={20}
              dz={23}
              topColor="#FFFFFF"
              leftColor="#E2E8F0"
              rightColor="#F8FAFC"
              stroke="#CBD5E1"
              strokeWidth={0.75}
              origin={origin}
              scale={scale}
            />

            {/* --- WIDE OPEN INTERIOR BAY (at y=34, facing viewer!) --- */}
            {/* Recessed Dark Interior Chamber */}
            <IsoBox
              x={23}
              y={15}
              z={25}
              dx={36}
              dy={18.8}
              dz={22}
              topColor="#111622"
              leftColor="#0F131C"
              rightColor="#111622"
              origin={origin}
              scale={scale}
            />

            {/* White Bottom PSU Shroud (height=6, z=25..31) */}
            <IsoBox
              x={23}
              y={15}
              z={25}
              dx={36}
              dy={19}
              dz={6}
              topColor="#F1F5F9"
              leftColor="#FFFFFF"
              rightColor="#E2E8F0"
              stroke="#CBD5E1"
              strokeWidth={0.5}
              origin={origin}
              scale={scale}
            />

            {/* TWO 120mm INTAKE FANS ON TOP OF PSU SHROUD (at z=31.1, blowing upward) */}
            <g transform={getIsoPlaneTransform("top", { x: 28, y: 20, z: 31.2 }, origin, scale)}>
              <circle cx="5" cy="5" r="4" fill="none" stroke={isBooted ? "#00F0FF" : "#64748B"} strokeWidth="0.8" />
              <g className={isBooted ? "build-fan-spin" : ""} style={{ transformOrigin: "5px 5px" }}>
                <line x1="2" y1="5" x2="8" y2="5" stroke="#FFFFFF" strokeWidth="0.8" />
                <line x1="5" y1="2" x2="5" y2="8" stroke="#FFFFFF" strokeWidth="0.8" />
              </g>
              <circle cx="16" cy="5" r="4" fill="none" stroke={isBooted ? "#FF5500" : "#64748B"} strokeWidth="0.8" />
              <g className={isBooted ? "build-fan-spin" : ""} style={{ transformOrigin: "16px 5px", animationDirection: "reverse" }}>
                <line x1="13" y1="5" x2="19" y2="5" stroke="#FFFFFF" strokeWidth="0.8" />
                <line x1="16" y1="2" x2="16" y2="8" stroke="#FFFFFF" strokeWidth="0.8" />
              </g>
            </g>

            {/* Dark ATX Motherboard on Back Wall */}
            <IsoBox
              x={30}
              y={15.5}
              z={31}
              dx={28}
              dy={0.8}
              dz={16}
              topColor="#1E293B"
              leftColor="#1E293B"
              rightColor="#0F172A"
              origin={origin}
              scale={scale}
            />

            {/* Silver Motherboard VRM Heatsinks */}
            <IsoBox x={33} y={16.5} z={42} dx={8} dy={1} dz={3.5} topColor="#94A3B8" leftColor="#64748B" rightColor="#475569" origin={origin} scale={scale} />

            {/* Dual RAM Modules */}
            <IsoBox x={44} y={16.5} z={38} dx={1.5} dy={1} dz={6} topColor={isBooted ? "#00F0FF" : "#475569"} leftColor="#334155" rightColor="#1E293B" origin={origin} scale={scale} />
            <IsoBox x={46.5} y={16.5} z={38} dx={1.5} dy={1} dz={6} topColor={isBooted ? "#FF5500" : "#475569"} leftColor="#334155" rightColor="#1E293B" origin={origin} scale={scale} />

            {/* AMD Wraith Stealth Stock Circular Ring Cooler */}
            <g transform={getIsoPlaneTransform("front-right", { x: 38, y: 17, z: 42 }, origin, scale)}>
              <circle cx="3" cy="3" r="3" fill="#333D4F" stroke="#94A3B8" strokeWidth="0.6" />
              <circle cx="3" cy="3" r="1.8" fill="#1E293B" />
              <circle cx="3" cy="3" r="1.2" fill={isBooted ? "#FF5500" : "#475569"} />
            </g>

            {/* MOTHERBOARD DIAGNOSTIC POST LEDs */}
            <g transform={getIsoPlaneTransform("front-right", { x: 54, y: 16.5, z: 44 }, origin, scale)}>
              <circle cx="1" cy="1" r="0.6" fill={isBooted ? "#22C55E" : "#475569"} />
              <circle cx="2.5" cy="1" r="0.6" fill={isBooted ? "#22C55E" : "#EF4444"} />
              <circle cx="4" cy="1" r="0.6" fill={isBooted ? "#22C55E" : "#F59E0B"} />
              {isBooted && (
                <circle cx="1" cy="1" r="2" fill="#22C55E" className="post-led-pulse" opacity="0.6" />
              )}
            </g>

            {/* Motherboard PCIe x16 Slot (Gold Pins) */}
            <g transform={getIsoPlaneTransform("top", { x: 26, y: 18, z: 34 }, origin, scale)}>
              <line x1="1" y1="1" x2="20" y2="1" stroke="#F59E0B" strokeWidth="0.8" strokeDasharray="1,1" />
            </g>

            {/* ========================================================
                MID-ASSEMBLY GPU INSTALLATION ACTION:
                When not booted: GPU is hovering slightly above slot with alignment guides.
                When booted: GPU is snapped fully down into PCIe slot!
                ======================================================== */}
            {/* Alignment Guide Lines (Visible when building/unbooted) */}
            {!isBooted && (() => {
              const g1Start = project({ x: 28, y: 22, z: 38 }, origin, scale);
              const g1End = project({ x: 28, y: 22, z: 34 }, origin, scale);
              const g2Start = project({ x: 48, y: 22, z: 38 }, origin, scale);
              const g2End = project({ x: 48, y: 22, z: 34 }, origin, scale);
              return (
                <g stroke="#FF5500" strokeWidth="0.8" strokeDasharray="1.5,1.5" opacity="0.85">
                  <line x1={g1Start.x} y1={g1Start.y} x2={g1End.x} y2={g1End.y} />
                  <line x1={g2Start.x} y1={g2Start.y} x2={g2End.x} y2={g2End.y} />
                </g>
              );
            })()}

            {/* GIGABYTE RTX 5060 Ti 16GB GPU Card */}
            <g className={!isBooted ? "gpu-hovering" : ""}>
              <IsoBox
                x={25}
                y={18}
                z={isBooted ? 34 : 37.5}
                dx={26}
                dy={12}
                dz={3.8}
                topColor="#1E293B"
                leftColor="#111827"
                rightColor="#141C2B"
                stroke="#334155"
                strokeWidth={0.5}
                origin={origin}
                scale={scale}
              />
              {/* Single Clean GEFORCE RTX Logo on GPU Side */}
              <g
                transform={getIsoPlaneTransform(
                  "front-right",
                  { x: 26, y: 30.1, z: isBooted ? 37.5 : 41 },
                  origin,
                  scale
                )}
              >
                <rect x="0" y="0" width="13" height="2.5" fill={isBooted ? "#00F0FF" : "#334155"} rx="0.4" />
                <text x="1" y="1.8" fill={isBooted ? "#0A0C10" : "#94A3B8"} fontSize="1.4" fontFamily="monospace" fontWeight="bold">
                  GEFORCE RTX
                </text>
              </g>

              {/* PCIe Metal Mounting Bracket at x=24.5 */}
              <IsoBox
                x={24.2}
                y={24}
                z={isBooted ? 33 : 36.5}
                dx={1}
                dy={5}
                dz={6}
                topColor="#CBD5E1"
                leftColor="#94A3B8"
                rightColor="#A8B4C4"
                origin={origin}
                scale={scale}
              />
            </g>

            {/* PCIe Power Cable (unplugged when building, connected when booted) */}
            <g transform={getIsoPlaneTransform("front-right", { x: 44, y: 30.2, z: isBooted ? 36 : 32 }, origin, scale)}>
              <rect x="0" y="0" width="3" height="2" fill="#111827" stroke={isBooted ? "#22C55E" : "#FF5500"} strokeWidth="0.5" />
            </g>

            {/* --- Front Narrow Mesh Face (at x=22, facing down-left) --- */}
            {/* Dual 140mm Perspective-Projected Circular Fans on Front Bezel */}
            <g
              transform={getIsoPlaneTransform(
                "front-left",
                { x: 22, y: 14, z: 48 },
                origin,
                scale
              )}
            >
              <rect x="0.8" y="1" width="18.4" height="21" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="0.5" />

              {/* Upper 140mm Fan (Center: 10, 6.5, Radius: 4.2) */}
              <g transform="translate(10, 6.5)">
                <circle
                  cx="0"
                  cy="0"
                  r="4.2"
                  fill="none"
                  stroke={isBooted ? "url(#scene2Argb)" : "#94A3B8"}
                  strokeWidth="1.2"
                  opacity={isBooted ? 1 : 0.4}
                />
                <circle cx="0" cy="0" r="3.2" fill={isBooted ? "rgba(0,240,255,0.08)" : "none"} />
                <g className={isBooted ? "build-fan-spin" : ""} style={{ transformOrigin: "0 0" }}>
                  <path d="M-3.5,-0.6 C-1.8,-1.8 1.8,-1.8 3.5,0.6 C1.8,1.8 -1.8,1.8 -3.5,-0.6 Z" fill="#FFFFFF" opacity={isBooted ? 0.95 : 0.4} />
                  <path d="M-0.6,-3.5 C1.8,-1.8 1.8,1.8 -0.6,3.5 C-1.8,1.8 -1.8,-1.8 -0.6,-3.5 Z" fill="#F1F5F9" opacity={isBooted ? 0.95 : 0.4} />
                </g>
                <circle cx="0" cy="0" r="1.4" fill="#1E293B" stroke={isBooted ? "#FF5500" : "#64748B"} strokeWidth="0.5" />
              </g>

              {/* Lower 140mm Fan (Center: 10, 16.5, Radius: 4.2) */}
              <g transform="translate(10, 16.5)">
                <circle
                  cx="0"
                  cy="0"
                  r="4.2"
                  fill="none"
                  stroke={isBooted ? "url(#scene2Argb)" : "#94A3B8"}
                  strokeWidth="1.2"
                  opacity={isBooted ? 1 : 0.4}
                />
                <circle cx="0" cy="0" r="3.2" fill={isBooted ? "rgba(255,85,0,0.08)" : "none"} />
                <g className={isBooted ? "build-fan-spin" : ""} style={{ transformOrigin: "0 0", animationDirection: "reverse" }}>
                  <path d="M-3.5,-0.6 C-1.8,-1.8 1.8,-1.8 3.5,0.6 C1.8,1.8 -1.8,1.8 -3.5,-0.6 Z" fill="#FFFFFF" opacity={isBooted ? 0.95 : 0.4} />
                  <path d="M-0.6,-3.5 C1.8,-1.8 1.8,1.8 -0.6,3.5 C-1.8,1.8 -1.8,-1.8 -0.6,-3.5 Z" fill="#F1F5F9" opacity={isBooted ? 0.95 : 0.4} />
                </g>
                <circle cx="0" cy="0" r="1.4" fill="#1E293B" stroke={isBooted ? "#00F0FF" : "#64748B"} strokeWidth="0.5" />
              </g>
            </g>

            {/* ========================================================
                4. AUTHENTIC PC-BUILDING PROPS ON WORKBENCH SURFACE
                ======================================================== */}
            {/* Retail GPU Packaging Box (GIGABYTE RTX accent stripe) */}
            <IsoBox
              x={66}
              y={16}
              z={25}
              dx={18}
              dy={16}
              dz={6}
              topColor="#111827"
              leftColor="#0B0F19"
              rightColor="#1F2937"
              stroke="#374151"
              strokeWidth={0.5}
              origin={origin}
              scale={scale}
            />
            {/* Box GIGABYTE Brand Artwork on top */}
            <g transform={getIsoPlaneTransform("top", { x: 67, y: 17, z: 31.1 }, origin, scale)}>
              <rect x="0.5" y="0.5" width="14" height="3" fill="#22C55E" />
              <text x="1.5" y="2.5" fill="#0A0C10" fontSize="1.8" fontFamily="monospace" fontWeight="bold">
                GIGABYTE RTX
              </text>
            </g>

            {/* Thermal Paste Syringe Tube on bench */}
            <IsoBox x={64} y={34} z={25} dx={6} dy={1.5} dz={1.2} topColor="#94A3B8" leftColor="#64748B" rightColor="#475569" origin={origin} scale={scale} />
            <IsoBox x={70} y={34} z={25} dx={1.5} dy={1.5} dz={1.2} topColor="#00F0FF" leftColor="#0891B2" rightColor="#06B6D4" origin={origin} scale={scale} />

            {/* Magnetic Parts / Screw Tray (with tiny metallic screws) */}
            <IsoBox
              x={13}
              y={26}
              z={25}
              dx={7}
              dy={7}
              dz={1.2}
              topColor="#0F172A"
              leftColor="#020617"
              rightColor="#0B0F19"
              stroke="#334155"
              strokeWidth={0.5}
              origin={origin}
              scale={scale}
            />
            <g transform={getIsoPlaneTransform("top", { x: 14, y: 27, z: 26.3 }, origin, scale)}>
              <circle cx="1.5" cy="1.5" r="0.6" fill="#CBD5E1" />
              <circle cx="4" cy="2" r="0.6" fill="#CBD5E1" />
              <circle cx="2.5" cy="4" r="0.6" fill="#CBD5E1" />
            </g>

            {/* Thin 1-Unit Translucent Tempered Glass Panel (dx=1, NOT a thick cube!) */}
            <IsoBox
              x={88}
              y={16}
              z={22}
              dx={1}
              dy={18}
              dz={22}
              topColor="rgba(224, 242, 254, 0.45)"
              leftColor="rgba(224, 242, 254, 0.35)"
              rightColor="rgba(224, 242, 254, 0.25)"
              stroke="rgba(255, 255, 255, 0.6)"
              strokeWidth={0.6}
              origin={origin}
              scale={scale}
            />
            {/* White Steel Trim Strips on Glass */}
            <IsoBox x={88} y={16} z={42.5} dx={1} dy={18} dz={1.5} topColor="#FFFFFF" leftColor="#E2E8F0" rightColor="#F8FAFC" origin={origin} scale={scale} />
            <IsoBox x={88} y={16} z={22} dx={1} dy={18} dz={1.5} topColor="#FFFFFF" leftColor="#E2E8F0" rightColor="#F8FAFC" origin={origin} scale={scale} />

            {/* ========================================================
                5. STANDING VOXEL BUILDER (Facing open bay on workbench!)
                Standing on floor at z=4, workbench is at waist (z=25)
                ======================================================== */}
            {/* White / Orange Sneakers on Floor (z=4..7) */}
            <IsoBox x={46} y={48} z={4} dx={4} dy={5} dz={3} topColor="#FFFFFF" leftColor="#FF5500" rightColor="#E2E8F0" origin={origin} scale={scale} />
            <IsoBox x={52} y={48} z={4} dx={4} dy={5} dz={3} topColor="#FFFFFF" leftColor="#FF5500" rightColor="#E2E8F0" origin={origin} scale={scale} />

            {/* Dark Slate Work Trousers (z=7..25, standing straight) */}
            <IsoBox x={46.5} y={49} z={7} dx={3.5} dy={3.5} dz={18} topColor="#1F242D" leftColor="#141820" rightColor="#1A1F26" origin={origin} scale={scale} />
            <IsoBox x={52} y={49} z={7} dx={3.5} dy={3.5} dz={18} topColor="#1F242D" leftColor="#141820" rightColor="#1A1F26" origin={origin} scale={scale} />

            {/* Torso: Dark Navy Crew-Neck Tee (z=25..41, waist to shoulders) */}
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

            {/* Left Arm: Reaching onto workbench holding/guiding the GPU */}
            <IsoBox
              x={40}
              y={38}
              z={35}
              dx={6}
              dy={8}
              dz={3.5}
              topColor="#182232"
              leftColor="#111827"
              rightColor="#141C2B"
              origin={origin}
              scale={scale}
            />
            {/* Left Hand: Warm skin voxel holding GPU corner */}
            <IsoBox
              x={37}
              y={33}
              z={36}
              dx={3.5}
              dy={4}
              dz={2}
              topColor="#E8B490"
              leftColor="#D49B75"
              rightColor="#DE9E78"
              origin={origin}
              scale={scale}
            />

            {/* Right Arm: Extended holding Precision Screwdriver */}
            <IsoBox
              x={32}
              y={38}
              z={34}
              dx={8}
              dy={8}
              dz={3.5}
              topColor="#182232"
              leftColor="#111827"
              rightColor="#141C2B"
              origin={origin}
              scale={scale}
            />
            {/* Right Hand */}
            <IsoBox
              x={28}
              y={33}
              z={35}
              dx={3.5}
              dy={4}
              dz={2.2}
              topColor="#E8B490"
              leftColor="#D49B75"
              rightColor="#DE9E78"
              origin={origin}
              scale={scale}
            />

            {/* Precision Magnetic Screwdriver (Safety Orange Handle + Silver Shaft) */}
            <IsoBox
              x={26}
              y={31}
              z={35.5}
              dx={2.5}
              dy={4.5}
              dz={2}
              topColor="#FF5500"
              leftColor="#C2410C"
              rightColor="#EA580C"
              stroke="#9A3412"
              strokeWidth={0.4}
              origin={origin}
              scale={scale}
            />
            {(() => {
              const pStart = project({ x: 26, y: 31, z: 36.5 }, origin, scale);
              const pEnd = project({ x: 24.5, y: 26, z: isBooted ? 34 : 37.5 }, origin, scale);
              return (
                <line
                  x1={pStart.x}
                  y1={pStart.y}
                  x2={pEnd.x}
                  y2={pEnd.y}
                  stroke="#E2E8F0"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                />
              );
            })()}

            {/* Voxel Head (Warm skin tone, tilted down looking into case) */}
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

            {/* Dark Espresso Voxel Hair Blocks */}
            <IsoBox x={46.5} y={45} z={49} dx={9} dy={8} dz={3.5} topColor="#26211D" leftColor="#181512" rightColor="#1E1A16" origin={origin} scale={scale} />
            <IsoBox x={47.5} y={44} z={52} dx={5} dy={4} dz={2.5} topColor="#332B25" leftColor="#1E1A16" rightColor="#28221D" origin={origin} scale={scale} />

            {/* Clean Dark Pixel Glasses Frame on face looking into case */}
            <g transform={getIsoPlaneTransform("front-left", { x: 47, y: 52, z: 48 }, origin, scale)}>
              <rect x="0.8" y="0.8" width="3.2" height="2.5" fill="#111318" rx="0.3" />
              <rect x="4.5" y="0.8" width="3.2" height="2.5" fill="#111318" rx="0.3" />
              <line x1="4.0" y1="1.8" x2="4.5" y2="1.8" stroke="#111318" strokeWidth="0.6" />
              <rect x="1.4" y="1.4" width="1.6" height="1.4" fill="#182232" />
              <rect x="1.6" y="1.4" width="0.6" height="0.6" fill="#FFFFFF" />
              <rect x="5.1" y="1.4" width="1.6" height="1.4" fill="#182232" />
              <rect x="5.3" y="1.4" width="0.6" height="0.6" fill="#FFFFFF" />
            </g>

            {/* Floating Live Boot Capability Tag when Booted */}
            {isBooted && (
              <g transform={getIsoPlaneTransform("front-right", { x: 30, y: 34, z: 53 }, origin, scale)}>
                <rect x="0" y="0" width="28" height="6.5" fill="#0A0E17" rx="1.5" stroke="#22C55E" strokeWidth="0.8" />
                <circle cx="3" cy="3.2" r="1.2" fill="#22C55E" className="post-led-pulse" />
                <text x="6" y="4.2" fill="#22C55E" fontSize="2.2" fontFamily="monospace" fontWeight="bold">
                  POST OK · 16GB READY
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
            className={`w-full py-1.5 px-2.5 rounded-lg border font-mono text-[9.5px] uppercase tracking-label font-semibold flex items-center justify-center gap-1.5 transition-all shadow-xs ${
              isBooted
                ? "bg-[#22C55E]/15 border-[#22C55E] text-[#166534]"
                : "bg-surface border-rule-strong/40 text-ink hover:border-[#FF5500] hover:text-[#FF5500]"
            }`}
          >
            <span>{isBooted ? "✓ POST OK · 16GB READY" : "⚡ TEST BOOT"}</span>
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
