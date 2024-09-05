/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        animation: {
          slideInLeft: 'slideInLeft 0.5s ease-in-out',
          slideOutRight: 'slideOutRight 0.5s ease-in-out',
        },
        colors: {
          'custom-navy-dark' : '#173c78',
          'custom-navy-light' : '#3164b5',
          'custom-grey-light-01': '#f5f5f5'
        },
        fontFamily: {
            'custom-source-sans-3': ['Source Sans 3', 'sans-serif'],
            apple: ['AppleSystem', 'sans-serif'],
        },
      },
    },
    plugins: [],
  }
  