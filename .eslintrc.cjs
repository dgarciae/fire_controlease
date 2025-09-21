module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "google",
    "prettier"
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
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        "vars": "all",
        "args": "after-used",
        "ignoreRestSiblings": true,
        "varsIgnorePattern": "^_",
        "argsIgnorePattern": "^_",
        "caughtErrorsIgnorePattern": "^_"
      }
    ],
    "no-console": "off",
    "camelcase": "off",
    "require-jsdoc": "off",
    "indent": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/naming-convention": [
      "error",
      {
        "selector": "parameter",
        "format": ["camelCase"],
        "leadingUnderscore": "allow",
        "filter": { "regex": "^_$", "match": true }
      },
      {
        "selector": "objectLiteralProperty",
        "format": ["snake_case", "camelCase", "PascalCase"],
        "leadingUnderscore": "allow"
      },
      {
        "selector": "property",
        "format": ["camelCase", "snake_case", "PascalCase"],
        "leadingUnderscore": "allow"
      },
      {
        "selector": "default",
        "format": ["camelCase", "PascalCase", "snake_case", "UPPER_CASE"]
      }
    ],
    "object-curly-spacing": ["error", "always"],
    indent: ["error", 2],
    quotes: ["error", "double"],
    "spaced-comment": ["error", "always", { "exceptions": ["/"], "markers": ["/"] }]
  },
  overrides: [

    /* React */

    {
      files: ["app/src/**/*.{ts,tsx}"],
      parserOptions: {
        project: ["./app/tsconfig.json"],
        tsconfigRootDir: __dirname,
      },
      env: { browser: true, es2020: true },
      extends: [
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:jsx-a11y/recommended",
      ],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      settings: {
        react: { version: "detect" },
      },
      plugins: ["react-refresh"],
      rules: {
        "indent": "off",
        "spaced-comment": "off",
        "react-refresh/only-export-components": [
          "off",
          { allowConstantExport: true },
        ],
        "react/react-in-jsx-scope": "off",
        "react/no-unescaped-entities": "off",
        "react-hooks/exhaustive-deps": "off",
        "@typescript-eslint/naming-convention": [
          "error",
          {
            "selector": "variable",
            "format": ["camelCase"],
            "leadingUnderscore": "allow",
            "filter": { "regex": "^_$", "match": true }
          }
        ],
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": [
          "warn",
          {
            "vars": "all",
            "args": "after-used",
            "ignoreRestSiblings": true,
            "varsIgnorePattern": "^_",
            "argsIgnorePattern": "^_",
            "caughtErrorsIgnorePattern": "^_"
          }
        ]
      },
    },

    /* Functions */

    {
      files: ["functions/**/*.{ts,tsx}"],
      parserOptions: {
        tsconfigRootDir: __dirname,
      },
      rules: {
        "indent": "off",
        "require-jsdoc": "off",
        "@typescript-eslint/no-unused-expressions": [
          "error",
          { "allowShortCircuit": true, "allowTernary": true, "allowTaggedTemplates": true }
        ],
        "@typescript-eslint/naming-convention": [
          "error",
          {
            "selector": "parameter",
            "format": ["camelCase"],
            "leadingUnderscore": "allow",
            "filter": { "regex": "^_$", "match": true }
          },
          {
            "selector": "default",
            "format": ["camelCase", "PascalCase", "snake_case", "UPPER_CASE"]
          }
        ],
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": [
          "warn",
          {
            "vars": "all",
            "args": "after-used",
            "ignoreRestSiblings": true,
            "varsIgnorePattern": "^_",
            "argsIgnorePattern": "^_",
            "caughtErrorsIgnorePattern": "^_"
          }
        ]
      }
    },
  ],
};