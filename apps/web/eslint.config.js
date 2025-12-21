// eslint.config.js
import js from '@eslint/js';
import astro from 'eslint-plugin-astro';

export default [
  {
    // Define the ignore pattern globally first
    ignores: [
      'dist/',
      'node_modules/',
      '.github/',
      '*.min.js',
      '.astro/**'
    ]
  },
  js.configs.recommended,
  ...astro.configs.recommended,
  {
    rules: {
      // Disable certain rules that conflict with Prettier
      'no-unused-vars': 'warn',
      'no-console': 'warn',
    }
  }
];