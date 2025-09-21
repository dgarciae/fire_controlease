/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}",
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
        "base-color-pri": "#191435",
        "base-color-sec": "#FF4E00",
        "accent-color-pri": "#FFC400",
        "accent-color-sec": "#4B4B4B",
        "soft-white": "#F5F5F5",
        "mate-white": "#FAF9F6",
        "disabled": "#A0A0A0",
        "error": "#FF0000",
        "success": "#00FF00",
        "warning": "#FFFF00",
        "info": "#00FFFF",
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
