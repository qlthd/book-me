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
        "electric-blue": "#0047FF",
        "light-blue": "#D8E3FF",
        "light-gray": "#e7ecef",
        "baltic-sea": "#3c4043",
        "snow-tiger": "#dadce0",
        "dark-gray": "#1F1F1F",
      },
    },
  },
  plugins: [],
} satisfies Config;
