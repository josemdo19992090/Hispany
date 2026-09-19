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
          // `green` se usa sobre texto blanco (botones), así que tiene que
          // cumplir el contraste mínimo AA de 4.5:1. El verde anterior
          // (#2FB380) daba 2.66:1 y fallaba; este da 4.98:1.
          green: "#1A7F58",
          // Variante clara SOLO para superficies decorativas sin texto encima
          // (rellenos de barra de progreso, fondos suaves).
          "green-light": "#2FB380",
        },
      },
      borderRadius: {
        // Dos radios y ya: campos y tarjetas. Antes convivían 8px, 20px y full
        // sin criterio.
        field: "0.875rem",
        card: "1.375rem",
        xl2: "1.375rem",
      },
      boxShadow: {
        // Reemplazan a los bordes marrones: la app se veía "de plantilla"
        // porque cada elemento era una caja con borde.
        soft: "0 1px 2px rgba(0,0,0,.04), 0 10px 28px -12px rgba(107,68,35,.18)",
        "soft-lg": "0 2px 4px rgba(0,0,0,.05), 0 18px 40px -16px rgba(107,68,35,.28)",
      },
      fontSize: {
        // Escala propia: el cuerpo estaba casi todo en 14px, demasiado chico
        // para una app que se usa en el celular.
        xs: ["0.8125rem", { lineHeight: "1.125rem" }],
        sm: ["0.9375rem", { lineHeight: "1.5rem" }],
        base: ["1.0625rem", { lineHeight: "1.75rem" }],
        lg: ["1.1875rem", { lineHeight: "1.75rem" }],
        xl: ["1.375rem", { lineHeight: "1.875rem" }],
        "2xl": ["1.625rem", { lineHeight: "2.125rem" }],
        "3xl": ["2rem", { lineHeight: "2.5rem" }],
      },
      fontFamily: {
        sans: ["var(--font-nunito)", "system-ui", "sans-serif"],
      },
      keyframes: {
        temblor: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-6px)" },
          "75%": { transform: "translateX(6px)" },
        },
        aparecer: {
          from: { opacity: "0", transform: "translateY(6px) scale(.98)" },
          to: { opacity: "1", transform: "translateY(0) scale(1)" },
        },
      },
      animation: {
        temblor: "temblor .35s ease-in-out",
        aparecer: "aparecer .22s ease-out",
      },
    },
  },
  plugins: [],
};
export default config;
