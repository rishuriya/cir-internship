/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: '#B90E50',
        secondary: '#f8f9fc',
        bkg: '#f8f9fc',
      }
    },
  },
  plugins: [],
}