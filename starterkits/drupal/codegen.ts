import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  emitLegacyCommonJSImports: true,
  documents: './app/**/!(*.d).{ts,tsx}',
  ignoreNoDocuments: true,
  generates: {
    './types/drupal/__generated__/': {
      preset: 'client',
      presetConfig: {
        fragmentMasking: { unmaskFunctionName: 'getFragmentData' },
      },
      plugins: [],
    },
  },
};

export default config;
