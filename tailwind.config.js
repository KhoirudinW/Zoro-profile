/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}", // pastikan jalur ini sesuai dengan struktur proyekmu
    ],
    theme: {
      extend: {
        fontFamily: {
          'bebas': ['bebas-neue', 'sans-serif'],
        },
        colors: {
          zblack: {100:'#2B282F'},
          zgreen: {
            50: '#AAEB83',
            100: '#808D71',
            200:'#375949',
          },
          zlblue: {100: '#B8B6C3'},
        },
      },
    },
    plugins: [],
  }
  