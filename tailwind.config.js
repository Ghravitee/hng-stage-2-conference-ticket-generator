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
      screens: {
        xxs: { max: "374px" }, // 👈 Custom breakpoint for screens smaller than 375px
      },
    },
  },
  plugins: [],
};
