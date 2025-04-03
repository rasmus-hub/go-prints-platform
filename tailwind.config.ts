import typography from '@tailwindcss/typography';
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/app/productos/**/*.{js,ts,jsx,tsx}', // Add this line
  ],
  darkMode: 'class', // Habilitar modo oscuro manual
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#FF5A5F",
          light: "#FF7E82",
          dark: "#E04A50",
        },
        secondary: {
          DEFAULT: "#00A699",
          light: "#33B8AD",
          dark: "#00857A",
        },
        dark: {
          DEFAULT: "#121212",
          200: 'rgb(var(--dark-200))',
          300: 'rgb(var(--dark-300))',
        },
        light: {
          100: 'rgb(var(--light-100))',
          200: 'rgb(var(--light-200))',
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      boxShadow: {
        'glow': '0 0 15px rgba(0, 166, 153, 0.3)',
        'glow-primary': '0 0 15px rgba(255, 90, 95, 0.3)',
      },
    },
  },
  plugins: [
    typography,
  ],
};

export default config;