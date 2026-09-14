import { ImageResponse } from "next/og";
import { archivo, archivoFace } from "@/app/og-font";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/**
 * Generated rather than vendored as a binary, so the mark is rebuilt from the
 * tokens whenever they change. Values are inline because next/og renders
 * outside Tailwind — the same trade-off as the share card.
 */
export default async function AppleIcon() {
  const semibold = await archivo(600);
  const fonts = archivoFace(semibold, 600);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1d1f24",
          color: "#f2efe9",
          fontSize: 94,
          fontWeight: 600,
          fontFamily: fonts.length ? "Archivo" : "sans-serif",
          letterSpacing: "-0.03em",
        }}
      >
        SK
      </div>
    ),
    { ...size, ...(fonts.length ? { fonts } : {}) },
  );
}
