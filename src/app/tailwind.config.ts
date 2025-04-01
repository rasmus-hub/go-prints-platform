import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
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
        background: "#F7F7F7",
        text: "#484848",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;