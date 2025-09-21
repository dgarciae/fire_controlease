module.exports = {
  root: true,
  extends: [
    "../../.eslintrc.cjs"],
  env: {
    node: true,
    es2022: true
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "simple-import-sort"],
  rules: { "no-console": "warn" }
};
