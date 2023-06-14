/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      xs: "425px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      transitionTimingFunction: {
        toggle: "cubic-bezier(0,.72,1,.52)",
      },
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
      gray: "#c1c1c1",
      "mid-gray": "#818181",
      "dark-gray": "#515151",
      transparent: colors.transparent,
      "un-blue": "#183145",
      "un-blue-light": "#306088",
      "un-red": "#d22735",
      "un-red-light": "#d43953",
      "un-red-light-1": "#FDB4B4",
      "un-red-dark": "#883030",
      "un-yellow-light": "#fdf6b4",
      "un-yellow-dark": "#807519",
      "un-green-light": "#B5FDB4",
      "un-green-dark": "#198065",
      default: "#efedf8",
      "default-dark": "#dbd8eb",
    }),
    fontSize: {
      tooltip: "11px",
    },
  },
  plugins: [],
};
