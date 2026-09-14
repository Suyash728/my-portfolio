import type { StackGroup } from "./types";

/**
 * Grouped by where each thing sits in a request, not by logo. "Practices" holds
 * everything with no real brand mark — inventing one would be worse than a
 * plain chip.
 */
export const stack: StackGroup[] = [
  {
    label: "Languages",
    items: [
      { name: "Python", icon: "python" },
      { name: "JavaScript", icon: "javascript" },
      { name: "TypeScript", icon: "typescript" },
      { name: "Java", icon: "openjdk" },
      { name: "C++", icon: "cplusplus" },
      { name: "SQL" },
    ],
  },
  {
    label: "Frontend",
    items: [
      { name: "Next.js", icon: "nextdotjs" },
      { name: "React", icon: "react" },
      { name: "Tailwind CSS", icon: "tailwindcss" },
    ],
  },
  {
    label: "Backend",
    items: [
      { name: "FastAPI", icon: "fastapi" },
      { name: "Node", icon: "nodedotjs" },
      { name: "REST design" },
      { name: "Rate limiting" },
    ],
  },
  {
    label: "Data & retrieval",
    items: [
      { name: "Supabase", icon: "supabase" },
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "MySQL", icon: "mysql" },
      { name: "BigQuery", icon: "googlebigquery" },
      { name: "Firebase", icon: "firebase" },
      { name: "pgvector" },
      { name: "PostGIS" },
    ],
  },
  {
    label: "Models & chains",
    items: [
      { name: "Gemini API", icon: "googlegemini" },
      { name: "LangChain", icon: "langchain" },
      { name: "BioBERT", icon: "huggingface" },
      { name: "Vertex AI", icon: "googlecloud" },
      { name: "Groq" },
      { name: "RAG pipelines" },
      { name: "Embeddings" },
      { name: "ComfyUI (Flux)" },
    ],
  },
  {
    label: "Web3",
    items: [
      { name: "Polygon", icon: "polygon" },
      { name: "Solidity", icon: "solidity" },
      { name: "Smart contracts" },
    ],
  },
  {
    label: "Infrastructure",
    items: [
      { name: "Vercel", icon: "vercel" },
      { name: "Cloudflare", icon: "cloudflare" },
      { name: "Railway", icon: "railway" },
      { name: "Google Cloud", icon: "googlecloud" },
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "github" },
      { name: "n8n", icon: "n8n" },
      { name: "Linux", icon: "linux" },
    ],
  },
  {
    label: "Hardware",
    items: [
      { name: "ESP32", icon: "espressif" },
      { name: "Arduino", icon: "arduino" },
    ],
  },
  {
    label: "Practices",
    items: [
      { name: "OCR extraction" },
      { name: "NER" },
      { name: "Text to speech" },
      { name: "Mutation testing" },
      { name: "Btrfs / Snapper" },
      { name: "systemd" },
      { name: "Shell scripting" },
    ],
  },
];
