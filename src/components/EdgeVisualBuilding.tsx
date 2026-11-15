"use client";

import React, { useState } from "react";
import { sound } from "@/lib/sound";

/**
 * Edge Visual 2: "Building the White Rig — Open Chassis"
 *
 * Style Invariants:
 * - Crisp 2.5D Isometric Geometric / High-Bit Pixel-Art Diorama (30° isometric projection).
 * - Exact Hardware: WHITE Lian Li LANCOOL 207 (LAN207RW) in open assembly state.
 *   The clear tempered glass panel is popped off, leaning upright beside the chassis!
 * - Open interior highlights: white bottom PSU shroud with dual 120mm fans blowing upward,
 *   RTX 5060 Ti 16GB GPU being carefully slotted into PCIe x16 with anti-sag bracket.
 * - Stylized geometric character (Suyash) in dark navy tee leaning over with precision screwdriver.
 * - Interactive Click: Clicking the diorama triggers "Test Boot ⚡" spinning all 4 fans with
 *   glowing Orange & Cyan ARGB rings and pulsing green POST diagnostic LEDs!
 */
export function EdgeVisualBuilding() {
  const [isBooted, setIsBooted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

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
              {/* ARGB Glow Gradients */}
              <linearGradient id="buildArgbGlow" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#00F0FF" />
                <stop offset="50%" stopColor="#FF5500" />
                <stop offset="100%" stopColor="#00F0FF" />
              </linearGradient>

              {/* Translucent Glass Panel Gradient */}
              <linearGradient id="poppedGlass" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="rgba(224, 242, 254, 0.45)" />
                <stop offset="40%" stopColor="rgba(255, 255, 255, 0.25)" />
                <stop offset="70%" stopColor="rgba(0, 240, 255, 0.15)" />
                <stop offset="100%" stopColor="rgba(224, 242, 254, 0.40)" />
              </linearGradient>

              {/* SVG Keyframe Styles */}
              <style>{`
                @keyframes spinBuildBlade {
                  from { transform: rotate(0deg); }
                  to { transform: rotate(360deg); }
                }
                @keyframes sparkPing {
                  0%, 100% { opacity: 0; transform: scale(0.8); }
                  50% { opacity: 1; transform: scale(1.4); }
                }
                .build-fan-active {
                  transform-origin: center;
                  animation: spinBuildBlade 1.8s linear infinite;
                }
                .spark-active {
                  animation: sparkPing 1.2s ease-in-out infinite;
                }
              `}</style>
            </defs>

            {/* ========================================================
                1. ISOMETRIC ESD WORKBENCH PLINTH (Technical Dark Mat)
                ======================================================== */}
            {/* Ambient drop shadow under workbench */}
            <polygon
              points="230,450 395,385 230,320 65,385"
              fill="rgba(17, 19, 24, 0.08)"
            />

            {/* Workbench Front Bevel (Anodized Aluminum Frame) */}
            <polygon
              points="65,370 230,435 230,448 65,383"
              fill="#334155"
              stroke="#1E293B"
              strokeWidth="1"
            />
            <polygon
              points="230,435 395,370 395,383 230,448"
              fill="#1E293B"
              stroke="#0F172A"
              strokeWidth="1"
            />

            {/* Workbench Top: Dark Technical ESD Antistatic Mat (#252A36) */}
            <polygon
              points="230,305 395,370 230,435 65,370"
              fill="#252A36"
              stroke="#334155"
              strokeWidth="1.25"
            />

            {/* Printed 20mm ESD Measurement Grid Hairlines */}
            <g stroke="rgba(15, 92, 110, 0.22)" strokeWidth="0.75">
              <line x1="110" y1="352" x2="275" y2="417" />
              <line x1="150" y1="337" x2="315" y2="402" />
              <line x1="190" y1="321" x2="355" y2="386" />
              <line x1="185" y1="387" x2="350" y2="322" />
              <line x1="145" y1="403" x2="310" y2="338" />
              <line x1="105" y1="419" x2="270" y2="354" />
            </g>

            {/* Antistatic Grounding Wrist Strap Cord (Teal Coiled Wire) */}
            <path
              d="M80,390 Q90,380 95,392 T110,385 T125,395"
              fill="none"
              stroke="#00F0FF"
              strokeWidth="1.5"
            />
            <rect x="75" y="388" width="6" height="4" fill="#FF5500" rx="1" />

            {/* Precision Tool Tray on Workbench */}
            <g transform="translate(100, 395)">
              <polygon points="5,8 25,0 45,8 25,16" fill="#1E293B" stroke="#475569" strokeWidth="0.8" />
              {/* Screws & Small Parts */}
              <circle cx="18" cy="8" r="1.5" fill="#E2E8F0" />
              <circle cx="22" cy="6" r="1.5" fill="#E2E8F0" />
              <circle cx="28" cy="9" r="1.5" fill="#E2E8F0" />
              <circle cx="32" cy="7" r="1.5" fill="#E2E8F0" />
            </g>

            {/* ========================================================
                2. WHITE LIAN LI LANCOOL 207 (OPEN ASSEMBLY STATE)
                ======================================================== */}
            <g transform="translate(170, 155)">
              {/* Case Shadow on Mat */}
              <polygon
                points="0,185 75,148 150,185 75,222"
                fill="rgba(0,0,0,0.35)"
              />

              {/* Rubber Feet */}
              <rect x="12" y="184" width="8" height="6" fill="#CBD5E1" rx="1" />
              <rect x="68" y="214" width="8" height="6" fill="#94A3B8" rx="1" />
              <rect x="132" y="184" width="8" height="6" fill="#CBD5E1" rx="1" />

              {/* --- SNOW-WHITE TOP PANEL --- */}
              <polygon
                points="0,38 75,0 150,38 75,75"
                fill="#FFFFFF"
                stroke="#CBD5E1"
                strokeWidth="1.2"
              />
              <polygon
                points="12,38 75,7 138,38 75,69"
                fill="#F1F5F9"
                stroke="#E2E8F0"
                strokeWidth="0.8"
              />
              <circle cx="28" cy="41" r="2.2" fill={isBooted ? "#22C55E" : "#94A3B8"} stroke="#475569" strokeWidth="0.5" />

              {/* --- FRONT PANEL (Facing Left: White Mesh & Front Fans) --- */}
              <polygon
                points="0,38 75,75 75,208 0,171"
                fill="#F8FAFC"
                stroke="#CBD5E1"
                strokeWidth="1.2"
              />
              <polygon
                points="6,46 69,78 69,198 6,166"
                fill="#E2E8F0"
              />

              {/* Front Dual 140mm ARGB Fans (Spin on Test Boot) */}
              {/* Fan 1 (Upper) */}
              <g transform="translate(38, 102)">
                <ellipse
                  cx="0"
                  cy="0"
                  rx="24"
                  ry="14"
                  fill="none"
                  stroke={isBooted ? "url(#buildArgbGlow)" : "#94A3B8"}
                  strokeWidth={isBooted ? "2.5" : "1.2"}
                  opacity={isBooted ? 0.95 : 0.4}
                />
                <g className={isBooted ? "build-fan-active" : ""}>
                  <path d="M-14,-2 C-8,-6 8,-6 14,2 C8,6 -8,6 -14,-2 Z" fill="#FFFFFF" opacity={isBooted ? 0.9 : 0.4} />
                  <path d="M-2,-10 C6,-6 6,6 -2,10 C-6,6 -6,-6 -2,-10 Z" fill="#F1F5F9" opacity={isBooted ? 0.9 : 0.4} />
                </g>
                <circle cx="0" cy="0" r="4.5" fill="#1E293B" stroke={isBooted ? "#FF5500" : "#64748B"} strokeWidth="1" />
              </g>

              {/* Fan 2 (Lower) */}
              <g transform="translate(38, 150)">
                <ellipse
                  cx="0"
                  cy="0"
                  rx="24"
                  ry="14"
                  fill="none"
                  stroke={isBooted ? "url(#buildArgbGlow)" : "#94A3B8"}
                  strokeWidth={isBooted ? "2.5" : "1.2"}
                  opacity={isBooted ? 0.95 : 0.4}
                />
                <g className={isBooted ? "build-fan-active" : ""} style={{ animationDirection: "reverse" }}>
                  <path d="M-14,-2 C-8,-6 8,-6 14,2 C8,6 -8,6 -14,-2 Z" fill="#FFFFFF" opacity={isBooted ? 0.9 : 0.4} />
                  <path d="M-2,-10 C6,-6 6,6 -2,10 C-6,6 -6,-6 -2,-10 Z" fill="#F1F5F9" opacity={isBooted ? 0.9 : 0.4} />
                </g>
                <circle cx="0" cy="0" r="4.5" fill="#1E293B" stroke={isBooted ? "#00F0FF" : "#64748B"} strokeWidth="1" />
              </g>

              {/* --- OPEN INTERIOR CHASSIS (Glass Panel Removed!) --- */}
              {/* Exposed Dark Internal Compartment */}
              <polygon
                points="75,75 150,38 150,208 75,245"
                fill="#0F172A"
              />

              {/* White Chassis Frame Pillars (Hex Honeycomb Cutouts) */}
              <polygon
                points="75,75 83,71 83,241 75,245"
                fill="#FFFFFF"
                stroke="#CBD5E1"
                strokeWidth="0.8"
              />
              <polygon
                points="142,42 150,38 150,208 142,212"
                fill="#FFFFFF"
                stroke="#CBD5E1"
                strokeWidth="0.8"
              />
              <polygon
                points="75,75 150,38 150,44 75,81"
                fill="#FFFFFF"
              />

              {/* White Ventilated Bottom PSU Shroud (Signature Lancool 207) */}
              <polygon
                points="83,185 142,156 142,212 83,241"
                fill="#FFFFFF"
                stroke="#E2E8F0"
                strokeWidth="1"
              />
              <polygon
                points="83,185 142,156 135,152 76,181"
                fill="#F8FAFC"
              />

              {/* TWO 120mm INTAKE FANS MOUNTED ON PSU SHROUD (Exposed & Operational!) */}
              <g transform="translate(100, 172)">
                <ellipse
                  cx="0"
                  cy="0"
                  rx="15"
                  ry="8"
                  fill="none"
                  stroke={isBooted ? "#00F0FF" : "#64748B"}
                  strokeWidth={isBooted ? "2" : "1"}
                  opacity={isBooted ? 1 : 0.5}
                />
                {/* 4 Blades */}
                <g className={isBooted ? "build-fan-active" : ""}>
                  <line x1="-10" y1="0" x2="10" y2="0" stroke="#FFFFFF" strokeWidth="1.5" />
                  <line x1="0" y1="-5" x2="0" y2="5" stroke="#FFFFFF" strokeWidth="1.5" />
                </g>
                <circle cx="0" cy="0" r="3" fill="#1E293B" />
              </g>

              <g transform="translate(126, 158)">
                <ellipse
                  cx="0"
                  cy="0"
                  rx="15"
                  ry="8"
                  fill="none"
                  stroke={isBooted ? "#FF5500" : "#64748B"}
                  strokeWidth={isBooted ? "2" : "1"}
                  opacity={isBooted ? 1 : 0.5}
                />
                <g className={isBooted ? "build-fan-active" : ""} style={{ animationDirection: "reverse" }}>
                  <line x1="-10" y1="0" x2="10" y2="0" stroke="#FFFFFF" strokeWidth="1.5" />
                  <line x1="0" y1="-5" x2="0" y2="5" stroke="#FFFFFF" strokeWidth="1.5" />
                </g>
                <circle cx="0" cy="0" r="3" fill="#1E293B" />
              </g>

              {/* Dark ATX Motherboard PCB */}
              <polygon
                points="86,88 140,61 140,150 86,177"
                fill="#1E293B"
              />
              {/* Silver VRM Heatsinks */}
              <rect x="94" y="82" width="14" height="6" fill="#94A3B8" transform="skewY(-26)" />
              {/* Dual RAM Sticks */}
              <rect x="116" y="66" width="2.5" height="14" fill={isBooted ? "#00F0FF" : "#64748B"} transform="skewY(-26)" />
              <rect x="120" y="64" width="2.5" height="14" fill={isBooted ? "#FF5500" : "#64748B"} transform="skewY(-26)" />

              {/* MOTHERBOARD DIAGNOSTIC POST LEDs */}
              <g transform="translate(132, 68)">
                <circle cx="0" cy="0" r="1.5" fill={isBooted ? "#22C55E" : "#475569"} />
                <circle cx="3" cy="-1.5" r="1.5" fill={isBooted ? "#22C55E" : "#EF4444"} />
                <circle cx="6" cy="-3" r="1.5" fill={isBooted ? "#22C55E" : "#F59E0B"} />
                {isBooted && (
                  <circle cx="0" cy="0" r="4.5" fill="#22C55E" className="spark-active" opacity="0.6" />
                )}
              </g>

              {/* HORIZONTAL RTX 5060 Ti 16GB GPU (Being Seated into PCIe x16) */}
              <g transform="translate(82, 122)">
                {/* PCIe Golden Edge Connector Fingers */}
                <polygon
                  points="14,24 46,8 46,11 14,27"
                  fill="#F59E0B"
                />
                {/* Dark GPU Shroud & Backplate */}
                <polygon
                  points="2,14 62,-16 62,4 2,34"
                  fill="#111827"
                  stroke="#374151"
                  strokeWidth="0.8"
                />
                {/* Silver Triple Heatpipes */}
                <line x1="8" y1="18" x2="56" y2="-6" stroke="#CBD5E1" strokeWidth="1.2" />
                <line x1="8" y1="22" x2="56" y2="-2" stroke="#CBD5E1" strokeWidth="1.2" />
                {/* Glowing "GEFORCE RTX" Logo Badge */}
                <polygon
                  points="12,18 44,2 44,7 12,23"
                  fill={isBooted ? "#00F0FF" : "#475569"}
                />
                {/* Anti-Sag Pillar */}
                <rect x="58" y="-12" width="3" height="30" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="0.5" />
              </g>

              {/* CPU Cooler Socket Area */}
              <rect x="96" y="94" width="16" height="16" fill="#334155" rx="2" transform="skewY(-26)" />

              {/* Test Boot Power Arc / Spark Effect when Active */}
              {isBooted && (
                <g transform="translate(108, 134)" className="spark-active">
                  <circle cx="0" cy="0" r="8" fill="none" stroke="#22C55E" strokeWidth="1.5" />
                  <line x1="-6" y1="0" x2="6" y2="0" stroke="#00F0FF" strokeWidth="1.5" />
                  <line x1="0" y1="-6" x2="0" y2="6" stroke="#00F0FF" strokeWidth="1.5" />
                </g>
              )}
            </g>

            {/* ========================================================
                3. TEMPERED GLASS PANEL (POPPED OFF & LEANING ON WORKBENCH!)
                ======================================================== */}
            {/* Leaning against the right side of the workbench */}
            <g transform="translate(325, 230)">
              {/* Glass Shadow on Workbench Mat */}
              <polygon
                points="0,150 45,128 45,134 0,156"
                fill="rgba(0,0,0,0.3)"
              />
              {/* Leaning Glass Panel (Cyan-tinted translucent sheet) */}
              <polygon
                points="2,18 42,0 42,130 2,148"
                fill="url(#poppedGlass)"
                stroke="rgba(255,255,255,0.7)"
                strokeWidth="1.2"
              />
              {/* Top and Bottom White Steel Mounting Trim Strips */}
              <polygon
                points="2,18 42,0 42,6 2,24"
                fill="#FFFFFF"
                stroke="#CBD5E1"
                strokeWidth="0.8"
              />
              <polygon
                points="2,142 42,124 42,130 2,148"
                fill="#FFFFFF"
                stroke="#CBD5E1"
                strokeWidth="0.8"
              />
              {/* Knurled Silver Thumbscrews on Corners */}
              <circle cx="6" cy="22" r="1.8" fill="#CBD5E1" stroke="#475569" strokeWidth="0.5" />
              <circle cx="38" cy="6" r="1.8" fill="#CBD5E1" stroke="#475569" strokeWidth="0.5" />
              <circle cx="6" cy="144" r="1.8" fill="#CBD5E1" stroke="#475569" strokeWidth="0.5" />
              <circle cx="38" cy="128" r="1.8" fill="#CBD5E1" stroke="#475569" strokeWidth="0.5" />
            </g>

            {/* ========================================================
                4. CHARACTER: SUYASH BUILDING THE RIG (Navy Tee & Screwdriver)
                ======================================================== */}
            {/* Positioned on left, leaning over the open chassis */}
            <g transform="translate(110, 210)">
              {/* Shadow under feet/legs */}
              <ellipse cx="26" cy="190" rx="20" ry="8" fill="rgba(0,0,0,0.22)" />

              {/* Legs in Dark Charcoal Work Trousers (#1F242D) */}
              <polygon points="18,125 28,122 34,185 24,188" fill="#1F242D" />
              <polygon points="28,122 38,119 44,180 34,183" fill="#141820" />
              {/* Shoes */}
              <polygon points="24,188 34,185 40,192 28,195" fill="#334155" />

              {/* Torso: Dark Navy Crew-Neck Tee (#162032) Leaning Forward */}
              <polygon
                points="12,58 40,44 48,120 18,130"
                fill="#162032"
                stroke="#0F172A"
                strokeWidth="1"
              />
              <polygon
                points="40,44 52,50 56,124 48,120"
                fill="#0F172A"
              />
              <ellipse cx="28" cy="51" rx="7" ry="3" fill="#0A0E17" />

              {/* Left Arm: Hand Steadying the RTX 5060 Ti GPU */}
              <polygon points="12,58 20,54 36,82 28,86" fill="#162032" />
              <polygon points="28,86 36,82 72,98 64,103" fill="#C68B59" />
              {/* Fingers grasping top of card */}
              <polygon points="64,103 72,98 78,102 70,107" fill="#D4A373" />

              {/* Right Arm: Extending Precision Screwdriver into Chassis */}
              <polygon points="40,44 50,49 68,76 58,80" fill="#0F172A" />
              <polygon points="58,80 68,76 102,92 94,97" fill="#B07246" />

              {/* Hand Holding Screwdriver */}
              <polygon points="94,97 102,92 106,97 98,102" fill="#C68B59" />

              {/* Precision Magnetic Screwdriver */}
              {/* Safety Orange Ergonomic Grip Handle (#FF5500) */}
              <rect
                x="100"
                y="90"
                width="14"
                height="4.5"
                rx="1"
                fill="#FF5500"
                stroke="#A13706"
                strokeWidth="0.5"
                transform="rotate(28, 100, 90)"
              />
              {/* Chrome Silver Shaft & Magnetic Tip */}
              <line
                x1="112"
                y1="97"
                x2="136"
                y2="110"
                stroke="#E2E8F0"
                strokeWidth="1.8"
              />
              <circle cx="136" cy="110" r="1.2" fill="#64748B" />

              {/* Head & Neck (Focused Posture Looking Down into Chassis) */}
              <polygon points="26,48 34,44 36,56 28,60" fill="#B07246" />

              {/* Chiseled Geometric Head */}
              <polygon
                points="22,26 38,18 46,32 30,40"
                fill="#C68B59"
                stroke="#9A6538"
                strokeWidth="0.75"
              />
              <polygon
                points="38,18 48,23 52,38 46,32"
                fill="#A66735"
              />

              {/* Geometric Glasses Framing Eye Pixels */}
              <rect x="27" y="27" width="8" height="5" rx="1" fill="#0F172A" />
              <rect x="37" y="23" width="7" height="5" rx="1" fill="#0F172A" />
              <line x1="35" y1="27" x2="37" y2="26" stroke="#00F0FF" strokeWidth="0.8" />
              <rect x="28.5" y="28" width="5" height="3" fill="#00F0FF" opacity="0.8" />
              <rect x="38.5" y="24" width="4" height="3" fill="#00F0FF" opacity="0.8" />

              {/* Spiky Dark Geometric Hair (#1E1B18) */}
              <polygon
                points="18,22 28,12 36,16 46,10 50,20 42,24 36,18 24,26"
                fill="#1E1B18"
                stroke="#111318"
                strokeWidth="0.8"
              />
              <polygon points="28,12 36,16 32,20" fill="#2E2824" />
              <polygon points="36,16 46,10 44,17" fill="#2E2824" />
              <polygon points="46,10 50,20 47,23" fill="#141210" />
            </g>
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
