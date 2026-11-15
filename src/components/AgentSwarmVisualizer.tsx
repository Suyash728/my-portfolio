"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Bot, Cpu, ShieldCheck, CheckCircle2, Play, RefreshCw } from "lucide-react";
import { sound } from "@/lib/sound";

interface AgentNode {
  id: string;
  name: string;
  role: string;
  x: number;
  y: number;
  icon: React.ElementType;
  color: string;
}

const NODES: AgentNode[] = [
  { id: "coord", name: "Coordinator", role: "Planning & State", x: 60, y: 120, icon: Bot, color: "#1F4B6E" },
  { id: "vllm", name: "vLLM NVFP4", role: "Qwen3-14B Inference", x: 200, y: 50, icon: Cpu, color: "#10B981" },
  { id: "rules", name: "Rule Engine", role: "Deterministic AST", x: 200, y: 190, icon: ShieldCheck, color: "#8A6414" },
  { id: "verifier", name: "Verifier", role: "Citation & Output", x: 340, y: 120, icon: CheckCircle2, color: "#3B82F6" },
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
    <div className="w-full rounded-2xl border border-rule bg-raised/70 p-5 shadow-sm backdrop-blur-md">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rule-soft pb-3 mb-4">
        <div>
          <h4 className="font-sans text-title font-semibold text-ink">
            Autonomous Multi-Agent Topology
          </h4>
          <p className="font-narrow text-tiny uppercase tracking-eyebrow text-muted mt-0.5">
            Local Swarm Coordination // Blackwell NVFP4 Node
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleStep}
            disabled={isSimulating}
            className="inline-flex items-center gap-1.5 rounded-lg border border-rule bg-ground px-3 py-1 font-narrow text-tiny uppercase tracking-eyebrow text-ink hover:bg-raised transition-colors disabled:opacity-50"
          >
            <RefreshCw className="size-3" />
            <span>Step Cycle</span>
          </button>

          <button
            onClick={handleRunFullLoop}
            disabled={isSimulating}
            className="inline-flex items-center gap-1.5 rounded-lg bg-signal px-3 py-1 font-narrow text-tiny uppercase tracking-eyebrow font-semibold text-raised shadow-xs hover:bg-signal/90 transition-colors disabled:opacity-50"
          >
            <Play className={`size-3 ${isSimulating ? "animate-spin" : ""}`} />
            <span>{isSimulating ? "Simulating..." : "Execute Swarm Loop"}</span>
          </button>
        </div>
      </div>

      {/* Interactive SVG Flow Diagram */}
      <div className="relative w-full max-w-[500px] mx-auto select-none">
        <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          {/* Connecting Pipes with Animated Dash Paths */}
          <path d="M 100 120 L 160 70" stroke="#DFD9CE" strokeWidth="2.5" strokeDasharray="4 4" />
          <path d="M 100 120 L 160 170" stroke="#DFD9CE" strokeWidth="2.5" strokeDasharray="4 4" />
          <path d="M 240 70 L 300 120" stroke="#DFD9CE" strokeWidth="2.5" strokeDasharray="4 4" />
          <path d="M 240 170 L 300 120" stroke="#DFD9CE" strokeWidth="2.5" strokeDasharray="4 4" />

          {/* Active Packet Beams */}
          {activeStep === 1 && (
            <motion.circle
              cx="130"
              cy="95"
              r="4.5"
              fill="#10B981"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ repeat: Infinity, duration: 1 }}
            />
          )}
          {activeStep === 2 && (
            <motion.circle
              cx="200"
              cy="120"
              r="5"
              fill="#8A6414"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ repeat: Infinity, duration: 1 }}
            />
          )}
          {activeStep === 3 && (
            <motion.circle
              cx="270"
              cy="145"
              r="4.5"
              fill="#3B82F6"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ repeat: Infinity, duration: 1 }}
            />
          )}

          {/* Nodes */}
          {NODES.map((node) => {
            const isNodeActive =
              (node.id === "coord" && activeStep === 1) ||
              (node.id === "vllm" && activeStep === 2) ||
              (node.id === "rules" && activeStep === 3) ||
              (node.id === "verifier" && activeStep === 4);

            return (
              <g key={node.id} transform={`translate(${node.x - 35}, ${node.y - 35})`}>
                <rect
                  x="0"
                  y="0"
                  width="70"
                  height="70"
                  rx="14"
                  fill={isNodeActive ? "#FAF8F5" : "#F4F0E8"}
                  stroke={isNodeActive ? node.color : "#DFD9CE"}
                  strokeWidth={isNodeActive ? "2.5" : "1.5"}
                  className="transition-all duration-200"
                />

                <circle
                  cx="35"
                  cy="26"
                  r="12"
                  fill={isNodeActive ? node.color : "#E2DDD2"}
                  className="transition-colors duration-200"
                />

                <text
                  x="35"
                  y="48"
                  textAnchor="middle"
                  fill="#1D1F24"
                  fontSize="8.5"
                  fontFamily="sans-serif"
                  fontWeight="bold"
                >
                  {node.name}
                </text>

                <text
                  x="35"
                  y="58"
                  textAnchor="middle"
                  fill="#5C5B55"
                  fontSize="6.5"
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
      <div className="mt-3 rounded-lg border border-rule-soft bg-ground/80 p-3 font-sans text-small text-muted flex items-center justify-between">
        <div>
          <span className="font-semibold text-ink">Active Phase: </span>
          {activeStep === 1 && "Coordinator decomposing goal into structured sub-tasks with strict tool schemas."}
          {activeStep === 2 && "vLLM local inference core generating candidate solutions within memory boundaries."}
          {activeStep === 3 && "Deterministic Rule Engine evaluating proposals against typed TypeScript AST tables."}
          {activeStep === 4 && "Verifier compiling validated citations and outputting cryptographically verified payload."}
        </div>
        <span className="shrink-0 font-narrow text-tiny uppercase tracking-eyebrow font-bold text-signal ml-3">
          Stage 0{activeStep} / 04
        </span>
      </div>
    </div>
  );
}
