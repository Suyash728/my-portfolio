"use client";

import React, { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  spotlightRadius?: number;
}

export function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(31, 75, 110, 0.07)",
  spotlightRadius = 450,
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const { left, top } = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  }

  function handleMouseLeave() {
    mouseX.set(-1000);
    mouseY.set(-1000);
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative overflow-hidden border border-rule bg-raised/75 p-5 transition-colors duration-200 hover:border-rule-strong ${className}`}
    >
      {/* GPU-Accelerated Cursor-Following Radial Spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              ${spotlightRadius}px circle at ${mouseX}px ${mouseY}px,
              ${spotlightColor},
              transparent 75%
            )
          `,
        }}
      />

      {/* Content Container */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
