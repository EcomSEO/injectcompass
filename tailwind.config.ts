import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // InjectCompass — Clinical Wayfinding Atlas tokens.
        // Surgical-atlas / technical-manual aesthetic. Paper-white ground,
        // clinical-blue ink, single surgical-red accent, slate secondary.
        ink: "#1B3A6E",            // primary clinical-blue ink
        "ink-deep": "#0F2348",     // pressed text / heavier strokes
        "ink-soft": "#3D5A87",     // body second-tone
        paper: "#FAFAF7",          // paper white, ATLAS ground
        "paper-warm": "#F4F1E8",   // optional warmer paper for callouts
        "paper-rule": "#E5E1D5",   // hairline rule on paper
        surgical: "#C8463C",       // surgical red — warnings + chapter markers
        "surgical-deep": "#9C2F26",
        slate: "#5B6470",          // secondary/tertiary type
        "slate-soft": "#8A919A",
        "slate-rule": "#D8DCE2",   // grid line on paper
        // Legacy aliases — keep to allow shared components to still compile.
        clinical: "#1B3A6E",
        "clinical-deep": "#0F2348",
        "clinical-tint": "#E7EBF2",
        moss: "#5C7A65",
        amber: "#B8782F",
        alert: "#C8463C",
        stone: "#5B6470",
        charcoal: "#1A1F2A",
        sage: "#5C7A65",
        cream: "#F4F1E8",
        pine: "#1B3A6E",
        coral: "#C8463C",
        forest: "#1B3A6E",
        "forest-deep": "#0F2348",
        terracotta: "#C8463C",
        "paper-soft": "#FAFAF7",
      },
      fontFamily: {
        // Atlas typography: technical sans dominant.
        sans: ['"Inter Tight"', '"IBM Plex Sans"', "Inter", "system-ui", "sans-serif"],
        condensed: ['"Inter Tight"', '"Barlow Condensed"', "Inter", "system-ui", "sans-serif"],
        serif: ['"IBM Plex Sans"', "system-ui", "sans-serif"], // legacy alias for shared bits
        mono: ['"IBM Plex Mono"', "ui-monospace", "monospace"],
      },
      maxWidth: {
        prose: "68ch",
        reading: "42rem",
        atlas: "44rem",
      },
      letterSpacing: {
        atlas: "0.18em",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(15, 35, 72, 0.04), 0 4px 16px rgba(15, 35, 72, 0.04)",
        card: "0 1px 1px rgba(15, 35, 72, 0.03), 0 6px 24px rgba(15, 35, 72, 0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
