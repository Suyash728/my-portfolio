"use client";

import { useEffect, useRef } from "react";

/**
 * Interactive Architectural Blueprint & Pulse Grid.
 *
 * Visual Invariants:
 * - Strictly behind all content cards (z-index: 0, pointer-events-none).
 * - 48px precision hairline grid with 5px crosshair registration marks every 192px.
 * - Gentle radial mask so the blueprint breathes softly behind editorial text
 *   and shines clearly in the left/right viewport margins.
 * - Interactive cursor magnetic wake + lit cell trail (fading over 600ms).
 * - Click ripples expanding geometrically.
 * - Autonomous orthogonal 90-degree signal data pulses (Safety Orange & Signal Teal).
 * - Fully GPU-friendly, pauses on hidden tab, static frame on prefers-reduced-motion.
 */

const GRID_SIZE = 48;
const MAJOR_STEP = 192; // 4 * 48px
const CROSSHAIR_ARM = 5;
const WAKE_RADIUS = 130;
const MAX_PULL = 3.5;
const CELL_FADE_MS = 600;
const RIPPLE_DURATION = 800;
const RIPPLE_MAX_R = 360;

interface LitCell {
  col: number;
  row: number;
  time: number;
  color: string;
}

interface ClickRipple {
  x: number;
  y: number;
  time: number;
  color: string;
}

interface Pulse {
  x: number;
  y: number;
  dir: "N" | "S" | "E" | "W";
  speed: number;
  color: string;
  tail: { x: number; y: number }[];
  cooldown: number;
}

export function InteractiveBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reducedMotion = motionQuery.matches;
    const handleMotionChange = (e: MediaQueryListEvent) => {
      reducedMotion = e.matches;
    };
    motionQuery.addEventListener("change", handleMotionChange);

    let width = 0;
    let height = 0;
    let animFrame: number | null = null;
    let isRunning = false;

    // Mouse coordinates (with smooth spring lag)
    const mouse = {
      rawX: -1000,
      rawY: -1000,
      x: -1000,
      y: -1000,
      active: false,
      lastMove: 0,
    };

    // Lit cells map (keyed by "col,row")
    const litCells = new Map<string, LitCell>();
    const ripples: ClickRipple[] = [];

    // Colors
    const COLOR_ORANGE = "#FF5500";
    const COLOR_TEAL = "#0F5C6E";

    // 4 Autonomous signal pulses
    const pulses: Pulse[] = [
      {
        x: GRID_SIZE * 2,
        y: GRID_SIZE * 4,
        dir: "S",
        speed: 1.6,
        color: COLOR_ORANGE,
        tail: [],
        cooldown: 0,
      },
      {
        x: GRID_SIZE * 4,
        y: GRID_SIZE * 8,
        dir: "E",
        speed: 1.3,
        color: COLOR_TEAL,
        tail: [],
        cooldown: 0,
      },
      {
        x: 0, // will be positioned on resize
        y: GRID_SIZE * 12,
        dir: "N",
        speed: 1.8,
        color: COLOR_TEAL,
        tail: [],
        cooldown: 0,
      },
      {
        x: 0,
        y: GRID_SIZE * 16,
        dir: "W",
        speed: 1.4,
        color: COLOR_ORANGE,
        tail: [],
        cooldown: 0,
      },
    ];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Reposition right-margin pulses if needed
      const cols = Math.floor(width / GRID_SIZE);
      if (pulses[2]) {
        pulses[2].x = Math.max(1, cols - 3) * GRID_SIZE;
      }
      if (pulses[3]) {
        pulses[3].x = Math.max(1, cols - 2) * GRID_SIZE;
      }

      if (reducedMotion) {
        drawStaticFrame();
      }
    };

    // Window-level pointer listeners so pointer-events-none canvas still tracks cursor
    let cellColorToggle = false;
    const onPointerMove = (e: PointerEvent) => {
      mouse.rawX = e.clientX;
      mouse.rawY = e.clientY;
      mouse.active = true;
      mouse.lastMove = performance.now();

      // Light up the cell directly under the pointer
      const col = Math.floor(e.clientX / GRID_SIZE);
      const row = Math.floor(e.clientY / GRID_SIZE);
      if (col >= 0 && row >= 0) {
        const key = `${col},${row}`;
        cellColorToggle = !cellColorToggle;
        litCells.set(key, {
          col,
          row,
          time: performance.now(),
          color: cellColorToggle ? COLOR_TEAL : COLOR_ORANGE,
        });
      }
    };

    const onPointerLeave = () => {
      mouse.active = false;
    };

    const onClick = (e: MouseEvent) => {
      // Spawn geometric ripple
      ripples.push({
        x: e.clientX,
        y: e.clientY,
        time: performance.now(),
        color: ripples.length % 2 === 0 ? COLOR_TEAL : COLOR_ORANGE,
      });
      // Cap max concurrent ripples
      if (ripples.length > 6) ripples.shift();
    };

    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave, { passive: true });
    window.addEventListener("click", onClick, { passive: true });

    // Static frame for reduced motion
    const drawStaticFrame = () => {
      ctx.clearRect(0, 0, width, height);
      drawGrid(null);
      drawCrosshairs(null);
    };

    // Calculate magnetic pull for any intersection (gx, gy)
    const getDisplacedPoint = (gx: number, gy: number, mx: number, my: number) => {
      if (!mouse.active) return { x: gx, y: gy };
      const dx = gx - mx;
      const dy = gy - my;
      const dist = Math.hypot(dx, dy);
      if (dist < WAKE_RADIUS && dist > 0.01) {
        const factor = Math.pow(1 - dist / WAKE_RADIUS, 2);
        const pull = MAX_PULL * factor;
        return {
          x: gx + (dx / dist) * pull,
          y: gy + (dy / dist) * pull,
        };
      }
      return { x: gx, y: gy };
    };

    // Draw baseline 48px hairline grid
    const drawGrid = (now: number | null) => {
      const cols = Math.ceil(width / GRID_SIZE) + 1;
      const rows = Math.ceil(height / GRID_SIZE) + 1;

      ctx.save();
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(17, 19, 24, 0.045)";

      // Vertical lines
      for (let c = 0; c <= cols; c++) {
        const gx = c * GRID_SIZE;
        ctx.beginPath();
        for (let r = 0; r <= rows; r++) {
          const gy = r * GRID_SIZE;
          const p = now ? getDisplacedPoint(gx, gy, mouse.x, mouse.y) : { x: gx, y: gy };
          if (r === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }

      // Horizontal lines
      for (let r = 0; r <= rows; r++) {
        const gy = r * GRID_SIZE;
        ctx.beginPath();
        for (let c = 0; c <= cols; c++) {
          const gx = c * GRID_SIZE;
          const p = now ? getDisplacedPoint(gx, gy, mouse.x, mouse.y) : { x: gx, y: gy };
          if (c === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }

      ctx.restore();
    };

    // Draw 5px registration crosshairs at 192px intersections
    const drawCrosshairs = (now: number | null) => {
      const majorCols = Math.ceil(width / MAJOR_STEP) + 1;
      const majorRows = Math.ceil(height / MAJOR_STEP) + 1;

      ctx.save();
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(17, 19, 24, 0.13)";

      for (let c = 0; c <= majorCols; c++) {
        const gx = c * MAJOR_STEP;
        for (let r = 0; r <= majorRows; r++) {
          const gy = r * MAJOR_STEP;
          const p = now ? getDisplacedPoint(gx, gy, mouse.x, mouse.y) : { x: gx, y: gy };

          ctx.beginPath();
          // Horizontal arm
          ctx.moveTo(p.x - CROSSHAIR_ARM, p.y);
          ctx.lineTo(p.x + CROSSHAIR_ARM, p.y);
          // Vertical arm
          ctx.moveTo(p.x, p.y - CROSSHAIR_ARM);
          ctx.lineTo(p.x, p.y + CROSSHAIR_ARM);
          ctx.stroke();
        }
      }

      ctx.restore();
    };

    // Draw illuminated cell trails
    const drawLitCells = (now: number) => {
      if (litCells.size === 0) return;

      ctx.save();
      for (const [key, cell] of litCells.entries()) {
        const age = now - cell.time;
        if (age >= CELL_FADE_MS) {
          litCells.delete(key);
          continue;
        }

        const alpha = 1 - age / CELL_FADE_MS;
        const x = cell.col * GRID_SIZE;
        const y = cell.row * GRID_SIZE;

        // Subtle soft cell wash
        ctx.fillStyle =
          cell.color === COLOR_TEAL
            ? `rgba(15, 92, 110, ${(alpha * 0.04).toFixed(4)})`
            : `rgba(255, 85, 0, ${(alpha * 0.035).toFixed(4)})`;
        ctx.fillRect(x + 1, y + 1, GRID_SIZE - 2, GRID_SIZE - 2);

        // Crisp border highlight
        ctx.strokeStyle =
          cell.color === COLOR_TEAL
            ? `rgba(15, 92, 110, ${(alpha * 0.16).toFixed(4)})`
            : `rgba(255, 85, 0, ${(alpha * 0.14).toFixed(4)})`;
        ctx.lineWidth = 1;
        ctx.strokeRect(x + 0.5, y + 0.5, GRID_SIZE - 1, GRID_SIZE - 1);
      }
      ctx.restore();
    };

    // Draw expanding geometric click ripples
    const drawRipples = (now: number) => {
      if (ripples.length === 0) return;

      ctx.save();
      for (let i = ripples.length - 1; i >= 0; i--) {
        const ripple = ripples[i];
        const age = now - ripple.time;
        if (age >= RIPPLE_DURATION) {
          ripples.splice(i, 1);
          continue;
        }

        const progress = age / RIPPLE_DURATION;
        const radius = progress * RIPPLE_MAX_R;
        const alpha = Math.max(0, 1 - progress) * 0.28;

        ctx.strokeStyle =
          ripple.color === COLOR_TEAL
            ? `rgba(15, 92, 110, ${alpha.toFixed(4)})`
            : `rgba(255, 85, 0, ${alpha.toFixed(4)})`;
        ctx.lineWidth = 1.25;

        // Circular expanding pulse
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, radius, 0, Math.PI * 2);
        ctx.stroke();

        // 4 geometric registration corner ticks
        const tick = 6;
        ctx.beginPath();
        ctx.moveTo(ripple.x - radius - tick, ripple.y);
        ctx.lineTo(ripple.x - radius + tick, ripple.y);
        ctx.moveTo(ripple.x + radius - tick, ripple.y);
        ctx.lineTo(ripple.x + radius + tick, ripple.y);
        ctx.moveTo(ripple.x, ripple.y - radius - tick);
        ctx.lineTo(ripple.x, ripple.y + radius + tick);
        ctx.stroke();
      }
      ctx.restore();
    };

    // Update and draw autonomous orthogonal signal data pulses
    const updateAndDrawPulses = () => {
      ctx.save();
      ctx.lineWidth = 1.5;

      for (const pulse of pulses) {
        // Decrement cooldown
        if (pulse.cooldown > 0) pulse.cooldown--;

        // Advance along current direction
        switch (pulse.dir) {
          case "N":
            pulse.y -= pulse.speed;
            break;
          case "S":
            pulse.y += pulse.speed;
            break;
          case "E":
            pulse.x += pulse.speed;
            break;
          case "W":
            pulse.x -= pulse.speed;
            break;
        }

        // Store tail waypoint
        pulse.tail.unshift({ x: pulse.x, y: pulse.y });
        if (pulse.tail.length > 50) {
          pulse.tail.pop();
        }

        // Check if near grid intersection for possible 90-degree turn
        const nearX = Math.abs(pulse.x % GRID_SIZE);
        const nearY = Math.abs(pulse.y % GRID_SIZE);
        const atIntersection =
          (nearX < pulse.speed || nearX > GRID_SIZE - pulse.speed) &&
          (nearY < pulse.speed || nearY > GRID_SIZE - pulse.speed);

        if (atIntersection && pulse.cooldown <= 0) {
          // Snap position exactly to grid line
          pulse.x = Math.round(pulse.x / GRID_SIZE) * GRID_SIZE;
          pulse.y = Math.round(pulse.y / GRID_SIZE) * GRID_SIZE;

          // 35% probability of 90-degree turn
          if (Math.random() < 0.35) {
            if (pulse.dir === "N" || pulse.dir === "S") {
              pulse.dir = Math.random() < 0.5 ? "E" : "W";
            } else {
              pulse.dir = Math.random() < 0.5 ? "N" : "S";
            }
            pulse.cooldown = 18; // wait before next turn
          }
        }

        // Respawn if leaving screen margins
        const pad = 120;
        if (
          pulse.x < -pad ||
          pulse.x > width + pad ||
          pulse.y < -pad ||
          pulse.y > height + pad
        ) {
          // Respawn in a margin
          const isLeft = Math.random() < 0.5;
          const cols = Math.floor(width / GRID_SIZE);
          const col = isLeft
            ? Math.floor(Math.random() * 4) + 1
            : Math.max(1, cols - Math.floor(Math.random() * 4) - 1);
          pulse.x = col * GRID_SIZE;
          pulse.y = (Math.floor(Math.random() * (height / GRID_SIZE)) + 1) * GRID_SIZE;
          pulse.dir = Math.random() < 0.5 ? "S" : "N";
          pulse.tail = [];
          pulse.cooldown = 20;
        }

        // Draw fading tail segment
        if (pulse.tail.length > 1) {
          const len = pulse.tail.length;
          for (let i = 0; i < len - 1; i++) {
            const segAlpha = Math.pow(1 - i / len, 1.8) * 0.75;
            ctx.strokeStyle =
              pulse.color === COLOR_TEAL
                ? `rgba(15, 92, 110, ${segAlpha.toFixed(4)})`
                : `rgba(255, 85, 0, ${segAlpha.toFixed(4)})`;

            ctx.beginPath();
            ctx.moveTo(pulse.tail[i].x, pulse.tail[i].y);
            ctx.lineTo(pulse.tail[i + 1].x, pulse.tail[i + 1].y);
            ctx.stroke();
          }
        }

        // Draw bright leading pulse head
        ctx.fillStyle = pulse.color;
        ctx.beginPath();
        ctx.arc(pulse.x, pulse.y, 1.75, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    };

    // 60fps main render loop
    const loop = () => {
      if (!isRunning) return;
      const now = performance.now();

      // Smooth mouse spring movement
      if (mouse.active) {
        mouse.x += (mouse.rawX - mouse.x) * 0.16;
        mouse.y += (mouse.rawY - mouse.y) * 0.16;
      }

      ctx.clearRect(0, 0, width, height);

      // Layered rendering sequence
      drawGrid(now);
      drawCrosshairs(now);
      drawLitCells(now);
      drawRipples(now);
      updateAndDrawPulses();

      animFrame = requestAnimationFrame(loop);
    };

    // Tab visibility handling: pause when hidden to save GPU cycles
    const handleVisibility = () => {
      if (document.hidden) {
        isRunning = false;
        if (animFrame) cancelAnimationFrame(animFrame);
      } else if (!reducedMotion) {
        isRunning = true;
        animFrame = requestAnimationFrame(loop);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    // Initial setup
    resize();
    if (!reducedMotion) {
      isRunning = true;
      animFrame = requestAnimationFrame(loop);
    }

    return () => {
      isRunning = false;
      if (animFrame) cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("click", onClick);
      motionQuery.removeEventListener("change", handleMotionChange);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none select-none overflow-hidden print:hidden"
      style={{
        maskImage:
          "radial-gradient(ellipse 90% 85% at 50% 50%, rgba(0,0,0,0.40) 0%, rgba(0,0,0,0.80) 60%, rgba(0,0,0,1) 95%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 90% 85% at 50% 50%, rgba(0,0,0,0.40) 0%, rgba(0,0,0,0.80) 60%, rgba(0,0,0,1) 95%)",
      }}
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
