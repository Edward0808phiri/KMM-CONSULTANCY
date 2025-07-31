/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primaryBlue: "#1E40AF",   // blue-800
        primaryGreen: "#10B981",  // emerald-500
        lightGreen: "#6EE7B7",    // emerald-300
        lightBlue: "#BFDBFE",     // blue-200
        white: "#FFFFFF",
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
