import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "15px",
      
    },
    screens: {
      "sm" : '640px',
      "md" : '780px',
      "lg" : '960px',
      "xl" : '1200px',
    },
    fontFamily:{
      primary:"var(--font-jetbrainMono)",
    },
    extend: {
      colors : {
        primary : "#1c1c22",
        accent:{
          DEFAULT: "#00ff99",
          hover : "#00e187",
        },
      },
    },
  },
} satisfies Config

export default config