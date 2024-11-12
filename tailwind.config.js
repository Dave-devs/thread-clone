/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        light: {
          background: "#FDF8FF",
          border: "#acacac",
          itemBackground: "#f5f5f5",
        },
        dark: {
          background: "#FDF8FF",
          border: "#acacac",
          itemBackground: "#f5f5f5",
        },
      },
      spacing: {
        4.5: "18px",
        13: "52px",
        15: "60px",
        17: "68px",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      fontFamily: {
        sans: ["DMSans_400Regular", "sans-serif"],
        dmSans: ["DMSans_400Regular", "DMSans_500Medium", "DMSans_700Bold"],
      },
      fontSize: {
        xs: ["12px", "16px"],
        sm: ["14px", "20px"],
        base: ["16px", "24px"],
        lg: ["18px", "28px"],
        xl: ["20px", "28px"],
        "2xl": ["24px", "32px"],
        "3xl": ["30px", "36px"],
        "4xl": ["36px", "40px"],
        "5xl": ["48px", "1"],
      },
      boxShadow: {
        sm: "0 1px 2px rgba(0, 0, 0, 0.05)",
        DEFAULT: "0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)",
        md: "0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)",
        lg: "0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.06)",
        xl: "0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        // Add any additional custom utilities here
        ".text-shadow": {
          textShadow: "0px 1px 2px rgba(0, 0, 0, 0.15)",
        },
      });
    },
  ],
};