/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class", // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        // Light mode colors
        lightBg: "#f9fafb",
        lightText: "#1f2937",

        // Dark mode colors
        darkBg: "#1e293b",
        darkText: "#f8fafc",
        darkPrimary: "#3b82f6",
        darkSecondary: "#64748b",
      },
    },
  },
  plugins: [], // Fixed
};
