const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#0ff5da',         // Teal
        secondary: '#212121',       // Darker Teal
        complementary: '#ff7043',    // Orange
        background: '#f4f4f9',      // Light Gray
        text: '#333333',            // Dark Gray
        accent: '#81c784',          // Light Green
        border: '#e0e0e0',          // Light Gray
        alert: '#d32f2f',   
      },
    },
  },
  plugins: [],
});

