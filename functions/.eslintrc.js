module.exports = {
    root: true,
    env: {
        es6: true,
        mocha:true,
        node: true,
        jest: true,
    },
    parserOptions: {
        ecmaVersion: 2018,
    },
    extends: ["eslint:recommended", "plugin:jest/style"],
    rules: {
        quotes: ["error", "double"],
    },
};
