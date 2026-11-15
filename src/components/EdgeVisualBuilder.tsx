"use client";

import React, { useState } from "react";
import { sound } from "@/lib/sound";
import { Zap, Check } from "lucide-react";

export function EdgeVisualBuilder() {
  const [isHovered, setIsHovered] = useState(false);
  const [postTest, setPostTest] = useState(false);

  const handleTestPost = () => {
    sound.playSuccess();
    setPostTest(true);
    setTimeout(() => setPostTest(false), 3000);
  };

  return (
    <aside
      aria-label="Hands-On PC Assembly Visual"
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
        {/* Subtle Hover Status Badge + Interactive POST button */}
        <div className="flex items-center justify-between mb-1.5 px-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-rule bg-surface/90 px-2 py-0.5 font-narrow text-[10px] uppercase tracking-eyebrow text-muted shadow-xs">
            <span
              className={`size-1.5 rounded-full ${
                postTest ? "bg-emerald-500 animate-ping" : "bg-accent-orange"
              }`}
            />
            Custom Built Rig
          </span>

          <button
            type="button"
            onClick={handleTestPost}
            title="Trigger POST Power-on Test"
            className="flex items-center gap-1 rounded bg-surface border border-rule px-1.5 py-0.5 font-narrow text-[9.5px] uppercase tracking-eyebrow text-muted hover:text-ink hover:border-signal-teal transition-colors"
          >
            {postTest ? (
              <>
                <Check className="size-2.5 text-emerald-600" />
                <span className="text-emerald-600 font-bold">POST OK</span>
              </>
            ) : (
              <>
                <Zap className="size-2.5 text-accent-orange" />
                <span>Test ⚡</span>
              </>
            )}
          </button>
        </div>

        {/* Clean Transparent Vector SVG Vignette (No card frame!) */}
        <svg
          viewBox="0 0 500 420"
          className="w-full h-auto drop-shadow-sm filter"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="goldEdge" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#EAB308" />
              <stop offset="50%" stopColor="#FACC15" />
              <stop offset="100%" stopColor="#CA8A04" />
            </linearGradient>
          </defs>

          {/* ESD Blue Assembly Mat */}
          <rect x="30" y="340" width="440" height="25" rx="3" fill="#1E3A8A" stroke="#181A1F" strokeWidth="2.5" />
          <circle cx="50" cy="352" r="3.5" fill="#CBD5E1" stroke="#181A1F" strokeWidth="1.2" />

          {/* Staged 27" Monitor angled away during assembly */}
          <rect x="35" y="190" width="75" height="150" rx="3" fill="#181A1F" stroke="#181A1F" strokeWidth="2" />
          <rect x="38" y="193" width="69" height="144" rx="2" fill="#111318" />
          <text x="44" y="270" fill="#64748B" fontSize="6.5" fontFamily="monospace">
            MSI 180Hz
          </text>

          {/* Motherboard / GPU Packaging Box */}
          <polygon points="65,145 110,125 110,230 65,245" fill="#3B4252" stroke="#181A1F" strokeWidth="1.8" />
          <polygon points="20,165 65,145 65,245 20,260" fill="#4C566A" stroke="#181A1F" strokeWidth="1.8" />
          <text x="28" y="210" fill="#ECEFF4" fontSize="6" fontFamily="monospace" fontWeight="bold">
            B550M
          </text>

          {/* Open Lian Li Lancool 207 Chassis */}
          <rect x="220" y="120" width="220" height="235" rx="5" fill="#181A1F" stroke="#181A1F" strokeWidth="2.5" />
          {/* Open Main Chamber (Tool-free glass removed) */}
          <rect x="225" y="125" width="210" height="225" rx="3" fill="#12141A" />

          {/* Dual 140mm Front Fans behind fine mesh */}
          <circle
            cx="415"
            cy="175"
            r="16"
            fill="#1A1D24"
            stroke={postTest ? "#2DD4BF" : "#2E333D"}
            strokeWidth="2"
          />
          <g
            className={postTest ? "animate-spin" : ""}
            style={{ transformOrigin: "415px 175px", animationDuration: "0.5s" }}
          >
            <line x1="415" y1="162" x2="415" y2="188" stroke={postTest ? "#2DD4BF" : "#3E4554"} strokeWidth="1.8" />
            <line x1="402" y1="175" x2="428" y2="175" stroke={postTest ? "#2DD4BF" : "#3E4554"} strokeWidth="1.8" />
          </g>

          <circle
            cx="415"
            cy="235"
            r="16"
            fill="#1A1D24"
            stroke={postTest ? "#F97316" : "#2E333D"}
            strokeWidth="2"
          />
          <g
            className={postTest ? "animate-spin" : ""}
            style={{ transformOrigin: "415px 235px", animationDuration: "0.5s" }}
          >
            <line x1="415" y1="222" x2="415" y2="248" stroke={postTest ? "#F97316" : "#3E4554"} strokeWidth="1.8" />
            <line x1="402" y1="235" x2="428" y2="235" stroke={postTest ? "#F97316" : "#3E4554"} strokeWidth="1.8" />
          </g>

          {/* Motherboard Tray PCB */}
          <rect x="235" y="135" width="160" height="145" rx="3" fill="#161922" stroke="#252A36" strokeWidth="1.2" />

          {/* AM4 CPU Cooler */}
          <rect x="250" y="145" width="45" height="50" rx="3" fill="#2B303A" stroke="#3E4554" strokeWidth="1.5" />
          <line x1="258" y1="145" x2="258" y2="195" stroke="#4F5666" strokeWidth="1" />
          <line x1="268" y1="145" x2="268" y2="195" stroke="#4F5666" strokeWidth="1" />
          <line x1="278" y1="145" x2="278" y2="195" stroke="#4F5666" strokeWidth="1" />

          {/* Dual RAM Sticks */}
          <rect x="302" y="150" width="4" height="35" rx="1" fill={postTest ? "#2DD4BF" : "#2A303C"} />
          <rect x="308" y="150" width="4" height="35" rx="1" fill={postTest ? "#2DD4BF" : "#2A303C"} />

          {/* PCIe 4.0 x16 Primary Slot with Gold Contacts */}
          <rect x="245" y="215" width="130" height="8" rx="1.5" fill="#0D0E12" stroke="#374151" strokeWidth="1" />
          <line x1="250" y1="219" x2="355" y2="219" stroke="url(#goldEdge)" strokeWidth="1.5" strokeDasharray="3 2" />

          {/* POST Diagnostic LED */}
          <circle cx="365" cy="145" r="2.5" fill={postTest ? "#22C55E" : "#374151"} className={postTest ? "animate-ping" : ""} />
          <circle cx="365" cy="145" r="2.5" fill={postTest ? "#22C55E" : "#374151"} />
          <text x="372" y="148" fill={postTest ? "#4ADE80" : "#64748B"} fontSize="5" fontFamily="monospace">
            {postTest ? "POST OK" : "BOOT"}
          </text>

          {/* Perforated PSU Shroud Floor */}
          <rect x="225" y="280" width="210" height="70" fill="#181A1F" stroke="#252A34" strokeWidth="1" />
          {/* Dual 120mm Fans on Shroud blowing upward */}
          <circle cx="270" cy="305" r="12" fill="#101216" stroke={postTest ? "#00A896" : "#2E333D"} strokeWidth="1.5" />
          <circle cx="310" cy="305" r="12" fill="#101216" stroke={postTest ? "#00A896" : "#2E333D"} strokeWidth="1.5" />

          {/* Leaning Detached Tempered Glass Panel (leaning nearby) */}
          <polygon points="445,130 460,130 466,355 451,355" fill="none" stroke="#64748B" strokeWidth="1.8" />
          <line x1="450" y1="140" x2="457" y2="345" stroke="#FFFFFF" strokeWidth="1" opacity="0.4" />

          {/* Character: Suyash Leaning In at 45° holding screwdriver */}
          {/* Torso */}
          <path
            d="M80,260 C80,225 105,210 135,210 C165,210 190,225 198,260 L215,355 L80,355 Z"
            fill="#1E293B"
            stroke="#181A1F"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <path d="M124,212 Q136,222 148,212" fill="none" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />

          {/* Left Arm holding RTX 5060 Ti GPU */}
          <path
            d="M110,250 C130,270 180,275 235,245"
            fill="none"
            stroke="#1E293B"
            strokeWidth="18"
            strokeLinecap="round"
          />
          <path
            d="M110,250 C130,270 180,275 235,245"
            fill="none"
            stroke="#181A1F"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <ellipse cx="238" cy="244" rx="7" ry="5" fill="#FAD5BA" stroke="#181A1F" strokeWidth="1.8" />

          {/* RTX 5060 Ti GPU being seated into PCIe slot */}
          <g>
            <rect x="230" y="210" width="115" height="26" rx="2.5" fill="#1E222B" stroke="#181A1F" strokeWidth="1.8" />
            <rect x="225" y="200" width="5" height="42" rx="1.5" fill="#94A3B8" stroke="#181A1F" strokeWidth="1.5" />
            <rect x="242" y="218" width="60" height="7" rx="1.5" fill="#12151B" />
            <text x="246" y="223" fill={postTest ? "#F97316" : "#CBD5E1"} fontSize="4.5" fontFamily="monospace" fontWeight="bold">
              RTX 5060 Ti 16GB
            </text>
            <rect x="240" y="216" width="95" height="2" fill="url(#goldEdge)" />
          </g>

          {/* Right Arm wielding precision screwdriver */}
          <path
            d="M165,250 C190,270 215,255 232,215"
            fill="none"
            stroke="#1E293B"
            strokeWidth="17"
            strokeLinecap="round"
          />
          <path
            d="M165,250 C190,270 215,255 232,215"
            fill="none"
            stroke="#181A1F"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <ellipse cx="232" cy="212" rx="7" ry="5" fill="#FAD5BA" stroke="#181A1F" strokeWidth="1.8" />

          {/* Precision Screwdriver */}
          <rect x="220" y="208" width="18" height="5" rx="1.5" fill="#64748B" stroke="#181A1F" strokeWidth="1" />
          <line x1="238" y1="210" x2="252" y2="210" stroke="#CBD5E1" strokeWidth="1.8" strokeLinecap="round" />

          {/* Head & Neck (Leaning angle) */}
          <rect x="128" y="175" width="16" height="36" rx="4" fill="#F0C09F" stroke="#181A1F" strokeWidth="2" />
          <circle cx="136" cy="155" r="26" fill="#FAD5BA" stroke="#181A1F" strokeWidth="2.5" />

          {/* Focused Expression */}
          <circle cx="147" cy="153" r="2.2" fill="#181A1F" />
          <circle cx="158" cy="151" r="2.2" fill="#181A1F" />
          <path d="M144,147 Q149,145 153,147" fill="none" stroke="#181A1F" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M157,145 Q161,143 165,145" fill="none" stroke="#181A1F" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M150,165 Q156,169 161,165" fill="none" stroke="#181A1F" strokeWidth="1.6" strokeLinecap="round" />

          {/* Spiky Swept-Up Hair */}
          <path
            d="M110,145 C105,118 122,98 144,103 C155,90 170,95 174,110 C182,110 185,122 181,133 C177,129 172,128 168,131 C168,125 161,121 156,125 C150,121 144,123 140,128 C131,125 122,131 119,140 Z"
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
            Custom Built · 0.0 GB Host Offload
          </span>
        </div>
      </div>
    </aside>
  );
}
