import type { CourseworkGroup } from "./types";

/**
 * By theme, not by semester. A null `subjects` renders as a visible TODO rather
 * than being padded with invented subject names.
 */
export const coursework: CourseworkGroup[] = [
  { label: "Models", subjects: "Deep Learning, Natural Language Processing" },
  { label: "Data at scale", subjects: "Big Data Analytics" },
  { label: "Distributed systems", subjects: "Blockchain" },
  {
    label: "Systems in organisations",
    subjects: "Management Information Systems",
  },
  { label: "Diploma core, MSBTE", subjects: null },
];
