import type { Metadata } from "next";
import { Archivo, Archivo_Narrow } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const archivoNarrow = Archivo_Narrow({
  variable: "--font-archivo-narrow",
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://suyashkerkar.vercel.app";

const description =
  "Applied AI engineer and final-year BE student in AI & Data Science. Six shipped systems across health records, agriculture and developer tooling, built so the rules live in code and the model only explains them.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Suyash Kerkar — Applied AI engineer",
    template: "%s — Suyash Kerkar",
  },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: SITE_URL,
    title: "Suyash Kerkar — Applied AI engineer",
    description,
    siteName: "Suyash Kerkar",
  },
  twitter: {
    card: "summary_large_image",
    title: "Suyash Kerkar — Applied AI engineer",
    description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${archivoNarrow.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
