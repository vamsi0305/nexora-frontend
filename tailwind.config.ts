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
        background: "#05050F",
        card: "#100B1E",
        primary: "#7C3AED",
        accent: "#06B6D4",
        text: "#F8FAFC",
        muted: "#94A3B8"
      },
      fontFamily: {
        heading: ["var(--font-syne)"],
        sans: ["var(--font-dm-sans)"],
      },
    },
  },
  plugins: [],
};
export default config;
