/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gov: {
          navy: '#0F2747',
          blue: '#1769AA',
          'blue-light': '#EBF3FA',
          green: '#16865B',
          'green-light': '#E8F5EF',
          bg: '#F5F7FA',
          text: '#17212B',
          muted: '#667085',
          border: '#E4E7EC',
          warning: '#F59E0B',
          danger: '#DC3545',
          success: '#198754',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

