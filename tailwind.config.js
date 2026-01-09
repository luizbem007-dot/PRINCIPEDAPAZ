/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#C59D5F',
          light: '#E3C896',
          dark: '#B08A4E',
        },
        cream: '#FDFBF7',
        brown: {
          DEFAULT: '#3E2723',
          dark: '#1A1A1A',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Lato', 'Montserrat', 'sans-serif'],
      },
      boxShadow: {
        '3xl': '0 25px 50px -12px rgba(197, 157, 95, 0.25)',
      },
    },
  },
  plugins: [],
}
