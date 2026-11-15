import { TopNav } from "@/components/TopNav";
import { EdgeVisualDesk } from "@/components/EdgeVisualDesk";
import { EdgeVisualBuilder } from "@/components/EdgeVisualBuilder";
import { TraceBackground } from "@/components/TraceBackground";
import { CommandPalette } from "@/components/CommandPalette";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { BattlestationBento } from "@/components/sections/BattlestationBento";
import { Stack } from "@/components/sections/Stack";
import { Experience } from "@/components/sections/Experience";
import { Education } from "@/components/sections/Education";
import { Achievements } from "@/components/sections/Achievements";
import { Contact } from "@/components/sections/Contact";
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

      {/* Subtle non-intrusive trace canvas in background */}
      <TraceBackground />
      <CommandPalette />

      {/* Floating Top Navigation Pill */}
      <TopNav />

      {/* Centered Editorial Main Column + Flanking Edge Companions */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Edge-Companion Visual A: Desk Setup (Top-Right Margin, hidden <1280px) */}
        <div className="hidden xl:block absolute right-2 2xl:right-4 top-24 w-[250px] 2xl:w-[270px]">
          <EdgeVisualDesk />
        </div>

        <main id="main" className="min-w-0 max-w-5xl mx-auto px-5 sm:px-8 py-4">
          {/* 1. Hero */}
          <Hero />

          {/* 2. Shipped Systems FIRST (Right Below Hero!) */}
          <Projects />

          {/* 3. Compact Systems & Rig Strip (~220px height) with Edge Visual B flanking left margin */}
          <div className="relative">
            <div className="hidden xl:block absolute -left-[270px] 2xl:-left-[290px] top-4 w-[250px] 2xl:w-[270px]">
              <EdgeVisualBuilder />
            </div>
            <BattlestationBento />
          </div>

          {/* 4. Technology Stack Mechanical Keycaps */}
          <Stack />

          {/* 5. Side-by-side Experience & Education */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-8">
            <Experience className="border-b-0" />
            <Education className="border-b-0" />
          </div>

          {/* 6. Trophy Achievements */}
          <Achievements />

          {/* 7. Contact */}
          <Contact />

          {/* Footer */}
          <footer className="border-t border-rule mt-12 py-8 flex flex-wrap items-center justify-between gap-3 font-narrow text-meta tracking-rail text-muted">
            <div>Suyash Kerkar · Navi Mumbai · {new Date().getFullYear()}</div>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/Suyash728"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-ink transition-colors"
              >
                GitHub
              </a>
              <span>·</span>
              <a
                href="https://linkedin.com/in/suyashkerkar"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-ink transition-colors"
              >
                LinkedIn
              </a>
              <span>·</span>
              <a
                href="mailto:suyashkerkar642005@gmail.com"
                className="hover:text-ink transition-colors"
              >
                Email
              </a>
            </div>
          </footer>
        </main>
      </div>
    </>
  );
}
