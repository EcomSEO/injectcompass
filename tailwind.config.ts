import type { Config } from "tailwindcss";

/**
 * InjectCompass — Healthline-grade medical-publisher design system.
 *
 * Locked tokens. Do not redesign without an editorial decision.
 *
 * Primary: medical teal (#0E8A7A) — trust + clinical, distinct from
 * Healthline's red so we don't look like a clone.
 *
 * Type: Inter for body/UI, Merriweather for editorial pillar H1 only.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          50: "#E8F5F2",
          100: "#D1EBE5",
          200: "#A4D6CC",
          500: "#0A6F61",
          600: "#08594E",
          700: "#053730",
          900: "#053730",
        },
        ink: {
          DEFAULT: "#1A1F2E",
          muted: "#5A6573",
          soft: "#8A92A1",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          alt: "#F7F9FB",
          warm: "#F4F1E8",
        },
        rule: {
          DEFAULT: "#E5E9EE",
          strong: "#CDD3DA",
        },
        success: "#0B7A4D",
        warn: "#8A5A20",
        danger: "#9C2F26",
        reviewed: {
          bg: "#E8F5F2",
          text: "#0A6F61",
        },
        // Legacy aliases — keep so older imports still compile.
        clinical: "#0A6F61",
        "clinical-deep": "#053730",
        "clinical-tint": "#E8F5F2",
        paper: "#FFFFFF",
        "paper-warm": "#F4F1E8",
        "paper-rule": "#E5E9EE",
        "paper-soft": "#FFFFFF",
        "ink-deep": "#1A1F2E",
        "ink-soft": "#5A6573",
        surgical: "#9C2F26",
        "surgical-deep": "#7A2018",
        slate: "#5A6573",
        "slate-soft": "#8A92A1",
        "slate-rule": "#CDD3DA",
        moss: "#0B7A4D",
        amber: "#8A5A20",
        alert: "#9C2F26",
        stone: "#5A6573",
        charcoal: "#1A1F2E",
        sage: "#0B7A4D",
        cream: "#F4F1E8",
        pine: "#053730",
        coral: "#9C2F26",
        forest: "#0A6F61",
        "forest-deep": "#053730",
        terracotta: "#9C2F26",
      },
      fontFamily: {
        sans: ['"Inter"', "Inter", "system-ui", "sans-serif"],
        condensed: ['"Inter"', "system-ui", "sans-serif"],
        serif: ['"Merriweather"', "Georgia", "serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "monospace"],
      },
      maxWidth: {
        prose: "720px",
        reading: "720px",
        atlas: "720px",
        container: "1200px",
        rail: "280px",
      },
      letterSpacing: {
        tightest: "-0.02em",
        eyebrow: "0.05em",
        atlas: "0.18em",
      },
      borderRadius: {
        sm: "6px",
        md: "12px",
        lg: "20px",
        pill: "999px",
      },
      boxShadow: {
        subtle: "0 1px 2px rgb(0 0 0 / 0.04)",
        card: "0 4px 12px rgb(0 0 0 / 0.06)",
        cardHover: "0 8px 24px rgb(0 0 0 / 0.08)",
        soft: "0 1px 2px rgb(0 0 0 / 0.04), 0 4px 12px rgb(0 0 0 / 0.06)",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.2, 0.7, 0.2, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
