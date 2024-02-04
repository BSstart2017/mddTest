module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['react', 'react-hooks', 'jsx-a11y', 'import', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'prettier',
  ],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/react-in-jsx-scope': 'off',
    'no-console': 'off',
    'no-unused-vars': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
    'import/no-unresolved': 'error',
    'jsx-a11y/no-autofocus': 'off',
    'jsx-a11y/tabindex-no-positive': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
}
