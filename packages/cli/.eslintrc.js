module.exports = {
    parser: "@typescript-eslint/parser",
    extends: [
        "plugin:@typescript-eslint/recommended"
    ],
    parserOptions: {
        sourceType: "module"
    },
    env: {
        node: true
    }
}
