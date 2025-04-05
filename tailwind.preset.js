const { fontFamily } = require("tailwindcss/defaultTheme");

const colors = {
  gray: {
    0: "#ffffff",
    50: "#fafafa",
    100: "#f4f4f4",
    150: "#ebebeb",
    200: "#e0e0e0",
    250: "#d6d6d6",
    300: "#c6c6c6",
    350: "#b8b8b8",
    400: "#a8a8a8",
    450: "#9c9c9c",
    500: "#8d8d8d",
    550: "#808080",
    600: "#6f6f6f",
    650: "#636363",
    700: "#525252",
    750: "#4a4a4a",
    800: "#393939",
    850: "#333333",
    900: "#262626",
    950: "#1f1f1f",
    1000: "#000000",
  },
  primary: {
    100: "#DBDDF5",
    200: "#B8BBEB",
    300: "#9499E0",
    400: "#7177D6",
    500: "#4D55CC",
    600: "#3E44A3",
    700: "#2E337A",
    800: "#1F2252",
    900: "#171A3D",
    1000: "#0F1129",
  },
  etc: {
    positive: "#12B76A",
    positiveDeg: "#A7F0BA",
    negative: "#F04438",
    negativeDeg: "#FF9EB0",
  },
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [require("./tools/plugins/tailwind"), require("tailwindcss-animate")],
  safelist: [
    "after:pb-[50%]",
    "after:pb-[75%]",
    "after:pb-[100%]",
    "max-w-[none]",
    "max-h-[none]",
    "max-w-full",
    "max-h-full",
  ],
  theme: {
    screens: {
      sm: "600px",
      md: "1024px",
      lg: "1440px",
      mx: "1800px",
    },
    fontFamily: {
      sans: ["Aspekta", ...fontFamily.sans],
    },
    fontSize: {
      "28/title": ["28px", { fontWeight: 600, lineHeight: "130%" }],
      "24/heading": ["24px", { fontWeight: 600, lineHeight: "130%" }],
      "20/heading": ["20px", { fontWeight: 600, lineHeight: "130%" }],
      "18/heading": ["18px", { fontWeight: 600, lineHeight: "130%" }],
      "16/button": ["16px", { fontWeight: 500, lineHeight: "130%" }],
      "14/button": ["14px", { fontWeight: 500, lineHeight: "130%" }],
      "16/body/emp": ["16px", { fontWeight: 500, lineHeight: "140%" }],
      "16/body": ["16px", { fontWeight: 400, lineHeight: "140%" }],
      "14/body/emp": ["14px", { fontWeight: 500, lineHeight: "140%" }],
      "14/body": ["14px", { fontWeight: 400, lineHeight: "140%" }],
      "12/body": ["12px", { fontWeight: 400, lineHeight: "140%" }],
    },
    extend: {
      boxShadow: {
        emphasize:
          "0px 2px 8px 0px rgba(0, 0, 0, 0.12), 0px 1px 4px 0px rgba(0, 0, 0, 0.08), 0px 0px 1px 0px rgba(0, 0, 0, 0.08)",
        toggle: "0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px 3px 1px 0px rgba(0, 0, 0, 0.05)",
      },
      colors: {
        ...colors,
        theme: {
          white: colors.gray[0],
          black: colors.gray[1000],
        },
      },
      transitionProperty: {
        opacity: "opacity",
      },
      transitionDuration: {
        500: "300ms",
      },
      // add @shadcn/ui configuration below here
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
};
