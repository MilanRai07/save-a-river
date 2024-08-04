/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}',],
  theme: {
    extend: {
      backgroundImage:{
        'scene':"url('./images/riverScene.jpg')"
      },
      keyframes:{
          movedown: {
            '0%': {
              top:'30%',
            },
            '100%': {
              top: '100%',
            },
          },
      },
    },
    animation:{
      'move-down':'movedown 2s infinite'
    }
  },
  plugins: [],
}

