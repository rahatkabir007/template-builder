/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "psclightskyblue": "#e2edfc",
        "psclightwhite": "rgba(255,255,255,0.17)",
        'psclightblack': '#3B3B3B',
        'pscgrey': '#F7F7F7',
        'pscblack': '#232428',
        'pscdarkblue': '#2D3748',
      },
    },
  },
  plugins: [],
}