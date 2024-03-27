/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container: {
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '2rem',
          xl: '3rem',
          '2xl': '4rem',
        },
        margin: {
          DEFAULT: '0px auto !important'
        }
      },
      colors: {
        'primary': '#0c4a6e',
        'acent': '#38bdf8',
        'extralightacent': '#d7f2fe',
        'gray': '#f2f2f2',
        'dark-gray': '#7f7f7f',
        'light-gray': '#ebebeb',
        'blue': '#0076e1',
        'extra-light-gray': '#cccccc',
        'yellow': '#fbbf24',
        'red': '#dc2626',
        'green': '#15803d',
        'lightGreen': '#dcfce7',
        'rose': '#e11d48',
        'lightRose': "#ffe4e6",
        'orange': '#fb923c',
        'lightOrange': '#ffedd5',
      },
      boxShadow: {
        'theme': '0px 0px 15px 1px rgba(0,0,0,0.1)',
      },
    },
  },
  plugins: [],
}

