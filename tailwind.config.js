/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'hind': 'Hind, sans-serif',
      },
      colors: {
        'title': '#21243d'
      }
    },
  },
  plugins: [],
}

