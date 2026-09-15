/**
 * Archivo, as a buffer next/og can rasterise with. Shared by the share card and
 * the generated app icons.
 *
 * The page itself now reads in Inter; Archivo stayed here because the card and
 * the icons are display type — a name at 64px and a monogram — where Archivo's
 * tighter, squarer drawing is the point, and nothing on them is read as a
 * paragraph.
 *
 * next/og needs a TTF and the Google CSS endpoint only serves one to an old
 * user agent, hence the header. Every failure path returns null and the caller
 * falls back to the system sans, so a network problem degrades the image
 * instead of failing the build.
 */
export async function archivo(weight: 400 | 600): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=Archivo:wght@${weight}`,
      { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 6.1)" } },
    ).then((r) => (r.ok ? r.text() : ""));
    const url = css.match(/src:\s*url\((https:[^)]+)\)/)?.[1];
    if (!url) return null;
    const res = await fetch(url);
    return res.ok ? await res.arrayBuffer() : null;
  } catch {
    return null;
  }
}

/** Shape next/og wants, or an empty list when the fetch did not resolve. */
export function archivoFace(data: ArrayBuffer | null, weight: 400 | 600) {
  return data
    ? [{ name: "Archivo", data, weight, style: "normal" as const }]
    : [];
}
