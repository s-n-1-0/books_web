/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "my-color": "#4d6a87ff",
        secondary: "#6c757d",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
