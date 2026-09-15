import { ImageResponse } from "next/og";
import { archivo, archivoFace } from "@/app/og-font";
import { facts, profile } from "@/content/profile";

export const alt = "Suyash Kerkar — applied AI engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Share card, drawn with the site's own tokens so a link preview looks like the
 * page it opens. Values are inline because next/og renders outside Tailwind.
 * This card is usually seen before the site itself, so it is set in Archivo
 * rather than the renderer's fallback.
 */
export default async function OpenGraphImage() {
  const [regular, semibold] = await Promise.all([archivo(400), archivo(600)]);
  const fonts = [...archivoFace(regular, 400), ...archivoFace(semibold, 600)];
  const fontFamily = fonts.length ? "Archivo" : "sans-serif";

  const ground = "#f2efe9";
  const ink = "#1d1f24";
  const muted = "#5c5b55";
  const signal = "#1f4b6e";
  const flag = "#8a6414";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: ground,
          color: ink,
          fontFamily,
        }}
      >
        <div
          style={{
            width: 300,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            borderRight: `1px solid #dfd9ce`,
            padding: "56px 44px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 46, fontWeight: 600, lineHeight: 1.05 }}>
              SUYASH
            </span>
            <span style={{ fontSize: 46, fontWeight: 600, lineHeight: 1.05 }}>
              KERKAR
            </span>
            <span style={{ fontSize: 22, color: muted, marginTop: 20 }}>
              Applied AI engineer
            </span>
            <span style={{ fontSize: 22, color: muted }}>Navi Mumbai</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 10, height: 10, background: signal }} />
            <span style={{ fontSize: 20, color: muted }}>
              Open to 2027 roles
            </span>
          </div>
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "56px 56px",
          }}
        >
          <span
            style={{
              fontSize: 52,
              fontWeight: 600,
              lineHeight: 1.18,
              letterSpacing: "-0.02em",
            }}
          >
            {profile.headline}
          </span>

          <div style={{ display: "flex", gap: 56 }}>
            {facts.map((fact) => (
              <div
                key={fact.label}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <span
                  style={{
                    fontSize: 46,
                    fontWeight: 600,
                    color: fact.tone === "award" ? flag : ink,
                  }}
                >
                  {fact.value}
                </span>
                <span style={{ fontSize: 20, color: muted }}>{fact.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size, ...(fonts.length ? { fonts } : {}) },
  );
}
