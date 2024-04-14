/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#E5A700",
        primaryAccent: "#FCD34D",
        secondary: "#000",
        white: "#FFF",
        black: "#000",
        blackA1: "#00000077",
        blackA2: "#00000033",
        gray0: "#999",
        gray1: "#666",
        gray2: "#2C2C2C",
        gray3: "#1E1E1E",
      },
      fontFamily: {
        "jockey-one-regular": ["Jockey One", "sans-serif"],
      },
      width: {
        container: "70rem",
      },
      height: {
        test: "200rem",
      },
    },
  },
  plugins: [],
};
