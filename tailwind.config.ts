import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // InjectCompass brand tokens — clinical-reference palette
        clinical: "#2E5A88",         // primary clinical blue
        "clinical-deep": "#1F3F60",  // pressed/hover state
        "clinical-tint": "#E7EEF6",  // subtle blue wash for callouts
        paper: "#F5F1E8",            // warm cream
        "paper-soft": "#FBF8F1",     // lighter paper ground
        "paper-rule": "#E9E2D1",     // warm rule/border line
        moss: "#7A9A7E",             // success / "you're done"
        amber: "#C89968",            // caution / pause-and-check
        alert: "#B74A4A",            // stop and call your prescriber
        stone: "#6B6664",
        charcoal: "#242424",

        // Legacy aliases (kept so shared components still compile)
        sage: "#7A9A7E",
        cream: "#F5F1E8",
        pine: "#2E5A88",
        coral: "#C89968",
        forest: "#2E5A88",
        "forest-deep": "#1F3F60",
        terracotta: "#C89968",
      },
      fontFamily: {
        serif: ['"IBM Plex Serif"', "Georgia", "serif"],
        sans: ['"IBM Plex Sans"', "Inter", "system-ui", "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "monospace"],
      },
      maxWidth: {
        prose: "68ch",
        reading: "42rem",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(31, 63, 96, 0.04), 0 4px 16px rgba(31, 63, 96, 0.04)",
        card: "0 1px 1px rgba(31, 63, 96, 0.03), 0 6px 24px rgba(31, 63, 96, 0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
