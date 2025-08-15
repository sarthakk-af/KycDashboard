/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: "#2563eb",
        muted: "#f3f4f6"
      },
      boxShadow: {
        soft: "0 10px 20px rgba(0,0,0,0.06)",
        card: "0 6px 14px rgba(15, 23, 42, 0.06)"
      },
      borderRadius: {
        "2xl": "1rem"
      }
    }
  },
  plugins: []
};
