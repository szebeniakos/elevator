/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      minHeight: {
        25: "100px",
      },
      minWidth: {
        200: "800px",
      },
    },
  },
  plugins: [],
};
