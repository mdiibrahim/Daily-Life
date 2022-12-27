/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    // ...
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
],
  
    theme: {
     
  },
  plugins: [
    require('flowbite/plugin')
]
}
