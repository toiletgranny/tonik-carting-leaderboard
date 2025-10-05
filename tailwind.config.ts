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
        // Body sizes
        "body-small": ["12px", { lineHeight: "16px", letterSpacing: "0.1px" }],
        "body-default": ["16px", { lineHeight: "24px", letterSpacing: "0px" }],
        "body-large": ["20px", { lineHeight: "28px", letterSpacing: "0px" }],
        // Title
        title: ["48px", { lineHeight: "48px", letterSpacing: "-0.2px" }],
      },
      spacing: {
        small: "16px",
        default: "24px",
        large: "48px",
        footer: "128px",
        "section-padding": "32px",
      },
      maxWidth: {
        section: "520px",
      },
    },
  },
  plugins: [],
};
export default config;