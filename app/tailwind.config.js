/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}",
    "../../node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      xxl: "1680px",
    },
    extend: {
      fontFamily: {
        sans: ["Graphik", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
      colors: {
        "base-color": "var(--color-base)",
        "accent-cyan": "var(--color-accent-cyan)",
        "accent-neon": "var(--color-accent-neon)",
        "soft-white": "var(--color-soft-white)",
        "mate-white": "var(--color-mate-white)",
        "disabled": "var(--color-disabled)",
        "error": "var(--color-error)",
        "success": "var(--color-success)",
        "warning": "var(--color-warning)",
        "info": "var(--color-info)",
      },
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  darkMode: "class",
  plugins: [],
}
