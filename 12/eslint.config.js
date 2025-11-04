import globals from 'globals';
import pluginReact from 'eslint-plugin-react';
import json from '@eslint/json';
import markdown from '@eslint/markdown';
import { defineConfig } from 'eslint/config';
import neostandard from 'neostandard';

// Get neostandard configs but apply only to JS files
const neostandardConfigs = neostandard({
  semi: true,
});

// Add files restriction to neostandard configs
const jsOnlyNeostandard = neostandardConfigs.map(config => ({
  ...config,
  files: config.files || ['**/*.{js,mjs,cjs,jsx}']
}));

export default defineConfig([
  // Neostandard for JavaScript files only
  ...jsOnlyNeostandard,

  // JavaScript files - custom rules
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      globals: globals.node
    },
    rules: {
      'prefer-template': 'error',
      'no-console': 'error',
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
    }
  },

  // React/JSX files only
  {
    files: ['**/*.{jsx,tsx}'],
    ...pluginReact.configs.flat.recommended,
    settings: {
      react: {
        version: 'detect'
      }
    }
  },

  // JSON files
  {
    files: ['**/*.json'],
    plugins: { json },
    language: 'json/json',
    ...json.configs.recommended
  },
  {
    files: ['**/*.jsonc'],
    plugins: { json },
    language: 'json/jsonc',
    ...json.configs.recommended
  },
  {
    files: ['**/*.json5'],
    plugins: { json },
    language: 'json/json5',
    ...json.configs.recommended
  },

  // Markdown files
  {
    files: ['**/*.md'],
    plugins: { markdown },
    language: 'markdown/commonmark',
    ...markdown.configs.recommended
  },
]);
