"use client";

/**
 * Web Audio API synthesized tactile haptics.
 * 0 KB external audio files, 0 network latency.
 */

const STORAGE_KEY = "portfolio_sound_muted";

function readMutedPref(): boolean {
  try {
    // Anything other than an explicit opt-in keeps the page silent.
    return localStorage.getItem(STORAGE_KEY) !== "false";
  } catch (err) {
    console.warn("[sound] preference unreadable, staying muted:", err);
    return true;
  }
}

function writeMutedPref(muted: boolean): void {
  try {
    localStorage.setItem(STORAGE_KEY, String(muted));
  } catch (err) {
    console.warn("[sound] preference not saved; it lasts for this page view only:", err);
  }
}

class SoundEngine {
  private ctx: AudioContext | null = null;
  // Silent until the visitor opts in: clicks that make noise in an office
  // are a surprise, not a delight.
  private muted = true;
  // Set once audio has failed, so a broken AudioContext is reported once and
  // then left alone instead of throwing on every click.
  private disabled = false;

  constructor() {
    if (typeof window !== "undefined") {
      this.muted = readMutedPref();
    }
  }

  private getContext(): AudioContext | null {
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) {
        this.disable(new Error("Web Audio API unavailable"));
        return null;
      }
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume().catch((err: unknown) => this.disable(err));
    }
    return this.ctx;
  }

  private disable(err: unknown): void {
    if (this.disabled) return;
    this.disabled = true;
    console.warn("[sound] audio disabled for this page view:", err);
  }

  /** Runs a synth routine only when sound is wanted and working. */
  private play(render: (ctx: AudioContext) => void): void {
    if (this.muted || this.disabled || typeof window === "undefined") return;
    try {
      const ctx = this.getContext();
      if (ctx) render(ctx);
    } catch (err) {
      this.disable(err);
    }
  }

  public isMuted(): boolean {
    return this.muted;
  }

  public toggleMute(): boolean {
    this.muted = !this.muted;
    if (typeof window !== "undefined") {
      writeMutedPref(this.muted);
    }
    if (!this.muted) {
      this.playSwitch();
    }
    return this.muted;
  }

  /** Subtle mechanical click for key presses and terminal chips */
  public playClick() {
    this.play((ctx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(1200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.015);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.015);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.016);
    });
  }

  /** Satisfying mechanical relay switch click */
  public playSwitch() {
    this.play((ctx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.025);

      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.025);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.026);
    });
  }

  /** Harmonious chord for awards & confetti */
  public playSuccess() {
    this.play((ctx) => {
      const freqs = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      freqs.forEach((freq, idx) => {
        const t = ctx.currentTime + idx * 0.04;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, t);

        gain.gain.setValueAtTime(0.03, t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(t);
        osc.stop(t + 0.36);
      });
    });
  }
}

export const sound = new SoundEngine();
