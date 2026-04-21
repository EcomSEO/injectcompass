import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // InjectCompass brand tokens
        clinical: "#2E5A88",   // primary — clinical blue
        paper: "#F5F1E8",      // accent
        moss: "#7A9A7E",       // success/CTA
        amber: "#C89968",      // caution callouts
        alert: "#B74A4A",      // stop/call callouts
        charcoal: "#242424",
        // Legacy aliases
        sage: "#7A9A7E",
        cream: "#F5F1E8",
        pine: "#2E5A88",
        coral: "#C89968",
        forest: "#2E5A88",
        terracotta: "#C89968",
      },
      fontFamily: {
        serif: ['"IBM Plex Serif"', "Georgia", "serif"],
        sans: ['"IBM Plex Sans"', "Inter", "system-ui", "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
