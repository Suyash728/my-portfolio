---
name: awwwards-tactile-craft
description: Principles, token invariants, and motion choreography for the Awwwards-caliber High-Contrast Tactile Light + OLED Hybrid aesthetic (Teenage Engineering × Nothing OS × Linear × Raycast). Use this skill whenever reviewing, creating, or modifying UI components, CSS styles, typography, motion, micro-interactions, or layouts.
---

# Awwwards Tactile Craft (High-Contrast Tactile Light + OLED Hybrid)

This skill codifies the visual polish, motion choreography, and layout invariants for Suyash Kerkar's portfolio.
The design direction synthesizes **Teenage Engineering**, **Nothing OS**, **Linear**, and **Raycast**:
warm machined aluminum chassis plates, pure elevated cards, high-contrast jet-black OLED telemetry screens, 60fps spring transitions, smooth inertia scrolling, and interactive physical controls.

---

## 1. High-Contrast Tactile Light + OLED Hybrid Aesthetic

The core aesthetic pairing is **anodized tactile light surfaces** anchored by **deep jet-black OLED cutouts**:

### Color Palette & Token Invariants

All colors and surfaces are tokenized in `@theme` inside `src/app/globals.css`. Never scatter arbitrary hex codes in JSX.

| Token / Surface | Hex Value | Purpose & Architectural Invariants |
| :--- | :--- | :--- |
| `ground` | `#F4F2ED` / `#F2EFE9` | Warm anodized aluminum chassis base. |
| `surface` | `#FFFFFF` / `#FBF9F5` | Elevated bento module surface (crisp `12px` radius). |
| `surface-sunken` | `#E8E3DA` | Recessed tactile wells, progress tracks, switch housings. |
| `oled` | `#111318` / `#14161A` | **Jet-Black OLED Display Cutout Wells** for terminals, telemetry, and live pipeline stage monitors. |
| `oled-surface` | `#1D2026` | Elevated OLED component tags and sub-modules. |
| `oled-rule` | `#2E333D` | Crisp structural OLED dividers and screen bezel hairlines. |
| `oled-ink` | `#F4F2EE` | Primary OLED readout text (>= 16:1 contrast). |
| `oled-muted` | `#9BA1AE` | Secondary OLED labels and metadata. |
| `rule` / `rule-soft` | `#DCD6CA` / `#E6E1D6` | Subtle structural hairlines and dot-matrix grid hairlines. |
| `rule-strong` | `#7D7A72` | Operable control boundaries (switches, inputs, buttons) — >= 3:1 WCAG 1.4.11 contrast. |
| `ink` | `#181A1F` | High-contrast primary reading typography. |
| `muted` | `#575650` | Secondary descriptions and metadata labels (>= 4.5:1 AA contrast). |

### Dual-Accent Pop
- **Electric Safety Orange (`#FF5500` / `#A13706` text-calibrated)**:
  - Live hardware LEDs, physical toggle switches, active model weights segment, primary action CTAs, and trophy highlights.
- **Cyber Teal (`#00A896` / `#0F5C6E` text-calibrated)**:
  - Deterministic verification gates, FP8 KV cache memory segments, active system state, and Wayland/Linux telemetry indicators.

### Machined Tactile Geometry
- **Bento Modules**: `12px` border radius (`rounded-xl`), `1px solid` multi-layered specular border (`rule`), subtle top specular inner highlight (`inset 0 1px 0 rgba(255, 255, 255, 0.85)`), and soft chassis drop shadow.
- **OLED Display Cutouts (`.oled-well`)**: Recessed jet-black display wells (`#111318`) with inner inset shadow (`inset 0 2px 4px rgba(0, 0, 0, 0.5)`), housing glowing telemetry meters, code diffs, and live SVG waveforms.
- **Low-Profile Mechanical Keycaps (`.keycap`)**: Top face elevated in `surface`, `1px rule` border, `2px rule-strong` bottom bevel with `active:translate-y-[1px]` tactile click action and active usage count badges.
- **Micro-Textures**: Subtle radial dot-matrix (`16px` grid) and tactical noise overlays (`0.025` opacity).

---

## 2. Motion Choreography & Kinetic Physics

Every animation serves an engineering or feedback purpose — zero sluggish or gratuitous effects:

### Lenis Smooth Inertia Scroll
- Integrated smooth inertia scrolling via `lenis` for natural momentum and fluid wheel handling.
- **Accessibility Gate**: Automatically disabled or set to immediate when `prefers-reduced-motion: reduce` is detected.

### 3D Perspective Tilt & Spotlight Cursor Tracking
- Bento cards feature subtle 3D cursor perspective tilt (`rotateX` / `rotateY` <= 4deg) based on mouse position.
- Radial mouse-tracking spotlight highlight border (`radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(15, 92, 110, 0.15), transparent 70%)`).

### Spring Physics & Shared-Layout Morphing
- Powered by `motion/react` spring configurations:
  - UI springs: `stiffness: 360, damping: 28` for snappy, zero-lag physical response.
  - Active tabs and toggle switches: `layoutId` shared-layout gliding (e.g. `layoutId="activeRailTab"`).
  - Expandable components (e.g. project pipeline drawers): card morphs full width (`md:col-span-2`) with smooth height animation via `AnimatePresence`.

### Magnetic Hover Pull
- Primary CTA pills and button tags subtly pull toward the cursor on proximity (`stiffness: 350, damping: 20`) with quick spring release on exit.

---

## 3. Zero Wall-of-Text Rule & Scannable Storytelling

Judges and engineers evaluate portfolios in under 15 seconds. Walls of text are banned:

- **Caption Cap**: Never stack more than 25 words in a card caption.
- **Hero Lede**: Max 22 words. Zero duplicate quotes or redundant sentences anywhere on the page.
- **Spotlight Projects**: Max 28 words total visible at rest (1-sentence problem statement + 1-sentence deterministic architectural decision).
- **Interactive Visual Headers**: Every flagship project features a compact (`h-28`) micro-preview console (e.g. clinical conflict evaluation, statutory CAQM threshold curve, Polygon escrow settlement, AST mutation testbed).
- **Interactive Gauges & Toggles**: Paragraphs are ruthlessly replaced with live telemetry readouts, segmented VRAM bars, spinning fan PWM meters, and interactive chip switches.
- **Zero Raw `TODO`s**: Never display raw `TODO` chips or placeholder comments. Unpublished work is styled as intentional status pills (e.g. `Paper In Review · Dec 2026`).

---

## 4. Performance & Accessibility Gates

- **100/100 Lighthouse Accessibility**: WCAG 2.1 / 2.2 AA compliance across desktop and mobile.
- **Contrast Ratios**: Normal text >= 4.5:1, large text/controls >= 3:1.
- **WCAG 2.5.3 (Label in Name)**: Accessible names on interactive elements must contain the visible text verbatim.
- **Touch Targets**: Minimum 44x44px clickable areas on mobile viewports (<900px).
- **Hardware Acceleration**: Animations restricted to `transform` and `opacity` to maintain locked 60fps frame pacing.
