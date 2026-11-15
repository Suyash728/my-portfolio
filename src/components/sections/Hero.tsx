"use client";

import React, { useRef, useState } from "react";
import { motion } from "motion/react";
import confetti from "canvas-confetti";
import { facts, profile } from "@/content/profile";
import { sound } from "@/lib/sound";
import { Search } from "lucide-react";

function MagneticButton({
  children,
  className = "",
  href,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.2;
    const y = (clientY - (top + height / 2)) * 0.2;
    setOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  return (
    <motion.a
      ref={ref}
      href={href ?? "#"}
      onClick={(e) => {
        if (!href) e.preventDefault();
        onClick?.();
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 350, damping: 22, mass: 0.5 }}
      className={className}
    >
      {children}
    </motion.a>
  );
}

function AnimatedFactCounter({ value }: { value: string }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 24, delay: 0.15 }}
      className="inline-block"
    >
      {value}
    </motion.span>
  );
}

export function Hero() {
  const words = profile.headline.split(" ");

  const handleAwardClick = () => {
    sound.playSuccess();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ["#A13706", "#0F5C6E", "#7D7A72"],
    });
  };

  const openCommandPalette = () => {
    sound.playSwitch();
    const event = new KeyboardEvent("keydown", { key: "k", metaKey: true });
    document.dispatchEvent(event);
  };

  return (
    <section className="py-10 sm:py-14 border-b border-rule">
      <div className="max-w-4xl">
        {/* Availability Pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-rule bg-surface px-3 py-1 text-tiny font-narrow uppercase tracking-eyebrow text-signal-teal mb-5 shadow-xs">
          <span className="size-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
          Applied AI &amp; Local Inference Systems · Navi Mumbai
        </div>

        {/* Kinetic Word-by-Word Masked Reveal Headline */}
        <h1 className="text-display font-semibold tracking-tight text-balance text-ink">
          {words.map((word, i) => (
            <React.Fragment key={`${word}-${i}`}>
              <span className="inline-block overflow-hidden pb-1 -mb-1 align-top">
                <motion.span
                  initial={{ y: "115%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 28,
                    delay: 0.04 + i * 0.028,
                  }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              </span>
              {i < words.length - 1 ? " " : null}
            </React.Fragment>
          ))}
        </h1>

        {/* Crisp 1-Line Subhead */}
        <p className="mt-4 max-w-[62ch] text-muted text-body leading-relaxed">
          {profile.lede}
        </p>

        {/* Recessed Stat Micro-Wells with Animated Metric Counters */}
        <div className="mt-7 grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-narrow text-meta tracking-rail">
          {facts.map((fact) => {
            const isAward = fact.tone === "award";
            return (
              <div
                key={fact.label}
                onClick={isAward ? handleAwardClick : undefined}
                className={`bento-card p-3 text-center transition-all ${
                  isAward ? "cursor-pointer hover:border-accent-orange" : ""
                }`}
                title={isAward ? "Click to verify achievement telemetry" : undefined}
              >
                <div
                  className={`font-sans text-lead font-semibold tabular-nums ${
                    isAward ? "text-accent-orange" : "text-ink"
                  }`}
                >
                  <AnimatedFactCounter value={fact.value} />
                </div>
                <div className="text-tiny font-narrow text-muted truncate mt-0.5">
                  {fact.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Magnetic Action CTAs */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <MagneticButton
            className="btn btn-dark"
            href="#projects"
            onClick={() => sound.playClick()}
          >
            Explore Shipped Systems
          </MagneticButton>
          <MagneticButton
            className="btn btn-quiet"
            onClick={openCommandPalette}
          >
            <Search className="size-3.5 mr-1.5 text-signal-teal" />
            <span>⌘K Quick Menu</span>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
