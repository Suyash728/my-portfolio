# Portfolio — Suyash Kerkar

Personal site. Next.js App Router, TypeScript strict, Tailwind v4, deployed to Vercel.

The brief this was built from is in `docs/portfolio-build-prompt.md`.

## Design direction: Control Room, light

Chosen from three proposals. The page is laid out like an instrument panel: a
fixed left rail carries identity and live status and never scrolls away; the
main column is a stack of readout panels separated by single rules.

**The one bold thing is the rail.** Everything else stays quiet — that is the
whole point of the direction. Resist adding a second loud element.

### Tokens

All of them live in the `@theme` block of `src/app/globals.css`. Tailwind v4 is
CSS-first, so there is no `tailwind.config.ts`; that block is the config.
Nothing should introduce a raw hex or a one-off font size outside it.

| Token | Value | Job |
| --- | --- | --- |
| `ground` | `#F2EFE9` | Page base. Warm off-white pulled grey — deliberately not the cream every other portfolio uses. |
| `raised` | `#FBF9F5` | Chips, inputs, hover surfaces. |
| `rule` / `rule-soft` | `#DFD9CE` / `#EAE5DC` | Panel borders / inner row borders. |
| `ink` | `#1D1F24` | Body text. |
| `muted` | `#6B6A64` | Secondary text. AA at body size. |
| `signal` | `#1F4B6E` | **Interactive and in-progress state only.** |
| `flag` | `#8A6414` | **Outcomes and placements only.** Never decoration. |

Two accents, each with a rule about when it may appear. That is what stops this
reading as the usual dark-ground-plus-one-highlighter look. Don't add a third.

Type is **Archivo** (400/500/600) with **Archivo Narrow** (500/600) for the rail
and small labels, both via `next/font/google` with `display: swap`. There is
**no monospace anywhere** — numerals use Archivo's tabular figures instead, set
globally by `font-variant-numeric: tabular-nums` on `body`. Scale is a
compressed 1.2 ratio: `text-tiny` 11 → `text-meta` 12.8 → `text-small` 14 →
`text-body` 16 → `text-lead` 19.2 → `text-title` 23 → `text-big` 27.6 →
`text-display` (clamped 26–33.2).

`--breakpoint-wide: 900px` gives the `wide:` variant. The rail folds into a top
block below it; layout and padding both switch there.

### Things the direction deliberately does not do

These are current AI-design defaults and were designed out on purpose. Don't
reintroduce them:

- No tracked-out uppercase eyebrow above every heading (group labels only).
- No `01 / 02 / 03` markers on content that isn't a sequence.
- No accent colour on one word of a headline.
- No arrow glued onto link text.
- No identical rounded cards — panels have zero radius and no shadow.
- No monospace standing in for "technical".

## Content

Everything the page renders comes from `src/content/`. **Adding a project means
adding one entry to `src/content/projects.ts` and nothing else.** Components map
over the data; no section is hand-written JSX.

| File | Holds |
| --- | --- |
| `profile.ts` | Identity, headline, contact, hero figures, rail status lines, section list (drives nav + scroll-spy). |
| `projects.ts` | All six projects. |
| `experience.ts` | Roles and education. |
| `stack.ts` | Technologies grouped by role in a request. |
| `coursework.ts`, `achievements.ts`, `certifications.ts` | The remaining sections. |
| `types.ts` | Every interface. |
| `icons.generated.ts` | Brand icon paths. Generated — do not hand-edit. |

### TODO convention

A `null` is the placeholder, and it renders visibly through `<Todo />`:

- `Link.href: null` → the link renders as its label plus a dashed TODO chip.
- `CourseworkGroup.subjects: null` → TODO chip in place of the subject list.
- `Certification.credential: null` → TODO chip after the name.

Nothing outstanding is ever silently omitted, and no fact, date or credential is
invented to fill a gap.

### Icons

`scripts/fetch-icons.mjs` pulls 30 marks from Simple Icons and writes
`src/content/icons.generated.ts`. Paths are vendored rather than loaded from a
CDN: one fewer request, works offline, and nothing external can change what the
site renders. Re-run `node scripts/fetch-icons.mjs` only when adding a slug to
the `SLUGS` list in that script.

Icons carry their **brand colour at rest**. The chip around them stays quiet —
neutral surface, hairline border — so a row reads as one object rather than a
logo wall; hover adds the coloured border, the lift and the shadow.

Each icon exports two colours. `hex` is what gets painted: the brand colour
walked darker until it clears 3:1 against the chip surface, because several
brand colours are chosen for a white page and vanish on ours (JavaScript,
Linux, Hugging Face, React, Tailwind, Supabase, BigQuery, Cloudflare are
currently adjusted). `brand` is the untouched official colour, kept for
reference. **Paint with `hex`.**

Technologies with no real brand mark (pgvector, RAG, rate limiting) render as
plain chips — never invent a logo for a concept.

## Motion

Hard constraints, all enforced in `src/components/TraceBackground.tsx`:

- Peak opacity **0.11** (cap for the direction is 0.15).
- rAF throttled to **30fps**. Never run it uncapped.
- `IntersectionObserver` pauses the loop off-screen; `visibilitychange` pauses
  it on a hidden tab.
- `prefers-reduced-motion: reduce` renders a **static frame** and starts no
  loop. It is also watched live, so toggling the OS setting takes effect.
- Nothing is drawn below **640px**.
- `will-change` is set only while running and cleared on stop; every handle and
  listener is released on unmount.

Beyond the background: **one** orchestrated page-load moment (the `.rise`
stagger on the rail and hero, ~0.2s total — kept short so a link preview or
thumbnail never catches the page mid-fade). Everything else is user-triggered
hover or focus. The only other ambient motion is the slow `breathe` pulse on the
availability dot.

Do not add fade-up-on-scroll to sections. That pattern is the clearest tell of a
generated page and it was specifically designed out.

## Architecture notes

- **Server Components by default.** Only `Rail` (scroll-spy), `TraceBackground`
  (canvas) and `ContactForm` (`useActionState`) are client components.
- **Contact form** posts to the `sendMessage` Server Action in
  `src/app/actions/contact.ts`: Zod validation, an off-screen honeypot field, an
  in-memory rate limit, then Resend. The API key is read server-side only. A
  filled honeypot gets the success path so bots learn nothing.
- The rate limit is per server instance, so on serverless it is a speed bump,
  not a guarantee. Move it to Upstash or a Supabase table if that stops being
  enough.
- Without `RESEND_API_KEY` / `CONTACT_TO_EMAIL` / `CONTACT_FROM_EMAIL` the form
  still validates and rate-limits, and tells the visitor to use the email
  address above. It never fails silently.
- JSON-LD (`Person` + `CreativeWork`) is built in `src/app/page.tsx` from the
  same content the page renders, so it cannot drift.
- The OG share card is generated at `src/app/opengraph-image.tsx` with
  `next/og`. Values are inline there because it renders outside Tailwind — if a
  token changes, change it in both places.

## Deviations from the brief

- **Next 16.3.5, not 15.** `create-next-app@latest` ships 16; it is current and
  the App Router API used here is unchanged.
- **Tailwind v4, so no `tailwind.config.ts`.** The `@theme` block in
  `globals.css` is the equivalent and holds every token.
- **shadcn/ui is not installed yet.** Nothing on the page needs a Radix
  primitive at present — there are no dialogs, sheets or menus. Add it when a
  project detail dialog lands, and restyle it to these tokens rather than
  shipping the defaults.

## Commands

```
npm run dev      # dev server
npm run build    # production build
npm start        # serve the build
npm run lint     # eslint
npx tsc --noEmit # typecheck
node scripts/fetch-icons.mjs   # regenerate brand icons
```

## Environment

Copy `.env.example` to `.env.local`. Never commit real values.
