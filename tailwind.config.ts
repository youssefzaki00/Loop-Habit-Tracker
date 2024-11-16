import type { Config } from "tailwindcss";
const { colors: defaultColors } = require("tailwindcss/defaultTheme");
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        ...defaultColors,
        main: "#1876d2",
        textGray: "#777777",
        borderColor: "#282828",
        false: "#515151",
        dark1: "#101010",
        dark2: "#212121",
        dark3: "#313131",
        dark4: "#414141",
        dark5: "#515151",
      },
    },
  },
  plugins: [
    function ({ addComponents }: any) {
      addComponents({
        ".customShadow": {
          padding: "0.5rem",
          borderRadius: "9999px",
          backgroundColor: "transparent",
          transitionProperty: "all",
          transitionDuration: "200ms",
          color: "#9ca3af ",
          "&:hover": {
            backgroundColor: "#4b5563",
            color: "#fafafafa",
          },
          "&:active": {
            backgroundColor: "#5c677d  ",
            transform: "scale(0.97)",
          },
        },
      });
    },
  ],
};
export default config;
