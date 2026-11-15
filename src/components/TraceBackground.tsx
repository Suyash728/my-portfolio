"use client";

import { useEffect, useRef } from "react";

/**
 * Instrumentation oscilloscope trace. Peak alpha is strictly capped at 0.11.
 * When a user traverses rail sections, hovers schematic gates, or filters stack
 * paths, `pulseEnergy` gracefully modulates within this 0.11 ceiling.
 */
const TRACES = [
  { baseAlpha: 0.07, maxAlpha: 0.11, amp: 1.0, speed: 1.0, phase: 0 },
  { baseAlpha: 0.045, maxAlpha: 0.07, amp: 0.62, speed: 0.74, phase: 1.9 },
  { baseAlpha: 0.03, maxAlpha: 0.05, amp: 0.38, speed: 1.31, phase: 3.7 },
] as const;

const FRAME_MS = 1000 / 30;
const MIN_WIDTH = 640;

export function TraceBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduced = motionQuery.matches;

    let width = 0;
    let height = 0;
    let time = 0;
    let frame: number | null = null;
    let running = false;
    let lastPaint = 0;
    let pulseEnergy = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      if (width < MIN_WIDTH) return;

      const step = width < 900 ? 8 : 5;
      const mid = height * 0.5;
      const base = Math.min(height * 0.17, 130);

      // Decay pulse energy smoothly towards zero
      if (pulseEnergy > 0.005) {
        pulseEnergy *= 0.92;
      } else {
        pulseEnergy = 0;
      }

      for (const trace of TRACES) {
        const computedAlpha = Math.min(
          trace.maxAlpha,
          trace.baseAlpha + (trace.maxAlpha - trace.baseAlpha) * pulseEnergy
        );

        ctx.beginPath();
        for (let x = 0; x <= width; x += step) {
          const p = x / width;
          const y =
            mid +
            Math.sin(p * 7.1 + time * trace.speed + trace.phase) *
              base *
              trace.amp *
              0.55 +
            Math.sin(p * 17.3 - time * trace.speed * 0.63 + trace.phase * 2) *
              base *
              trace.amp *
              0.28 +
            Math.sin(p * 3.2 + time * trace.speed * 0.31) *
              base *
              trace.amp *
              0.34;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        // signal colour (#1F4B6E) at calculated alpha
        ctx.strokeStyle = `rgba(31, 75, 110, ${computedAlpha.toFixed(4)})`;
        ctx.lineWidth = 1.25;
        ctx.stroke();
      }
    };

    const loop = (now: number) => {
      frame = requestAnimationFrame(loop);
      if (now - lastPaint < FRAME_MS) return;
      lastPaint = now;
      time += 0.012;
      draw();
    };

    const start = () => {
      if (running || reduced) return;
      running = true;
      canvas.style.willChange = "contents";
      lastPaint = 0;
      frame = requestAnimationFrame(loop);
    };

    const stop = () => {
      if (!running) return;
      running = false;
      canvas.style.willChange = "auto";
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
    };

    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };

    const onResize = () => {
      resize();
      draw();
    };

    const onMotionChange = (event: MediaQueryListEvent) => {
      reduced = event.matches;
      if (reduced) {
        stop();
        draw();
      } else {
        start();
      }
    };

    const onControlRoomPing = (e: Event) => {
      if (reduced || width < MIN_WIDTH) return;
      const customEvent = e as CustomEvent<{ intensity?: number }>;
      pulseEnergy = Math.min(1.0, (customEvent.detail?.intensity ?? 1.0));
    };

    resize();
    draw(); // static first frame (supports reduced-motion without running loop)
    if (!reduced) start();

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("resize", onResize);
    motionQuery.addEventListener("change", onMotionChange);
    window.addEventListener("control-room-ping", onControlRoomPing);

    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", onResize);
      motionQuery.removeEventListener("change", onMotionChange);
      window.removeEventListener("control-room-ping", onControlRoomPing);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full print:hidden"
    />
  );
}
