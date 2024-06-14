/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      bgDarkPrimary: "#0b1425",
      white: "white",
      black: "black",
      gray500: "#6b7280",
      gray300: "#d1d5db",
      slate500: "#64748b",
      red: "red",
      link: "#1d4ed8",
      purple: "#640D6B",
      tabPurple: "#353147",
    },
    fontFamily: {
      Lato: ["Lato", "sans-serif"],
    },
    screens: {
      xsm: "300px",
      sm: "400px",
      md: "520px",
      lg: "800px",
      xl: "1024px",
      "2xl": "1400px",
    },

    extend: {},
  },
  plugins: [],
};
