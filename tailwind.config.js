/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enables manual class-based dark mode toggling
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        w2wGreen: '#16a34a', // Custom green for Waste to Worth
      }
    },
  },
  plugins: [],
}