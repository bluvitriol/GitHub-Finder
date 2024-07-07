/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        mont: ['"montserrat"'],
        new: ['Space Mono', 'sans-serif'],
    },
  },
  plugins: [],
}
}
