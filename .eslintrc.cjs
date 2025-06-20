module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'react/react-in-jsx-scope': 0,
    'react/function-component-definition': 0,
    'import/prefer-default-export': 0,
    'no-param-reassign': 0,
    "react/button-has-type": 0,
    "jsx-a11y/control-has-associated-label": 0,
    "jsx-a11y/mouse-events-have-key-events": 0,
    "prefer-template": 0,
    "no-useless-escape": 0,
    "react/jsx-boolean-value": 0,
    "react/jsx-props-no-spreading": 0
  },
};
