/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        gothic: ['UnifrakturMaguntia', 'serif'],
      },
      colors: {
        pink: {
          400: '#f9c7c7',
        }
      },
    },
  },
  plugins: [],
} 