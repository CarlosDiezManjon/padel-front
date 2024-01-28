/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        semiblack: '#474646',
        black: '#000000',
        main: {
          100: '#e6f2e1',
          200: '#c1e1b9',
          300: '#9dd191',
          400: '#78c269',
          500: '#3e9436',
          600: '#367d31',
          700: '#2e662b',
          800: '#254f25',
          900: '#1d381f',
        },
      },
      minWidth: {
        main: '900px',
        medium: '768px',
      },
      maxHeight: {
        reserva: 'calc(100vh - 400px)',
      },
      minHeight: {
        reserva: 'calc(100vh - 400px)',
      },
      fontFamily: {
        sans: ['Graphik', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
    },
  },
}
