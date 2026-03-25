import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./context/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#0369EA',
          navy: '#00263E',
          hero: '#101E2D',
          accent: '#A0CFFF',
          tint: '#F0F6FE',
          teal: '#1DCAD3',
        },
        border: '#D6DBE1',
        muted: '#6B7280',
      },
    },
  },
  plugins: [],
};
export default config;
