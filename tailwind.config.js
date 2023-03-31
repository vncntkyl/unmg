/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: ({colors}) => ({
      white: colors.white,
      black: colors.black,
      "un-blue": "#183145",
      "un-red": "#D22735",
      "offwhite": "#D3D6D7",
      transparent: colors.transparent,

    }),
    fontSize: {
      tooltip: "12px",
      title: "20px",
    }
  },
  plugins: [],
}

