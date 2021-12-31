module.exports = {

  root: true,

  env: {
    node: true
  },

  extends: [
    "plugin:vue/vue3-essential",
    '@vue/eslint-config-standard'
  ],

  parserOptions: {
    parser: 'babel-eslint'
  },

  rules: {
    'no-unused-vars': process.env.NODE_ENV === "production"? "error" : "warn",
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'indent': process.env.NODE_ENV === 'production' ? ["error", 2] : ["warn", 2]
  }
}
