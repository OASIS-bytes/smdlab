import { ImageResponse } from "next/og";
import { site } from "@/lib/content";

/** Flat brand fills only, matching the palette in globals.css. */
const INK = "#0b1f17";
const CREAM = "#f3eee6";
const COPPER = "#c8782b";
const MUTED = "#b9b2a4";

export const alt = `${site.brand.name} — ${site.brand.tagline}. ${site.brand.description}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social card for every route. Built from flat rectangles rather than the
 * wordmark asset, so it needs no font files at build time and can never pick
 * up a gradient the site does not use.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: INK,
          color: CREAM,
          padding: "72px 80px",
        }}
      >
        {/* Pad mark, drawn as flat rectangles. */}
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <div style={{ position: "relative", display: "flex", width: 64, height: 64 }}>
            <div
              style={{
                position: "absolute",
                left: 2,
                top: 30,
                width: 4,
                height: 8,
                backgroundColor: CREAM,
              }}
            />
            <div
              style={{
                position: "absolute",
                left: 10,
                top: 33,
                width: 16,
                height: 2,
                backgroundColor: CREAM,
              }}
            />
            <div
              style={{
                position: "absolute",
                left: 26,
                top: 14,
                width: 2,
                height: 20,
                backgroundColor: CREAM,
              }}
            />
            <div
              style={{
                position: "absolute",
                left: 28,
                top: 33,
                width: 24,
                height: 2,
                backgroundColor: COPPER,
              }}
            />
            <div
              style={{
                position: "absolute",
                left: 48,
                top: 26,
                width: 12,
                height: 12,
                backgroundColor: COPPER,
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 26,
              letterSpacing: 7,
              textTransform: "uppercase",
            }}
          >
            Creative Technology Studio
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 104, lineHeight: 1.05 }}>
            {site.brand.name}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 18,
              fontSize: 42,
              lineHeight: 1.2,
              color: COPPER,
            }}
          >
            {site.brand.tagline}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{ display: "flex", width: 10, height: 10, backgroundColor: COPPER }}
          />
          <div style={{ display: "flex", fontSize: 26, color: MUTED }}>
            {site.disciplines.join("  ·  ")}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
