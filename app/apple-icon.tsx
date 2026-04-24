import { ImageResponse } from "next/og";

/**
 * Apple touch icon — 180x180.
 * Crosshair mark + serif "IC" in clinical-blue on warm paper.
 * Clinical reference look; evokes a chart stamp, not a tech logo.
 */

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const CLINICAL = "#2E5A88";
const CLINICAL_DEEP = "#1F3F60";
const PAPER = "#F5F1E8";
const PAPER_RULE = "#E9E2D1";
const STONE = "#6B6664";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: PAPER,
          position: "relative",
          padding: 24,
        }}
      >
        {/* Hairline inner frame — clinical reference card feel */}
        <div
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            right: 10,
            bottom: 10,
            border: `1px solid ${PAPER_RULE}`,
            borderRadius: 4,
          }}
        />

        {/* Crosshair mark */}
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 999,
            border: `2.5px solid ${CLINICAL}`,
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 10,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: 0,
              right: 0,
              height: 2.5,
              background: CLINICAL,
              transform: "translateY(-50%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              bottom: 0,
              width: 2.5,
              background: CLINICAL,
              transform: "translateX(-50%)",
            }}
          />
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: CLINICAL,
              zIndex: 1,
            }}
          />
        </div>

        {/* "IC" wordmark */}
        <div
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: 72,
            fontWeight: 700,
            color: CLINICAL_DEEP,
            lineHeight: 1,
            letterSpacing: "-0.04em",
            display: "flex",
          }}
        >
          IC
        </div>

        {/* Clinical caps footer — COMPASS */}
        <div
          style={{
            marginTop: 8,
            fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace",
            fontSize: 10,
            fontWeight: 500,
            color: STONE,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            display: "flex",
          }}
        >
          Compass
        </div>
      </div>
    ),
    { ...size },
  );
}
