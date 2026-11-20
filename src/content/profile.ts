import type { Fact, Section, StatusLine } from "./types";
import { projects } from "./projects";

export const profile = {
  name: "Suyash Kerkar",
  identity: ["Applied AI engineer", "BE, AI & Data Science", "Navi Mumbai"],
  headline:
    "I build applied AI systems — the part I care about is deciding what the model is not allowed to do.",
  lede: "Final-year BE in AI & Data Science @ Terna Engineering College, Mumbai University. Graduating 2027. Local-first inference & deterministic systems.",
  email: "suyashkerkar642005@gmail.com",
  github: "https://github.com/Suyash728",
  linkedin: "https://www.linkedin.com/in/suyashkerkar",
  resume: "/resume.pdf",
  location: "Navi Mumbai, IN",
} as const;

export const statuses: StatusLine[] = [
  { label: "Open to 2027 roles", tone: "live" },
  { label: "Hardware & Local AI Lab live", tone: "live" },
  { label: "KisanChain survey paper in review", tone: "plain" },
];

export const facts: Fact[] = [
  { value: String(projects.length), label: "Systems Built" },
  { value: "1st", label: "CodeFusion '26", tone: "award" },
  { value: "Finalist", label: "Dataverse '26", tone: "award" },
  { value: "Pub", label: "IJIRCEE '24", tone: "award" },
];

/** Drives the rail nav and the scroll-spy. Order matches the page. */
export const sections: Section[] = [
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "stack", label: "Stack" },
  { id: "battlestation", label: "Systems Lab" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];
