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
 * Upgrades:
 * 1. Warm Butcher-Block Workbench (#EFE6D5) + Teal Anti-Static ESD Mat (#0F5C6E).
 *    ZERO pitch-black floor plinth!
 * 2. Unblocked Camera: Builder stands on the FAR/UPPER-LEFT of the bench (y=6..14)
 *    facing front-right with 0% occlusion over the open motherboard bay.
 * 3. 2 Clear Interactive States:
 *    - Exploded Assembly Mode: Gigabyte RTX 5060 Ti 16GB hovers out along +Y with
 *      animated pulsing orange guide rails pointing into the PCIe slot; 3 callout
 *      pills with leader lines explain the components.
 *    - Booted Rig Mode: GPU snaps in, power cable connects, glass slides on, dual
 *      front 140mm ARGB fans and CPU fan spin up, green POST OK LED glows.
 * 4. High-contrast zoom framing (viewBox="0 0 440 340", zero dead air).
 */

export function EdgeVisualBuilding() {
  const [isBooted, setIsBooted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Zoomed-in calibrated origin and scale
  const origin: Point2D = { x: 215, y: 118 };
  const scale = 2.85;

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

  // Coordinates for Callouts and Leader Lines
  const gpuAnchor = p(
    isBooted ? { x: 52, y: 26, z: 27 } : { x: 52, y: 46, z: 30 }
  );
  const cpuAnchor = p({ x: 52, y: 20, z: 34 });
  const glassAnchor = p(
    isBooted ? { x: 62, y: 37, z: 30 } : { x: 80, y: 32, z: 20 }
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
        <div className="flex items-center justify-between mb-2 px-2">
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

        {/* 2.5D Isometric Diorama SVG (Framed Tightly in viewBox="0 0 440 340") */}
        <div className="relative transition-transform duration-300 group-hover:-translate-y-1 cursor-pointer">
          <svg
            viewBox="0 0 440 340"
            className="w-full h-auto drop-shadow-md"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            shapeRendering="geometricPrecision"
          >
            <defs>
              <linearGradient id="frontFanArgb" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#00F0FF" />
                <stop offset="50%" stopColor="#FF5500" />
                <stop offset="100%" stopColor="#00F0FF" />
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
                  to { stroke-dashoffset: -12; }
                }
                @keyframes postGlowPulse {
                  0%, 100% { opacity: 0.6; filter: drop-shadow(0 0 3px #22C55E); }
                  50% { opacity: 1; filter: drop-shadow(0 0 7px #22C55E); }
                }
                .fan-spin-running {
                  animation: fanSpinAnim 1.6s linear infinite;
                }
                .guide-rail-anim {
                  animation: orangeRailDash 0.8s linear infinite;
                }
                .post-led-glow {
                  animation: postGlowPulse 1.2s ease-in-out infinite;
                }
              `}</style>
            </defs>

            {/* ========================================================
                1. WORKBENCH LEGS (Industrial Slate Steel)
                ======================================================== */}
            <IsoBox x={14} y={14} z={0} dx={3} dy={3} dz={13} topColor="#475569" leftColor="#1E293B" rightColor="#334155" origin={origin} scale={scale} />
            <IsoBox x={87} y={14} z={0} dx={3} dy={3} dz={13} topColor="#475569" leftColor="#1E293B" rightColor="#334155" origin={origin} scale={scale} />
            <IsoBox x={14} y={45} z={0} dx={3} dy={3} dz={13} topColor="#475569" leftColor="#1E293B" rightColor="#334155" origin={origin} scale={scale} />
            <IsoBox x={87} y={45} z={0} dx={3} dy={3} dz={13} topColor="#475569" leftColor="#1E293B" rightColor="#334155" origin={origin} scale={scale} />

            {/* Foot crossbeams for industrial stability */}
            <IsoBox x={14} y={16} z={2} dx={2.5} dy={30} dz={2} topColor="#475569" leftColor="#1E293B" rightColor="#334155" origin={origin} scale={scale} />
            <IsoBox x={87.5} y={16} z={2} dx={2.5} dy={30} dz={2} topColor="#475569" leftColor="#1E293B" rightColor="#334155" origin={origin} scale={scale} />

            {/* ========================================================
                2. STANDING VOXEL BUILDER (BEHIND/LEFT OF BENCH, 3/4 VIEW)
                Placed at x=14..24, y=6..14, z=0..50.
                Zero occlusion over the open PC bay!
                ======================================================== */}
            {/* Sneaker soles on floor */}
            <IsoBox x={15} y={7} z={0} dx={3.5} dy={4.5} dz={2.5} topColor="#FFFFFF" leftColor="#FF5500" rightColor="#E2E8F0" origin={origin} scale={scale} />
            <IsoBox x={20} y={7} z={0} dx={3.5} dy={4.5} dz={2.5} topColor="#FFFFFF" leftColor="#FF5500" rightColor="#E2E8F0" origin={origin} scale={scale} />

            {/* Slate trousers (standing behind table) */}
            <IsoBox x={15.5} y={7.5} z={2.5} dx={3} dy={3} dz={15} topColor="#334155" leftColor="#1E293B" rightColor="#273344" origin={origin} scale={scale} />
            <IsoBox x={20} y={7.5} z={2.5} dx={3} dy={3} dz={15} topColor="#334155" leftColor="#1E293B" rightColor="#273344" origin={origin} scale={scale} />

            {/* Torso in Signature Dark Navy Crewneck Tee (z=17.5..34) */}
            <IsoBox
              x={15}
              y={7}
              z={17.5}
              dx={8}
              dy={5}
              dz={14}
              topColor="#1E293B"
              leftColor="#0F172A"
              rightColor="#1E2638"
              stroke="#334155"
              strokeWidth={0.6}
              origin={origin}
              scale={scale}
            />

            {/* Left Arm & Hand resting on ESD mat corner */}
            <IsoBox x={13.5} y={11} z={20} dx={2.5} dy={3} dz={10} topColor="#1E293B" leftColor="#0F172A" rightColor="#1E2638" origin={origin} scale={scale} />
            <IsoBox x={14} y={14} z={16} dx={2.5} dy={3.5} dz={2} topColor="#FDDFB5" leftColor="#E8BE92" rightColor="#F5CF9F" origin={origin} scale={scale} />

            {/* Right Arm angled forward toward PCIe bracket holding screwdriver */}
            <IsoBox x={21} y={9.5} z={22} dx={7} dy={2.8} dz={3} topColor="#1E293B" leftColor="#0F172A" rightColor="#1E2638" origin={origin} scale={scale} />
            {/* Right Hand */}
            <IsoBox x={28} y={11} z={22} dx={2.5} dy={2.5} dz={2.5} topColor="#FDDFB5" leftColor="#E8BE92" rightColor="#F5CF9F" origin={origin} scale={scale} />
            {/* Precision Orange Screwdriver handle & shaft pointing to bracket */}
            <IsoBox x={30.5} y={12} z={23} dx={4} dy={1.2} dz={1.2} topColor="#FF5500" leftColor="#CC4400" rightColor="#E64D00" origin={origin} scale={scale} />
            <IsoBox x={34.5} y={12.2} z={23.2} dx={3} dy={0.7} dz={0.7} topColor="#CBD5E1" leftColor="#94A3B8" rightColor="#E2E8F0" origin={origin} scale={scale} />

            {/* Neck */}
            <IsoBox x={17.5} y={8.5} z={31.5} dx={3} dy={2.5} dz={2.5} topColor="#FDDFB5" leftColor="#E8BE92" rightColor="#F5CF9F" origin={origin} scale={scale} />

            {/* Head (Facing Front-Right toward PC) */}
            <IsoBox
              x={16}
              y={7}
              z={34}
              dx={6}
              dy={5.5}
              dz={6.5}
              topColor="#FDDFB5"
              leftColor="#E8BE92"
              rightColor="#F5CF9F"
              stroke="#D4A373"
              strokeWidth={0.5}
              origin={origin}
              scale={scale}
            />

            {/* Minimalist Glasses on front-right face */}
            {(() => {
              const g1 = p({ x: 20, y: 12.6, z: 38 });
              const g2 = p({ x: 22, y: 12.6, z: 38 });
              const g3 = p({ x: 20, y: 12.6, z: 36.5 });
              const g4 = p({ x: 22, y: 12.6, z: 36.5 });
              return (
                <g>
                  {/* Eyes / Glasses rim */}
                  <line x1={g1.x} y1={g1.y} x2={g2.x} y2={g2.y} stroke="#1E293B" strokeWidth={1.5} strokeLinecap="round" />
                  <line x1={g3.x} y1={g3.y} x2={g4.x} y2={g4.y} stroke="#0F172A" strokeWidth={1} />
                </g>
              );
            })()}

            {/* Dark Spiky Swept-Up Hair */}
            <IsoBox x={15.5} y={6.5} z={40} dx={6.8} dy={6} dz={3} topColor="#241C18" leftColor="#181310" rightColor="#201814" origin={origin} scale={scale} />
            <IsoBox x={17} y={8.5} z={43} dx={4.5} dy={3.5} dz={1.8} topColor="#2C221D" leftColor="#181310" rightColor="#241C18" origin={origin} scale={scale} />

            {/* ========================================================
                3. WARM BIRCH BUTCHER-BLOCK WORKBENCH (z=13..16)
                Warm Light Surface: #EFE6D5 top, #DECfb6 left, #C7B293 right
                ======================================================== */}
            <IsoBox
              x={12}
              y={12}
              z={13}
              dx={80}
              dy={38}
              dz={3}
              topColor="#EFE6D5"
              leftColor="#DECfb6"
              rightColor="#C7B293"
              stroke="#BFA98A"
              strokeWidth={0.8}
              origin={origin}
              scale={scale}
            />

            {/* Wood Grain Accent Strips on Butcher-Block Edge */}
            {(() => {
              const e1 = p({ x: 92, y: 12, z: 14.5 });
              const e2 = p({ x: 92, y: 50, z: 14.5 });
              return (
                <line x1={e1.x} y1={e1.y} x2={e2.x} y2={e2.y} stroke="#BFA98A" strokeWidth={0.7} strokeDasharray="6,4" />
              );
            })()}

            {/* ========================================================
                4. CRISP TEAL ANTI-STATIC ESD MAT (#0F5C6E / #134E4A)
                Sitting on table at z=16.1 with printed white grid hairlines
                ======================================================== */}
            <IsoBox
              x={22}
              y={14}
              z={16}
              dx={68}
              dy={33}
              dz={0.4}
              topColor="#0F5C6E"
              leftColor="#0A414E"
              rightColor="#0D4F5E"
              stroke="#134E4A"
              strokeWidth={0.7}
              origin={origin}
              scale={scale}
            />

            {/* ESD Mat Grid Lines */}
            {(() => {
              const gridLines = [
                { p1: { x: 24, y: 20, z: 16.5 }, p2: { x: 88, y: 20, z: 16.5 } },
                { p1: { x: 24, y: 28, z: 16.5 }, p2: { x: 88, y: 28, z: 16.5 } },
                { p1: { x: 24, y: 36, z: 16.5 }, p2: { x: 88, y: 36, z: 16.5 } },
                { p1: { x: 24, y: 44, z: 16.5 }, p2: { x: 88, y: 44, z: 16.5 } },
                { p1: { x: 34, y: 15, z: 16.5 }, p2: { x: 34, y: 46, z: 16.5 } },
                { p1: { x: 54, y: 15, z: 16.5 }, p2: { x: 54, y: 46, z: 16.5 } },
                { p1: { x: 74, y: 15, z: 16.5 }, p2: { x: 74, y: 46, z: 16.5 } },
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
                    stroke="rgba(255, 255, 255, 0.22)"
                    strokeWidth={0.65}
                    strokeDasharray="2,2"
                  />
                );
              });
            })()}

            {/* ESD Grounding Snap Stud (Yellow/Brass) */}
            {(() => {
              const snap = p({ x: 24, y: 16, z: 16.6 });
              return (
                <g>
                  <circle cx={snap.x} cy={snap.y} r={2.4} fill="#EAB308" stroke="#CA8A04" strokeWidth={0.6} />
                  <circle cx={snap.x} cy={snap.y} r={1.2} fill="#78350F" />
                </g>
              );
            })()}

            {/* ========================================================
                5. WORKBENCH ACCESSORIES (Retail Box, Screw Tray, Paste)
                ======================================================== */}
            {/* Gigabyte RTX Retail Box (Back-right of table) */}
            <IsoBox
              x={76}
              y={15}
              z={16.5}
              dx={13}
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
            {/* Retail Box Orange Eye Accent */}
            {(() => {
              const pt = p({ x: 82.5, y: 22, z: 20 });
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

            {/* Magnetic Screw Tray & Thermal Paste Syringe (Front-left) */}
            <IsoBox x={25} y={39} z={16.5} dx={5} dy={5} dz={1} topColor="#475569" leftColor="#334155" rightColor="#1E293B" origin={origin} scale={scale} />
            {/* Thermal Paste Syringe */}
            <IsoBox x={27} y={34} z={16.5} dx={6} dy={1.2} dz={1.2} topColor="#94A3B8" leftColor="#64748B" rightColor="#CBD5E1" origin={origin} scale={scale} />

            {/* ========================================================
                6. SNOW-WHITE LIAN LI LANCOOL 217 INF CASE (z=16.5..42.5)
                Mid-tower case centered on ESD mat, open chamber facing +Y
                ======================================================== */}
            {/* 4 Rubber Feet */}
            <IsoBox x={38} y={20} z={16.5} dx={2.5} dy={2.5} dz={1.2} topColor="#E2E8F0" leftColor="#CBD5E1" rightColor="#94A3B8" origin={origin} scale={scale} />
            <IsoBox x={72} y={20} z={16.5} dx={2.5} dy={2.5} dz={1.2} topColor="#E2E8F0" leftColor="#CBD5E1" rightColor="#94A3B8" origin={origin} scale={scale} />
            <IsoBox x={38} y={34} z={16.5} dx={2.5} dy={2.5} dz={1.2} topColor="#E2E8F0" leftColor="#CBD5E1" rightColor="#94A3B8" origin={origin} scale={scale} />
            <IsoBox x={72} y={34} z={16.5} dx={2.5} dy={2.5} dz={1.2} topColor="#E2E8F0" leftColor="#CBD5E1" rightColor="#94A3B8" origin={origin} scale={scale} />

            {/* Case Outer White Structure */}
            {/* Top Panel (Snow White with Top Mesh) */}
            <IsoBox
              x={36}
              y={18}
              z={40.5}
              dx={39}
              dy={18}
              dz={2}
              topColor="#FFFFFF"
              leftColor="#E2E8F0"
              rightColor="#F8FAFC"
              stroke="#CBD5E1"
              strokeWidth={0.7}
              origin={origin}
              scale={scale}
            />
            {/* Top Mesh Perforation */}
            {(() => {
              const tm1 = p({ x: 40, y: 20, z: 42.6 });
              const tm2 = p({ x: 70, y: 20, z: 42.6 });
              const tm3 = p({ x: 70, y: 34, z: 42.6 });
              const tm4 = p({ x: 40, y: 34, z: 42.6 });
              return (
                <polygon
                  points={`${tm1.x},${tm1.y} ${tm2.x},${tm2.y} ${tm3.x},${tm3.y} ${tm4.x},${tm4.y}`}
                  fill="#F1F5F9"
                  stroke="#CBD5E1"
                  strokeWidth={0.5}
                />
              );
            })()}

            {/* Rear Frame at x=36 (I/O cutouts, brackets) */}
            <IsoBox
              x={36}
              y={18}
              z={17.7}
              dx={1.5}
              dy={18}
              dz={23}
              topColor="#FFFFFF"
              leftColor="#E2E8F0"
              rightColor="#CBD5E1"
              stroke="#CBD5E1"
              strokeWidth={0.6}
              origin={origin}
              scale={scale}
            />

            {/* Front Bezel at x=74 (Infinity-Mirror Dual 140mm ARGB Fans) */}
            <IsoBox
              x={73.5}
              y={18}
              z={17.7}
              dx={1.5}
              dy={18}
              dz={23}
              topColor="#FFFFFF"
              leftColor="#F8FAFC"
              rightColor="#E2E8F0"
              stroke="#CBD5E1"
              strokeWidth={0.6}
              origin={origin}
              scale={scale}
            />
            {/* Dual Front 140mm Fans inside Front Bezel */}
            {(() => {
              const fan1 = p({ x: 75.1, y: 27, z: 24 });
              const fan2 = p({ x: 75.1, y: 27, z: 34 });
              return (
                <g>
                  {/* Bottom Front Fan */}
                  <circle
                    cx={fan1.x}
                    cy={fan1.y}
                    r={7}
                    fill={isBooted ? "url(#frontFanArgb)" : "#1E293B"}
                    stroke={isBooted ? "#00F0FF" : "#475569"}
                    strokeWidth={1}
                    className={isBooted ? "fan-spin-running" : ""}
                  />
                  {/* Top Front Fan */}
                  <circle
                    cx={fan2.x}
                    cy={fan2.y}
                    r={7}
                    fill={isBooted ? "url(#frontFanArgb)" : "#1E293B"}
                    stroke={isBooted ? "#FF5500" : "#475569"}
                    strokeWidth={1}
                    className={isBooted ? "fan-spin-running" : ""}
                  />
                </g>
              );
            })()}

            {/* ========================================================
                7. RECESSED OPEN INTERIOR CHAMBER (Facing Viewer at y=36)
                ======================================================== */}
            {/* Back Wall / Motherboard Tray (y=19.5) */}
            <IsoBox
              x={37.5}
              y={19.5}
              z={17.7}
              dx={36}
              dy={1}
              dz={23}
              topColor="#0F172A"
              leftColor="#0F172A"
              rightColor="#1E293B"
              origin={origin}
              scale={scale}
            />

            {/* Bottom White Ventilated PSU Shroud (z=17.7..23) */}
            <IsoBox
              x={37.5}
              y={19.5}
              z={17.7}
              dx={36}
              dy={16}
              dz={5.3}
              topColor="#FFFFFF"
              leftColor="#F8FAFC"
              rightColor="#E2E8F0"
              stroke="#CBD5E1"
              strokeWidth={0.6}
              origin={origin}
              scale={scale}
            />
            {/* Dual Shroud Upward Fans (Direct GPU Cooling) */}
            {(() => {
              const sf1 = p({ x: 48, y: 27, z: 23.1 });
              const sf2 = p({ x: 62, y: 27, z: 23.1 });
              return (
                <g>
                  <ellipse cx={sf1.x} cy={sf1.y} rx={4.5} ry={2.5} fill="#F1F5F9" stroke="#CBD5E1" strokeWidth={0.6} />
                  <ellipse cx={sf2.x} cy={sf2.y} rx={4.5} ry={2.5} fill="#F1F5F9" stroke="#CBD5E1" strokeWidth={0.6} />
                </g>
              );
            })()}

            {/* ATX Motherboard PCB (x=41..69, y=20.5, z=23.5..39.5) */}
            <IsoBox
              x={41}
              y={20.5}
              z={23.5}
              dx={28}
              dy={0.8}
              dz={16}
              topColor="#111827"
              leftColor="#111827"
              rightColor="#1F2937"
              stroke="#374151"
              strokeWidth={0.5}
              origin={origin}
              scale={scale}
            />

            {/* Motherboard Printed Gold Circuit Traces */}
            {(() => {
              const t1 = p({ x: 44, y: 21.4, z: 35 });
              const t2 = p({ x: 50, y: 21.4, z: 35 });
              const t3 = p({ x: 50, y: 21.4, z: 29 });
              const t4 = p({ x: 58, y: 21.4, z: 29 });
              return (
                <polyline
                  points={`${t1.x},${t1.y} ${t2.x},${t2.y} ${t3.x},${t3.y} ${t4.x},${t4.y}`}
                  stroke="#EAB308"
                  strokeWidth={0.6}
                  strokeDasharray="3,2"
                  opacity={0.6}
                />
              );
            })()}

            {/* Circular AMD Wraith Stealth Stock Cooler (x=50, z=33) */}
            {(() => {
              const cooler = p({ x: 50, y: 21.5, z: 33 });
              return (
                <g>
                  {/* Outer shroud ring */}
                  <circle cx={cooler.x} cy={cooler.y} r={6.5} fill="#1E293B" stroke="#475569" strokeWidth={1} />
                  {/* Circular fan hub & blades */}
                  <circle
                    cx={cooler.x}
                    cy={cooler.y}
                    r={4.8}
                    fill="#0F172A"
                    stroke={isBooted ? "#FF5500" : "#334155"}
                    strokeWidth={0.8}
                    className={isBooted ? "fan-spin-running" : ""}
                  />
                  {/* Center AMD logo dot */}
                  <circle cx={cooler.x} cy={cooler.y} r={1.5} fill="#FF5500" />
                </g>
              );
            })()}

            {/* 2 Lit DDR4 RAM Sticks (x=59, 61, z=28..37) */}
            <IsoBox
              x={58.5}
              y={21.2}
              z={28}
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
              x={60.5}
              y={21.2}
              z={28}
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

            {/* PCIe 4.0 x16 Slot (x=42..65, z=24.5) */}
            <IsoBox
              x={42}
              y={22}
              z={24.2}
              dx={22}
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

            {/* Motherboard Diagnostic POST LED (x=66, z=37) */}
            {(() => {
              const led = p({ x: 65, y: 21.5, z: 37 });
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
                8. GIGABYTE RTX 5060 Ti 16GB GPU
                State A (Exploded): Hovers at y=46..51, z=27..32
                State B (Booted): Installed at y=23..28, z=24.5..29.5
                ======================================================== */}
            {/* Pulsing Orange Alignment Guide Rails (Visible in Exploded Mode) */}
            {!isBooted && (() => {
              const pSlotL = p({ x: 44, y: 23, z: 25.4 });
              const pGpuL = p({ x: 44, y: 46, z: 27 });
              const pSlotM = p({ x: 53, y: 23, z: 25.4 });
              const pGpuM = p({ x: 53, y: 46, z: 27 });
              const pSlotR = p({ x: 62, y: 23, z: 25.4 });
              const pGpuR = p({ x: 62, y: 46, z: 27 });

              return (
                <g>
                  {/* Left Alignment Guide */}
                  <line
                    x1={pSlotL.x}
                    y1={pSlotL.y}
                    x2={pGpuL.x}
                    y2={pGpuL.y}
                    stroke="#FF5500"
                    strokeWidth={1.2}
                    strokeDasharray="3,3"
                    className="guide-rail-anim"
                  />
                  {/* Center Alignment Guide */}
                  <line
                    x1={pSlotM.x}
                    y1={pSlotM.y}
                    x2={pGpuM.x}
                    y2={pGpuM.y}
                    stroke="#FF5500"
                    strokeWidth={1.4}
                    strokeDasharray="4,3"
                    className="guide-rail-anim"
                  />
                  {/* Right Alignment Guide */}
                  <line
                    x1={pSlotR.x}
                    y1={pSlotR.y}
                    x2={pGpuR.x}
                    y2={pGpuR.y}
                    stroke="#FF5500"
                    strokeWidth={1.2}
                    strokeDasharray="3,3"
                    className="guide-rail-anim"
                  />
                  {/* Guide Arrow Head */}
                  <polygon
                    points={`${pSlotM.x},${pSlotM.y} ${pSlotM.x - 3},${pSlotM.y + 4} ${pSlotM.x + 3},${pSlotM.y + 4}`}
                    fill="#FF5500"
                  />
                </g>
              );
            })()}

            {/* GPU Shroud Box */}
            <IsoBox
              x={41}
              y={isBooted ? 23 : 46}
              z={isBooted ? 24.5 : 27}
              dx={24}
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

            {/* PCIe Gold Fingers at bottom edge of GPU */}
            {!isBooted && (
              <IsoBox
                x={44}
                y={46}
                z={25.8}
                dx={18}
                dy={1}
                dz={1.2}
                topColor="#EAB308"
                leftColor="#CA8A04"
                rightColor="#F59E0B"
                origin={origin}
                scale={scale}
              />
            )}

            {/* Silver Metal Bracket at Left End of GPU */}
            <IsoBox
              x={40.2}
              y={isBooted ? 23 : 46}
              z={isBooted ? 23.5 : 26}
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
              const gy = isBooted ? 28.1 : 51.1;
              const gz = isBooted ? 27 : 29.5;
              const f1 = p({ x: 47, y: gy, z: gz });
              const f2 = p({ x: 57, y: gy, z: gz });
              return (
                <g>
                  {/* Fan 1 */}
                  <circle
                    cx={f1.x}
                    cy={f1.y}
                    r={isBooted ? 3.6 : 4.4}
                    fill="#111827"
                    stroke="#374151"
                    strokeWidth={0.8}
                    className={isBooted ? "fan-spin-running" : ""}
                  />
                  {/* Fan 2 */}
                  <circle
                    cx={f2.x}
                    cy={f2.y}
                    r={isBooted ? 3.6 : 4.4}
                    fill="#111827"
                    stroke="#374151"
                    strokeWidth={0.8}
                    className={isBooted ? "fan-spin-running" : ""}
                  />
                  {/* Copper Heatpipe Line */}
                  <line
                    x1={f1.x}
                    y1={f1.y + 3}
                    x2={f2.x}
                    y2={f2.y + 3}
                    stroke="#D97706"
                    strokeWidth={1}
                  />
                </g>
              );
            })()}

            {/* White Label Stripe on GPU Top Edge: GEFORCE RTX */}
            {(() => {
              const lbl = p({
                x: 53,
                y: isBooted ? 24 : 47,
                z: isBooted ? 29.6 : 32.1,
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

            {/* Power Cable (Plugs in when booted) */}
            {isBooted && (() => {
              const plug = p({ x: 53, y: 24, z: 29.5 });
              const cableBack = p({ x: 53, y: 20, z: 27 });
              return (
                <g>
                  {/* 12V-2x6 Connector */}
                  <rect
                    x={plug.x - 2.5}
                    y={plug.y - 2.5}
                    width={5}
                    height={3}
                    fill="#F8FAFC"
                    stroke="#CBD5E1"
                    strokeWidth={0.5}
                  />
                  {/* White Braided Cables */}
                  <path
                    d={`M ${plug.x} ${plug.y} Q ${plug.x - 2} ${plug.y - 4} ${cableBack.x} ${cableBack.y}`}
                    stroke="#E2E8F0"
                    strokeWidth={2}
                    fill="none"
                  />
                </g>
              );
            })()}

            {/* ========================================================
                9. TEMPERED GLASS SIDE PANEL
                State A (Build): Resting against side of table (x=80..81, y=20..46, z=8..32)
                State B (Booted): Installed over the chassis (x=36..74, y=36.2, z=17.7..40.5)
                ======================================================== */}
            {!isBooted ? (
              // Resting glass panel
              <g>
                <IsoBox
                  x={80}
                  y={18}
                  z={8}
                  dx={1}
                  dy={26}
                  dz={22}
                  topColor="rgba(224, 242, 254, 0.55)"
                  leftColor="rgba(15, 92, 110, 0.2)"
                  rightColor="url(#glassSpecular)"
                  stroke="rgba(255, 255, 255, 0.65)"
                  strokeWidth={0.7}
                  origin={origin}
                  scale={scale}
                />
                {/* White Steel Mounting Trim on Resting Glass */}
                <IsoBox x={80} y={18} z={28.5} dx={1} dy={26} dz={1.5} topColor="#FFFFFF" leftColor="#E2E8F0" rightColor="#F8FAFC" origin={origin} scale={scale} />
                <IsoBox x={80} y={18} z={8} dx={1} dy={26} dz={1.5} topColor="#FFFFFF" leftColor="#E2E8F0" rightColor="#F8FAFC" origin={origin} scale={scale} />
              </g>
            ) : (
              // Installed translucent glass over chassis opening
              <g>
                <IsoBox
                  x={36}
                  y={36.2}
                  z={17.7}
                  dx={38}
                  dy={0.8}
                  dz={22.8}
                  topColor="rgba(224, 242, 254, 0.45)"
                  leftColor="rgba(15, 92, 110, 0.15)"
                  rightColor="url(#glassSpecular)"
                  stroke="rgba(255, 255, 255, 0.5)"
                  strokeWidth={0.6}
                  origin={origin}
                  scale={scale}
                />
                {/* Diagonal Specular Reflection Line */}
                {(() => {
                  const r1 = p({ x: 42, y: 37, z: 40 });
                  const r2 = p({ x: 68, y: 37, z: 20 });
                  return (
                    <line
                      x1={r1.x}
                      y1={r1.y}
                      x2={r2.x}
                      y2={r2.y}
                      stroke="rgba(255, 255, 255, 0.4)"
                      strokeWidth={1.2}
                    />
                  );
                })()}
              </g>
            )}

            {/* ========================================================
                10. CRISP CALLOUT PILLS & THIN LEADER LINES
                Placed around perimeter so nothing obstructs the diorama
                ======================================================== */}
            {/* CALLOUT 1: GPU Status Pill */}
            {(() => {
              const pillX = 22;
              const pillY = isBooted ? 195 : 240;
              return (
                <g>
                  {/* Leader line */}
                  <line
                    x1={pillX + 90}
                    y1={pillY + 8}
                    x2={gpuAnchor.x}
                    y2={gpuAnchor.y}
                    stroke={isBooted ? "#22C55E" : "#FF5500"}
                    strokeWidth={0.9}
                    strokeDasharray="2,2"
                  />
                  <circle cx={gpuAnchor.x} cy={gpuAnchor.y} r={2} fill={isBooted ? "#22C55E" : "#FF5500"} />
                  {/* Pill box */}
                  <rect
                    x={pillX}
                    y={pillY}
                    width={105}
                    height={16}
                    rx={8}
                    fill="#181B22"
                    stroke={isBooted ? "#22C55E" : "#FF5500"}
                    strokeWidth={0.9}
                  />
                  <text
                    x={pillX + 52}
                    y={pillY + 11}
                    fill={isBooted ? "#22C55E" : "#F4F2EE"}
                    fontSize="7"
                    fontWeight="bold"
                    fontFamily="monospace"
                    textAnchor="middle"
                  >
                    {isBooted ? "✓ RTX 5060 Ti · 16GB" : "Installing: RTX 5060 Ti"}
                  </text>
                </g>
              );
            })()}

            {/* CALLOUT 2: CPU & RAM Status Pill (Top Center) */}
            {(() => {
              const pillX = 145;
              const pillY = 14;
              return (
                <g>
                  {/* Leader line */}
                  <line
                    x1={pillX + 55}
                    y1={pillY + 16}
                    x2={cpuAnchor.x}
                    y2={cpuAnchor.y}
                    stroke="#0F5C6E"
                    strokeWidth={0.9}
                    strokeDasharray="2,2"
                  />
                  <circle cx={cpuAnchor.x} cy={cpuAnchor.y} r={2} fill="#0F5C6E" />
                  {/* Pill box */}
                  <rect
                    x={pillX}
                    y={pillY}
                    width={110}
                    height={16}
                    rx={8}
                    fill="#181B22"
                    stroke="#0F5C6E"
                    strokeWidth={0.9}
                  />
                  <text
                    x={pillX + 55}
                    y={pillY + 11}
                    fill="#F4F2EE"
                    fontSize="7"
                    fontWeight="bold"
                    fontFamily="monospace"
                    textAnchor="middle"
                  >
                    {isBooted ? "Ryzen 5 5600 · 61°C" : "Ryzen 5 5600 + 32GB"}
                  </text>
                </g>
              );
            })()}

            {/* CALLOUT 3: Glass Panel Status Pill (Right Edge) */}
            {(() => {
              const pillX = 320;
              const pillY = isBooted ? 130 : 210;
              return (
                <g>
                  {/* Leader line */}
                  <line
                    x1={pillX}
                    y1={pillY + 8}
                    x2={glassAnchor.x}
                    y2={glassAnchor.y}
                    stroke="#64748B"
                    strokeWidth={0.9}
                    strokeDasharray="2,2"
                  />
                  <circle cx={glassAnchor.x} cy={glassAnchor.y} r={2} fill="#64748B" />
                  {/* Pill box */}
                  <rect
                    x={pillX}
                    y={pillY}
                    width={105}
                    height={16}
                    rx={8}
                    fill="#181B22"
                    stroke="#475569"
                    strokeWidth={0.9}
                  />
                  <text
                    x={pillX + 52}
                    y={pillY + 11}
                    fill="#94A3B8"
                    fontSize="7"
                    fontWeight="bold"
                    fontFamily="monospace"
                    textAnchor="middle"
                  >
                    {isBooted ? "Tempered Glass On" : "Tempered Glass Off"}
                  </text>
                </g>
              );
            })()}
          </svg>
        </div>

        {/* Action Button: Clear Context Toggle */}
        <div className="mt-2.5">
          <button
            type="button"
            onClick={handleToggleBoot}
            className={`w-full py-2 px-3 rounded-lg border font-narrow text-tiny uppercase tracking-eyebrow font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs ${
              isBooted
                ? "bg-surface text-ink border-rule hover:border-rule-strong hover:bg-ground"
                : "bg-[#181B22] text-[#F4F2EE] border-[#FF5500]/70 hover:border-[#FF5500] hover:bg-[#1E2028] shadow-[0_0_12px_rgba(255,85,0,0.25)]"
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
