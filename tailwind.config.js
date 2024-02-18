/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        text: 'var(--text)',
        background: 'var(--background)',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        accent: 'var(--accent)',
      },

      minWidth: {
        main: '900px',
        medium: '768px',
      },
      maxHeight: {
        reserva: 'calc(100vh - 450px)',
        movimientos: 'calc(100vh - 320px)',
        listado: 'calc(100vh - 200px)',
      },
      minHeight: {
        reserva: 'calc(100vh - 450px)',
        movimientos: 'calc(100vh - 320px)',
        listado: 'calc(100vh - 300px)',
      },
      fontFamily: {
        sans: ['Graphik', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
      screens: {
        xs: '500px',
      },
    },
  },
}
