/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1f2937', // dark gray
        secondary: '#374151',
        accent: '#10b981', // green
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
