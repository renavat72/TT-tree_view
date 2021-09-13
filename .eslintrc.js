module.exports = {
  extends: [
    'airbnb-typescript',
    'airbnb/hooks',
    "prettier/prettier",
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
    'plugin:prettier/recommended',
    "prettier",
  ],
  plugins: ['react', '@typescript-eslint', 'jest',"import",  "prettier"],
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: false,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  rules:  {
    "react/jsx-filename-extension": [1, { "extensions": [".tsx", ".ts"] }]
  },
};
