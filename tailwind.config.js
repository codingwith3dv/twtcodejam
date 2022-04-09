module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  content: [],
  theme: {
    extend: {
      fontFamily: {
        'nav-heading': ['"Exo"'],
        'heading': ['"Rubik"'],
        'heading-2': ['"Ubuntu"'],
        'desc': ['"Lato"'],
      },
      colors: {
        'accent': '#0098FA'
      }
    },
  },
  plugins: [],
}
