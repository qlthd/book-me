import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "white-smoke": "#F5F5F5",
        "electric-blue": "#0047FF",
        "light-blue": "#D8E3FF",
        "light-gray": "#F9FAFB",
        "baltic-sea": "#3c4043",
        "snow-tiger": "#dadce0",
        "dark-gray": "#1F1F1F",
      },
      boxShadow: {
        "custom-soft":
          "0 7px 25px -5px rgb(0 0 0 / 0.1), 0 2px 5px 1px rgb(0 0 0 / 0.1)",
      },
    },
  },
  plugins: [],
} satisfies Config;
