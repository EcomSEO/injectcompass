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
        // Stitch design system (locked 2026-04-30) — full midnight scale
        // for layered dark surfaces + aqua scale for accents/CTAs.
        // Use these instead of opacity hacks (bg-white/10) which fail
        // contrast in many lighting conditions.
        midnight: {
          DEFAULT: "#061B23",
          deep: "#020D12",
          raised: "#0E2A35",
          card: "#103040",
          elevated: "#143A4C",
          overlay: "#1A4859",
          rule: "#16384A",
          "rule-soft": "#0F2832",
        },
        aqua: {
          DEFAULT: "#5EEAD4",
          soft: "#7FF0DD",
          deep: "#2DD4BF",
          "deep-2": "#14B8A6",
          dim: "#0E8A7A",
        },
        // Dark-theme text tokens — WCAG AA on midnight backgrounds.
        // on-dark: 17.4:1 on midnight-deep | on-dark-muted: 7.8:1
        // on-dark-faint: 4.6:1 (use sparingly, never for body)
        "on-dark": {
          DEFAULT: "#F8FAFC",
          muted: "#CBD5E1",
          faint: "#94A3B8",
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
        sans: ["var(--font-inter)", '"Inter"', "system-ui", "sans-serif"],
        condensed: ["var(--font-inter)", '"Inter"', "system-ui", "sans-serif"],
        serif: ["var(--font-merriweather)", '"Merriweather"', "Georgia", "serif"],
        mono: ["var(--font-ibm-mono)", '"IBM Plex Mono"', "ui-monospace", "monospace"],
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
        // Dark-theme elevation — uses inset highlight + outer shadow
        // since drop shadows are nearly invisible on dark surfaces.
        "dark-card": "inset 0 1px 0 0 rgb(255 255 255 / 0.04), 0 1px 2px 0 rgb(0 0 0 / 0.4)",
        "dark-elevated": "inset 0 1px 0 0 rgb(255 255 255 / 0.06), 0 8px 24px -8px rgb(0 0 0 / 0.5)",
        "dark-overlay": "inset 0 1px 0 0 rgb(255 255 255 / 0.08), 0 24px 48px -16px rgb(0 0 0 / 0.6)",
        "aqua-glow": "0 0 0 4px rgb(94 234 212 / 0.18)",
        "focus-aqua": "0 0 0 3px rgb(94 234 212 / 0.5)",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.2, 0.7, 0.2, 1)",
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      transitionDuration: {
        fast: "150ms",
        base: "220ms",
        slow: "320ms",
      },
      fontSize: {
        // Editorial type ramp — clamp() pairs for fluid responsive sizing.
        // Use these instead of ad-hoc text-* classes for headings.
        "display-xl": ["clamp(2.75rem, 5.5vw, 4.5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em", fontWeight: "700" }],
        "display-lg": ["clamp(2.25rem, 4vw, 3.25rem)", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" }],
        "display-md": ["clamp(1.75rem, 3vw, 2.5rem)", { lineHeight: "1.15", letterSpacing: "-0.015em", fontWeight: "600" }],
        h1: ["clamp(2rem, 3.5vw, 2.75rem)", { lineHeight: "1.15", letterSpacing: "-0.015em", fontWeight: "700" }],
        h2: ["clamp(1.5rem, 2.5vw, 2rem)", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "600" }],
        h3: ["1.375rem", { lineHeight: "1.3", letterSpacing: "-0.005em", fontWeight: "600" }],
        h4: ["1.125rem", { lineHeight: "1.4", fontWeight: "600" }],
        eyebrow: ["0.8125rem", { lineHeight: "1.2", letterSpacing: "0.05em", fontWeight: "600" }],
        body: ["1.0625rem", { lineHeight: "1.65" }],
        "body-sm": ["0.9375rem", { lineHeight: "1.55" }],
        caption: ["0.8125rem", { lineHeight: "1.45" }],
      },
      ringColor: {
        focus: "#5EEAD4",
      },
      ringWidth: {
        focus: "3px",
      },
      ringOffsetColor: {
        midnight: "#020D12",
      },
      zIndex: {
        base: "0",
        raised: "10",
        sticky: "20",
        overlay: "30",
        modal: "40",
        nav: "50",
        toast: "60",
      },
    },
  },
  plugins: [],
};

export default config;
