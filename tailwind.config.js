/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}',],
  theme: {
    extend: {
      backgroundImage:{
        'scene':"url('./images/riverScene.jpg')"
      },
    },
  },
  plugins: [],
}

