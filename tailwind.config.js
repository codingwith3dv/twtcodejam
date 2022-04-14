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
        'accent': '#7c3aed'
      },
      animation: {
        'num': 'num 300ms linear'
      },
      keyframes: {
        'num': {
          '0%': {
            transform: "translateY(0)"
          },
          '33%': {
            transform: "translateY(9px)"
          },
          '66%': {
            transform: "translateY(-9px)"
          },
          '100%': {
            transform: "translateY(0)"
          }
        }
      }
    },
  },
  plugins: [],
}
