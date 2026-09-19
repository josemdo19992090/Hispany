import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        chigui: {
          brown: "#8B5E3C",
          "brown-dark": "#6B4423",
          tan: "#D9B48F",
          cream: "#FBF3E7",
        },
        brand: {
          yellow: "#FCD116",
          blue: "#00247D",
          red: "#CF142B",
          green: "#2FB380",
        },
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};
export default config;
