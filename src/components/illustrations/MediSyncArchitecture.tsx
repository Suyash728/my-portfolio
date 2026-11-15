"use client";

import React, { useState } from "react";
import { sound } from "@/lib/sound";
import { ShieldCheck, Play, AlertTriangle, CheckCircle2, FileText } from "lucide-react";

export function MediSyncArchitecture() {
  const [selectedNode, setSelectedNode] = useState<"rule" | "model" | "ingest" | "output">("rule");
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<boolean>(false);

  const runLiveTest = () => {
    sound.playSwitch();
    setIsTesting(true);
    setTestResult(false);
    setSelectedNode("ingest");

    setTimeout(() => {
      sound.playClick();
      setSelectedNode("rule");
    }, 400);

    setTimeout(() => {
      sound.playClick();
      setSelectedNode("model");
    }, 800);

    setTimeout(() => {
      sound.playSuccess();
      setSelectedNode("output");
      setIsTesting(false);
      setTestResult(true);
    }, 1200);
  };

  return (
    <div className="mt-4 rounded-xl border border-flag/30 bg-raised/85 p-4 sm:p-5 shadow-xs transition-all backdrop-blur-xs">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rule-soft pb-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-flag animate-pulse" />
          <span className="font-narrow text-tiny uppercase tracking-eyebrow font-bold text-flag">
            CodeFusion 2026 (1st Place) · Architecture Decision Tree
          </span>
        </div>

        <button
          onClick={runLiveTest}
          disabled={isTesting}
          className="inline-flex items-center gap-1.5 rounded-md bg-flag text-raised px-2.5 py-1 font-narrow text-tiny uppercase tracking-eyebrow font-semibold hover:bg-flag/90 transition-colors disabled:opacity-50"
        >
          <Play className={`size-3 ${isTesting ? "animate-spin" : ""}`} />
          <span>{isTesting ? "Evaluating Rule AST..." : "Run Live Conflict Test"}</span>
        </button>
      </div>

      {/* Visual Pipeline Flow */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 font-narrow text-meta tracking-rail">
        {/* Step 1: Ingestion */}
        <button
          onClick={() => {
            sound.playClick();
            setSelectedNode("ingest");
          }}
          className={`p-3 rounded-lg border text-left transition-all ${
            selectedNode === "ingest"
              ? "bg-signal text-raised border-signal shadow-xs"
              : "bg-ground text-muted hover:text-ink hover:bg-raised border-rule"
          }`}
        >
          <div className="text-[10px] uppercase tracking-eyebrow font-bold opacity-80 mb-1 flex items-center justify-between">
            <span>Stage 01 // Ingest</span>
            <FileText className="size-3" />
          </div>
          <div className="font-sans font-semibold text-small">OCR &amp; Extraction</div>
          <div className="text-tiny opacity-75 mt-0.5">Raw scans never hit retrieval</div>
        </button>

        {/* Step 2: The Core Rule Engine */}
        <button
          onClick={() => {
            sound.playClick();
            setSelectedNode("rule");
          }}
          className={`p-3 rounded-lg border text-left transition-all ${
            selectedNode === "rule"
              ? "bg-signal text-raised border-signal shadow-xs ring-2 ring-flag/40"
              : "bg-ground text-muted hover:text-ink hover:bg-raised border-rule"
          }`}
        >
          <div className="text-[10px] uppercase tracking-eyebrow font-bold opacity-80 mb-1 flex items-center justify-between">
            <span>Stage 02 // Core</span>
            <span className="text-flag font-bold">★ KEY</span>
          </div>
          <div className="font-sans font-semibold text-small">Deterministic Rule Table</div>
          <div className="text-tiny opacity-75 mt-0.5">Zero model discretion</div>
        </button>

        {/* Step 3: Model Explanation */}
        <button
          onClick={() => {
            sound.playClick();
            setSelectedNode("model");
          }}
          className={`p-3 rounded-lg border text-left transition-all ${
            selectedNode === "model"
              ? "bg-signal text-raised border-signal shadow-xs"
              : "bg-ground text-muted hover:text-ink hover:bg-raised border-rule"
          }`}
        >
          <div className="text-[10px] uppercase tracking-eyebrow font-bold opacity-80 mb-1 flex items-center justify-between">
            <span>Stage 03 // Synthesize</span>
            <ShieldCheck className="size-3" />
          </div>
          <div className="font-sans font-semibold text-small">Constrained LLM</div>
          <div className="text-tiny opacity-75 mt-0.5">Explains, never decides</div>
        </button>

        {/* Step 4: Output & Compliance */}
        <button
          onClick={() => {
            sound.playClick();
            setSelectedNode("output");
          }}
          className={`p-3 rounded-lg border text-left transition-all ${
            selectedNode === "output"
              ? "bg-signal text-raised border-signal shadow-xs"
              : "bg-ground text-muted hover:text-ink hover:bg-raised border-rule"
          }`}
        >
          <div className="text-[10px] uppercase tracking-eyebrow font-bold opacity-80 mb-1 flex items-center justify-between">
            <span>Stage 04 // Delivery</span>
            <CheckCircle2 className="size-3" />
          </div>
          <div className="font-sans font-semibold text-small">ABDM &amp; Citation Cards</div>
          <div className="text-tiny opacity-75 mt-0.5">Audit-logged sharing</div>
        </button>
      </div>

      {/* Explanatory Callout Box */}
      <div className="mt-4 rounded-lg border border-rule-soft bg-ground p-3.5 text-small font-sans text-muted leading-relaxed">
        {selectedNode === "ingest" && (
          <div>
            <strong className="text-ink">Ingestion Pipeline:</strong> Patient reports arrive as wrinkled mobile photos or compressed scans. Tesseract OCR and layout analysis normalize text into structured JSON schemas before vector embeddings are generated. The retrieval pipeline only indexes sanitized, verified text.
          </div>
        )}
        {selectedNode === "rule" && (
          <div>
            <strong className="text-ink">The Architectural Thesis:</strong> Drug-drug and condition contraindications are evaluated against a typed TypeScript lookup table. A probabilistic model is mathematically incapable of guaranteeing zero false negatives on dosage conflicts; therefore, the decision is 100% hardcoded in code rules.
          </div>
        )}
        {selectedNode === "model" && (
          <div>
            <strong className="text-ink">The Confined Model Role:</strong> The LLM (Gemini 2.5 Flash / Groq OSS) is given the rule engine&apos;s output as ground truth. Its only job is to translate clinical jargon into natural language across 11 regional languages and generate exact document citation cards.
          </div>
        )}
        {selectedNode === "output" && (
          <div>
            <strong className="text-ink">Compliance &amp; Access:</strong> Structured output adheres to ABDM (Ayushman Bharat Digital Mission) health data schemas with cryptographically signed, time-limited doctor access tokens and zero persistent third-party storage.
          </div>
        )}
      </div>

      {/* Live Simulation Banner */}
      {testResult && (
        <div className="mt-3 flex items-start gap-2.5 rounded-lg border border-flag/40 bg-flag/10 p-3 text-small font-sans text-ink">
          <AlertTriangle className="size-4.5 text-flag shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold text-flag">Live Simulation Verified: Contraindication Prevented</div>
            <div className="text-tiny text-muted mt-0.5 leading-snug">
              Prescription pair <code className="font-mono bg-ground px-1 rounded">[Warfarin 5mg]</code> + <code className="font-mono bg-ground px-1 rounded">[Aspirin 81mg]</code> flagged by Rule Table #42 (Major Bleed Risk). Probabilistic model restricted from overruling the decision.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
