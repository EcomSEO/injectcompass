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
          500: "#0E8A7A",
          600: "#0A6F61",
          700: "#08594E",
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
        success: "#10A26A",
        warn: "#B8782F",
        danger: "#C8463C",
        reviewed: {
          bg: "#E8F5F2",
          text: "#0A6F61",
        },
        // Legacy aliases — keep so older imports still compile.
        clinical: "#0E8A7A",
        "clinical-deep": "#0A6F61",
        "clinical-tint": "#E8F5F2",
        paper: "#FFFFFF",
        "paper-warm": "#F4F1E8",
        "paper-rule": "#E5E9EE",
        "paper-soft": "#FFFFFF",
        "ink-deep": "#1A1F2E",
        "ink-soft": "#5A6573",
        surgical: "#C8463C",
        "surgical-deep": "#9C2F26",
        slate: "#5A6573",
        "slate-soft": "#8A92A1",
        "slate-rule": "#CDD3DA",
        moss: "#10A26A",
        amber: "#B8782F",
        alert: "#C8463C",
        stone: "#5A6573",
        charcoal: "#1A1F2E",
        sage: "#10A26A",
        cream: "#F4F1E8",
        pine: "#0A6F61",
        coral: "#C8463C",
        forest: "#0E8A7A",
        "forest-deep": "#0A6F61",
        terracotta: "#C8463C",
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
