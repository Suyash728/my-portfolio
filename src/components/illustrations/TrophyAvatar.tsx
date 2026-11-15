"use client";

import React from "react";

export function TrophyAvatar({ className = "" }: { className?: string }) {
  return (
    <div
      className={`inline-block select-none ${className}`}
      role="img"
      aria-label="Practical Psychology style avatar holding the 1st place CodeFusion trophy"
    >
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-xs"
      >
        <defs>
          <style>{`
            .tp-stroke { stroke: #1D1F24; stroke-width: 2.8px; stroke-linecap: round; stroke-linejoin: round; }
            .tp-thin { stroke: #1D1F24; stroke-width: 1.8px; stroke-linecap: round; stroke-linejoin: round; }
          `}</style>
        </defs>

        {/* Character Torso */}
        <path d="M 38 65 L 30 110 L 80 110 L 72 65 Z" fill="#1F4B6E" className="tp-stroke" />

        {/* Neck */}
        <path d="M 47 58 L 47 68 C 47 72 63 72 63 68 L 63 58 Z" fill="#F9C59D" className="tp-stroke" />

        {/* Head */}
        <path d="M 42 28 L 38 60 C 38 66 72 66 72 60 L 68 28 C 68 22 42 22 42 28 Z" fill="#F9C59D" className="tp-stroke" />

        {/* Practical Psychology Angular Hair */}
        <path
          d="M 38 32 C 34 22 40 12 50 10 C 60 8 72 12 74 22 C 72 20 68 18 64 20 C 58 14 52 16 48 22 C 44 20 40 24 38 32 Z"
          fill="#3D271D"
          className="tp-stroke"
        />

        {/* Eyes: Vertical short dashes */}
        <line x1="48" y1="38" x2="48" y2="44" stroke="#1D1F24" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="62" y1="38" x2="62" y2="44" stroke="#1D1F24" strokeWidth="2.5" strokeLinecap="round" />

        {/* Smug, triumphant grin */}
        <path d="M 50 50 Q 56 57 63 50" fill="none" stroke="#1D1F24" strokeWidth="2.5" strokeLinecap="round" />

        {/* Right Arm: Raised holding trophy */}
        <path d="M 72 68 C 84 66 94 58 96 46" fill="none" className="tp-stroke" />
        <circle cx="96" cy="45" r="4.5" fill="#F9C59D" className="tp-stroke" />

        {/* Gold Trophy Cup */}
        <g id="trophy-cup">
          {/* Trophy Base */}
          <rect x="86" y="52" width="20" height="6" rx="1.5" fill="#8A6414" className="tp-stroke" />
          <rect x="92" y="44" width="8" height="8" fill="#D97706" className="tp-stroke" />

          {/* Cup Bowl */}
          <path
            d="M 86 28 C 86 42 106 42 106 28 L 106 24 L 86 24 Z"
            fill="#F59E0B"
            className="tp-stroke"
          />

          {/* Trophy Handles */}
          <path d="M 86 26 C 80 26 80 34 86 36" fill="none" className="tp-stroke" />
          <path d="M 106 26 C 112 26 112 34 106 36" fill="none" className="tp-stroke" />

          {/* Trophy Star / "1st" text */}
          <text x="96" y="34" textAnchor="middle" fill="#FFFFFF" fontSize="7" fontFamily="sans-serif" fontWeight="bold">
            1
          </text>
        </g>
      </svg>
    </div>
  );
}
