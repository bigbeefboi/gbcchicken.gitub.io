module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh','react'],
  rules: {
    'react/jsx-key':  0,
    "react/jsx-uses-vars": "error",
    "react/jsx-uses-react": "error",
    "react/prop-types": 0,
    "vue/multi-word-component-name": "off",
    'react/react-in-jsx-scope': 'off', // Disable the rule requiring React in scope
    'no-unused-vars': ['error', { varsIgnorePattern: 'React' }], // Ignore unused React import
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },

      

    ],
    "no-unused-vars": 0
  },
}
