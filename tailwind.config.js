import defaultTheme from 'tailwindcss/defaultTheme';
import colors from 'tailwindcss/colors'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Figtree', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        primary: colors.red
      }
    }
  },
  plugins: []
}
