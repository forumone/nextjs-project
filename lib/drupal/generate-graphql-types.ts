import { CodegenContext, generate } from '@graphql-codegen/cli';
import { resolve } from 'node:path';
// @ts-expect-error The codegen file won't be at its location until setup-drupal is run.
import codegenConfig from '../../codegen';
import drupal from '../../util/drupal/drupal';
import graphqlEndpoint from '../../util/drupal/graphqlEndpoint';

async function generateGraphQLTypes() {
  try {
    const token = await drupal.getAccessToken();
    await generate(
      new CodegenContext({
        config: {
          ...codegenConfig,
          schema: {
            [graphqlEndpoint.toString()]: {
              headers: {
                Authorization: `${token.token_type} ${token.access_token}`,
              },
            },
          },
        },
        filepath: resolve(__dirname, '../codegen.ts'),
      }),
      true,
    );
  } catch (error) {
    console.error(error);
  }
}

void generateGraphQLTypes().then(() => {
  console.log('Types generated');
});
