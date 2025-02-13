/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        edo: ["JejuMyeongjo", "sans-serif"],
      },
      backgroundImage: {
        ticket: "url('/ticket-background.png')",
      },
    },
  },
  plugins: [],
};
