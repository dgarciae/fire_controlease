/** @type {import("prettier").Config} */
const config = {
  semi: true,
  singleQuote: false,
  printWidth: 90,
  trailingComma: "es5",
  tailwindFunctions: ["clsx", "tw"],
  plugins: ["@trivago/prettier-plugin-sort-imports", "prettier-plugin-tailwindcss"],
  importOrder: ["^[react]", "^@(?!/)", "^@/", "^[./]"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};

export default config;
