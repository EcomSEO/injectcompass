import { ImageResponse } from "next/og";

/**
 * Favicon — 32x32.
 * Clinical-blue serif "I" on warm paper with a small crosshair mark.
 * Hex values pulled directly from tailwind.config.ts.
 */

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Brand hex — do not abstract, keep literal so the runtime edge renderer
// doesn't need to resolve any module imports.
const CLINICAL = "#2E5A88";
const CLINICAL_DEEP = "#1F3F60";
const PAPER = "#F5F1E8";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: PAPER,
          position: "relative",
          border: `1px solid ${CLINICAL}`,
        }}
      >
        {/* Crosshair ring */}
        <div
          style={{
            position: "absolute",
            top: 3,
            right: 3,
            width: 8,
            height: 8,
            borderRadius: 999,
            border: `1px solid ${CLINICAL}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 2,
              height: 2,
              borderRadius: 999,
              background: CLINICAL,
            }}
          />
        </div>

        {/* Serif "I" */}
        <div
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: 24,
            fontWeight: 700,
            color: CLINICAL_DEEP,
            lineHeight: 1,
            letterSpacing: "-0.02em",
            display: "flex",
          }}
        >
          I
        </div>
      </div>
    ),
    { ...size },
  );
}
