module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "google",
  ],
  ignorePatterns: ["dist", "node_modules", ".eslintrc.cjs", "prettier.config.mjs"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
    "object-curly-spacing": ["error", "always"],
    indent: ["error", 2],
    quotes: ["error", "double"],
  },
  overrides: [

    /* React */

    {
      files: ["app/src/**/*.{ts,tsx}"],
      parserOptions: {
        project: ["./app/.config/tsconfig.json"],
        tsconfigRootDir: __dirname,
      },
      env: { browser: true, es2020: true },
      extends: [
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:jsx-a11y/recommended",
      ],
      ignorePatterns: ["dist"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      settings: {
        react: { version: "detect" },
      },
      rules: {
        "react-refresh/only-export-components": [
          "warn",
          { allowConstantExport: true },
        ],
      },
    },

    /* Functions */

    {
      files: ["functions/**/*.{ts,tsx}"],
      parserOptions: {
        project: [
          "./functions/shared/tsconfig.json",
          "./functions/dbaccess/tsconfig.json",
        ],
        tsconfigRootDir: __dirname,
      },
    },
  ],
};
