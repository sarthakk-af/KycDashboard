/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: "#2563eb",
        muted: "#f3f4f6",
        // --- NEW COLORS START ---
        'chart-solicited': '#005B66', // Dark Teal
        'chart-received': '#0D3B66',  // Dark Blue
        'chart-consumed': '#2EA3B7',  // Light Teal
        'chart-pending': '#F75B5B',   // Red
        // --- NEW COLORS END ---
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
