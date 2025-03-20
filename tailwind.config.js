/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        lightBg: '#f0e7db',
        lightText: '#1e293b',
        darkBg: '#2a273f',
        darkText: '#d2d2f0',
      },
    },
  },
  plugins: [],
};
