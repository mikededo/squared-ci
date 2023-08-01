module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['react-refresh', 'react', '@typescript-eslint', 'import'],
  rules: {
    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/consistent-type-imports': 'error',
    'arrow-body-style': ['error', 'as-needed'],
    'import/extensions': [
      'error',
      'ignorePackages',
      { ts: 'never', tsx: 'never' },
    ],
    'import/no-default-export': 2,
    'import/no-unresolved': 'off',
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling'],
          'index',
          'object',
        ],
        pathGroups: [
          { pattern: '@/**', group: 'internal' },
          { pattern: '@/../**', group: 'internal' },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        'newlines-between': 'always',
        alphabetize: { order: 'asc' },
      },
    ],
    'import/prefer-default-export': 0,
    'import/newline-after-import': ['error', { count: 1 }],
    'import/no-duplicates': ['error', { considerQueryString: true }],
    'no-empty-function': [
      'error',
      {
        allow: ['arrowFunctions'],
      },
    ],
    'no-unused-vars': 'off',
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'react-refresh/only-export-components': 'warn',
    'react/jsx-filename-extension': [0],
    'react/jsx-props-no-spreading': [0],
    'react/prop-types': [0],
    'react/react-in-jsx-scope': 2,
    'react/require-default-props': [0],
    'react/self-closing-comp': ['error', { component: true, html: true }],
    'sort-imports': ['error', { ignoreDeclarationSort: true }],
  },
  settings: {
    'import/resolver': {
      typescript: { '@/': './src' },
      node: {
        extensions: ['.ts', '.tsx'],
        moduleDirectory: ['src', 'node_modules'],
      },
    },
    react: { version: 'detect' },
  },
};
