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
        boxBorder: "#D6D6D6",
        btn: "#528DB521",

        primary: {
          DEFAULT: "#528DB5",
          light: "#7CBAD3",
          dark: "#3A6F95",
          background: "#528DB50D",
          color: "#528DB5",
          border: "#528DB540",
          title: "#333333",
          subtitle: "#666666",
          description: "#262626",
          primaryGradient: "linear-gradient(225.61deg, #579EBA 18.17%, #4F81B2 89.91%)",
          gradientButton: "linear-gradient(225.61deg, #579EBA 18.17%, #4F81B2 89.91%)",
          gradientText: "linear-gradient(93.18deg, #6FB4CF 0%, #8FC3D8 100%)",
          gradientHover: "linear-gradient(225.61deg, #579EBA 18.17%, #4F81B2 89.91%)",
          shadowButton: "0px 4px 0px 0px #00000040",
          shadowHeader: "0px 0px 10px 0px #0000000D",
          cardShadow: "0px 4px 20px -6px #0000000D",

        },

        background: {
          DEFAULT: "#FFFFFF",
          muted: "#F9FAFB",
        },

        ordina: {
          100: "#E2F2F8",
          200: "#528DB517",
          220: "#579EBA2E",
          240: "#6392A4",
          300: "#579EBA",
          400: "#528DB5",
          500: "#7CBAD3",

        },
        ordinaBorder: {
          100: "#579EBA85",
          150: "#CCCCCC",
          200: "#DDDDDD",
          250: "rgba(87, 158, 186, 0.36)",
          300: "rgba(104, 100, 100, 0.6)",
          350: "rgba(82, 141, 181, 0.34)",
        },
        grayCustom: {
          100: "#F6F9FB",
          200: "#FBE3EC",
          220: "#E6E6E6",
          300: "#606060",
          400: "#9B9B9B",
          500: "#858585",
          600: "#686464",
          320: "#E8F3FB",
          340: "rgba(232, 240, 243, 1)",
          330: "rgba(248, 248, 248, 1)",
        },

        gray: {
          50: "#D4D4D4",
          90: "#F4F4F4",
          100: "#F3F4F5",
          120: "#E9EFF2",
          200: "#EDF1F3",
          220: "#E0E0E0",
          250: "#F3F3F3",
          300: "#9B9B9B",
          350: "#858585",
          400: "#686464",
          450: "#606060",
          500: "#4D4D4D",

          520: "#B6C0C4",
          550: "#CDCDCD",
          600: "#303030",
        },
        purple: {
          120: "#EFF6FB",
          150: "#EBF3F9",
          250: "#E5DEEF",
          220: "#F2EBFF",
          450: "#99A9E8",
          560: "#8F65E3",

        },
        green: {
          150: "#E3F2E7",
          200: "#E9F8ED",
          400: "#319F43",
          420: "#38C360",
          540: "#209F7F",
        },
        yellow: {
          90: "#FFF6E6",
          100: "#F7EAD4",
          150: "#F8EEDD",
          200: "#FFF2DA",
          250: "#FCF5E9",
          400: "#FFA90A",
          450: "#E5B082",
          500: "#ECBF75",
          650: "#AC7F5E",
        },

        red: {
          opacity30: "#FF383C4D",
          200: "#FF383C0D",
          400: "#FF383C",
          600: "#E33629",
        },

        roseDust: "#E1A8BE",
        roseMist: "#FBE3EC",
        neutralLight: "#F7F7F7",

        success: "#38C360",
        warning: "#FFA90A",
        danger: "#EF4444",
        border: "#BFBFBF",
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
        xl2: "12px",
        md2: "9px",
        10: "10px",
      },

      boxShadow: {
        "custom-bottom": "0px 3px 0px 0px #00000040",
        "card-shadow": "-1px 0px 5.2px 0px #0000000D",
        card: "0 2px 8px rgba(0,0,0,0.08)",
        dropdown: "0 8px 20px rgba(0,0,0,0.12)",
        stepper: "0px 0px 4.5px 0px #528DB580",
        search: "2px 2px 7.3px -1px #0000001A",
        card2: "0px 4px 20px -6px #0000000D",

      },
      keyframes: {
        shine: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        shine: "shine 2s infinite linear",
      },
    },
  },
  plugins: [],
};
