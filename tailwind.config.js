/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,}"],
  theme: {
    extend: {
      fontFamily: {  
        'plus-jakarta': ['Plus Jakarta Sans', 'sans-serif'],  
      },
    },
  },
  plugins: [],
}

