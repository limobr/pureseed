import type { Config } from "tailwindcss";

// Colours are CSS variables (see app/globals.css) so one class works in light and dark mode.
const v = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: v("bg"),
        mist: v("surface"),
        tile: v("tile"),
        line: v("line"),
        ink: v("fg"),
        charcoal: v("fg2"),
        slate: v("fg3"),
        hero: v("hero"),
        footer: v("footer"),
        inverse: v("inverse"),
        "inverse-fg": v("inverse-fg"),
        mint: v("mint"),
        accent: "#2F6B4A",
        "accent-text": v("accent-text"),
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
      },
      maxWidth: { page: "80rem" },
    },
  },
  plugins: [],
};
export default config;
