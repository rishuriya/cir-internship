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
        // bkg: '#03001d',
        bkg: '#050A30',
        primaryDark: '#A0E7E5',
        secondaryDark: '#06091c',
      }
    },
  },
  plugins: [],
}