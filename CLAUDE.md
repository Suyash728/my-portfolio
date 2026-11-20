# Portfolio — Suyash Kerkar

Personal site. Next.js 16 App Router, TypeScript strict, Tailwind v4, deployed to Vercel.

## Design Direction: Tactile Field Instrument (Teenage Engineering × Nothing OS, Light)

Warm, machined industrial light mode. Think physical synthesizers, aluminum chassis plates, crisp bento modules, LED status indicators, and snappy mechanical switches — NOT a wall of documentation and NOT generic dark-purple AI SaaS slop.

### Tokens (`@theme` in `src/app/globals.css`)

All colors and radii live strictly inside `@theme` in `src/app/globals.css`. Never scatter raw hex values in JSX.

| Token                | Value                 | Job                                                                                                                                                                                   |
| -------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ground`             | `#F7F6F2`             | Warm anodized off-white chassis base.                                                                                                                                                 |
| `surface`            | `#FFFFFF`             | Elevated bento module surface.                                                                                                                                                        |
| `surface-sunken`    | `#F0EEE6`             | Recessed wells, progress tracks, switch housings, archive rows.                                                                                                                       |
| `rule` / `rule-soft` | `#E5E2DC` / `#EDEAE4` | Structural bento borders and subtle dot-grid hairlines.                                                                                                                               |
| `rule-strong`        | `#7D7A72`             | **Operable control edges** (switches, buttons, inputs, tabs) — >= 3:1 contrast on both `ground` and `surface` (WCAG 1.4.11).                                                          |
| `ink`                | `#111318`             | Primary crisp body & display ink.                                                                                                                                                     |
| `muted`              | `#4A4D55`             | Secondary labels & concise captions (>= 5.9:1 contrast).                                                                                                                              |
| `accent-orange`      | `#A13706`             | **Tactile Primary Pop** — live hardware LEDs, physical toggle switches, award badges, primary hover callouts. (Use `#FFF8F5` text on filled orange, or dark ink on pale orange tint). |
| `signal-teal`        | `#0F5C6E`             | **Systems & Telemetry Accent** — deterministic verification gates, active VRAM meters, focus rings, interactive filter states.                                                        |

### Tactile Surfaces & Geometry

- **Machined Bento Modules:** `rounded-xl` (`12px`) for primary bento cards, `rounded-lg` (`8px`) for inner switches/pills, `1px` crisp `rule` border, and tactile hardware elevation (`0 1px 0 rgba(255,255,255,0.8) inset, 0 2px 6px rgba(24,26,31,0.04)`).
- **Subtle Dot-Matrix Texture:** Use radial-gradient dot matrices (`1px` dots at `16px` intervals in `rule`) inside interactive hardware/schematic wells to create physical depth without visual clutter.

### Typography & Brevity Rules (CRITICAL)

- **Inter** (400/500/600) with global `tabular-nums` for body copy and live counters.
- **Archivo Narrow** (500/600) for signage, section headers, hardware callouts, and compact badges.
- **JetBrains Mono** (or system mono) ONLY inside authentic Fish shell (`suyash@cachyos ~>`) one-liners — never for body text.
- **Strict Word Caps:**
  - Hero bio: **Max 22 words.** Never repeat the hero tagline anywhere else on the page.
  - Bento widget captions: **Max 12 words** per tile. Visual gauges, chips, and switches replace paragraphs!
  - Spotlight Project descriptions: **Max 28 words total** visible at rest (1-line problem + 1-line deterministic decision). Deeper architecture lives inside interactive tabs/drawers.

### Motion (`motion` / Framer Motion — 60fps Hardware-Accelerated)

- Use `motion/react` (`layoutId`, spring physics: `stiffness: 380, damping: 30`) for tab switches, schematic expansions, and stack filters.
- Subtle 3D perspective tilt (`rotateX`/`rotateY` <= 4deg) + cursor spotlight border on Battlestation & Spotlight bento cards.
- Smooth staggered scroll-reveal on bento modules (`opacity` + `translateY(12px)`, `viewport={{ once: true, margin: "-60px" }}`), strictly disabled when `prefers-reduced-motion: reduce` is active.
- Keep `InteractiveBackdrop.tsx` subtle (low opacity), paused on hidden tabs, and static under `prefers-reduced-motion`.

### Zero `TODO`s Policy

- Never render raw `TODO` chips to visitors. Omit empty optional links/coursework cleanly, and render active unpublished artifacts as intentional status pills (e.g., `In Review · Dec 2026`, `Local-First CLI`).
