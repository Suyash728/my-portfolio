import type { Fact, Section, StatusLine } from "./types";

export const profile = {
  name: "Suyash Kerkar",
  identity: ["Applied AI engineer", "BE, AI & Data Science", "Navi Mumbai"],
  headline:
    "I build applied AI systems — the part I care about is deciding what the model is not allowed to do.",
  lede: "Final-year BE in AI & Data Science @ Terna Engineering College, Mumbai University. Graduating 2027. Local-first inference & deterministic systems.",
  email: "suyashkerkar642005@gmail.com",
  github: "https://github.com/Suyash728",
  linkedin: "https://www.linkedin.com/in/suyashkerkar",
  resume: "/Suyash_Kerkar_CV_2026.pdf",
  location: "Navi Mumbai, IN",
} as const;

export const statuses: StatusLine[] = [
  { label: "Open to 2027 roles", tone: "live" },
  { label: "Hardware & Local AI Lab live", tone: "live" },
  { label: "Survey paper in review", tone: "plain" },
];

export const facts: Fact[] = [
  { value: "7", label: "Shipped Systems" },
  { value: "1st", label: "CodeFusion '26", tone: "award" },
  { value: "$1k", label: "INNOVATE '26", tone: "award" },
  { value: "Pub", label: "IJIRCEE '24", tone: "award" },
];

/** Drives the rail nav and the scroll-spy. Order matches the page. */
export const sections: Section[] = [
  { id: "battlestation", label: "Battlestation" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "stack", label: "Stack" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];
