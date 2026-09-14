import { Rail } from "@/components/Rail";
import { TraceBackground } from "@/components/TraceBackground";
import { Achievements } from "@/components/sections/Achievements";
import { Certifications } from "@/components/sections/Certifications";
import { Contact } from "@/components/sections/Contact";
import { Coursework } from "@/components/sections/Coursework";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Stack } from "@/components/sections/Stack";
import { achievements } from "@/content/achievements";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";

/** Person + CreativeWork, built from the same content the page renders. */
function StructuredData() {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Suyash Satish Kerkar",
    alternateName: profile.name,
    jobTitle: "Applied AI engineer",
    email: `mailto:${profile.email}`,
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://suyashkerkar.vercel.app",
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
      "FastAPI",
      "Next.js",
      "PostgreSQL and pgvector",
      "Smart contracts",
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
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-20 focus:bg-ink focus:px-3.5 focus:py-2.5 focus:text-raised"
      >
        Skip to content
      </a>

      <TraceBackground />

      <div className="relative z-1 grid min-h-screen grid-cols-1 wide:grid-cols-[var(--rail-w)_minmax(0,1fr)]">
        <Rail />

        <main id="main" className="min-w-0">
          <Hero />
          <Projects />
          <Experience />
          <Stack />
          <Coursework />
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
