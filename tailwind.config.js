/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: {
          900: "#1a1a1a",
          800: "#2d2d2d",
          700: "#3f3f3f",
        },
      },
      fontFamily: {
        Inter: ["Inter", "sans-serif"],
        Poppin: ["Poppins"],
      },
    },
  },
  plugins: [],
};
