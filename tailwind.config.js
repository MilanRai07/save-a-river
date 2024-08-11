/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}',],
  theme: {
    extend: {
      backgroundImage: {
        'scene': "url('/images/riverScene.jpg')"
      },
      screens: {
        'xl': { 'max': '984px' },
        'lg': { 'max': '752px' },
        'md': { 'max': '608px' },
        'sm': { 'max': '532px' },
        's-m': { 'max': '442px' },
        'xs': { 'max': '388px' },
        '2xs': { 'max': '298px' }
      },
    },
  },
  plugins: [],
}

