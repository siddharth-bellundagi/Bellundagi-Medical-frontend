/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0f172a",   // dark slate
        accent: "#2563eb",    // blue
        danger: "#dc2626",    // red
        muted: "#64748b",     // gray
      },
    },
  },
  plugins: [],
};


