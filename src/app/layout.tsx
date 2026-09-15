import type { Metadata } from "next";
import { Archivo_Narrow, Inter } from "next/font/google";
import "./globals.css";

// Inter reads the running text. It is drawn for screens rather than for
// signage: taller x-height and more open apertures than Archivo, which is what
// makes a paragraph at 17px easier to get through. Archivo Narrow keeps the
// rail and the small labels, so the page still sounds like itself where it is
// being loud.
//
// Weights are pinned to the three the design actually uses. Dropping them for
// the variable axis was measured and changed nothing — next/font already serves
// variable files — so the explicit list stays, because it keeps the type scale
// honest rather than leaving every weight silently available.
const inter = Inter({
  variable: "--font-inter",
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
      // No `antialiased`: on the light ground it thins the strokes, and Inter
      // at text sizes wants the weight that subpixel rendering gives it.
      className={`${inter.variable} ${archivoNarrow.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
