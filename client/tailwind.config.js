/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        jet: "var(--color-jet)",
        lannisterRed: "var(--color-lannister-red)",
        lannisterGold: "var(--color-lannister-gold)"
      },
      fontFamily: {
				pokemon: ["pokemon", "sans-serif"],
        pressStart: ["pressStart", "monospace"]
			},
    },
  },
  plugins: [],
}