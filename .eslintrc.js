module.exports = {
  root: true,

  env: {
    es6: true,
    node: true,
  },

  parserOptions: {
    ecmaVersion: 2020,
  },

  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/no-deprecated-slot-attribute': 'off', // Rule conflicts with Ionic's slot attribute
    'no-unused-vars': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },

  extends: [
    '@vue/typescript/recommended',
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    'plugin:prettier/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint',
  ],
}
