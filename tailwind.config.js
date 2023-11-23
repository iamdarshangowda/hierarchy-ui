/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primaryDark: '#A23131',
        primaryLight: '#CB3737',
        secondary: '#EE6F57',
        error: '#FF3B30',
        grey: {
          0: '#ffffff',
          1: '#f2f2f2',
          2: '#c6c6c6',
          3: '#707070',
          4: '#4B4B4B',
          5: '#3C3C3C',
          6: '#2F2F2F',
          7: '#242424',
          8: '#22252a',
          9: '#121212',
        },
      },
    },
  },
  plugins: [],
};
