/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      dropShadow: {
        'white': '3px 2px 8px #83f28f',
        
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

