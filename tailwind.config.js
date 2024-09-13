/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'pulse-delay-150': 'pulse 1.5s infinite 0.10s',
        'pulse-delay-300': 'pulse 1.5s infinite 0.20s',
      },
    },
  },
  plugins: [],
}