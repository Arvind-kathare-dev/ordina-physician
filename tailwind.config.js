/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ordinalight: "#579EBA",
        ordinadark: "#528DB5",
        primary: "#1E40AF",
        secondary: "#0F172A",
        accent: "#F7F7F7",
        danger: "#EF4444",
        border: "#CCCCCC",
        boxBorder: "#CDCDCD",
        btn: "#528DB521",

        primary: {
          DEFAULT: "#528DB5",
          light: "#7CBAD3",
          dark: "#3A6F95",
        },

        background: {
          DEFAULT: "#FFFFFF",
          muted: "#F9FAFB",
        },

        ordina: {
          100: "#E2F2F8",
          200: "#528DB517",
          300: "#579EBA",
          400: "#528DB5",
          500: "#7CBAD3",
        },
        ordinaBorder: {
          100: "#579EBA85",
          200: "#DDDDDD",
          300: "rgba(104, 100, 100, 0.6)",
        },
        grayCustom: {
          200: "#FBE3EC",
          300: "#606060",
          400: "#9B9B9B",
          500: "#858585",
          600: "#686464",
        },

        gray: {
          50: "#D4D4D4",
          90: "#F4F4F4",
          100: "#F3F4F5",
          200: "#EDF1F3",
          250: "#F3F3F3",
          300: "#9B9B9B",
          400: "#686464",
          500: "#4D4D4D",
          600: "#303030",
          
        },
        green: {
          200: "#E9F8ED",
          400: "#319F43",
        },
        yellow: {
          90: "#FFF6E6",
          100: "#F7EAD4",
          200: "#FFF2DA",
          400: "#FFA90A",
          500: "#ECBF75",
          650: "#AC7F5E",
        },

        red: {
          opacity30: "#FF383C4D",
          200: "#FF383C0D",
          400: "#FF383C",
          600: "#E33629",
        },

        success: "#38C360",
        warning: "#FFA90A",
        danger: "#EF4444",
        border: "#68646499",
      },

      backgroundImage: {
        "primary-gradient":
          "linear-gradient(225.61deg, #579EBA 18.17%, #4F81B2 89.91%)",

        "gradient-primary":
          "linear-gradient(225.61deg, #579EBA 18.17%, #4F81B2 89.91%)",

        "img-gradient":
          "linear-gradient(1.32deg, #5587B6 1.67%, rgba(0, 103, 180, 0) 89.72%)",
        "card-gradient":
          "linear-gradient(180deg, #448CCA 17.15%, #165FAD 100%)",
        "gradient-light-yellow":
          "linear-gradient(180deg, #FFFCFA 0%, #F6F0EB 100%)",

        "gradient-light-purple":
          "linear-gradient(180deg, #F5F7FF 0%, #E7EBF6 100%)",
        "gradient-light-ordina":
          "linear-gradient(93.18deg, #6FB4CF 0%, #8FC3D8 100%)",
      },

      borderRadius: {
        md: "10px",
        lg: "14px",
        xl: "20px",
      },

      boxShadow: {
        "custom-bottom": "0px 3px 0px 0px #00000040",
        "card-shadow": "-1px 0px 5.2px 0px #0000000D",
        card: "0 2px 8px rgba(0,0,0,0.08)",
        dropdown: "0 8px 20px rgba(0,0,0,0.12)",
        stepper: "0px 0px 4.5px 0px #528DB580",
        search: "2px 2px 7.3px -1px #0000001A",
      },

    },
  },
  plugins: [],
};
