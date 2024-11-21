module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
    ecmaVersion: 2020,
  },
  plugins: [
    "@typescript-eslint",
    "@typescript-eslint/eslint-plugin",
    "prettier",
    "import",
    "unused-imports",
    "simple-import-sort",
    "import-alias",
  ],
  extends: ["plugin:@typescript-eslint/recommended", "plugin:prettier/recommended"],
  root: true,
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  ignorePatterns: ["*.js", "*.d.ts", "dist", ".eslintrc.js"],
  rules: {
    "prettier/prettier": ["error", { endOfLine: "auto" }],
    "no-console": "off",
    curly: "error",
    "brace-style": ["error", "1tbs", { allowSingleLine: false }],
    "no-constant-condition": ["error", { checkLoops: false }],
    "object-shorthand": "error",
    "no-unsafe-finally": "off",

    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error",

    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",

    "unused-imports/no-unused-imports": "error",

    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-vars": ["error", { varsIgnorePattern: "^_", argsIgnorePattern: "^_" }],
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/no-namespace": "off",
    "@typescript-eslint/no-floating-promises": "error",
    "padding-line-between-statements": [
      "error",
      { blankLine: "always", prev: "*", next: "return" },
      { blankLine: "always", prev: "block-like", next: "*" },
      { blankLine: "always", prev: "*", next: "block-like" },
    ],
    "@typescript-eslint/require-await": "error",
    "@typescript-eslint/return-await": ["error", "always"],
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts"],
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
        project: "./tsconfig.json",
      },
    },
  },
};
