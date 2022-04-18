module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  content: [],
  theme: {
    extend: {
      fontFamily: {
        'nav-heading': ['"Work Sans"'],
        'heading': ['"Rubik"'],
        'heading-2': ['"Ubuntu"'],
        'desc': ['"Lato"'],
      },
      colors: {
        'accent': '#7c3aed',
        'accent-2': "#cbb8ff"
      },
      animation: {
        'num': 'num 300ms linear'
      },
      keyframes: {
        'num': {
          '0%': {
            transform: "translateY(0)",
            opacity: 0.4
          },
          '33%': {
            transform: "translateY(9px)",
            opacity: 0.6
          },
          '66%': {
            transform: "translateY(-9px)",
            opacity: 0.7
          },
          '100%': {
            transform: "translateY(0)",
            opacity: 1
          }
        }
      }
    },
  },
  plugins: [],
}
