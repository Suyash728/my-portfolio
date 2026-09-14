"use client";

import { useEffect, useRef } from "react";

/** Peak alpha of the brightest trace. The cap for this direction is 0.15. */
const TRACES = [
  { alpha: 0.11, amp: 1.0, speed: 1.0, phase: 0 },
  { alpha: 0.07, amp: 0.62, speed: 0.74, phase: 1.9 },
  { alpha: 0.05, amp: 0.38, speed: 1.31, phase: 3.7 },
] as const;

const FRAME_MS = 1000 / 30;
const MIN_WIDTH = 640;

/**
 * One oscilloscope trace with two dimmer echoes — instrumentation, because the
 * whole direction is a control panel. Not a particle field.
 *
 * Constraints held here: capped at 30fps, peak opacity 0.11, paused off-screen
 * and while the tab is hidden, nothing drawn below 640px, a static frame under
 * prefers-reduced-motion, and every handle released on unmount.
 */
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

      for (const trace of TRACES) {
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
            Math.sin(p * 3.2 + time * trace.speed * 0.31) * base * trace.amp * 0.34;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        // signal, at the trace's own alpha.
        ctx.strokeStyle = `rgba(31, 75, 110, ${trace.alpha})`;
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
      canvas.style.willChange = "transform";
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

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) start();
      else stop();
    });
    observer.observe(canvas);

    const onVisibility = () => {
      if (document.hidden) {
        stop();
      } else {
        observer.takeRecords();
        start();
      }
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

    resize();
    draw(); // static first frame, always — this is the reduced-motion render too
    if (!reduced) start();

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("resize", onResize);
    motionQuery.addEventListener("change", onMotionChange);

    return () => {
      stop();
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", onResize);
      motionQuery.removeEventListener("change", onMotionChange);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  );
}
