import { Rail } from "@/components/Rail";
import { MobileNav } from "@/components/MobileNav";
import { TraceBackground } from "@/components/TraceBackground";
import { CommandPalette } from "@/components/CommandPalette";
import { Achievements } from "@/components/sections/Achievements";
import { Certifications } from "@/components/sections/Certifications";
import { Contact } from "@/components/sections/Contact";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { HardwareLab } from "@/components/sections/HardwareLab";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Stack } from "@/components/sections/Stack";
import { achievements } from "@/content/achievements";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";

/**
 * The page is static, so anything read at render time is frozen into the build
 * — including the footer's year. A daily revalidate keeps it honest without
 * making the page dynamic.
 */
export const revalidate = 86400;

/** Person + CreativeWork, built from the same content the page renders. */
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
      // Content is authored in this repo, not user input.
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
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:border focus:border-rule-strong focus:bg-raised focus:px-4 focus:py-2.5 focus:font-narrow focus:text-meta focus:uppercase focus:tracking-rail focus:text-ink focus:outline-2 focus:outline-signal focus:outline-offset-2"
      >
        Skip to main content
      </a>

      <TraceBackground />
      <CommandPalette />

      <div className="relative z-1 grid min-h-screen grid-cols-1 wide:grid-cols-[var(--rail-w)_minmax(0,1fr)]">
        <Rail />

        <main id="main" className="min-w-0 bg-grain">
          <MobileNav />
          <Hero />
          <HardwareLab />
          <Projects />
          <Experience />
          <Stack />
          <Education />
          <Achievements />
          <Certifications />
          <Contact />

          <footer className="border-t border-rule px-5 pt-7 pb-12 font-narrow text-meta tracking-rail text-muted wide:px-13">
            Suyash Kerkar · Navi Mumbai · {new Date().getFullYear()}
          </footer>
        </main>
      </div>
    </>
  );
}
