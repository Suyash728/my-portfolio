---
name: control-room-guardrails
description: Hard design-review gates and token invariants for the Control Room light theme. Use this skill whenever reviewing, creating, or modifying UI components, CSS styles, typography, colors, or layouts in the portfolio to prevent design drift.
---

# Control Room Guardrails (Light Theme)

This skill codifies the hard design-review gates and token invariants for Suyash Kerkar's portfolio.
The design direction is **"Control Room, light"**: laid out like an instrument panel with a fixed left rail for identity and live status, and quiet stacked readout panels separated by single rules.

> **Core Rule**: The left rail is the **only bold element**. Everything else stays quiet. Resist adding a second loud element.

---

## 1. Hard Review Gates (Zero-Tolerance Anti-Patterns)

Any change introducing any of the following items must be rejected immediately:

| Forbidden Pattern | Reason & Rule | Correct Alternative |
| :--- | :--- | :--- |
| **Raw Hex / One-off Colors** | Hex codes outside `@theme` in `src/app/globals.css` break token uniformity. | Use CSS theme variables (`var(--color-*)`) or Tailwind semantic utilities (`bg-ground`, `text-ink`, `text-muted`). |
| **Monospace Fonts** | Monospace is a cliché "developer" aesthetic deliberately designed out. | Inter with `tabular-nums` (`font-variant-numeric: tabular-nums`) handles all numerals. Signage uses Archivo Narrow. |
| **Rounded Corners (`rounded-*`)** | The instrument panel aesthetic requires sharp, architectural edges. | Zero border radius (`rounded-none` or default 0px) on panels, inputs, and buttons. |
| **Drop Shadows (`shadow-*`)** | Flat paper/control room aesthetic. Depth comes from 1px structural rules and tonal layering (`ground` vs `raised`). | Single border rules (`border border-rule` or `border-rule-strong`). |
| **Fade-Up-on-Scroll Animations** | Scroll-triggered reveals are generic AI-design defaults. | Static layouts. Only one entrance animation allowed (`.rise`, ~0.2–0.38s) and the ambient `.breathe` dot. |
| **Numbered Items (`01 / 02 / 03`)** | Fake editorial styling on items that are not strict ordinal sequences. | Clean row layouts or unnumbered stacks. |
| **Tracked Eyebrows on Headings** | Tracked-out uppercase tags above every heading clutter visual hierarchy. | Group labels only where structurally necessary; never above standard headings. |
| **Accent Word in Headlines** | Highlighting a single word in blue/gold creates loud focal competition with the rail. | Headlines remain `ink` (`#1D1F24`). |
| **Arrow Glued to Link Text** | Inline text arrows clutter reading flow. | Use `.title-link` with subtle arrow affordance or `.link-draw` underline hover. |
| **Boxed / Bordered Icon Chips** | Repeating bordered boxes for 30 tech icons looks like a wall of buttons. | Plain `.tech` items: brand mark at rest with no border, fill, or padding. |

---

## 2. Design Tokens (`@theme` in `src/app/globals.css`)

Tailwind v4 is CSS-first. All tokens are declared in `@theme` in `src/app/globals.css`.

| Token | Hex | Role & Constraints |
| :--- | :--- | :--- |
| `ground` | `#F2EFE9` | Page base. Warm off-white pulled grey (paper, not yellow cream). |
| `raised` | `#FBF9F5` | Inputs, row hover surfaces, text on filled buttons. |
| `rule` | `#DFD9CE` | Passive panel borders (1.3:1 contrast against ground). **Never for control boundaries.** |
| `rule-soft` | `#EAE5DC` | Inner subtle row dividers. |
| `rule-strong` | `#8A877F` | **Operable control boundaries** (inputs, quiet buttons). Clears 3:1 WCAG 1.4.11. **Never as a divider.** |
| `ink` | `#1D1F24` | Primary body and headline text (13.9:1 contrast on ground). |
| `muted` | `#5C5B55` | Secondary text, subtitles, meta info (5.9:1 contrast on ground). |
| `signal` | `#1F4B6E` | **Accent 1**: Interactive and in-progress state ONLY. |
| `flag` | `#8A6414` | **Accent 2**: Outcomes, awards, and placements ONLY. |

> [!IMPORTANT]
> There are only **two accents**: `signal` and `flag`. Never introduce a third accent color.

---

## 3. Strict Color Semantics

### `signal` (`#1F4B6E`)
- **Allowed on**:
  - Focus rings (`:focus-visible { outline: 2px solid var(--color-signal); outline-offset: 3px; }`)
  - Active rail navigation tick (`aria-current="true"`)
  - Row hover edge highlight (`.edge::before`)
  - Interactive primary buttons (`.btn`)
  - Text selection highlight (`::selection`)
  - Hover states on links (`.title-link:hover`)
- **Forbidden on**:
  - Passive decorative borders, non-interactive badges, or static text.

### `flag` (`#8A6414`)
- **Allowed on**:
  - Placement results, ranks, honors, milestone outcomes (e.g., certifications, key achievement chips).
- **Forbidden on**:
  - Standard hyperlinks, active nav items, hover effects, or decoration.

### `rule-strong` (`#8A877F`)
- **Allowed on**:
  - Form input borders (`.field`)
  - Quiet operable control boundaries (`.btn-quiet`)
  - Elements requiring non-text contrast compliance under WCAG 1.4.11 (>= 3:1 against `ground` and `raised`).
- **Forbidden on**:
  - Section dividers or passive container rules (use `rule` or `rule-soft`).

---

## 4. Typography & Layout Specifications

1. **Font Families**:
   - Reading text: **Inter** (`400`, `500`, `600`) via `--font-sans`.
   - Signage, rail, nav, buttons, small uppercase labels: **Archivo Narrow** (`500`, `600`) via `--font-narrow`.
   - **Monospace is completely barred**. Numerals rely on `tabular-nums` on `body`.
   - `antialiased` class is **not** on `<html>` to avoid thinning strokes on light backgrounds.

2. **Type Scale (Anchored at 17px body, 1.2 ratio)**:
   - `text-tiny`: `11.7px` (line-height: `1.55`)
   - `text-meta`: `13.6px` (line-height: `1.55`)
   - `text-small`: `14.9px` (line-height: `1.6`)
   - `text-body`: `17px` (line-height: `1.65`)
   - `text-lead`: `20.4px` (line-height: `1.5`)
   - `text-title`: `24.4px` (line-height: `1.2`)
   - `text-big`: `29.3px` (line-height: `1.2`)
   - `text-display`: `clamp(27.6px, 4.4vw, 35.3px)` (line-height: `1.22`)

3. **Breakpoints & Layout**:
   - Fixed rail width: `--rail-w: 264px`.
   - Responsive breakpoint: `--breakpoint-wide: 900px`.
   - At `>= 900px` (`wide:`): Fixed left identity rail + scrolling main panel stack.
   - At `< 900px`: Rail folds into a clean top instrument bar.

---

## 5. Content & Icon Invariants

1. **Content Source of Truth**:
   - All content is located in `src/content/` (`projects.ts`, `profile.ts`, `experience.ts`, `education.ts`, `stack.ts`, `achievements.ts`, `certifications.ts`).
   - Components only map over typed data; never hardcode JSX content rows.

2. **Placeholders (`null` values)**:
   - Use `<Todo />` component visibly for unpopulated fields. Never silently hide missing metadata or fabricate placeholders.

3. **Brand Icons**:
   - Generated into `src/content/icons.generated.ts` via `node scripts/fetch-icons.mjs`.
   - Render with the pre-darkened `hex` property (adjusted to >= 3:1 against `#F2EFE9`), not raw official brand hexes that disappear on off-white.
   - Non-branded concepts (e.g. RAG, pgvector) render as plain muted text without invented logos.

---

## 6. Verification Checklist Before Approving Code

- [ ] Does `git diff` show zero raw hex values introduced outside `src/app/globals.css`?
- [ ] Are all border radiuses `rounded-none` or unrounded?
- [ ] Are there zero drop shadows (`shadow-*`) added?
- [ ] Are there zero `font-mono` or monospace occurrences?
- [ ] Does every operable input/button control edge use `rule-strong` (or `signal` for primary buttons)?
- [ ] Is `flag` used exclusively for outcomes/placements?
- [ ] Is `signal` used exclusively for interactive/active states?
