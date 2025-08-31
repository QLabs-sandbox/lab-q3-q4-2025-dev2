// eslint.config.js
import js from "@eslint/js";
import next from "eslint-config-next";
import jest from "eslint-plugin-jest";

export default [
  {
    ignores: [
      ".next/**",
      "node_modules/**"
    ]
  },
  js.configs.recommended,
  ...next, // uključuje "next" i "next/core-web-vitals"
  {
    files: ["**/*.{js,ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
    },
  },
  {
    files: ["**/*.test.{js,ts,tsx}"],
    plugins: { jest },
    rules: {
      ...jest.configs.recommended.rules,
    },
    languageOptions: {
      globals: {
        ...jest.environments.globals.globals,
      },
    },
  }
];
