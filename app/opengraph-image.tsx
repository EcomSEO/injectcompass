import { ImageResponse } from "next/og";

/**
 * OpenGraph image — 1200x630.
 * Clinical-reference card, not a tech banner:
 *   - Warm paper background (#F5F1E8), not dark
 *   - Mono dateline caps at top: "COMPASS · REFERENCE NO. 01 · INJECTCOMPASS.COM"
 *   - Clinical-blue hairline rule beneath the dateline
 *   - Wordmark: "Inject" (serif) + "Compass" (mono, tracked) + crosshair dot
 *   - Serif tagline: "Injections, done right."
 *   - Small stone-colored disclaimer at bottom: "Educational. Not medical advice."
 *
 * Inline styles only (required by ImageResponse / Satori).
 */

export const runtime = "edge";
export const alt = "InjectCompass — Injections, done right.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const CLINICAL = "#2E5A88";
const CLINICAL_DEEP = "#1F3F60";
const PAPER = "#F5F1E8";
const PAPER_RULE = "#E9E2D1";
const CHARCOAL = "#242424";
const STONE = "#6B6664";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: PAPER,
          padding: "72px 88px",
          position: "relative",
          fontFamily:
            "Georgia, 'Times New Roman', serif",
        }}
      >
        {/* Outer hairline frame — clinical reference card */}
        <div
          style={{
            position: "absolute",
            top: 28,
            left: 28,
            right: 28,
            bottom: 28,
            border: `1px solid ${PAPER_RULE}`,
            display: "flex",
          }}
        />

        {/* TOP: dateline caps */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace",
            fontSize: 18,
            fontWeight: 500,
            color: STONE,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          <span>Compass</span>
          <span style={{ color: `${CLINICAL}66`, display: "flex" }}>·</span>
          <span>Reference No. 01</span>
          <span style={{ color: `${CLINICAL}66`, display: "flex" }}>·</span>
          <span>injectcompass.com</span>
        </div>

        {/* Clinical-blue hairline rule */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginTop: 20,
          }}
        >
          <div
            style={{
              height: 3,
              width: 72,
              background: CLINICAL,
              display: "flex",
            }}
          />
          <div
            style={{
              height: 1,
              flex: 1,
              background: `${CLINICAL}33`,
              display: "flex",
            }}
          />
        </div>

        {/* MIDDLE: wordmark + tagline */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginTop: -20,
          }}
        >
          {/* Wordmark row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
            }}
          >
            {/* Crosshair dot */}
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 999,
                border: `3px solid ${CLINICAL}`,
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: 6,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: -6,
                  right: -6,
                  height: 3,
                  background: CLINICAL,
                  transform: "translateY(-50%)",
                  display: "flex",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: -6,
                  bottom: -6,
                  width: 3,
                  background: CLINICAL,
                  transform: "translateX(-50%)",
                  display: "flex",
                }}
              />
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 999,
                  background: CLINICAL,
                  zIndex: 1,
                }}
              />
            </div>

            <div
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontSize: 128,
                fontWeight: 700,
                color: CLINICAL_DEEP,
                letterSpacing: "-0.03em",
                lineHeight: 1,
                display: "flex",
              }}
            >
              Inject
            </div>
            <div
              style={{
                fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace",
                fontSize: 112,
                fontWeight: 500,
                color: CLINICAL,
                letterSpacing: "0.02em",
                lineHeight: 1,
                display: "flex",
              }}
            >
              Compass
            </div>
          </div>

          {/* Tagline */}
          <div
            style={{
              marginTop: 48,
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: 56,
              fontWeight: 500,
              fontStyle: "italic",
              color: CHARCOAL,
              letterSpacing: "-0.01em",
              lineHeight: 1.1,
              display: "flex",
            }}
          >
            Injections, done right.
          </div>

          {/* Secondary reference line */}
          <div
            style={{
              marginTop: 22,
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: 26,
              fontWeight: 400,
              color: STONE,
              letterSpacing: "0",
              lineHeight: 1.35,
              maxWidth: 880,
              display: "flex",
            }}
          >
            Step-numbered technique, reconstitution math, and printable cheat
            sheets &mdash; for people prescribed injectable medications.
          </div>
        </div>

        {/* BOTTOM: disclaimer strip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 20,
            borderTop: `1px solid ${PAPER_RULE}`,
          }}
        >
          <div
            style={{
              fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace",
              fontSize: 16,
              fontWeight: 500,
              color: STONE,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              display: "flex",
            }}
          >
            Educational. Not medical advice.
          </div>
          <div
            style={{
              fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace",
              fontSize: 16,
              fontWeight: 500,
              color: STONE,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              display: "flex",
            }}
          >
            The Launch Edition
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
