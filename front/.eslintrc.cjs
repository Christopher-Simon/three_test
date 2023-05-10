module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "airbnb",
        "airbnb-typescript",
        "airbnb/hooks",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "overrides": [],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "project": './tsconfig.json'
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
        'react/react-in-jsx-scope': 0,
        "indent": ["error", "tab"],
        "@typescript-eslint/indent": ["error", "tab"],
        "no-tabs": 0,
        "react/jsx-indent-props": ["error", "tab"],
        "react/jsx-indent": ["error", "tab"],
        "@typescript-eslint/quotes": ["error", "double"],
        "no-console": 0,
        "react/jsx-one-expression-per-line": 0,
        "react/no-unknown-property": 0,
        "@typescript-eslint/no-explicit-any": "error",
        "react/jsx-props-no-spreading": 0,
        'object-curly-newline': 0,
        'operator-linebreak': 0,
        '@typescript-eslint/comma-dangle': 0,
        // '@typescript-eslint/no-explicit-any': 0,
    }
}
