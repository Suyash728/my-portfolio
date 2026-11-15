import { Rail } from "@/components/Rail";
import { MobileNav } from "@/components/MobileNav";
import { TraceBackground } from "@/components/TraceBackground";
import { CommandPalette } from "@/components/CommandPalette";
import { Achievements } from "@/components/sections/Achievements";
import { Contact } from "@/components/sections/Contact";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { BattlestationBento } from "@/components/sections/BattlestationBento";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Stack } from "@/components/sections/Stack";
import { achievements } from "@/content/achievements";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";

/**
 * The page is static, revalidated daily to keep year honest without SSR overhead.
 */
export const revalidate = 86400;

/** Person + CreativeWork JSON-LD, built from verified repo content. */
function StructuredData() {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Suyash Satish Kerkar",
    alternateName: profile.name,
    jobTitle: "Applied AI engineer",
    email: `mailto:${profile.email}`,
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://suyashkerkar.vercel.app",
    sameAs: [profile.github, profile.linkedin],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Navi Mumbai",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "Terna Engineering College, Navi Mumbai",
      },
    ],
    award: achievements.map((a) => a.title),
    knowsAbout: [
      "Retrieval-augmented generation",
      "Deterministic rule engines",
      "Mutation testing",
      "FastAPI",
      "Next.js",
      "PostgreSQL and pgvector",
      "Smart contracts and Polygon",
      "vLLM local inference",
    ],
  };

  const works = projects.map((project) => ({
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    abstract: project.problem,
    description: project.decision,
    creator: { "@type": "Person", name: "Suyash Satish Kerkar" },
    ...(project.links.find((l) => l.href)?.href
      ? { url: project.links.find((l) => l.href)!.href }
      : {}),
  }));

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify([person, ...works]) }}
    />
  );
}

export default function Home() {
  return (
    <>
      <StructuredData />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:border focus:border-rule-strong focus:bg-surface focus:px-4 focus:py-2.5 focus:font-narrow focus:text-meta focus:uppercase focus:tracking-rail focus:text-ink focus:outline-2 focus:outline-signal-teal focus:outline-offset-2"
      >
        Skip to main content
      </a>

      <TraceBackground />
      <CommandPalette />

      <div className="relative z-1 grid min-h-screen grid-cols-1 wide:grid-cols-[var(--rail-w)_minmax(0,1fr)]">
        <Rail />

        <main id="main" className="min-w-0 bg-grain bg-grid-fade overflow-x-clip">
          <MobileNav />
          <Hero />
          <BattlestationBento />
          <Projects />
          {/* Side-by-side Experience & Education on desktop (reduces vertical scroll fatigue by ~30%) */}
          <div className="grid grid-cols-1 wide:grid-cols-2 border-b border-rule divide-y wide:divide-y-0 wide:divide-x divide-rule">
            <Experience className="border-b-0 wide:px-8 wide:py-10" />
            <Education className="border-b-0 wide:px-8 wide:py-10" />
          </div>
          <Stack />
          <Achievements />
          <Contact />

          <footer className="border-t border-rule px-5 pt-7 pb-12 font-narrow text-meta tracking-rail text-muted wide:px-13">
            Suyash Kerkar · Navi Mumbai · {new Date().getFullYear()}
          </footer>
        </main>
      </div>
    </>
  );
}
