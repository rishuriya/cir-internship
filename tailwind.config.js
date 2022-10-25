/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#B90E50',
        secondary: '#f8f9fc',
        bkg: '#f8f9fc',
      },
      fontFamily: {
        fuzzyBubble: ['Fuzzy Bubble', 'cursive'],
      },
      backgroundImage: {
        'landingPageBg': "url('http://vidya.amrita.ac.in/temp/registration/css/images/sethu.jpg')"
      }
    },
  },
  plugins: [],
}