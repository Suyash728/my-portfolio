"use client";

import React from "react";
import confetti from "canvas-confetti";
import { facts, profile } from "@/content/profile";
import { BattlestationScene } from "@/components/illustrations/BattlestationScene";
import { sound } from "@/lib/sound";
import { Trophy, Search } from "lucide-react";

export function Hero() {
  const handleAwardClick = () => {
    sound.playSuccess();
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#8A6414", "#F59E0B", "#1F4B6E", "#10B981"],
    });
  };

  return (
    <section className="border-b border-rule px-5 py-9 wide:px-13 wide:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        {/* Left Column: Core Identity, Lede & Shipped Facts */}
        <div className="lg:col-span-7">
          <div className="rise inline-flex items-center gap-2 rounded-full border border-rule-strong/40 bg-raised px-3 py-1 text-tiny font-narrow uppercase tracking-eyebrow text-signal mb-5 [animation-delay:0.02s]">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Applied AI & Systems Engineering · Navi Mumbai
          </div>

          <h1 className="rise text-display font-semibold tracking-display text-balance [animation-delay:0.06s]">
            {profile.headline}
          </h1>

          <p className="rise mt-5 max-w-[56ch] text-muted text-body leading-relaxed [animation-delay:0.1s]">
            {profile.lede}
          </p>

          <dl className="rise mt-7 flex flex-wrap gap-7 font-narrow text-meta tracking-rail text-muted [animation-delay:0.14s]">
            {facts.map((fact) => {
              const isAward = fact.tone === "award";
              return (
                <div
                  key={fact.label}
                  onClick={isAward ? handleAwardClick : undefined}
                  className={`group ${isAward ? "cursor-pointer" : ""}`}
                  title={isAward ? "Click to celebrate CodeFusion victory!" : undefined}
                >
                  <dt className="sr-only">{fact.label}</dt>
                  <dd className="m-0">
                    <span
                      className={`mb-0.5 inline-flex items-center gap-1.5 font-sans text-big leading-[1.1] font-semibold tracking-display transition-transform group-hover:scale-105 ${
                        isAward ? "text-flag" : "text-ink"
                      }`}
                    >
                      {isAward && <Trophy className="size-5 text-flag animate-bounce" />}
                      {fact.value}
                    </span>
                    <span className="block text-meta text-muted group-hover:text-ink transition-colors">
                      {fact.label}
                    </span>
                  </dd>
                </div>
              );
            })}
          </dl>

          {/* Action CTAs & Command Hint */}
          <div className="rise mt-8 flex flex-wrap items-center gap-4 [animation-delay:0.18s]">
            <a
              className="btn"
              href="#hardware"
              onClick={() => sound.playClick()}
            >
              Inspect Hardware Lab
            </a>
            <a
              className="btn btn-quiet"
              href="#projects"
              onClick={() => sound.playClick()}
            >
              Explore Shipped Projects
            </a>

            <button
              onClick={() => {
                sound.playSwitch();
                const event = new KeyboardEvent("keydown", { key: "k", metaKey: true });
                document.dispatchEvent(event);
              }}
              className="inline-flex items-center gap-2 rounded-lg border border-dashed border-rule-strong/60 px-3 py-2 text-tiny font-narrow uppercase tracking-eyebrow text-muted hover:text-ink hover:border-signal transition-colors"
            >
              <Search className="size-3 text-signal" />
              <span>Press ⌘K Menu</span>
            </button>
          </div>
        </div>

        {/* Right Column: Interactive Practical Psychology Battlestation Avatar */}
        <div className="lg:col-span-5 rise [animation-delay:0.12s]">
          <BattlestationScene />
        </div>
      </div>
    </section>
  );
}
