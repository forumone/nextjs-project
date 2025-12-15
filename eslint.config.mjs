import f1BaseConfig from '@forumone/eslint-config-es5';
import f1ReactConfig from '@forumone/eslint-config-react';
import nextPlugin from '@next/eslint-plugin-next';
import { defineConfig, globalIgnores } from 'eslint/config';

const config = defineConfig([
  f1BaseConfig,
  {
    files: ['*.tsx', '*.jsx'],
    extends: [f1ReactConfig],
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
    },
  },
  {
    files: ['**/*.stories.tsx', '**/*Args.tsx'],
    rules: {
      '@next/next/no-img-element': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
    },
  },
  {
    files: ['next.config.js', '.storybook/**/*.js'],
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
    },
  },
  {
    files: [
      'lib/drupal/generate-graphql-types.ts',
      'util/drupal/prepMenuItems.ts',
    ],
    rules: {
      '@typescript-eslint/ban-ts-comment': 'off',
    },
  },
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    // Ignore generated Icons
    '**/icon/icons/*.tsx',
  ]),
]);

export default config;
