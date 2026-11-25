import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#F7F2EA",
        cream: "#EFE6D8",
        champagne: "#E4D3BC",
        taupe: "#B8A592",
        clay: "#8C6E58",
        earth: "#5E4535",
        espresso: "#2A1D16",
        sage: "#9A9A7E",
        olive: "#6E6E52",
        gold: "#C9A04E",
        hibiscus: "#C2416B",
        rose: "#E89AAE",
        marigold: "#E9A23B",
        saffron: "#F2C14E",
        terracotta: "#C4622D",
        coral: "#EE8A6B",
        ink: "#1E2257",
        malachite: "#156B55",
        turquoise: "#2F9C9A",
        plum: "#4A1638",
        violet: "#7A5BA6",
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', "Garamond", "Times New Roman", "serif"],
        sans: ['"Jost Variable"', "Jost", "Helvetica Neue", "Arial", "sans-serif"],
      },
      letterSpacing: {
        luxe: "0.32em",
        wide2: "0.18em",
      },
      transitionTimingFunction: {
        silk: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
} satisfies Config;
