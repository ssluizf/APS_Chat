module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./puplic/index.html"],
  darkMode: false,
  theme: {
    fontFamily: {
      roboto: ["Roboto", "sans-serif"],
    },
    container: {
      padding: {
        DEFAULT: "1rem",
        sm: "4rem",
        lg: "8rem",
        xl: "9rem",
        "2xl": "10rem",
        "6xl": "30rem",
      },
    },
    extend: {},
  },
  plugins: [],
};
