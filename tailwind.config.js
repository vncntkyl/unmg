/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ['Open Sans'],
    },
    colors: ({ colors }) => ({
      white: colors.white,
      "un-blue": "#183145",
      "un-red": "#d22735",
      
    }),
    fontSize:{
      tooltip:'11px',
    }
    
  },
  plugins: [],
};
