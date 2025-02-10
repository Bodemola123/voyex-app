/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        sm: "480px",
        md: "768px",
        lg: "1206px",
        xl: "1440px",
      },
    },
    extend: {
      colors: {
        primary: "#313131",
        purple: "#C088FB",
        secondary: "#131314",
        white: "#ffffff",
        black: "#000000",
        fontlight: "#F4f4f4",
        fontfaded: "#6D6D6D",
        btnlime: "#46ba3c",
        userbubble: "#00A766",
        botbubble: "#007983",
        fade: "#007983",
        btnhover: "#3c3c3c",
        card: "#313131",
        input: "#171920",
        gray: "#999999",
      },
      keyframes: {
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(90.83deg, rgba(0, 167, 102, 0.1) 0%, rgba(153, 153, 153, 0.1) 100%)",
      },
      backdropBlur: {
        custom: "9.3px",
      },
      boxShadow: {
        "1xl": "0px 0px 10px 5px rgba(0,0,0,0.05)",
        "1s": "0px 0px 30px 1px rgba(192, 136, 251, 0.2)",
        "2xl": "0px 0px 10px 5px rgba(0,0,0,0.1)",
      },
      fontFamily: {
        albert: ["Albert Sans", "sans-serif"],
        sans: ["Plus Jakarta Sans", "sans-serif"],
        nunito: ["Nunito Sans", "sans-serif"],
        roboto: ["Roboto Mono", "monospace"],
        space: ["Space Grotesk", "sans-serif"],
        grotesk: ["FKGroteskNeueTrial", "sans-serif"],
        dmsans: ["DM Sans", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"), // Keep the animate plugin
    function ({ addUtilities }) {
      addUtilities(
        {
          '.scrollbar-hide': {
            'scrollbar-width': 'none', /* Hide scrollbar for Firefox */
          },
          '.scrollbar-hide::-webkit-scrollbar': {
            'display': 'none', /* Hide scrollbar for WebKit browsers */
          },
        },
        ['responsive', 'hover'] // This ensures the utility works with all responsive variants
      );
    },
  ],
};
