import type { Project } from "./types";

/**
 * Adding a project means adding an entry here and nothing else. Lead with the
 * problem and the decision; the feature list goes in `detail` or is cut.
 *
 * Each project includes a typed `schematic` representing its deterministic
 * pipeline and verification gate, demonstrating Suyash's core thesis:
 * deterministic engineering constrains model hallucination.
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
      {
        label: "Repository",
        href: "https://github.com/Suyash728/MediSync",
        icon: "repo",
      },
      {
        label: "Live",
        href: null,
        icon: "live",
        todoContext: "Clinical PWA staging deployment under sandbox audit; demo access available upon request.",
      },
    ],
    schematic: {
      stages: [
        { label: "Raw Scan / Photo", sublabel: "Patient mobile ingest" },
        { label: "OCR + Extraction", sublabel: "Schema normalization" },
        { label: "pgvector Index", sublabel: "Sanitized embeddings only" },
        { label: "Rule-Table Drug Check", sublabel: "Deterministic Gate", isGate: true },
        { label: "Gemini Citation & 11-Lang TTS", sublabel: "Synthesize & cite" },
      ],
      gateNote:
        "Deterministic Gate: Contraindication evaluated strictly against typed AST rule lookup tables. The probabilistic LLM has zero discretion over drug conflicts.",
      boundaryRule: "The LLM explains and cites; it never decides whether a conflict exists.",
    },
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
      {
        label: "Repository",
        href: null,
        icon: "repo",
        todoContext: "Monorepo under institutional patent & publication hold with Prof. Shraddha Rokade.",
      },
      {
        label: "Paper",
        href: null,
        icon: "paper",
        todoContext: "Survey paper scheduled for December 2026 IEEE/Springer submission window.",
      },
    ],
    schematic: {
      stages: [
        { label: "IoT Sensor Ingest", sublabel: "Farm gate telemetry" },
        { label: "FastAPI AI Trust Scorer", sublabel: "Verification Gate", isGate: true },
        { label: "Polygon Amoy Ledger", sublabel: "Source of Truth" },
        { label: "Retail Margin Readout", sublabel: "Chain of custody audit" },
      ],
      gateNote:
        "Verification Gate: AI oracle scores telemetry confidence before on-chain commit. The smart contract ledger retains absolute source of truth.",
      boundaryRule: "The model scores trust; the blockchain ledger holds the price.",
    },
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
      {
        label: "Repository",
        href: "https://github.com/Suyash728/trustlayer",
        icon: "repo",
      },
    ],
    schematic: {
      stages: [
        { label: "Generated Code + Suite", sublabel: "Synthesized candidate" },
        { label: "Static API Check", sublabel: "AST hallucination filter" },
        { label: "Local mutmut Engine", sublabel: "Line Mutation Gate", isGate: true },
        { label: "Surviving-Mutant Report", sublabel: "Mathematical proof" },
      ],
      gateNote:
        "Line Mutation Gate: Mutates AST lines systematically. If the test suite passes with inverted logic, coverage claims are rejected.",
      boundaryRule: "Mutation testing is verification; zero source code leaves the machine.",
    },
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
    links: [
      {
        label: "Paper",
        href: null,
        icon: "paper",
        todoContext: "Published in IJIRCEE (Feb 2024); archival PDF reprint available upon request.",
      },
    ],
    schematic: {
      stages: [
        { label: "GPS + GSM Audio + SOS", sublabel: "Hardware sensor bus" },
        { label: "Single ESP32 Board", sublabel: "Autonomous Path", isGate: true },
        { label: "Direct Alert Dispatch", sublabel: "Direct cellular dispatch" },
      ],
      gateNote:
        "Autonomous Path: Firmware logic executes entirely on-chip without dependency on Bluetooth pairing, phone OS state, or cloud proxies.",
      boundaryRule: "Hardware autonomy: SOS dispatch never depends on a companion app being open.",
    },
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
    links: [
      {
        label: "Repository",
        href: null,
        icon: "repo",
        todoContext: "Vibe2Ship hackathon submission repository undergoing OAuth scope security review.",
      },
    ],
    schematic: {
      stages: [
        { label: "Gmail / Inbox Stream", sublabel: "Granted message ingest" },
        { label: "Gemini Deadline Extractor", sublabel: "Temporal NER Gate", isGate: true },
        { label: "Google Workspace Write", sublabel: "Direct Calendar write" },
      ],
      gateNote:
        "Temporal NER Gate: Strict Pydantic schema validation binds model extraction to ISO 8601 temporal bounds before touching Workspace APIs.",
      boundaryRule: "The agent writes to Workspace directly; eliminates double entry.",
    },
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
    links: [
      {
        label: "Repository",
        href: null,
        icon: "repo",
        todoContext: "Academic mini-project repository archived on university GitLab.",
      },
    ],
    schematic: {
      stages: [
        { label: "Clinical Diagnostic Report", sublabel: "Complex clinical text" },
        { label: "BioBERT NER Extraction", sublabel: "Findings Gate", isGate: true },
        { label: "Multilingual Patient Summary", sublabel: "Structured translation" },
      ],
      gateNote:
        "Findings Gate: BioBERT isolates structured biomedical entities (dosages, symptoms, observations) before translation begins.",
      boundaryRule: "Translation carries structured findings rather than unconstrained paraphrase.",
    },
  },
];
