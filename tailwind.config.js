/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#528DB5",
          light: "#7CBAD3",
          dark: "#3A6F95",
        },

        background: {
          DEFAULT: "#FFFFFF",
          muted: "#F9FAFB",
        },

        border: {
          DEFAULT: "#E5E7EB",
          gray: "#68646499",
        },

        gray: {
          100: "#F3F4F5",
          200: "#EDF1F3",
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
          100: "#FFF6E6",
          200: "#FFF2DA",
          400: "#AC7F5E",
          500: "#ECBF75",
        },
         red: {
          200: "#FF383C0D",
          400: "#FF383C",
        },

        success: "#38C360",
        warning: "#FFA90A",
        danger: "#EF4444",
        border: "#68646499"
      },

      backgroundImage: {
        "primary-gradient":
          "linear-gradient(225.61deg, #579EBA 18.17%, #4F81B2 89.91%)",
        "img-gradient":
          "linear-gradient(1.32deg, #5587B6 1.67%, rgba(0, 103, 180, 0) 89.72%)",
        "card-gradient":
          "linear-gradient(180deg, #448CCA 17.15%, #165FAD 100%)",
      },


      borderRadius: {
        md: "10px",
        lg: "14px",
        xl: "20px",
      },

      

      boxShadow: {
        card: "0 2px 8px rgba(0,0,0,0.08)",
        dropdown: "0 8px 20px rgba(0,0,0,0.12)",
      },
    },
  },
  plugins: [],
};
