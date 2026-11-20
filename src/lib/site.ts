/**
 * Public origin used for canonical URLs, Open Graph, sitemap and JSON-LD.
 *
 * Order: explicit NEXT_PUBLIC_SITE_URL → the project's production domain that
 * Vercel injects at build time → localhost for `next dev`.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");
