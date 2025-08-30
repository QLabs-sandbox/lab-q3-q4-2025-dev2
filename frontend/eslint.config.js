// eslint.config.js
import js from "@eslint/js";

export default [
  {
    ignores: [
      ".next/**",
      "node_modules/**"
    ]
  },
  js.configs.recommended,
  {
    files: ["**/*.js", "**/*.ts", "**/*.tsx"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
    },
    rules: {
      // Dodaj custom pravila ovdje
    },
  }
];
