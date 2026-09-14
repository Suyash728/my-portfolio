import type { IconSlug } from "./icons.generated";

/**
 * A technology. `icon` is optional on purpose: things with a real brand mark
 * get one, and concepts (RAG, pgvector, rate limiting) render as plain chips
 * rather than being given an invented logo.
 */
export interface Tech {
  name: string;
  icon?: IconSlug;
}

/**
 * `award` uses the flag colour and is reserved for placements and publications.
 * `status` uses the signal colour and means work that is still moving.
 */
export type OutcomeTone = "award" | "status";

export interface Outcome {
  label: string;
  tone: OutcomeTone;
}

/** A null href is a link that does not exist yet; it renders as a visible TODO. */
export interface Link {
  label: string;
  href: string | null;
}

export interface Project {
  /** Stable id, used as the section anchor and React key. */
  slug: string;
  name: string;
  outcome: Outcome;
  /** One line, the problem in the world — not the feature list. */
  problem: string;
  /** The architectural decision worth defending. */
  decision: string;
  /** Everything else. Optional; the smaller builds do without it. */
  detail?: string;
  tech: Tech[];
  links: Link[];
}

export interface Role {
  org: string;
  title: string;
  period: string;
  kind: string;
  points: string[];
}

export interface Qualification {
  award: string;
  institution: string;
  /** Year, and result where there is one. */
  meta: string;
}

export interface StackGroup {
  label: string;
  items: Tech[];
}

export interface CourseworkGroup {
  label: string;
  /** Either the subjects, or null where the list is still outstanding. */
  subjects: string | null;
}

/** A discrete placement or publication. */
export interface Achievement {
  marker: string;
  title: string;
  detail?: string;
}

/** Participation and volunteering — reads as a list, not as a result. */
export interface Activity {
  marker: string;
  text: string;
}

export interface Certification {
  issuer: string;
  name: string;
  credential: string | null;
}

export interface StatusLine {
  label: string;
  tone: "live" | "award" | "plain";
}

export interface Fact {
  value: string;
  label: string;
  tone?: OutcomeTone;
}

export interface Section {
  id: string;
  label: string;
}
