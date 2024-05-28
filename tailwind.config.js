/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBlue: '#1D006F',
        hotPink: '#F32FBC',
        orangey: '#FF9C06',
        offWhite: '#FDFDFD',
        bgColor: '#FCFBF8',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
  ins: [],
}

