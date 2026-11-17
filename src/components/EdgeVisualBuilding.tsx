"use client";

import React, { useState } from "react";
import { sound } from "@/lib/sound";
import {
  IsoBox,
  project,
  Point2D,
  Point3D,
} from "./isoPrimitives";

/**
 * Edge Visual 2: "Building the White Rig — Exploded-View Assembly"
 *
 * Surgical Fixes:
 * 1. ZERO Leader Line Touching Face: CPU/RAM anchor routes UP-RIGHT away from character.
 * 2. True 5-Sided 3D White Lian Li LANCOOL 217 INF Chassis:
 *    - White bottom base + ventilated PSU shroud (with dual 120mm reverse fans)
 *    - White rear spine wall (narrow back face)
 *    - Dark recessed ATX motherboard tray
 *    - Solid white top roof panel with dark magnetic mesh dust-filter strip
 *    - White front mesh bezel with TWO stacked 140mm ARGB fans (spinning in Online mode)
 * 3. Character with Two Visible Voxel Arms:
 *    - Stands at front-left of bench beside the open side bay (NOT trapped behind back wall)
 *    - Holds orange precision screwdriver reaching toward PCIe bracket in Build mode
 *    - Relaxes with satisfied thumbs-up pose in Online mode
 * 4. Grounded Glass Panel in Build Mode:
 *    - Laid flat on teal ESD mat with 4 corner rubber grommets (zero clipping)
 * 5. High-contrast crisp HTML overlay badges (exact 11px CSS size, immune to SVG zoom)
 * 6. +25% Zoom Scale (scale=3.25, viewBox="0 0 450 350", zero dead air)
 */

export function EdgeVisualBuilding() {
  const [isBooted, setIsBooted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Calibrated origin and scale for +25% zoom
  const origin: Point2D = { x: 215, y: 110 };
  const scale = 3.25;

  const handleToggleBoot = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playSwitch();
    if (!isBooted) {
      setTimeout(() => sound.playClick(), 180);
    }
    setIsBooted((prev) => !prev);
  };

  // Helper to project point with current origin and scale
  const p = (pt: Point3D): Point2D => project(pt, origin, scale);

  // Anchor Coordinates for 3D Components
  // 1. CPU Cooler inside motherboard: x=52, y=17, z=32
  const cpuAnchor = p({ x: 52, y: 17, z: 32 });
  // 2. GPU: x=54, y=44 (build) or y=20 (online), z=25.5
  const gpuAnchor = p(
    isBooted ? { x: 54, y: 21, z: 25.5 } : { x: 54, y: 44, z: 25.5 }
  );
  // 3. Airflow / Front Fans or Glass Pane:
  const glassAnchor = p(
    isBooted ? { x: 75, y: 25, z: 28 } : { x: 62, y: 41, z: 15.5 }
  );

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
        {/* Subtle Header Badge */}
        <div className="flex items-center justify-between mb-2 px-1">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border bg-surface/95 px-2.5 py-0.5 font-narrow text-[10px] uppercase tracking-eyebrow shadow-xs backdrop-blur-xs transition-colors ${
              isBooted
                ? "border-[#22C55E]/40 text-[#16A34A] bg-[#22C55E]/10 font-semibold"
                : isHovered
                ? "border-[#FF5500] text-[#FF5500]"
                : "border-rule text-ink"
            }`}
          >
            <span
              className={`size-1.5 rounded-full ${
                isBooted ? "bg-[#22C55E] animate-ping" : "bg-[#FF5500] animate-pulse"
              }`}
            />
            {isBooted ? "✓ Custom Rig Online" : "🔧 Hands-On PC Build"}
          </span>
          <span className="font-mono text-[9.5px] text-muted tabular-nums">
            {isBooted ? "0.0 GB Offload" : "White Lancool 217 INF"}
          </span>
        </div>

        {/* Outer Visual Container with SVG Diorama + Crisp HTML Overlay Badges */}
        <div className="relative transition-transform duration-300 group-hover:-translate-y-1 cursor-pointer">
          <svg
            viewBox="0 0 450 350"
            className="w-full h-auto drop-shadow-md"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            shapeRendering="geometricPrecision"
          >
            <defs>
              <linearGradient id="frontFanArgbUpper" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#00F0FF" />
                <stop offset="50%" stopColor="#FF5500" />
                <stop offset="100%" stopColor="#00F0FF" />
              </linearGradient>

              <linearGradient id="frontFanArgbLower" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FF5500" />
                <stop offset="50%" stopColor="#00F0FF" />
                <stop offset="100%" stopColor="#FF5500" />
              </linearGradient>

              <linearGradient id="glassSpecular" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="rgba(224, 242, 254, 0.45)" />
                <stop offset="35%" stopColor="rgba(255, 255, 255, 0.25)" />
                <stop offset="70%" stopColor="rgba(15, 92, 110, 0.15)" />
                <stop offset="100%" stopColor="rgba(224, 242, 254, 0.35)" />
              </linearGradient>

              <style>{`
                @keyframes fanSpinAnim {
                  from { transform: rotate(0deg); }
                  to { transform: rotate(360deg); }
                }
                @keyframes orangeRailDash {
                  to { stroke-dashoffset: -14; }
                }
                @keyframes postGlowPulse {
                  0%, 100% { opacity: 0.5; filter: drop-shadow(0 0 2px #22C55E); }
                  50% { opacity: 1; filter: drop-shadow(0 0 6px #22C55E); }
                }
                .fan-spin-running {
                  animation: fanSpinAnim 1.4s linear infinite;
                }
                .guide-rail-anim {
                  animation: orangeRailDash 0.75s linear infinite;
                }
                .post-led-glow {
                  animation: postGlowPulse 1.2s ease-in-out infinite;
                }
              `}</style>
            </defs>

            {/* ========================================================
                1. WORKBENCH LEGS (Industrial Slate Steel)
                Table size: x: 10..88 (dx=78), y: 12..46 (dy=34), z: 0..15
                ======================================================== */}
            <IsoBox x={12} y={13} z={0} dx={3} dy={3} dz={12} topColor="#475569" leftColor="#1E293B" rightColor="#334155" origin={origin} scale={scale} />
            <IsoBox x={84} y={13} z={0} dx={3} dy={3} dz={12} topColor="#475569" leftColor="#1E293B" rightColor="#334155" origin={origin} scale={scale} />
            <IsoBox x={12} y={42} z={0} dx={3} dy={3} dz={12} topColor="#475569" leftColor="#1E293B" rightColor="#334155" origin={origin} scale={scale} />
            <IsoBox x={84} y={42} z={0} dx={3} dy={3} dz={12} topColor="#475569" leftColor="#1E293B" rightColor="#334155" origin={origin} scale={scale} />

            {/* Crossbeam support rails */}
            <IsoBox x={12} y={15} z={2} dx={2.5} dy={28} dz={2} topColor="#475569" leftColor="#1E293B" rightColor="#334155" origin={origin} scale={scale} />
            <IsoBox x={84.5} y={15} z={2} dx={2.5} dy={28} dz={2} topColor="#475569" leftColor="#1E293B" rightColor="#334155" origin={origin} scale={scale} />

            {/* ========================================================
                2. WARM BIRCH BUTCHER-BLOCK WORKBENCH SLAB (z=12..15)
                #EFE6D5 top, #DECfb6 left, #C7B293 right
                ======================================================== */}
            <IsoBox
              x={10}
              y={12}
              z={12}
              dx={78}
              dy={34}
              dz={3}
              topColor="#EFE6D5"
              leftColor="#DECfb6"
              rightColor="#C7B293"
              stroke="#BFA98A"
              strokeWidth={0.8}
              origin={origin}
              scale={scale}
            />

            {/* ========================================================
                3. TEAL ANTI-STATIC ESD MAT (#0F5C6E / #134E4A)
                Sitting on table at z=15.1 with white grid hairlines
                ======================================================== */}
            <IsoBox
              x={18}
              y={14}
              z={15}
              dx={68}
              dy={30}
              dz={0.4}
              topColor="#0F5C6E"
              leftColor="#0A414E"
              rightColor="#0D4F5E"
              stroke="#134E4A"
              strokeWidth={0.7}
              origin={origin}
              scale={scale}
            />

            {/* ESD Grid Lines */}
            {(() => {
              const gridLines = [
                { p1: { x: 20, y: 20, z: 15.5 }, p2: { x: 84, y: 20, z: 15.5 } },
                { p1: { x: 20, y: 28, z: 15.5 }, p2: { x: 84, y: 28, z: 15.5 } },
                { p1: { x: 20, y: 36, z: 15.5 }, p2: { x: 84, y: 36, z: 15.5 } },
                { p1: { x: 20, y: 42, z: 15.5 }, p2: { x: 84, y: 42, z: 15.5 } },
                { p1: { x: 30, y: 15, z: 15.5 }, p2: { x: 30, y: 43, z: 15.5 } },
                { p1: { x: 44, y: 15, z: 15.5 }, p2: { x: 44, y: 43, z: 15.5 } },
                { p1: { x: 74, y: 15, z: 15.5 }, p2: { x: 74, y: 43, z: 15.5 } },
              ];
              return gridLines.map((l, i) => {
                const s1 = p(l.p1);
                const s2 = p(l.p2);
                return (
                  <line
                    key={`esd-${i}`}
                    x1={s1.x}
                    y1={s1.y}
                    x2={s2.x}
                    y2={s2.y}
                    stroke="rgba(255, 255, 255, 0.2)"
                    strokeWidth={0.65}
                    strokeDasharray="2,2"
                  />
                );
              });
            })()}

            {/* ESD Grounding Snap Stud (Yellow/Brass) */}
            {(() => {
              const snap = p({ x: 20, y: 16, z: 15.6 });
              return (
                <g>
                  <circle cx={snap.x} cy={snap.y} r={2.5} fill="#EAB308" stroke="#CA8A04" strokeWidth={0.6} />
                  <circle cx={snap.x} cy={snap.y} r={1.2} fill="#78350F" />
                </g>
              );
            })()}

            {/* Gigabyte RTX Retail Box (Far-right of bench, x=76..87, y=14..22) */}
            <IsoBox
              x={76}
              y={14}
              z={15.5}
              dx={11}
              dy={7}
              dz={8}
              topColor="#111827"
              leftColor="#1F2937"
              rightColor="#0B0F17"
              stroke="#374151"
              strokeWidth={0.6}
              origin={origin}
              scale={scale}
            />
            {/* Box Accent Eye */}
            {(() => {
              const pt = p({ x: 81.5, y: 21.1, z: 19.5 });
              return (
                <text
                  x={pt.x}
                  y={pt.y}
                  fill="#FF5500"
                  fontSize="4"
                  fontWeight="bold"
                  fontFamily="monospace"
                  textAnchor="middle"
                >
                  RTX 5060Ti
                </text>
              );
            })()}

            {/* Magnetic Screw Tray & Paste (Front-left) */}
            <IsoBox x={19} y={35} z={15.5} dx={5} dy={5} dz={1} topColor="#475569" leftColor="#334155" rightColor="#1E293B" origin={origin} scale={scale} />
            <IsoBox x={21} y={31} z={15.5} dx={6} dy={1.2} dz={1.2} topColor="#94A3B8" leftColor="#64748B" rightColor="#CBD5E1" origin={origin} scale={scale} />

            {/* ========================================================
                4. TEMPERED GLASS PANEL (LAID FLAT IN BUILD MODE!)
                Grounded on teal mat at x=52..74, y=36..44, z=15.3 (dz=0.5)
                ======================================================== */}
            {!isBooted && (
              <g>
                <IsoBox
                  x={50}
                  y={36}
                  z={15.3}
                  dx={24}
                  dy={8}
                  dz={0.5}
                  topColor="rgba(224, 242, 254, 0.45)"
                  leftColor="rgba(15, 92, 110, 0.3)"
                  rightColor="rgba(255, 255, 255, 0.5)"
                  stroke="rgba(255, 255, 255, 0.7)"
                  strokeWidth={0.6}
                  origin={origin}
                  scale={scale}
                />
                {/* 4 Rubber Corner Grommets */}
                {(() => {
                  const g1 = p({ x: 51, y: 37, z: 15.9 });
                  const g2 = p({ x: 73, y: 37, z: 15.9 });
                  const g3 = p({ x: 73, y: 43, z: 15.9 });
                  const g4 = p({ x: 51, y: 43, z: 15.9 });
                  return (
                    <g>
                      <circle cx={g1.x} cy={g1.y} r={1.5} fill="#1E293B" />
                      <circle cx={g2.x} cy={g2.y} r={1.5} fill="#1E293B" />
                      <circle cx={g3.x} cy={g3.y} r={1.5} fill="#1E293B" />
                      <circle cx={g4.x} cy={g4.y} r={1.5} fill="#1E293B" />
                    </g>
                  );
                })()}
              </g>
            )}

            {/* ========================================================
                5. STANDING VOXEL BUILDER WITH TWO VISIBLE ARMS
                Positioned at front-left of bench (x=21..29, y=28..36, z=0..46)
                Turned 3/4 toward open side bay! ZERO OCCLUSION!
                ======================================================== */}
            {/* White & Orange Sneakers */}
            <IsoBox x={22} y={29} z={0} dx={3.2} dy={4.2} dz={2.5} topColor="#FFFFFF" leftColor="#FF5500" rightColor="#E2E8F0" origin={origin} scale={scale} />
            <IsoBox x={26.5} y={29} z={0} dx={3.2} dy={4.2} dz={2.5} topColor="#FFFFFF" leftColor="#FF5500" rightColor="#E2E8F0" origin={origin} scale={scale} />

            {/* Dark Slate Work Trousers (z=2.5..16) */}
            <IsoBox x={22.5} y={29.5} z={2.5} dx={2.8} dy={2.8} dz={13.5} topColor="#334155" leftColor="#1E293B" rightColor="#273344" origin={origin} scale={scale} />
            <IsoBox x={26.5} y={29.5} z={2.5} dx={2.8} dy={2.8} dz={13.5} topColor="#334155" leftColor="#1E293B" rightColor="#273344" origin={origin} scale={scale} />

            {/* Navy Crewneck Torso (z=16..29) */}
            <IsoBox
              x={22}
              y={29}
              z={16}
              dx={7.5}
              dy={4.8}
              dz={13}
              topColor="#1E293B"
              leftColor="#0F172A"
              rightColor="#1E2638"
              stroke="#334155"
              strokeWidth={0.6}
              origin={origin}
              scale={scale}
            />

            {/* Left Arm (Resting on workbench mat at z=15..20) */}
            <IsoBox x={20.8} y={32} z={20} dx={2.2} dy={2.5} dz={8} topColor="#1E293B" leftColor="#0F172A" rightColor="#1E2638" origin={origin} scale={scale} />
            <IsoBox x={22} y={34} z={15.5} dx={3} dy={2.5} dz={2} topColor="#FDDFB5" leftColor="#E8BE92" rightColor="#F5CF9F" origin={origin} scale={scale} />

            {/* Right Arm: Active Tool Arm! */}
            {!isBooted ? (
              // BUILD MODE: Right Arm reaching forward holding orange precision screwdriver!
              <g>
                {/* Upper arm in navy sleeve */}
                <IsoBox x={28} y={30} z={22} dx={4} dy={2.5} dz={3} topColor="#1E293B" leftColor="#0F172A" rightColor="#1E2638" origin={origin} scale={scale} />
                {/* Forearm in warm skin reaching toward PCIe bracket */}
                <IsoBox x={32} y={30.5} z={22.5} dx={6} dy={2.2} dz={2.2} topColor="#FDDFB5" leftColor="#E8BE92" rightColor="#F5CF9F" origin={origin} scale={scale} />
                {/* Right hand */}
                <IsoBox x={38} y={30.8} z={22.8} dx={2.4} dy={2.2} dz={2.2} topColor="#FDDFB5" leftColor="#E8BE92" rightColor="#F5CF9F" origin={origin} scale={scale} />
                {/* Precision Screwdriver: Orange Handle */}
                <IsoBox x={40.4} y={31.2} z={23.2} dx={3.2} dy={1.2} dz={1.2} topColor="#FF5500" leftColor="#CC4400" rightColor="#E64D00" origin={origin} scale={scale} />
                {/* Screwdriver: Silver Magnetic Tip pointing to rear PCIe slot bracket */}
                <IsoBox x={43.6} y={31.4} z={23.4} dx={2.2} dy={0.7} dz={0.7} topColor="#E2E8F0" leftColor="#94A3B8" rightColor="#CBD5E1" origin={origin} scale={scale} />
              </g>
            ) : (
              // ONLINE MODE: Relaxed right arm with thumbs-up satisfied pose!
              <g>
                <IsoBox x={28} y={30} z={20} dx={2.5} dy={2.5} dz={8} topColor="#1E293B" leftColor="#0F172A" rightColor="#1E2638" origin={origin} scale={scale} />
                {/* Forearm and thumbs-up hand */}
                <IsoBox x={29} y={32} z={19} dx={2.5} dy={2.5} dz={3} topColor="#FDDFB5" leftColor="#E8BE92" rightColor="#F5CF9F" origin={origin} scale={scale} />
                {/* Thumbs-up thumb */}
                <IsoBox x={30.5} y={32} z={21.5} dx={1} dy={1} dz={1.5} topColor="#FDDFB5" leftColor="#E8BE92" rightColor="#F5CF9F" origin={origin} scale={scale} />
              </g>
            )}

            {/* Neck */}
            <IsoBox x={24.2} y={30} z={29} dx={2.8} dy={2.5} dz={2.5} topColor="#FDDFB5" leftColor="#E8BE92" rightColor="#F5CF9F" origin={origin} scale={scale} />

            {/* Head (Facing front-right toward the PC case) */}
            <IsoBox
              x={22.8}
              y={28.5}
              z={31.5}
              dx={5.6}
              dy={5}
              dz={6.2}
              topColor="#FDDFB5"
              leftColor="#E8BE92"
              rightColor="#F5CF9F"
              stroke="#D4A373"
              strokeWidth={0.5}
              origin={origin}
              scale={scale}
            />

            {/* Minimalist Glasses on Face */}
            {(() => {
              const g1 = p({ x: 26.5, y: 33.6, z: 35.5 });
              const g2 = p({ x: 28.2, y: 33.6, z: 35.5 });
              const g3 = p({ x: 26.5, y: 33.6, z: 34.2 });
              const g4 = p({ x: 28.2, y: 33.6, z: 34.2 });
              return (
                <g>
                  <line x1={g1.x} y1={g1.y} x2={g2.x} y2={g2.y} stroke="#1E293B" strokeWidth={1.5} strokeLinecap="round" />
                  <line x1={g3.x} y1={g3.y} x2={g4.x} y2={g4.y} stroke="#0F172A" strokeWidth={1} />
                </g>
              );
            })()}

            {/* Dark Spiky Swept-Up Hair */}
            <IsoBox x={22.4} y={28} z={37} dx={6.4} dy={5.6} dz={3} topColor="#241C18" leftColor="#181310" rightColor="#201814" origin={origin} scale={scale} />
            <IsoBox x={23.5} y={29.5} z={39.8} dx={4.2} dy={3.5} dz={1.8} topColor="#2C221D" leftColor="#181310" rightColor="#241C18" origin={origin} scale={scale} />

            {/* ========================================================
                6. 5-SIDED 3D WHITE LANCOOL 217 INF PC CHASSIS
                Dimensions: x: 44..76 (dx=32), y: 16..34 (dy=18), z: 15..41 (dz=26)
                ======================================================== */}
            {/* White Rubber Padded Feet */}
            <IsoBox x={46} y={18} z={15} dx={2.5} dy={2.5} dz={1.2} topColor="#E2E8F0" leftColor="#CBD5E1" rightColor="#94A3B8" origin={origin} scale={scale} />
            <IsoBox x={72} y={18} z={15} dx={2.5} dy={2.5} dz={1.2} topColor="#E2E8F0" leftColor="#CBD5E1" rightColor="#94A3B8" origin={origin} scale={scale} />
            <IsoBox x={46} y={31} z={15} dx={2.5} dy={2.5} dz={1.2} topColor="#E2E8F0" leftColor="#CBD5E1" rightColor="#94A3B8" origin={origin} scale={scale} />
            <IsoBox x={72} y={31} z={15} dx={2.5} dy={2.5} dz={1.2} topColor="#E2E8F0" leftColor="#CBD5E1" rightColor="#94A3B8" origin={origin} scale={scale} />

            {/* Rear Spine Wall (Back-Left Narrow Face at x=44) */}
            <IsoBox
              x={43.5}
              y={16}
              z={16.2}
              dx={1.5}
              dy={18}
              dz={24}
              topColor="#FFFFFF"
              leftColor="#E2E8F0"
              rightColor="#CBD5E1"
              stroke="#CBD5E1"
              strokeWidth={0.6}
              origin={origin}
              scale={scale}
            />

            {/* Motherboard Back Wall (Back Interior Wall at y=16) */}
            <IsoBox
              x={44.8}
              y={16}
              z={16.2}
              dx={29.5}
              dy={1}
              dz={24}
              topColor="#0F141C"
              leftColor="#0F141C"
              rightColor="#1A202C"
              origin={origin}
              scale={scale}
            />

            {/* White Ventilated PSU Shroud (Bottom Chamber, z=16.2..22.5) */}
            <IsoBox
              x={44.8}
              y={16.8}
              z={16.2}
              dx={29.5}
              dy={16.5}
              dz={6.3}
              topColor="#FFFFFF"
              leftColor="#F8FAFC"
              rightColor="#E2E8F0"
              stroke="#CBD5E1"
              strokeWidth={0.6}
              origin={origin}
              scale={scale}
            />
            {/* Dual 120mm Reverse Fans on Shroud Top */}
            {(() => {
              const sf1 = p({ x: 53, y: 25, z: 22.6 });
              const sf2 = p({ x: 67, y: 25, z: 22.6 });
              return (
                <g>
                  <ellipse cx={sf1.x} cy={sf1.y} rx={4.5} ry={2.4} fill="#F1F5F9" stroke="#CBD5E1" strokeWidth={0.5} />
                  <ellipse cx={sf2.x} cy={sf2.y} rx={4.5} ry={2.4} fill="#F1F5F9" stroke="#CBD5E1" strokeWidth={0.5} />
                </g>
              );
            })()}

            {/* ATX Motherboard PCB (x=46..72, y=17.2, z=22.8..38.8) */}
            <IsoBox
              x={46}
              y={17.2}
              z={22.8}
              dx={26}
              dy={0.8}
              dz={16}
              topColor="#0F141C"
              leftColor="#0F141C"
              rightColor="#1E2530"
              stroke="#2D3748"
              strokeWidth={0.5}
              origin={origin}
              scale={scale}
            />

            {/* Printed Gold Circuit Traces on Motherboard */}
            {(() => {
              const t1 = p({ x: 49, y: 18.1, z: 34 });
              const t2 = p({ x: 54, y: 18.1, z: 34 });
              const t3 = p({ x: 54, y: 18.1, z: 29 });
              const t4 = p({ x: 62, y: 18.1, z: 29 });
              return (
                <polyline
                  points={`${t1.x},${t1.y} ${t2.x},${t2.y} ${t3.x},${t3.y} ${t4.x},${t4.y}`}
                  stroke="#EAB308"
                  strokeWidth={0.6}
                  strokeDasharray="3,2"
                  opacity={0.5}
                />
              );
            })()}

            {/* Circular AMD Wraith Stealth Stock Cooler (x=52, z=32) */}
            {(() => {
              const cooler = p({ x: 52, y: 18.2, z: 32 });
              return (
                <g>
                  {/* Outer shroud ring */}
                  <circle cx={cooler.x} cy={cooler.y} r={6.8} fill="#1E293B" stroke="#475569" strokeWidth={1} />
                  {/* Circular fan hub & blades */}
                  <circle
                    cx={cooler.x}
                    cy={cooler.y}
                    r={5}
                    fill="#0F172A"
                    stroke={isBooted ? "#FF5500" : "#334155"}
                    strokeWidth={0.8}
                    className={isBooted ? "fan-spin-running" : ""}
                  />
                  {/* Center AMD logo ring */}
                  <circle cx={cooler.x} cy={cooler.y} r={1.6} fill="#FF5500" />
                </g>
              );
            })()}

            {/* 2 Lit DDR4 RAM Sticks (x=60, 62, z=27..36) */}
            <IsoBox
              x={59.5}
              y={18}
              z={27}
              dx={1.2}
              dy={1.5}
              dz={9}
              topColor={isBooted ? "#00F0FF" : "#475569"}
              leftColor="#1E293B"
              rightColor="#334155"
              stroke="#64748B"
              strokeWidth={0.4}
              origin={origin}
              scale={scale}
            />
            <IsoBox
              x={61.5}
              y={18}
              z={27}
              dx={1.2}
              dy={1.5}
              dz={9}
              topColor={isBooted ? "#FF5500" : "#475569"}
              leftColor="#1E293B"
              rightColor="#334155"
              stroke="#64748B"
              strokeWidth={0.4}
              origin={origin}
              scale={scale}
            />

            {/* PCIe 4.0 x16 Slot (x=46..66, z=23.5) ABOVE PSU SHROUD */}
            <IsoBox
              x={46}
              y={18.5}
              z={23.5}
              dx={20}
              dy={2}
              dz={1.2}
              topColor={isBooted ? "#1E293B" : "#00F0FF"}
              leftColor="#0F172A"
              rightColor="#1E293B"
              stroke={isBooted ? "#475569" : "#00F0FF"}
              strokeWidth={0.6}
              origin={origin}
              scale={scale}
            />

            {/* Motherboard Diagnostic POST LED (x=68, z=36) */}
            {(() => {
              const led = p({ x: 67, y: 18.2, z: 36 });
              return (
                <circle
                  cx={led.x}
                  cy={led.y}
                  r={1.8}
                  fill={isBooted ? "#22C55E" : "#EAB308"}
                  className={isBooted ? "post-led-glow" : ""}
                />
              );
            })()}

            {/* ========================================================
                7. GIGABYTE RTX 5060 Ti 16GB GPU
                State A (Build): Hovering at z=23.5..28.5, y=43..48 with guide rails!
                State B (Online): Seated in PCIe slot at z=23.5..28.5, y=19..24!
                ======================================================== */}
            {/* Pulsing Orange Alignment Guide Rails (Build Mode) */}
            {!isBooted && (() => {
              const pSlotL = p({ x: 48, y: 19.5, z: 24.5 });
              const pGpuL = p({ x: 48, y: 43, z: 24.5 });
              const pSlotM = p({ x: 56, y: 19.5, z: 24.5 });
              const pGpuM = p({ x: 56, y: 43, z: 24.5 });
              const pSlotR = p({ x: 64, y: 19.5, z: 24.5 });
              const pGpuR = p({ x: 64, y: 43, z: 24.5 });

              return (
                <g>
                  {/* Left Rail */}
                  <line x1={pSlotL.x} y1={pSlotL.y} x2={pGpuL.x} y2={pGpuL.y} stroke="#FF5500" strokeWidth={1.2} strokeDasharray="3,3" className="guide-rail-anim" />
                  {/* Center Rail */}
                  <line x1={pSlotM.x} y1={pSlotM.y} x2={pGpuM.x} y2={pGpuM.y} stroke="#FF5500" strokeWidth={1.4} strokeDasharray="4,3" className="guide-rail-anim" />
                  {/* Right Rail */}
                  <line x1={pSlotR.x} y1={pSlotR.y} x2={pGpuR.x} y2={pGpuR.y} stroke="#FF5500" strokeWidth={1.2} strokeDasharray="3,3" className="guide-rail-anim" />
                  {/* Alignment Arrow pointing to PCIe slot */}
                  <polygon
                    points={`${pSlotM.x},${pSlotM.y} ${pSlotM.x - 3},${pSlotM.y + 4} ${pSlotM.x + 3},${pSlotM.y + 4}`}
                    fill="#FF5500"
                  />
                </g>
              );
            })()}

            {/* GPU Shroud Box (Mid-motherboard Z: 23.5..28.5) */}
            <IsoBox
              x={45}
              y={isBooted ? 20 : 43}
              z={23.5}
              dx={22}
              dy={5}
              dz={5}
              topColor="#1F2937"
              leftColor="#111827"
              rightColor="#0B0F17"
              stroke="#4B5563"
              strokeWidth={0.7}
              origin={origin}
              scale={scale}
            />

            {/* Gold PCIe x16 contacts on bottom edge (Build mode) */}
            {!isBooted && (
              <IsoBox
                x={47}
                y={43}
                z={22.5}
                dx={17}
                dy={1}
                dz={1}
                topColor="#EAB308"
                leftColor="#CA8A04"
                rightColor="#F59E0B"
                origin={origin}
                scale={scale}
              />
            )}

            {/* Silver Metal Bracket at Left End of GPU */}
            <IsoBox
              x={44.2}
              y={isBooted ? 20 : 43}
              z={22.5}
              dx={1}
              dy={5}
              dz={7}
              topColor="#E2E8F0"
              leftColor="#CBD5E1"
              rightColor="#94A3B8"
              origin={origin}
              scale={scale}
            />

            {/* Dual Fans on GPU Shroud Face */}
            {(() => {
              const gy = isBooted ? 25.1 : 48.1;
              const gz = 26;
              const f1 = p({ x: 50.5, y: gy, z: gz });
              const f2 = p({ x: 60.5, y: gy, z: gz });
              return (
                <g>
                  {/* Fan 1 */}
                  <circle cx={f1.x} cy={f1.y} r={isBooted ? 3.6 : 4.4} fill="#111827" stroke="#374151" strokeWidth={0.8} className={isBooted ? "fan-spin-running" : ""} />
                  {/* Fan 2 */}
                  <circle cx={f2.x} cy={f2.y} r={isBooted ? 3.6 : 4.4} fill="#111827" stroke="#374151" strokeWidth={0.8} className={isBooted ? "fan-spin-running" : ""} />
                  {/* Copper Heatpipe Line */}
                  <line x1={f1.x} y1={f1.y + 3} x2={f2.x} y2={f2.y + 3} stroke="#D97706" strokeWidth={1} />
                </g>
              );
            })()}

            {/* White/Cyan GEFORCE RTX Side Strip */}
            {(() => {
              const lbl = p({
                x: 56,
                y: isBooted ? 21 : 44,
                z: 28.6,
              });
              return (
                <text
                  x={lbl.x}
                  y={lbl.y}
                  fill={isBooted ? "#00F0FF" : "#FFFFFF"}
                  fontSize="4.2"
                  fontWeight="bold"
                  fontFamily="monospace"
                  textAnchor="middle"
                  letterSpacing="0.5"
                >
                  GEFORCE RTX
                </text>
              );
            })()}

            {/* 12V-2x6 Power Cable (Plugs in when Online) */}
            {isBooted && (() => {
              const plug = p({ x: 56, y: 21, z: 28.5 });
              const cableBack = p({ x: 56, y: 17, z: 26 });
              return (
                <g>
                  <rect x={plug.x - 2.5} y={plug.y - 2.5} width={5} height={3} fill="#F8FAFC" stroke="#CBD5E1" strokeWidth={0.5} />
                  <path d={`M ${plug.x} ${plug.y} Q ${plug.x - 2} ${plug.y - 4} ${cableBack.x} ${cableBack.y}`} stroke="#E2E8F0" strokeWidth={2} fill="none" />
                </g>
              );
            })()}

            {/* ========================================================
                8. WHITE FRONT MESH BEZEL WITH DUAL 140MM ARGB FANS
                Narrow Front Face at x=74, facing front-right!
                ======================================================== */}
            {/* Front Bezel Structure */}
            <IsoBox
              x={74}
              y={16}
              z={16.2}
              dx={1.8}
              dy={18}
              dz={24}
              topColor="#FFFFFF"
              leftColor="#F8FAFC"
              rightColor="#E2E8F0"
              stroke="#CBD5E1"
              strokeWidth={0.6}
              origin={origin}
              scale={scale}
            />

            {/* Dual 140mm ARGB Front Fans projected on +X face */}
            {(() => {
              const fanUpper = p({ x: 75.9, y: 25, z: 33.5 });
              const fanLower = p({ x: 75.9, y: 25, z: 22.5 });
              return (
                <g>
                  {/* Upper 140mm Fan */}
                  <g>
                    <ellipse
                      cx={fanUpper.x}
                      cy={fanUpper.y}
                      rx={7.5}
                      ry={4.2}
                      fill={isBooted ? "rgba(0, 240, 255, 0.15)" : "#1E293B"}
                      stroke={isBooted ? "url(#frontFanArgbUpper)" : "#475569"}
                      strokeWidth={1.4}
                    />
                    <circle cx={fanUpper.x} cy={fanUpper.y} r={2} fill="#FF5500" />
                  </g>

                  {/* Lower 140mm Fan */}
                  <g>
                    <ellipse
                      cx={fanLower.x}
                      cy={fanLower.y}
                      rx={7.5}
                      ry={4.2}
                      fill={isBooted ? "rgba(255, 85, 0, 0.15)" : "#1E293B"}
                      stroke={isBooted ? "url(#frontFanArgbLower)" : "#475569"}
                      strokeWidth={1.4}
                    />
                    <circle cx={fanLower.x} cy={fanLower.y} r={2} fill="#00F0FF" />
                  </g>
                </g>
              );
            })()}

            {/* ========================================================
                9. SOLID WHITE TOP ROOF PANEL (ROOFS THE CHASSIS!)
                Horizontal slab at z=39.5..41.2 with dark magnetic dust filter
                ======================================================== */}
            <IsoBox
              x={43.5}
              y={15.5}
              z={39.5}
              dx={32.3}
              dy={18.8}
              dz={1.7}
              topColor="#FFFFFF"
              leftColor="#E2E8F0"
              rightColor="#F8FAFC"
              stroke="#CBD5E1"
              strokeWidth={0.7}
              origin={origin}
              scale={scale}
            />
            {/* Recessed Dark Magnetic Mesh Dust Filter Strip */}
            {(() => {
              const m1 = p({ x: 46.5, y: 17.5, z: 41.3 });
              const m2 = p({ x: 72.5, y: 17.5, z: 41.3 });
              const m3 = p({ x: 72.5, y: 32.5, z: 41.3 });
              const m4 = p({ x: 46.5, y: 32.5, z: 41.3 });
              return (
                <polygon
                  points={`${m1.x},${m1.y} ${m2.x},${m2.y} ${m3.x},${m3.y} ${m4.x},${m4.y}`}
                  fill="#1E2530"
                  stroke="#334155"
                  strokeWidth={0.5}
                />
              );
            })()}
            {/* Top Power Button */}
            {(() => {
              const btn = p({ x: 73.5, y: 31.5, z: 41.3 });
              return <circle cx={btn.x} cy={btn.y} r={1.5} fill="#CBD5E1" stroke="#94A3B8" strokeWidth={0.4} />;
            })()}

            {/* ========================================================
                10. TEMPERED GLASS PANEL (INSTALLED IN ONLINE MODE)
                Slides flush over side opening with specular streak
                ======================================================== */}
            {isBooted && (
              <g>
                <IsoBox
                  x={44}
                  y={34.2}
                  z={16.2}
                  dx={31.5}
                  dy={0.8}
                  dz={23.5}
                  topColor="rgba(224, 242, 254, 0.45)"
                  leftColor="rgba(15, 92, 110, 0.15)"
                  rightColor="url(#glassSpecular)"
                  stroke="rgba(255, 255, 255, 0.55)"
                  strokeWidth={0.6}
                  origin={origin}
                  scale={scale}
                />
                {/* Diagonal White Specular Reflection Streak */}
                {(() => {
                  const r1 = p({ x: 48, y: 35, z: 38 });
                  const r2 = p({ x: 70, y: 35, z: 18 });
                  return (
                    <line x1={r1.x} y1={r1.y} x2={r2.x} y2={r2.y} stroke="rgba(255, 255, 255, 0.4)" strokeWidth={1.4} />
                  );
                })()}
              </g>
            )}

            {/* ========================================================
                11. CRISP LEADER LINES (ROUTED CLEANLY AWAY FROM CHARACTER!)
                ======================================================== */}
            {/* Leader Line 1: CPU/RAM -> routes UP-RIGHT away from character! */}
            <line
              x1={360}
              y1={45}
              x2={cpuAnchor.x}
              y2={cpuAnchor.y}
              stroke="#0F5C6E"
              strokeWidth={1}
              strokeDasharray="2,2"
            />
            <circle cx={cpuAnchor.x} cy={cpuAnchor.y} r={2.2} fill="#0F5C6E" />

            {/* Leader Line 2: GPU -> routes FRONT-LEFT */}
            <line
              x1={115}
              y1={250}
              x2={gpuAnchor.x}
              y2={gpuAnchor.y}
              stroke={isBooted ? "#22C55E" : "#FF5500"}
              strokeWidth={1}
              strokeDasharray="2,2"
            />
            <circle cx={gpuAnchor.x} cy={gpuAnchor.y} r={2.2} fill={isBooted ? "#22C55E" : "#FF5500"} />

            {/* Leader Line 3: Glass / Front Airflow -> routes BOTTOM-RIGHT */}
            <line
              x1={350}
              y1={290}
              x2={glassAnchor.x}
              y2={glassAnchor.y}
              stroke="#64748B"
              strokeWidth={1}
              strokeDasharray="2,2"
            />
            <circle cx={glassAnchor.x} cy={glassAnchor.y} r={2.2} fill="#64748B" />
          </svg>

          {/* ========================================================
              CRISP HTML/TAILWIND OVERLAY BADGES (100% Crisp at 11px!)
              Positioned precisely over outer perimeter, zero distortion
              ======================================================== */}
          {/* Badge 1: CPU / RAM (Top-Right, routed away from character!) */}
          <div className="absolute top-[6%] right-[3%] pointer-events-none">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-[#0F5C6E]/60 bg-[#14171E]/95 shadow-sm backdrop-blur-xs font-mono text-[10.5px] font-medium tracking-tight text-[#F4F2EE]">
              <span className="size-1.5 rounded-full bg-[#0F5C6E]" />
              <span>{isBooted ? "Ryzen 5 5600 · 61°C" : "Ryzen 5 5600 + 32GB"}</span>
            </div>
          </div>

          {/* Badge 2: GPU (Front-Left) */}
          <div className="absolute bottom-[24%] left-[2%] pointer-events-none">
            <div
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border shadow-sm backdrop-blur-xs font-mono text-[10.5px] font-medium tracking-tight ${
                isBooted
                  ? "border-[#22C55E]/60 bg-[#14171E]/95 text-[#22C55E]"
                  : "border-[#FF5500]/60 bg-[#14171E]/95 text-[#F4F2EE]"
              }`}
            >
              <span
                className={`size-1.5 rounded-full ${
                  isBooted ? "bg-[#22C55E]" : "bg-[#FF5500] animate-pulse"
                }`}
              />
              <span>{isBooted ? "✓ RTX 5060 Ti · 16GB" : "Installing: RTX 5060 Ti"}</span>
            </div>
          </div>

          {/* Badge 3: Glass Panel / Front Airflow (Bottom-Right) */}
          <div className="absolute bottom-[10%] right-[3%] pointer-events-none">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-rule-strong bg-[#14171E]/95 shadow-sm backdrop-blur-xs font-mono text-[10.5px] font-medium tracking-tight text-[#94A3B8]">
              <span className={`size-1.5 rounded-full ${isBooted ? "bg-[#00F0FF] animate-pulse" : "bg-[#64748B]"}`} />
              <span>{isBooted ? "ARGB Airflow Active" : "Glass Panel Off"}</span>
            </div>
          </div>
        </div>

        {/* Action Button: Clear Context Toggle */}
        <div className="mt-2.5">
          <button
            type="button"
            onClick={handleToggleBoot}
            className={`w-full py-2 px-3 rounded-lg border font-narrow text-tiny uppercase tracking-eyebrow font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs ${
              isBooted
                ? "bg-surface text-ink border-rule hover:border-rule-strong hover:bg-ground"
                : "bg-[#14171E] text-[#F4F2EE] border-[#FF5500]/70 hover:border-[#FF5500] hover:bg-[#1E2028] shadow-[0_0_12px_rgba(255,85,0,0.25)]"
            }`}
          >
            <span>{isBooted ? "🔧 Inspect Open Chassis" : "⚡ Snap GPU & Test Boot"}</span>
            <span
              className={`size-1.5 rounded-full ${
                isBooted ? "bg-[#22C55E]" : "bg-[#FF5500] animate-ping"
              }`}
            />
          </button>
        </div>
      </div>
    </aside>
  );
}
