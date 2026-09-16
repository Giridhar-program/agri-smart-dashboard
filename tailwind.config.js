/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        agri: {
          bg: '#F7F6F2',
          text: '#171717',
          muted: '#555555',
          green: '#20A85A',
          darkgreen: '#168447',
          lightgreen: '#EAF7EF',
          border: '#E5E5E5',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
