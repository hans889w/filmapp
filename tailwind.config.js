/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1e40af', 
        secondary: '#1e3a8a',
        accent:'#f97316', 
        dark:'#111827',
        light:"#f3f4f6",
      },
    },
  },
  plugins: [],
};