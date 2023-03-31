/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "slide-down": "slide-down 500ms ease-in-out forwards",
      },
      keyframes: {
        "slide-down": {
          '0%': {
            opacity: '0',
            transform: "translateY(-100%)",
          },
          '100%': {
            opacity: '1',
            transform: "translateY(0)",
          },
        },
      },
    },
    fontFamily: {
      sans: ["Open Sans"],
    },
    colors: ({ colors }) => ({
      white: colors.white,
      transparent: colors.transparent,
      "un-blue": "#183145",
      "un-blue-light": "#306088",
      "un-red": "#d22735",
      "bg-default": "#efedf8",
    }),
    fontSize: {
      tooltip: "11px",
    },
  },
  plugins: [],
};
