/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        rajdhani: "'Rajdhani', sans-serif",
        sofadi: "'Sofadi One', system-ui",
      }
    },
  },
  plugins: [require("daisyui")],
};
