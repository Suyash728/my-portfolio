import type { Project } from "./types";

/**
 * Adding a project means adding an entry here and nothing else. Lead with the
 * problem and the decision; the feature list goes in `detail` or is cut.
 */
export const projects: Project[] = [
  {
    slug: "medisync",
    name: "MediSync 2.0",
    outcome: { label: "1st place, CodeFusion 2026", tone: "award" },
    problem:
      "Patients hold their records as paper scans and phone photos. No single system reads across them, so every new doctor starts from nothing.",
    decision:
      "Drug-conflict detection is a rule table, not a prompt. The model writes the explanation and cites the record it came from; it never decides whether a conflict exists.",
    detail:
      "Reports arrive as images, so ingestion runs OCR, then extraction, then embedding on upload — the retrieval layer never sees the raw scan. Question-answering over the record with citation cards, 11-language text to speech, time-limited audit-logged sharing, separate roles for patients, doctors and pharmacists. ABDM integration. Shipped as a PWA on Vercel and Railway.",
    tech: [
      { name: "Next.js 14", icon: "nextdotjs" },
      { name: "TypeScript", icon: "typescript" },
      { name: "FastAPI", icon: "fastapi" },
      { name: "Supabase", icon: "supabase" },
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "LangChain", icon: "langchain" },
      { name: "Gemini 2.5 Flash", icon: "googlegemini" },
      { name: "Vercel", icon: "vercel" },
      { name: "Railway", icon: "railway" },
      { name: "Groq gpt-oss-120b" },
      { name: "pgvector" },
      { name: "OCR extraction" },
      { name: "ABDM" },
    ],
    links: [
      { label: "Repository", href: "https://github.com/Suyash728/MediSync" },
      { label: "Live", href: null },
    ],
  },
  {
    slug: "kisanchain",
    name: "KisanChain",
    outcome: { label: "Survey paper, December 2026 window", tone: "status" },
    problem:
      "A farmer sells at one price and the crop retails at four times it. Nobody along the chain can show where the margin went.",
    decision:
      "Prices and sensor readings settle on-chain. The AI oracle scores only whether an off-chain reading should be trusted before it is written — the ledger stays the source of truth, and the model never gets a vote on the number.",
    detail:
      "Polygon Amoy contracts, a FastAPI trust layer, Supabase schema and IoT sensor ingest. The oracle trust layer is the novel contribution and the subject of the survey paper, guided by Prof. Shraddha Rokade.",
    tech: [
      { name: "Polygon Amoy", icon: "polygon" },
      { name: "Solidity", icon: "solidity" },
      { name: "FastAPI", icon: "fastapi" },
      { name: "Supabase", icon: "supabase" },
      { name: "Python", icon: "python" },
      { name: "IoT sensor ingest" },
    ],
    links: [
      { label: "Repository", href: null },
      { label: "Paper", href: null },
    ],
  },
  {
    slug: "trustlayer",
    name: "TrustLayer",
    outcome: { label: "In development", tone: "status" },
    problem:
      "A generated test suite passes and proves nothing, and generated code calls APIs that were never in the library.",
    decision:
      "Mutation testing is the verification, not coverage. If mutmut changes a line and the suite still passes, the test that claimed to cover it didn't. Runs locally — no source leaves the machine.",
    tech: [
      { name: "Python", icon: "python" },
      { name: "mutmut" },
      { name: "Static analysis" },
    ],
    links: [
      { label: "Repository", href: "https://github.com/Suyash728/trustlayer" },
    ],
  },
  {
    slug: "iot-tracker",
    name: "Multipurpose IoT Tracker",
    outcome: { label: "Published, IJIRCEE, February 2024", tone: "award" },
    problem:
      "Off-the-shelf trackers return a location and nothing about what is happening around the asset.",
    decision:
      "GPS, GSM audio and the SOS path all sit on one ESP32 board, so raising an alert never depends on a companion app being open on someone's phone.",
    tech: [
      { name: "ESP32", icon: "espressif" },
      { name: "Arduino IDE", icon: "arduino" },
      { name: "A9G" },
      { name: "GPS module" },
    ],
    links: [{ label: "Paper", href: null }],
  },
  {
    slug: "autoclutch",
    name: "AutoClutch",
    outcome: { label: "Vibe2Ship", tone: "status" },
    problem:
      "Deadlines arrive in mail and get entered into a calendar by hand, or not at all.",
    decision:
      "The agent reads the mail and calendar it has been granted and writes to Workspace directly, rather than asking you to enter the same deadline twice.",
    tech: [
      { name: "Gemini", icon: "googlegemini" },
      { name: "Firebase", icon: "firebase" },
      { name: "Google Cloud", icon: "googlecloud" },
      { name: "Workspace APIs" },
      { name: "Agentic workflow" },
    ],
    links: [{ label: "Repository", href: null }],
  },
  {
    slug: "medinsight",
    name: "MedInsight",
    outcome: { label: "Mini project", tone: "status" },
    problem:
      "A diagnostic report is written for a clinician and handed to a patient who does not read English.",
    decision:
      "BioBERT extracts the named entities first and the summary is built from those, so the translation carries findings rather than paraphrase.",
    tech: [
      { name: "BioBERT", icon: "huggingface" },
      { name: "Python", icon: "python" },
      { name: "NER" },
    ],
    links: [{ label: "Repository", href: null }],
  },
];
