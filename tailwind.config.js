/** @type {import('tailwindcss').Config} */
import plugin from 'flowbite/plugin'
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}", 
    "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {},
  },
  plugins: [
    plugin
  ],
};

