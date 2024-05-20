/* eslint-disable @typescript-eslint/no-var-requires */
const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.tsx", "./src/**/*.css", flowbite.content()],
  plugins: [require("@tailwindcss/forms"), flowbite.plugin()],
};
