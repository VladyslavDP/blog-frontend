/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        lightPrimary: '#B17457',
        lightBg: '#FAF7F0',
        lightText: '#4A4947',

        darkPrimary: '#00ADB5',
        darkBg: '#222831',
        darkText: '#EEEEEE',
        darkSecondary: '#393E46',
      },
    },
  },
  plugins: [],
};
