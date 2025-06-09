// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",        // all files in /app
    "./components/**/*.{js,ts,jsx,tsx}", // all files in /components
    "./pages/**/*.{js,ts,jsx,tsx}",      // if you have /pages
  ],
  theme: {
    extend: {
      backgroundColor: {
        background: "var(--background)",
      },
      textColor: {
        foreground: "var(--foreground)",
        "light-100": "var(--color-light-100)",
      },
      borderColor: {
        border: "var(--border)",
      },
      outlineColor: {
        ring: "var(--ring)",
      },
    },
  },
  plugins: [],
};
