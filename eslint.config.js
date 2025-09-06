// eslint.config.js (Flat config, ESM)
import js from "@eslint/js";
import globals from "globals";
import noUnsanitized from "eslint-plugin-no-unsanitized";

export default [
  // Global ignores
  { ignores: ["node_modules", "coverage", "dist"] },

  js.configs.recommended,

  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.browser },
    },
    plugins: { "no-unsanitized": noUnsanitized },
    rules: {
      "no-unsanitized/method": "error",
      "no-unsanitized/property": "error",
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "no-console": "off",
    },
  },

  {
    files: ["eslint.config.js", "**/*.config.js", "**/scripts/**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.node },
    },
  },

  {
    files: ["**/*.cjs"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
      globals: { ...globals.node },
    },
  },

  {
    files: ["**/*.{test,spec}.{js,cjs,mjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
      globals: { ...globals.jest, ...globals.node },
    },
  },
];
