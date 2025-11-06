import globals from 'globals';

export default [
  // Ignore files
  {
    ignores: ['node_modules/**', 'package-lock.json', 'exercise3-original.js'],
  },

  // JavaScript files - Airbnb style guide rules
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      globals: globals.node,
      ecmaVersion: 2021,
      sourceType: 'module',
    },
    rules: {
      // Airbnb base rules
      'prefer-template': 'error',
      'no-console': 'warn',
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      'no-var': 'error',
      'prefer-const': 'error',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-undef': 'error',
      'max-len': ['error', { code: 100, ignoreStrings: true, ignoreTemplateLiterals: true }],
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': 'error',
      'comma-dangle': ['error', 'always-multiline'],
      indent: ['error', 2],
      'eol-last': ['error', 'always'],
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
      'space-before-blocks': 'error',
      'keyword-spacing': 'error',
      'space-before-function-paren': ['error', 'always'],
      'no-useless-return': 'error',
    },
  },
];
