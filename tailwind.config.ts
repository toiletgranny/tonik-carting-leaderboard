import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Background colors from Figma
        background: {
          muted: "#000000",
          default: "#0f0f0f",
          strong: "#1a1a1a",
        },
        // Border colors
        border: {
          muted: "#1a1a1a",
          strong: "#242424",
        },
        // Content/text colors
        content: {
          strong: "#ffffff",
          default: "#999999",
        },
        // Accent colors for medals
        accent: {
          gold: "#d0af55",
          silver: "#cdcdcd",
          bronze: "#845018",
          red: "#b3393d",
        },
        surface: "#000000",
      },
      fontFamily: {
        sans: ["N27", "sans-serif"],
      },
      fontSize: {
        // Body sizes (CSS variables for responsive tokens)
        "body-small": [
          "var(--fs-body-small)",
          { lineHeight: "var(--lh-body-small)", letterSpacing: "var(--ls-body-small)" }
        ],
        "body-default": [
          "var(--fs-body-default)",
          { lineHeight: "var(--lh-body-default)", letterSpacing: "var(--ls-body-default)" }
        ],
        "body-large": [
          "var(--fs-body-large)",
          { lineHeight: "var(--lh-body-large)", letterSpacing: "var(--ls-body-large)" }
        ],
        // Title
        title: [
          "var(--fs-title)",
          { fontWeight: "500", lineHeight: "var(--lh-title)", letterSpacing: "var(--ls-title)" }
        ],
      },
      spacing: {
        small: "var(--space-small)",
        default: "var(--space-default)",
        large: "var(--space-large)",
        footer: "var(--space-footer)",
        "section-padding": "var(--space-section-padding)",
      },
      maxWidth: {
        section: "var(--maxw-section)",
      },
    },
  },
  plugins: [],
};
export default config;