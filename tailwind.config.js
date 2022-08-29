/** @type {import('tailwindcss').Config} */
const path = require('path');
const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    'node_modules/litepie-datepicker/**/*.js'

  ],
 
  theme: {
    extend: {
      colors: {
        // Change with you want it
        'litepie-primary': colors.indigo , // color system for light mode
        'litepie-secondary': colors.gray // color system for dark mode
      }
    },
  },

  variants: {
    extend: {
      cursor: ['disabled'],
      textOpacity: ['disabled'],
      textColor: ['disabled']
    }
  },
  plugins: [
  ],
}
