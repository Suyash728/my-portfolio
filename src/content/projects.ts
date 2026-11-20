import type { Project } from "./types";

/**
 * Four spotlight cards, then the earlier builds. Spotlight copy at rest
 * (problem + decision) stays under 28 words.
 */
export const projects: Project[] = [
  // ================= 4 SPOTLIGHT BENTO PROJECTS =================
  {
    slug: "medisync",
    name: "MediSync 2.0",
    spotlight: true,
    outcome: { label: "1st Place · CodeFusion 2026", tone: "award" },
    problem: "Patients hold fragmented physical records across disparate doctors.",
    decision:
      "Drug-conflict detection runs on a deterministic rule table; LLMs strictly cite.",
    detail:
      "Reports arrive as paper scans, normalized through OCR before vectorization. Contraindications are evaluated on a typed AST lookup table; Gemini generates patient explanations and document citation cards.",
    tech: [
      { name: "Next.js", icon: "nextdotjs" },
      { name: "FastAPI", icon: "fastapi" },
      { name: "TypeScript", icon: "typescript" },
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "Gemini 2.5 Flash", icon: "googlegemini" },
      { name: "Supabase", icon: "supabase" },
      { name: "pgvector" },
      { name: "ABDM" },
    ],
    links: [
      {
        label: "Repository",
        href: "https://github.com/Suyash728/MediSync",
        icon: "repo",
      },
    ],
    schematic: {
      stages: [
        { label: "Raw Scan / Photo", sublabel: "Mobile camera ingest" },
        { label: "OCR + Extraction", sublabel: "Schema normalization" },
        { label: "pgvector Index", sublabel: "Sanitized embeddings" },
        { label: "Rule-Table Drug Check", sublabel: "Deterministic Gate", isGate: true },
        { label: "Gemini Citation & TTS", sublabel: "Natural language & voice" },
      ],
      gateNote:
        "Deterministic Gate: Contraindication evaluated strictly against typed AST rule lookup tables. Probabilistic LLM has zero discretion over drug conflicts.",
      boundaryRule: "The LLM explains and cites; it never decides whether a conflict exists.",
    },
  },
  {
    slug: "aeromed",
    name: "AeroMed India",
    spotlight: true,
    outcome: { label: "Active Submission · INNOVATE 2026 (Adaption AI Track)", tone: "status" },
    problem:
      "Urban respiratory surges strike emergency rooms without localized atmospheric warning.",
    decision:
      "Atmospheric ML (R²=0.988) and statutory CAQM rules constrain multilingual triage.",
    detail:
      "Pan-India respiratory disease surveillance trained on 10-year CPCB data across 12 Indian metros. Gradient boosting predicts 48-hr patient admission surges; statutory CAQM GRAP directives govern clinical triage across 12 native Indian languages.",
    tech: [
      { name: "Next.js", icon: "nextdotjs" },
      { name: "FastAPI", icon: "fastapi" },
      { name: "Python", icon: "python" },
      { name: "TypeScript", icon: "typescript" },
      { name: "Scikit-Learn" },
      { name: "Adaption AI" },
      { name: "Vercel", icon: "vercel" },
    ],
    links: [
      {
        label: "Live Demo",
        href: "https://aeromed-india.vercel.app",
        icon: "live",
      },
      {
        label: "Repository",
        href: "https://github.com/Suyash728/aeromed-india",
        icon: "repo",
      },
    ],
    schematic: {
      stages: [
        { label: "Open-Meteo Ingest", sublabel: "12 Metro atmospheric telemetry" },
        { label: "Gradient Boosting ML", sublabel: "Surge Regressor (R²=0.988)" },
        { label: "Statutory CAQM Gate", sublabel: "GRAP Stage I-IV Gate", isGate: true },
        { label: "Adaption AI Engine", sublabel: "12-Language clinical triage" },
      ],
      gateNote:
        "Statutory CAQM Gate: Official GRAP regulations constrain triage recommendations. LLM translates directives into native languages without modifying regulatory advice.",
      boundaryRule: "Atmospheric ML forecasts the surge; statutory rules govern the medical triage.",
    },
  },
  {
    slug: "kisanchain",
    name: "KisanChain",
    spotlight: true,
    outcome: { label: "Survey Paper · In Review", tone: "status" },
    problem:
      "Agricultural crop retail markups lack transparent chain-of-custody verification.",
    decision:
      "FastAPI oracle validates sensor telemetry; Polygon Amoy blockchain ledger settles prices.",
    detail:
      "Guided by Prof. Shraddha Rokade. Sensor data from farm gates is verified by an AI trust layer before committing immutable pricing transactions to Polygon smart contracts.",
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
        label: "Survey Paper",
        href: null,
        icon: "paper",
        statusPill: "In Review",
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
    spotlight: true,
    outcome: { label: "Local-First Mutation Engine", tone: "status" },
    problem:
      "Synthesized AI test suites pass while leaving silent code bugs undetected.",
    decision:
      "Local mutmut engine proves test quality by actively mutating AST lines.",
    detail:
      "Runs locally with zero external telemetry. Systematically inverts AST conditions to determine whether AI-authored test suites actually catch mutants or merely generate hollow coverage.",
    tech: [
      { name: "Python", icon: "python" },
      { name: "mutmut" },
      { name: "Static analysis" },
      { name: "AST parsing" },
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

  // ================= EARLIER BUILDS =================
  {
    slug: "iot-tracker",
    name: "Multipurpose IoT Tracker",
    spotlight: false,
    outcome: { label: "Published · IJIRCEE Feb 2024", tone: "award" },
    problem:
      "Commercial asset trackers fail when companion smartphone apps are closed.",
    decision:
      "GPS, audio and SOS logic execute entirely on-chip via ESP32.",
    detail:
      "Published in IJIRCEE (Feb 2024). Standalone firmware dispatches cellular SMS and voice calls directly from hardware without dependency on mobile operating system state.",
    tech: [
      { name: "ESP32", icon: "espressif" },
      { name: "Arduino IDE", icon: "arduino" },
      { name: "A9G Cellular" },
      { name: "GPS Module" },
    ],
    links: [
      {
        label: "Archival Reprint",
        href: null,
        icon: "paper",
        statusPill: "IJIRCEE Feb 2024",
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
    spotlight: false,
    outcome: { label: "Vibe2Ship Finalist", tone: "status" },
    problem:
      "Academic and project deadlines arrive in disparate emails without calendar sync.",
    decision:
      "Agent extracts ISO-8601 deadlines and commits directly to Google Calendar.",
    detail:
      "Autonomous inbox triage agent utilizing Pydantic structured extraction and direct Google Workspace calendar API automation.",
    tech: [
      { name: "Gemini", icon: "googlegemini" },
      { name: "Firebase", icon: "firebase" },
      { name: "Google Cloud", icon: "googlecloud" },
      { name: "Workspace APIs" },
    ],
    links: [
      {
        label: "Hackathon Build",
        href: null,
        icon: "repo",
        statusPill: "Vibe2Ship Finalist",
      },
    ],
  },
  {
    slug: "medinsight",
    name: "MedInsight",
    spotlight: false,
    outcome: { label: "BioBERT NER Mini Project", tone: "status" },
    problem:
      "Diagnostic reports carry clinical jargon unreadable to non-English patients.",
    decision:
      "BioBERT extracts structured clinical entities before initiating multilingual translation.",
    detail:
      "Entity extraction pipeline ensuring that clinical findings and dosages remain uncorrupted during regional language synthesis.",
    tech: [
      { name: "BioBERT", icon: "huggingface" },
      { name: "Python", icon: "python" },
      { name: "NER" },
    ],
    links: [
      {
        label: "GitLab Archive",
        href: null,
        icon: "repo",
        statusPill: "Academic Mini Project",
      },
    ],
  },
];
