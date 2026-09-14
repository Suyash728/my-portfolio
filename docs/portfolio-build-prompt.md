# Claude Code Prompt — Personal Portfolio Site

> Paste everything below the line into a fresh Claude Code session in an empty directory.
> It is written as a two-phase brief: Phase 0 ends with three design proposals and a hard stop.

---

You are acting as the design lead **and** senior front-end engineer on a personal portfolio site. Treat this as a paid studio engagement for a client who has already rejected two templated proposals. The site has to look like it was designed for this one person, not assembled from a starter kit.

## 1. Who the site is for

**Suyash Satish Kerkar** — final-year BE student in Artificial Intelligence & Data Science at Terna Engineering College, Navi Mumbai (Mumbai University), graduating June 2027. Prior diploma in Computer Engineering (MSBTE).

Positioning: an applied AI engineer who ships. The differentiator is not "I know ML theory" — it is the volume of working, deployed systems built under hackathon deadlines, plus real architectural opinions about where LLMs belong in a system and where they don't.

Primary audience, in priority order:
1. Campus placement recruiters and engineering hiring managers (Goldman Sachs, Morgan Stanley, Amazon, Adobe, Google tier) skimming for 30 seconds
2. Freelance clients evaluating AI workflow / RAG build capability
3. Hackathon organisers, professors, and paper reviewers

Primary job of the page: **make a recruiter stop skimming and open a project.** Optimise for that.

Recurring technical signature (use it, it's the through-line of the whole body of work): Next.js + FastAPI + Supabase/pgvector + Groq/Gemini, with a stated architectural stance — **deterministic rule engines own the logic, LLMs are confined to explanation.**

## 2. Content — real data, not lorem

Build the site with this content from the start. Where a field is marked `TODO`, scaffold the shape and leave a clearly-marked placeholder; do not invent facts, dates, numbers, or credentials.

### Experience
- **Digital transformation & marketing, part-time — Career Center** (family educational consultancy). Website, admissions content and campaign tooling.
- `TODO` — internships, if any.

### Projects
Card + detail view for each. Lead with the problem and the architectural decision, not the feature list.
- **KisanChain** — blockchain/IoT/AI system for farmer profit and margin transparency. Polygon Amoy, FastAPI trust layer, Supabase schema, IoT sensor ingest. Novel contribution: an AI oracle trust layer. Survey paper in progress; December 2026 submission window. Guided by Prof. Shraddha Rokade.
- **MediSync** — patient-controlled health records. Next.js 14 + FastAPI + Supabase/pgvector, embedding-on-upload RAG (Gemini `gemini-embedding-001`), Groq `openai/gpt-oss-120b` primary with `gemini-2.5-flash` fallback, OCR/LLM extraction, drug-conflict detection, citation cards, 11-language TTS. **1st place, CodeFusion 2026** (Marwadi University × HackerRank Campus Crew), team Error404.
- **TrustLayer** — developer tool pairing mutation-guarded test verification (mutmut) with hallucinated-API detection. In active development.

Each project needs: one-line problem statement, the architectural decision worth defending, stack chips, outcome/placement if any, and links (repo / live / paper) where they exist — `TODO` the links.

### Coursework
Group by theme rather than listing a semester transcript. Anchors: Big Data Analytics, Natural Language Processing, Blockchain, Deep Learning, Management Information Systems, plus core CS from the Computer Engineering diploma. `TODO` — fill remaining subjects.

### Stack
Group by role in a system, not by logo wall:
- **Languages** — Python, JavaScript/TypeScript, Java, C++, SQL
- **Frontend** — Next.js (App Router), React, Tailwind CSS
- **Backend** — FastAPI, Node, REST design, rate limiting
- **Data & retrieval** — Supabase, PostgreSQL, pgvector, PostGIS, BigQuery
- **AI/ML** — Groq, Gemini API, Vertex AI, RAG pipelines, embeddings, OCR extraction, TTS
- **Web3** — Polygon, smart contracts
- **Infra** — Vercel, Firebase, Git/GitHub, Google Cloud

### Certifications
`TODO` — section scaffold with issuer, date, credential link. Suyash fills this in.

### Achievements
- 1st place — CodeFusion 2026 (MediSync, team Error404)
- Multiple shipped hackathon builds across Evolothon 1.0, CODEAMBLE, Vibe2Vision, Vibe2Ship, Project Viksit Bharat 2026, HackVenture, Build in AI for India
- IEEE paper track in progress (KisanChain survey paper)

### Contact
Email, LinkedIn, GitHub, resume download, and a working contact form. `TODO` — the actual handles and email.

## 3. Phase 0 — three design directions, then STOP

**Do not write any application code until a direction is chosen.**

Produce **three** distinct design directions. For each one give:
- A name and a one-paragraph point of view: what this direction claims about Suyash, and who it's aimed at
- **Color** — 4–6 named hex values
- **Type** — one or two families with defined roles, a type scale, and stated weights/tracking. Choose deliberately; don't reach for the family you'd use on any other project.
- **Layout** — prose description plus an ASCII wireframe of the hero and one content section, with alignment stated
- **Background motion concept** — what it is and why it belongs to *this* direction
- **The one bold thing** — each direction should spend its boldness in exactly one place and keep everything else quiet

The three must differ on real axes (structure, density, motion philosophy, tone) — not three palettes over the same layout.

Then self-review each direction against this list and revise anything that lands on it. These are current AI-design defaults and will read as generated:
1. Warm cream background (~#F4F1EA) + high-contrast serif display + terracotta accent (~#D97757)
2. Near-black background with a single acid-green or vermilion accent
3. Broadsheet layout: hairline rules, zero radius, dense newspaper columns
4. The SaaS card kit — identical rounded cards, one radius on everything, the same soft grey shadow, gradient washes as decoration
5. Template chrome: tracked-out ALL-CAPS eyebrows above every heading, meta strings joined with middle dots, `WORD — fragment` labels, tinted near-black standing in for black, monospace for every small label, `→` glued onto link text
6. Accenting one word in a headline in a different colour or italic
7. Numbered markers (01 / 02 / 03) on content that isn't actually a sequence

Say explicitly what you revised and why. Then present all three and **wait for a choice.** Do not proceed on your own preference.

## 4. Architecture (applies once a direction is picked)

- **Next.js 15, App Router, TypeScript strict.** Server Components by default; `"use client"` only where interaction genuinely requires it.
- **Tailwind CSS** with the chosen direction's palette, type scale and spacing encoded as design tokens in `tailwind.config.ts` and CSS variables. No arbitrary one-off values scattered through JSX.
- **shadcn/ui on Radix primitives** for dialogs (project detail views), navigation sheet, and form controls. Restyle them to the chosen direction — shipping shadcn defaults defeats the point.
- **Content as data.** Every section above lives in typed config under `content/` (`experience.ts`, `projects.ts`, `coursework.ts`, `stack.ts`, `certifications.ts`, `achievements.ts`) with exported interfaces. Components map over data. Adding a project must never mean editing JSX.
- **Framer Motion** for interaction-driven motion only: dialog transitions, expand/collapse, nav state.
- **Background animation** as one isolated client component: HTML5 Canvas + `requestAnimationFrame`. No Three.js, no WebGL, no heavy 3D dependency.
- **Contact form** via Next.js Server Action → Resend API. Server-side validation with Zod, honeypot field, and a rate limit. Never expose the API key client-side.
- **Supabase (optional, wire it if it earns its place)** — form submission log or a project-view counter. Do not put static content in a database.
- **SEO** — per-page metadata, Open Graph image, JSON-LD `Person` + `CreativeWork` schema, sitemap, robots.txt.

## 5. Motion boundaries — non-negotiable

The background must never compete with the content.

- Peak opacity of any background element: **0.15**
- Throttle the canvas loop to ~30fps; do not run an uncapped rAF
- `will-change: transform` on the animated layer only, and remove it when idle
- `IntersectionObserver` — pause the loop entirely when the canvas is off-screen; also pause on `document.hidden`
- Full stop under `prefers-reduced-motion: reduce` — render a static frame, don't just slow it down
- Degrade on small viewports: fewer particles/nodes, or none below 640px
- Clean up the rAF handle and all listeners on unmount

Beyond the background: use non-user-triggered motion sparingly. **One** orchestrated page-load moment, not fade-and-slide-up on every section and a hover transform on every card — that pattern is the clearest tell of a generated page.

## 6. Quality floor

Build to this without announcing it in the UI:
- Responsive from 360px up; test the layout at 360 / 768 / 1280 / 1920
- Visible keyboard focus on every interactive element; logical tab order; skip-to-content link
- WCAG AA contrast on all text, including over the animated background
- Semantic landmarks (`header`, `nav`, `main`, `section`, `footer`), one `h1`
- Images through `next/image` with real dimensions; fonts via `next/font` with `display: swap`
- Lighthouse target: Performance ≥ 95, Accessibility 100, Best Practices ≥ 95, SEO 100
- No layout shift on load (CLS < 0.05)

## 7. Copy

Write the copy yourself, in the site's voice — plain verbs, sentence case, active voice, no filler. Describe what each project *does* and what was hard about it; don't sell it with adjectives. Empty and error states give direction, not mood. Every word should make the page easier to navigate; cut the rest.

Resist stock portfolio phrasing: "passionate about", "turning coffee into code", "let's build something amazing together".

## 8. Build order

Work in gates. Show me the result at each gate before moving on.

1. **Gate 0** — three design directions (Section 3). Stop and wait.
2. **Gate 1** — scaffold: Next.js 15 + TS + Tailwind tokens + shadcn init + folder structure + content interfaces. Show me `tailwind.config.ts` and one populated content file.
3. **Gate 2** — static layout of every section with real content, no animation at all. This is where the design either works or doesn't; confirm before adding motion.
4. **Gate 3** — background canvas component in isolation, with all the Section 5 constraints. Show me the component before integrating.
5. **Gate 4** — interaction motion, project detail dialogs, contact form with Server Action + Resend.
6. **Gate 5** — SEO, metadata, OG image, accessibility audit, Lighthouse run. Report actual numbers.
7. **Gate 6** — `git init`, commit with a clean history, push to a new GitHub repo, deploy to Vercel, report the live URL.

Maintain a `CLAUDE.md` at the repo root from Gate 1 onward: chosen design direction with its tokens, content-file conventions, motion constraints, and anything discovered during the build. Keep it accurate — a stale `CLAUDE.md` is worse than none.

## 9. Environment

Ask me for these before you need them; never commit them:

```
RESEND_API_KEY=
CONTACT_TO_EMAIL=
NEXT_PUBLIC_SUPABASE_URL=        # only if Supabase is used
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=       # server-side only
```

Include `.env.example` with the keys and no values.

## 10. Acceptance checklist

Before calling the build done, verify and report on each:

- [ ] All seven required sections present and populated from `content/`: Experience, Projects, Coursework, Stack, Certifications, Achievements, Contact
- [ ] Every `TODO` placeholder is visibly marked and listed in a single handoff note
- [ ] Adding a new project requires editing one data file only
- [ ] Background respects all six Section 5 constraints — demonstrate the reduced-motion and off-screen pause behaviour
- [ ] Contact form delivers an email end-to-end; validation and rate limit both tested
- [ ] Lighthouse numbers reported, not estimated
- [ ] Keyboard-only pass through the full page with no traps
- [ ] Live Vercel URL and GitHub repo link

Start with Gate 0.
