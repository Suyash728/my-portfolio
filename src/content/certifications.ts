import type { Certification } from "./types";

/** A null credential renders as a visible TODO. */
export const certifications: Certification[] = [
  {
    issuer: "Udemy · 2024",
    name: "Web Development Bootcamp",
    credential: null,
  },
];
