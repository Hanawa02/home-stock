/** @type {import('tailwindcss').Config} */

const GRAY_BASE_HS = '0, 5%'

export default {
  content: ['./index.html', './src/**/*.vue'],
  theme: {
    extend: {
      boxShadow: {
        'card': `0px 1px 4px hsla(${GRAY_BASE_HS}, 0%, 0.25)`,
        'card-hover': `0px 1px 4px 2px hsla(${GRAY_BASE_HS}, 40%, 0.3)`
      }
    }
  },
  plugins: []
}
