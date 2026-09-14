import type { Fact, Section, StatusLine } from "./types";

export const profile = {
  name: "Suyash Kerkar",
  /** Rail identity block, one line per entry. */
  identity: ["Applied AI engineer", "BE, AI & Data Science", "Navi Mumbai"],
  headline:
    "I build applied AI systems. The part I care about is deciding what the model is not allowed to do.",
  lede: "Final year, BE in Artificial Intelligence & Data Science at Terna Engineering College, Mumbai University. Graduating 2027. In every system here, the rules live in code and the model is confined to explaining what the code decided.",
  email: "suyashkerkar642005@gmail.com",
  github: "https://github.com/Suyash728",
  linkedin: "https://linkedin.com/in/suyashkerkar",
  resume: "/Suyash_Kerkar_CV_2026.pdf",
  location: "Nerul, Navi Mumbai",
} as const;

export const statuses: StatusLine[] = [
  { label: "Open to 2027 roles", tone: "live" },
  { label: "Survey paper in progress", tone: "award" },
  { label: "TrustLayer in development", tone: "plain" },
];

export const facts: Fact[] = [
  { value: "6", label: "shipped systems" },
  { value: "2", label: "papers, one published" },
  { value: "1st", label: "CodeFusion 2026", tone: "award" },
];

/** Drives the rail nav and the scroll-spy. Order matches the page. */
export const sections: Section[] = [
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "stack", label: "Stack" },
  { id: "coursework", label: "Coursework" },
  { id: "achievements", label: "Achievements" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];
