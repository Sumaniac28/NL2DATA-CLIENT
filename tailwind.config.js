/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        merriweather: ['"Merriweather"', "serif"],
        roboto: ['"Roboto"', "sans-serif"],
        specialGothic: ['"Special Gothic Expanded One"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
