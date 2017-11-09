// for general ESLint config see https://eslint.org/docs/user-guide/configuring
// for react specific see https://github.com/facebookincubator/create-react-app/blob/master/packages/eslint-config-react-app/index.js

module.exports = {
  parser: 'babel-eslint',
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier',
  ],
  plugins: ['import', 'jsx-a11y', 'prettier'],
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      generators: true,
      experimentalObjectRestSpread: true,
    },
  },
  rules: {
    'react/jsx-filename-extension': 'off',
    'react/jsx-closing-tag-location': 'off',
    'react/jsx-curly-brace-presence': 'off',
    'prettier/prettier': 'error',
    'jsx-a11y/label-has-for': [
      2,
      {
        components: ['Label'],
        required: {
          some: ['nesting', 'id'],
        },
        allowChildren: false,
      },
    ],
  },
}
