const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended");
// const typescriptEslintRecommended = require("typescript-eslint");

module.exports = [
    eslintPluginPrettierRecommended,
    // next.js - https://github.com/vercel/next.js/issues/64409
    /* typescriptEslintRecommended,
    {
        rules: {
            "@typescript-eslint/no-explicit-any": "error",
            "@ypescript-eslint/no-unused-vars": "error",
        },
    },
    */
];
