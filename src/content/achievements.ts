import type { Achievement, Activity } from "./types";

/** Placements, publications, and verified credentials — discrete results with years. */
export const achievements: Achievement[] = [
  {
    marker: "2026",
    title: "1st Prize — CodeFusion 2026 National Innovation Challenge",
    detail:
      "MediSync 2.0 (Team Error404) · Marwadi University × HackerRank Campus Crew.",
  },
  {
    marker: "2026",
    title: "Finalist — Dataverse 2026",
    detail: "Symbiosis Centre for Information Technology, Pune.",
  },
  {
    marker: "2024",
    title: "Published — IJIRCEE, February 2024",
    detail: "Multipurpose IoT Tracker (Autonomous ESP32 Cellular System).",
  },
  { marker: "2024", title: "Runner-up — Inter-college Project Competition" },
  { marker: "2023", title: "1st Prize — College Coding Competition" },
  {
    marker: "2024",
    title: "Certified — Full-Stack Web Development Bootcamp",
    detail: "Udemy · Modern React, Node.js, and REST API architecture.",
  },
];

/** Hackathons and technical volunteering. */
export const activities: Activity[] = [
  {
    marker: "Hackathons",
    text: "INNOVATE 2026 (Ongoing — Adaption AI Track) · CodeFusion 2026 · Hackverse 2026 · Evolothon 1.0 · CODEAMBLE · Vibe2Vision · Vibe2Ship (AutoClutch) · Project Viksit Bharat 2026 · Build in AI for India",
  },
  {
    marker: "Community",
    text: "Microsoft Build: Localhost 2026 · Incubate 2025 (IIT Bombay × JIPMER) · CSI AgenticAI Workshop Technical Volunteer",
  },
];
