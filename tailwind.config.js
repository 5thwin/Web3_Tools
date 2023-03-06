/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'light-gray': '#F1F1F5',
        'main': '#37DCA7',
      }
    },
  },
  plugins: [],
}
