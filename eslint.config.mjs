import { FlatCompat } from '@eslint/eslintrc';
import f1BaseConfig from '@forumone/eslint-config-es5';
import f1ReactConfig from '@forumone/eslint-config-react';
import { defineConfig, globalIgnores } from 'eslint/config';

const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
});

const config = defineConfig([
  globalIgnores(['**/Icon/icons/*.tsx']),
  compat.config({
    extends: ['plugin:@next/next/recommended'],
  }),
  f1BaseConfig,
  {
    files: ['*.tsx', '*.jsx'],
    extends: [f1ReactConfig],
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
]);

export default config;
