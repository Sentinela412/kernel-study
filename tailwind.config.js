/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        thea: {
          dark: '#0a0915',
          card: '#121124',
          cardBorder: '#232142',
          primary: '#7c3aed',
          primaryHover: '#6d28d9',
          accent: '#38bdf8',
          success: '#10b981',
          danger: '#ef4444',
          warning: '#f59e0b',
          muted: '#94a3b8',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'glow-purple': '0 0 25px -5px rgba(124, 58, 237, 0.4)',
        'glow-cyan': '0 0 25px -5px rgba(56, 189, 248, 0.4)',
      }
    },
  },
  plugins: [],
}
