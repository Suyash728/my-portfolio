"use client";

import React from "react";

export interface HardwarePin {
  id: string;
  number: number;
  label: string;
  category: string;
  x: number;
  y: number;
}

export const HARDWARE_PINS: HardwarePin[] = [
  {
    id: "gpu",
    number: 1,
    label: "GPU / Local AI Silicon",
    category: "Inference & Thermals",
    x: 270,
    y: 200,
  },
  {
    id: "cpu",
    number: 2,
    label: "CPU & Thermal Headroom",
    category: "Fan Curves & Acoustic Tuning",
    x: 180,
    y: 130,
  },
  {
    id: "kernel",
    number: 3,
    label: "OS & Kernel Scheduler",
    category: "CachyOS / Low-Latency BORE",
    x: 140,
    y: 270,
  },
  {
    id: "memory",
    number: 4,
    label: "Memory & Storage Bus",
    category: "32GB DDR4 & NVMe M.2",
    x: 250,
    y: 90,
  },
  {
    id: "swarm",
    number: 5,
    label: "Multi-Agent Orchestrator",
    category: "Local LLM Tool-Calling Loop",
    x: 360,
    y: 150,
  },
];

interface RigBlueprintProps {
  activePinId: string;
  onSelectPin: (id: string) => void;
  className?: string;
}

export function RigBlueprint({
  activePinId,
  onSelectPin,
  className = "",
}: RigBlueprintProps) {
  return (
    <div
      className={`relative w-full select-none ${className}`}
      role="region"
      aria-label="Interactive PC Rig Blueprint"
    >
      <svg
        viewBox="0 0 460 360"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
      >
        <defs>
          <style>{`
            .bp-grid { stroke: #DFD9CE; stroke-width: 1px; stroke-dasharray: 4 4; opacity: 0.6; }
            .bp-outline { stroke: #1D1F24; stroke-width: 2px; stroke-linecap: square; stroke-linejoin: miter; }
            .bp-subline { stroke: #8A877F; stroke-width: 1px; }
            .bp-pin-pulse { animation: pin-ring 2s cubic-bezier(0, 0, 0.2, 1) infinite; }
            @keyframes pin-ring { 70%, 100% { transform: scale(1.6); opacity: 0; } }
          `}</style>
          <pattern id="blueprintGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E6E0D5" strokeWidth="0.8" />
          </pattern>
        </defs>

        {/* Blueprint Grid Background */}
        <rect x="10" y="10" width="440" height="340" fill="#FBF9F5" />
        <rect x="10" y="10" width="440" height="340" fill="url(#blueprintGrid)" />
        <rect x="10" y="10" width="440" height="340" stroke="#DFD9CE" strokeWidth="1" />

        {/* Technical Coordinate Markers */}
        <text x="24" y="32" fill="#8A877F" fontSize="9" fontFamily="sans-serif" letterSpacing="0.05em">
          SYS_SCHEMATIC // REV 2026.11 // CACHYOS_X86_64
        </text>
        <text x="350" y="32" fill="#1F4B6E" fontSize="9" fontFamily="sans-serif" fontWeight="600">
          1440P @ 180HZ
        </text>

        {/* ================= PC CASE CHASSIS OUTLINE ================= */}
        <g id="chassis-diagram">
          {/* Main Case Perimeter */}
          <rect x="60" y="55" width="340" height="260" fill="#F2EFE9" className="bp-outline" />

          {/* Motherboard Baseplate (B550M AORUS Form Factor) */}
          <rect x="90" y="70" width="240" height="210" fill="#EAE5DC" stroke="#8A877F" strokeWidth="1.5" strokeDasharray="6 3" />
          <text x="98" y="86" fill="#5C5B55" fontSize="8" fontFamily="sans-serif" fontWeight="600">
            GIGABYTE B550M AORUS ELITE AX
          </text>

          {/* PCIe Expansion Slots */}
          <rect x="120" y="185" width="180" height="10" fill="#DFD9CE" className="bp-subline" />
          <rect x="120" y="245" width="180" height="8" fill="#DFD9CE" className="bp-subline" />

          {/* CPU Socket & Air Cooler (Ryzen 5 5600) */}
          <g id="cpu-cooler-schematic">
            <rect x="150" y="105" width="65" height="65" fill="#DFD9CE" className="bp-outline" />
            <circle cx="182.5" cy="137.5" r="24" fill="#F2EFE9" stroke="#1D1F24" strokeWidth="1.5" />
            {/* Heatpipe Fin Array */}
            <line x1="165" y1="120" x2="200" y2="120" stroke="#8A877F" strokeWidth="1" />
            <line x1="162" y1="128" x2="203" y2="128" stroke="#8A877F" strokeWidth="1" />
            <line x1="162" y1="138" x2="203" y2="138" stroke="#8A877F" strokeWidth="1" />
            <line x1="162" y1="148" x2="203" y2="148" stroke="#8A877F" strokeWidth="1" />
            <line x1="165" y1="156" x2="200" y2="156" stroke="#8A877F" strokeWidth="1" />
            <text x="162" y="178" fill="#1D1F24" fontSize="7" fontFamily="sans-serif" fontWeight="600">
              RYZEN 5 5600
            </text>
          </g>

          {/* Dual RAM Modules (32GB DDR4) */}
          <g id="ram-schematic">
            <rect x="232" y="98" width="8" height="72" fill="#1F4B6E" stroke="#1D1F24" strokeWidth="1" />
            <rect x="246" y="98" width="8" height="72" fill="#1F4B6E" stroke="#1D1F24" strokeWidth="1" />
            <text x="226" y="88" fill="#5C5B55" fontSize="7" fontFamily="sans-serif">32GB DDR4</text>
          </g>

          {/* NVMe M.2 Shield */}
          <rect x="150" y="198" width="60" height="14" fill="#5C5B55" stroke="#1D1F24" strokeWidth="1" />
          <text x="156" y="208" fill="#FBF9F5" fontSize="6.5" fontFamily="sans-serif">NVMe PCIe 4.0</text>

          {/* GPU Unit (NVIDIA RTX 5060 Ti 16GB) */}
          <g id="gpu-schematic">
            <rect x="120" y="172" width="200" height="58" fill="#FBF9F5" className="bp-outline" />
            {/* Dual Cooling Fans */}
            <circle cx="170" cy="201" r="20" fill="#F2EFE9" stroke="#1F4B6E" strokeWidth="1.5" />
            <circle cx="170" cy="201" r="5" fill="#1F4B6E" />
            <line x1="155" y1="201" x2="185" y2="201" stroke="#1F4B6E" strokeWidth="1" />
            <line x1="170" y1="186" x2="170" y2="216" stroke="#1F4B6E" strokeWidth="1" />

            <circle cx="235" cy="201" r="20" fill="#F2EFE9" stroke="#1F4B6E" strokeWidth="1.5" />
            <circle cx="235" cy="201" r="5" fill="#1F4B6E" />
            <line x1="220" y1="201" x2="250" y2="201" stroke="#1F4B6E" strokeWidth="1" />
            <line x1="235" y1="186" x2="235" y2="216" stroke="#1F4B6E" strokeWidth="1" />

            <rect x="270" y="180" width="44" height="42" fill="#1F4B6E" />
            <text x="275" y="196" fill="#FBF9F5" fontSize="7" fontFamily="sans-serif" fontWeight="600">
              RTX 5060Ti
            </text>
            <text x="275" y="208" fill="#DFD9CE" fontSize="6.5" fontFamily="sans-serif">
              16GB VRAM
            </text>
          </g>

          {/* Front Intake Fans & Flow */}
          <g id="intake-fans">
            <rect x="375" y="80" width="14" height="50" fill="#DFD9CE" className="bp-subline" />
            <rect x="375" y="145" width="14" height="50" fill="#DFD9CE" className="bp-subline" />
            <rect x="375" y="210" width="14" height="50" fill="#DFD9CE" className="bp-subline" />
            {/* Airflow paths */}
            <path d="M 398 105 L 360 105" stroke="#1F4B6E" strokeWidth="1" strokeDasharray="2 2" />
            <path d="M 398 170 L 330 170" stroke="#1F4B6E" strokeWidth="1" strokeDasharray="2 2" />
            <path d="M 398 235 L 330 235" stroke="#1F4B6E" strokeWidth="1" strokeDasharray="2 2" />
          </g>

          {/* OS & Kernel Subsystem Callout Box */}
          <rect x="75" y="260" width="130" height="28" fill="#1D1F24" />
          <text x="82" y="274" fill="#FBF9F5" fontSize="7" fontFamily="sans-serif" fontWeight="600">
            CACHYOS // LINUX 7.3
          </text>
          <text x="82" y="283" fill="#8A6414" fontSize="6" fontFamily="sans-serif">
            BORE SCHEDULER ACTIVE
          </text>
        </g>

        {/* ================= INTERACTIVE HOTSPOT PINS ================= */}
        {HARDWARE_PINS.map((pin) => {
          const isActive = activePinId === pin.id;
          return (
            <g
              key={pin.id}
              className="cursor-pointer transition-colors duration-200"
              onClick={() => onSelectPin(pin.id)}
              role="button"
              tabIndex={0}
              aria-label={`Select ${pin.label}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelectPin(pin.id);
                }
              }}
            >
              {/* Outer pulsing ring if active */}
              {isActive && (
                <circle
                  cx={pin.x}
                  cy={pin.y}
                  r="14"
                  fill="none"
                  stroke="#1F4B6E"
                  strokeWidth="2"
                  className="bp-pin-pulse"
                  style={{ transformOrigin: `${pin.x}px ${pin.y}px` }}
                />
              )}

              {/* Pin Base Circle */}
              <circle
                cx={pin.x}
                cy={pin.y}
                r={isActive ? "13" : "11"}
                fill={isActive ? "#1F4B6E" : "#1D1F24"}
                stroke="#FBF9F5"
                strokeWidth="2"
              />

              {/* Pin Number */}
              <text
                x={pin.x}
                y={pin.y + 3.5}
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize="9"
                fontFamily="sans-serif"
                fontWeight="600"
              >
                {pin.number}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
