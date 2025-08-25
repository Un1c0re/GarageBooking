import { defineConfig } from "eslint/config";
import prettier from "eslint-config-prettier";
import pluginPrettier from "eslint-plugin-prettier";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import pluginVue from "eslint-plugin-vue";
import globals from "globals";
import tseslint from "typescript-eslint";
import vueParser from "vue-eslint-parser";

export default defineConfig([
  {
    ignores: ["eslint.config.js", "tailwind.config.js"],
    files: ["**/*.{js,cjs,mjs,ts,cts,mts}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
        sourceType: "module",
      },
      globals: globals.browser,
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      prettier: pluginPrettier,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      "prettier/prettier": [
        "error",
        {
          "endOfLine": "auto",
          printWidth: 120,
        }
      ],
      ...prettier.rules,
    },
  },

  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,
        ecmaVersion: 2020,
        sourceType: "module",
        extraFileExtensions: [".vue"],
        project: "./tsconfig.json",
      },
      globals: globals.browser,
    },
    plugins: {
      vue: pluginVue,
      prettier: pluginPrettier,
    },
    processor: pluginVue.processors[".vue"],
    rules: {
      ...pluginVue.configs["flat/recommended"].rules,
      "prettier/prettier": [
        "error",
        {
          "endOfLine": "auto",
          printWidth: 120,
        }
      ],
      ...prettier.rules,
      "vue/jsx-uses-vars": "error",
    },
  },

  {
    files: ["**/*.{js,ts,vue}"],
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "no-console": "warn",
      "no-debugger": "warn",
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
  },

  prettier,
]);
