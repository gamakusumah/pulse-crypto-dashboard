import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { globalIgnores } from 'eslint/config';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(globalIgnores(['dist', 'node_modules', 'coverage']), {
  files: ['**/*.{ts,tsx}'],
  extends: [
    js.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    reactHooks.configs.flat['recommended-latest'],
    reactRefresh.configs.vite,
    prettierConfig,
  ],
  languageOptions: {
    ecmaVersion: 2023,
    globals: globals.browser,
    parserOptions: {
      projectService: true,
      tsconfigRootDir: import.meta.dirname,
    },
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],
    '@typescript-eslint/consistent-type-imports': [
      'warn',
      { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
    ],
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    // These rules assume the React Compiler is enabled. This project
    // does not use it, so its compiler-specific diagnostics
    // (memoization safety, effect setState heuristics) don't apply.
    'react-hooks/set-state-in-effect': 'off',
    'react-hooks/incompatible-library': 'off',
  },
});
