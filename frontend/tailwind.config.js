/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        main: {
          1: '#5bdcff',
          2: '#5abbf8',
          light: '#9aebff',
        },
        red: '#d21818',
        yellow: '#f4e43a',
        green: '#60ed17',
      },
      fontFamily: {
        audiowide: ['Audiowide', 'cursive'],
        montserrat: ['"Montserrat Alternates"', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-custom': 'linear-gradient(120deg, #5abbf8, #5bdcff)',
        'home-bg': "url('../../public/images/home/home-bg.png')",
      },
      boxShadow: {
        custom: '0.25px 0.25px 2px #5bdcff, -0.25px -0.25px 2px #5bdcff',
      },
    },
  },
  corePlugins: {
    preflight: true,
  },
  plugins: [],
};