/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{ts,tsx}"],

  theme: {
    extend: {},

    spacing: {
      "0": "0",
      "1px": "1px",
      "2px": "2px",
      "3px": "3px",
      "4px": "4px",

      "xs": "8px",
      "sm": "16px",
      "md": "24px",
      "lg": "32px",
      "xl": "48px",
      "2xl": "64px",
    },

    borderRadius: {
      "none": "0px",
      "sm": "2px",
      "DEFAULT": "4px",
      "md": "6px",
      "lg": "8px",
      "xl": "12px",
      "2xl": "16px",
      "3xl": "24px",
      "full": "50%",
    },

    screens: {
      xs: "640px",
      sm: "768px",
      md: "1024px",
      lg: "1280px",
      xl: "1536px",
    },

    colors: {
      "white": "#FFFFFF",
      "black": "#0d0d0d",
      "off-white": "#f9f9f9",
      "off-black": "#222320",
      "transparent": "transparent",
      "gray-50": "#F9F9F9",
      "gray-100": "#E6E6E6",
      "gray-200": "#BFBFBF",
      "gray-300": "#A3A4A8",
      "gray-400": "#8C8C8C",
      "gray-500": "#75726F",
      "gray-600": "#64635A",
      "gray-700": "#44443E",
      "gray-800": "#2D2E2C",
      "gray-900": "#222320",
      "positive": "#46db0b",
      "positive-dark": "#36ba09",
      "positive-light": "#5df20f",
      "negative": "#d6000e",
      "negative-dark": "#b4000b",
      "negative-light": "#f00013",
      "neutral": "#0ab1ff",
      "neutral-dark": "#088dff",
      "neutral-light": "#0dd7ff",
      "primary": "#ffd800",
      "primary-dark": "#ffb700",
      "primary-light": "#fff000",
      "secondary": "#633721",
      "secondary-dark": "#542d1a",
      "secondary-light": "#9e5d3f",
    },

    fontSize: {
      xs: "8px",
      sm: "14px",
      md: "16px",
      lg: "18px",
      xl: "21px",
      header: "28px",
      title: "37px",
    },

    fontWeight: {
      normal: "400",
      bold: "600",
    },

    lineHeight: {
      0: "0",
      sm: "1.2",
      md: "1.5",
      lg: "1.8",
    },

    zIndex: {
      lowest: "-xs",
      low: "250",
      middle: "500",
      high: "750",
      highest: "999",
    },

    fontFamily: {
      header: ['"Josefin Sans"', "sans-serif"],
      regular: ['"Roboto"', "sans-serif"],
      mono: ['"Roboto Mono"', "monospace"],
    },

    maxWidth: ({ theme, breakpoints }) => ({
      none: "none",
      0: "0px",

      xs: "640px",
      sm: "768px",
      md: "1024px",
      lg: "1280px",
      xl: "1536px",

      full: "100%",
      min: "min-content",
      max: "max-content",
      fit: "fit-content",

      ...breakpoints(theme("screens")),
    }),
  },
  plugins: [],
};

module.exports = config;
