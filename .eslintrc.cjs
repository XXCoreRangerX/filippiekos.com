/** @type {import("eslint").Linter.Config} */
const config = {
    extends: ["next/core-web-vitals", "plugin:@typescript-eslint/recommended", "prettier"],
    rules: {
        "@typescript-eslint/no-explicit-any": "error",
        "@typescript-eslint/no-unused-vars": "error"
    }
};

module.exports = config;
