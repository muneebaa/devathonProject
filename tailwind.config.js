/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2BAFC7",
        secondary: "#fff",
        lightBlue: "#1ACEEF",
        tranparentBlue: "#2BAFC70F",
        green: "#2BC7A5CC",
        darkGreen: "#21C465",
        red: "#E53535",
        blackText: "#120D26",
        gray100: "#E4DFDF",
        gray600: "#747688",
        gray800: "#5B5B5B",
      },
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
