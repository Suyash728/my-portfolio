import type { Achievement, Activity } from "./types";

/** Placements and publications — each one a discrete result with a year. */
export const achievements: Achievement[] = [
  {
    marker: "2026",
    title: "1st prize — CodeFusion 2026 National Innovation Challenge",
    detail:
      "MediSync 2.0, team Error404. Marwadi University × HackerRank Campus Crew.",
  },
  {
    marker: "2026",
    title: "Finalist — Dataverse 2026",
    detail: "Symbiosis Centre for Information Technology, Pune",
  },
  {
    marker: "2024",
    title: "Published — IJIRCEE, February 2024",
    detail: "Multipurpose IoT Tracker",
  },
  { marker: "2024", title: "Runner-up — Inter-college project competition" },
  { marker: "2023", title: "1st prize — College coding competition" },
];

/** Participation and volunteering — a list, not a set of placements. */
export const activities: Activity[] = [
  {
    marker: "Hackathons",
    text: "Hackverse 2026 · CodeFusion 2026 · Evolothon 1.0 · CODEAMBLE · Vibe2Vision · Vibe2Ship · Project Viksit Bharat 2026 · Build in AI for India",
  },
  {
    marker: "Also",
    text: "Microsoft Build: Localhost 2026 · Incubate 2025, IIT Bombay × JIPMER · CSI AgenticAI Workshop, technical volunteer",
  },
];
