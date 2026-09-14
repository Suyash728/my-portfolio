# Suyash Kerkar — portfolio

Personal site for Suyash Satish Kerkar, final-year BE student in AI & Data
Science at Terna Engineering College, Mumbai University.

Next.js App Router · TypeScript (strict) · Tailwind v4 · Resend

## Running it

```bash
npm install
cp .env.example .env.local   # fill in to enable the contact form
npm run dev
```

The site runs without any environment variables; the contact form then
validates and rate-limits but tells visitors to use the email address instead
of sending.

## Adding a project

Add one entry to `src/content/projects.ts`. Nothing else needs to change —
every section maps over typed data in `src/content/`.

Set a link's `href` to `null` and it renders as a visible TODO chip rather than
a dead link.

## Layout

```
src/
  app/          layout, page, Server Action, SEO routes, OG image
  components/   rail, panels, sections, canvas background, contact form
  content/      all site content as typed data
scripts/        brand-icon generator
docs/           the original build brief
```

See `CLAUDE.md` for the design direction, tokens, motion constraints and
conventions.
