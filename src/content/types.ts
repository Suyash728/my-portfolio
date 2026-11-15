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

/** Which glyph sits before a link's label. */
export type LinkIconName = "repo" | "live" | "paper";

/** A null href is a link that does not exist yet; it can render as a status pill or be omitted. */
export interface Link {
  label: string;
  href: string | null;
  icon: LinkIconName;
  /** Contextual status note for pending paper or private monorepo. */
  statusPill?: string;
}

export interface SchematicStage {
  label: string;
  sublabel?: string;
  isGate?: boolean;
}

export interface Schematic {
  stages: SchematicStage[];
  gateNote: string;
  boundaryRule: string;
}

export interface Project {
  /** Stable id, used as the section anchor and React key. */
  slug: string;
  name: string;
  outcome: Outcome;
  /** One line, the problem in the world — max 14 words. */
  problem: string;
  /** The architectural decision worth defending — max 14 words. */
  decision: string;
  /** Everything else. Shown inside the expanded pipeline inspection. */
  detail?: string;
  tech: Tech[];
  links: Link[];
  /** Decision architecture pipeline schematic proving the engineering boundary. */
  schematic?: Schematic;
  /** True for the 4 flagship Spotlight Bento cards; false for the compact archive. */
  spotlight?: boolean;
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
  /**
   * Subjects, for the levels where subjects mean anything. Omitted entirely
   * where there are none to give; null where the list is still outstanding.
   */
  focus?: string | null;
}

export interface StackGroup {
  label: string;
  items: Tech[];
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
