/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "slide-down": "slide-down 500ms ease-in-out forwards",
        "slide-right": "slide-right 200ms ease-in-out forwards",
        fade: "fade 200ms ease-in-out forwards",
      },
      keyframes: {
        "slide-down": {
          "0%": {
            opacity: "0",
            transform: "translateY(-100%)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "slide-right": {
          "0%": {
            transform: "translateX(-100%)",
          },
          "100%": {
            transform: "translateX(0)",
          },
        },
        fade: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
      },
    },
    fontFamily: {
      sans: ["Open Sans"],
    },
    colors: ({ colors }) => ({
      white: colors.white,
      black: colors.black,
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
