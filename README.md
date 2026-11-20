# Suyash Kerkar — portfolio

**Live:** https://my-portfolio-mu-roan-75.vercel.app

Personal site for Suyash Satish Kerkar, an applied AI engineer and final-year BE
student in AI & Data Science at Terna Engineering College, Mumbai University
(graduating 2027).

The thread through every project: **rules live in code, the model only explains
them.** Each spotlight card shows where the deterministic gate sits in the
pipeline.

| Project | What the gate decides | Links |
| --- | --- | --- |
| MediSync 2.0 (1st, CodeFusion 2026) | Drug conflicts come from a rule table; the LLM only cites | [repo](https://github.com/Suyash728/MediSync) |
| AeroMed India (INNOVATE 2026) | Statutory CAQM/GRAP rules constrain the triage advice | [demo](https://aeromed-india.vercel.app) · [repo](https://github.com/Suyash728/aeromed-india) |
| TrustLayer | Mutation testing proves whether AI-written tests catch bugs | [repo](https://github.com/Suyash728/trustlayer) |
| KisanChain | An AI oracle scores sensor data before an on-chain price commit | survey paper in review |

## Stack

Next.js 16 (App Router) · TypeScript (strict) · Tailwind v4 · Motion · Resend.
All content is typed data in `src/content/`, so adding a project means adding
one entry to `src/content/projects.ts`.

## Running it

```bash
npm install
cp .env.example .env.local   # fill in to enable the contact form
npm run dev
```

The site runs without any environment variables. Without `RESEND_API_KEY`, the
contact form still validates input but asks visitors to email directly.

Set `NEXT_PUBLIC_SITE_URL` in production. If it isn't set, canonical URLs and the
OG image use the production domain Vercel provides.

## Layout

```
src/
  app/          layout, page, 404, Server Action, SEO routes, OG image, icons
  components/   nav, panels, sections, canvas backdrop, contact form
  content/      all site content as typed data
  lib/          site URL, sound, filter state
resume/         LaTeX source for public/resume.pdf
scripts/        brand-icon generator
```

See `CLAUDE.md` for design tokens, motion rules and conventions.
