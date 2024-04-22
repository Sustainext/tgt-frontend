/** @type {import('tailwindcss').Config} */
module.exports = {
  mode:'jit',
  corePlugins:{
    container: false
  },
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    function ({ addVariant }) {
      addVariant('focus-shadow-outline-blue', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.focus\\:${className.split(separator).join('\\:')}:focus`;
        });
      });
    },
  ],
};
