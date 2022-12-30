/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    // ...
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {

  },
  plugins: [
    require('flowbite/plugin'),

  ],
  tailwindcss: {},
  autoprefixer: {},
}
