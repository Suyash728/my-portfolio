"use client";

import React, { useState } from "react";
import { sound } from "@/lib/sound";

interface AgentNode {
  id: string;
  name: string;
  role: string;
  x: number;
  y: number;
}

const NODES: AgentNode[] = [
  { id: "coord", name: "Coordinator", role: "Planning & State", x: 60, y: 120 },
  { id: "vllm", name: "vLLM NVFP4", role: "Qwen3-14B Core", x: 200, y: 55 },
  { id: "rules", name: "Rule Engine", role: "Deterministic AST", x: 200, y: 185 },
  { id: "verifier", name: "Verifier", role: "Citation Gate", x: 340, y: 120 },
];

export function AgentSwarmVisualizer() {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const handleStep = () => {
    sound.playClick();
    setActiveStep((prev) => (prev % 4) + 1);
  };

  const handleRunFullLoop = () => {
    sound.playSwitch();
    setIsSimulating(true);
    let step = 1;
    setActiveStep(1);
    const interval = setInterval(() => {
      step++;
      if (step <= 4) {
        sound.playClick();
        setActiveStep(step);
      } else {
        clearInterval(interval);
        setIsSimulating(false);
        sound.playSuccess();
      }
    }, 600);
  };

  return (
    <div className="w-full border border-rule bg-raised/70 p-5 transition-colors">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rule-soft pb-3 mb-4">
        <div>
          <h3 className="font-sans text-title font-semibold text-ink">
            Autonomous Multi-Agent Topology
          </h3>
          <p className="font-narrow text-tiny uppercase tracking-eyebrow text-muted mt-0.5">
            Local Swarm Coordination // Blackwell NVFP4 Node
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleStep}
            disabled={isSimulating}
            className="border border-rule-strong bg-ground px-3 py-1 font-narrow text-tiny uppercase tracking-eyebrow text-ink hover:bg-raised transition-colors disabled:opacity-50"
          >
            Step Cycle
          </button>

          <button
            type="button"
            onClick={handleRunFullLoop}
            disabled={isSimulating}
            className="border border-signal bg-signal px-3 py-1 font-narrow text-tiny uppercase tracking-eyebrow font-semibold text-raised hover:bg-signal/90 transition-colors disabled:opacity-50"
          >
            {isSimulating ? "Simulating..." : "Execute Swarm Loop"}
          </button>
        </div>
      </div>

      {/* Interactive SVG Flow Diagram */}
      <div className="relative w-full max-w-[500px] mx-auto select-none py-2">
        <svg
          viewBox="0 0 400 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          {/* Hairline Connecting Structural Bus */}
          <path d="M 105 120 L 160 70" stroke="#DFD9CE" strokeWidth="1.5" />
          <path d="M 105 120 L 160 170" stroke="#DFD9CE" strokeWidth="1.5" />
          <path d="M 240 70 L 295 120" stroke="#DFD9CE" strokeWidth="1.5" />
          <path d="M 240 170 L 295 120" stroke="#DFD9CE" strokeWidth="1.5" />

          {/* Active Data Packet Indicators */}
          {activeStep === 1 && (
            <circle cx="130" cy="95" r="4" fill="#1F4B6E" />
          )}
          {activeStep === 2 && (
            <circle cx="200" cy="120" r="4" fill="#8A6414" />
          )}
          {activeStep === 3 && (
            <circle cx="270" cy="145" r="4" fill="#1F4B6E" />
          )}

          {/* Instrumentation Nodes: Sharp 1px Rectangles */}
          {NODES.map((node) => {
            const isNodeActive =
              (node.id === "coord" && activeStep === 1) ||
              (node.id === "vllm" && activeStep === 2) ||
              (node.id === "rules" && activeStep === 3) ||
              (node.id === "verifier" && activeStep === 4);

            return (
              <g key={node.id} transform={`translate(${node.x - 45}, ${node.y - 35})`}>
                <rect
                  x="0"
                  y="0"
                  width="90"
                  height="70"
                  fill={isNodeActive ? "#FBF9F5" : "#F2EFE9"}
                  stroke={isNodeActive ? (node.id === "rules" ? "#8A6414" : "#1F4B6E") : "#DFD9CE"}
                  strokeWidth={isNodeActive ? "2" : "1"}
                  className="transition-colors duration-200"
                />

                {/* Node Status Indicator Pill */}
                <rect
                  x="6"
                  y="6"
                  width="8"
                  height="8"
                  fill={isNodeActive ? (node.id === "rules" ? "#8A6414" : "#1F4B6E") : "#8A877F"}
                />

                <text
                  x="45"
                  y="38"
                  textAnchor="middle"
                  fill="#1D1F24"
                  fontSize="11"
                  fontFamily="sans-serif"
                  fontWeight="600"
                >
                  {node.name}
                </text>

                <text
                  x="45"
                  y="54"
                  textAnchor="middle"
                  fill="#5C5B55"
                  fontSize="9.5"
                  fontFamily="sans-serif"
                >
                  {node.role}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Active Phase Status Footer */}
      <div className="mt-3 border border-rule-soft bg-ground/80 p-3 font-sans text-small text-muted flex items-center justify-between">
        <div>
          <span className="font-semibold text-ink">Active Phase: </span>
          {activeStep === 1 &&
            "Coordinator decomposing goal into structured sub-tasks with strict tool schemas."}
          {activeStep === 2 &&
            "vLLM local inference core generating candidate solutions within memory boundaries."}
          {activeStep === 3 &&
            "Deterministic Rule Engine evaluating proposals against typed TypeScript AST tables."}
          {activeStep === 4 &&
            "Verifier compiling validated citations and outputting cryptographically verified payload."}
        </div>
        <span className="shrink-0 font-narrow text-tiny uppercase tracking-eyebrow font-semibold text-signal ml-3 tabular-nums">
          STAGE 0{activeStep} / 04
        </span>
      </div>
    </div>
  );
}
