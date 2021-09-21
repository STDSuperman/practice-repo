module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2015,
    ecmaFeatures: {
      modules: true
    }
  },
  env: {
    node: true,
    browser: true
  },
  extends: [
    'eslint:recommended'
  ],
  plugins: [],
  rules: {
    'no-unused-vars': [
      1,
      { varsIgnorePattern: '.*', args: 'none' }
    ]
  },
  overrides: []
}