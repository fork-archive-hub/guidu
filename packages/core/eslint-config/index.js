module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'eslint:recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:jsx-a11y/recommended',
    'plugin:compat/recommended',
    'plugin:react-hooks/recommended',
    'plugin:you-dont-need-lodash-underscore/compatible',
    'prettier',
  ],
  plugins: ['formatjs'],
  rules: {
    'function-paren-newline': 'off',
    'arrow-parens': 'off',
    'implicit-arrow-linebreak': 'off',
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'react/no-unknown-property': ['error', { ignore: ['css', 'tw'] }],
    'react/jsx-props-no-spreading': 1,
    'react/jsx-wrap-multilines': 'off',
    'react/jsx-filename-extension': [
      2,
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    ],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
  parserOptions: {
    project: './tsconfig.json',
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
};
