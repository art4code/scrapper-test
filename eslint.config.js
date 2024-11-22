const { FlatCompat } = require("@eslint/eslintrc");
const tsParser = require("@typescript-eslint/parser");
const tsPlugin = require("@typescript-eslint/eslint-plugin");
const prettierPlugin = require("eslint-plugin-prettier");
const importPlugin = require("eslint-plugin-import");
const unusedImportsPlugin = require("eslint-plugin-unused-imports");
const simpleImportSortPlugin = require("eslint-plugin-simple-import-sort");
const importAliasPlugin = require("eslint-plugin-import-alias");

const compat = new FlatCompat();

module.exports = [
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "tsconfig.json",
        tsconfigRootDir: __dirname,
        sourceType: "module",
        ecmaVersion: 2020,
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      prettier: prettierPlugin,
      import: importPlugin,
      "unused-imports": unusedImportsPlugin,
      "simple-import-sort": simpleImportSortPlugin,
      "import-alias": importAliasPlugin,
    },
    rules: {
      "prettier/prettier": ["error", { endOfLine: "auto" }],
      "no-console": ["error", { allow: ["warn", "error"] }],
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
  },
  {
    ignores: ["*.js", "*.d.ts", "dist"],
  },
];
