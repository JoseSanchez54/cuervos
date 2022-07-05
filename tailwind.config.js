module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.tsx",
  ],
  options: {
    safelist: ["dark"], //specific classes
  },
  theme: {
    typography: (theme) => ({
      dark: {
        css: {
          color: "white",
        },
      },
    }),

    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
