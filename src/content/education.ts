import type { Qualification } from "./types";

/**
 * Newest first, and every row carries its result where there is one — a
 * qualification with the number quietly left off reads as a qualification with
 * something to hide.
 *
 * `focus` is the subject list for the levels where subjects mean anything. SSC
 * has none and omits the field; the diploma's is still outstanding and is null,
 * so it renders a visible TODO rather than being padded with invented names.
 */
export const education: Qualification[] = [
  {
    award: "BE — Artificial Intelligence & Data Science",
    institution: "Terna Engineering College, Navi Mumbai · Mumbai University",
    meta: "2027, ongoing",
    focus:
      "Deep Learning, Natural Language Processing, Big Data Analytics, Blockchain, Management Information Systems",
  },
  {
    award: "Diploma — Computer Engineering",
    institution: "YBIT, Sawantwadi, Sindhudurg · MSBTE",
    meta: "2024 · 87.7%",
    focus: null,
  },
  {
    award: "SSC",
    institution: "St. Francis Xavier's High School, Vengurla",
    meta: "2021 · 86.6%",
  },
];
