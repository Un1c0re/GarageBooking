import { defineConfig } from "eslint/config";
import prettier from "eslint-config-prettier";
import pluginPrettier from "eslint-plugin-prettier";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
    {
        ignores: ["eslint.config.mjs"],
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
        files: ["**/*.{js,ts}"],
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
