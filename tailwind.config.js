/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,}"],
  theme: {
    extend: {
      fontFamily: {
        "plus-jakarta": ["Plus Jakarta Sans", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        sans: ["Fira Sans", "sans-serif"],
      },
      colors: {
        background: "#f2f7f8",
        primary: "#3369F4",
        "primary-100": "#c7f9cc",
        "primary-200": "#80ed99",
        "primary-300": "#57cc99",
        "primary-400": "#38a3a5",
        "primary-500": "#1d334d",
        "black-50": "#f8f9fa",
        "black-100": "#e9ecef",
        "black-200": "#dee2e6",
        "black-300": "#ced4da",
        "black-400": "#adb5bd",
        "black-500": "#6c757d",
        "black-600": "#495057",
        "black-700": "#343a40",
        "black-800": "#212529",
        "primary-text": "#1D2433",
      },
      fontSizes: {
        normal: "14px",
      },
    },
  },
  plugins: [],
};
