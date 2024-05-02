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
        orange: '#FFC806',
        offWhite: '#FDFDFD',
        bgColor: '#FCFBF8',
      },
    },
  },
  ins: [],
}