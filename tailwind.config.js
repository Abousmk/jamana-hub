/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        "green-abyss": "#0A1C15",
        "green-deep": "#0D251D",
        "green-mid": "#2C5F4B",
        gold: "#C8A951",
        "gold-light": "#E8D9A0",
        cream: "#F5F0E3",
        "green-line": "rgba(200,169,81,0.18)",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        util: ["var(--font-util)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
