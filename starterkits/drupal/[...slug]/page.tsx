import { graphql } from '@/types/drupal/__generated__';
import {
  GetNodeByPathQuery,
  GetNodeByPathQueryVariables,
} from '@/types/drupal/__generated__/graphql';
import query from '@/util/drupal/query';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import ArticleFull from '../_content/ArticleFull';
import BasicPage from '../_content/BasicPageFull';

const getNodeByPath = graphql(`
  query GetNodeByPath($path: String!) {
    route(path: $path) {
      __typename
      ... on RouteInternal {
        entity {
          __typename
          ... on NodeInterface {
            status
          }
          ...ArticleFullFragment
          ...BasicPageFragment
        }
      }
    }
  }
`);

async function NodeFull({ params }: { params: { slug: string[] } }) {
  const { isEnabled } = draftMode();
  const data = await query<GetNodeByPathQuery, GetNodeByPathQueryVariables>(
    getNodeByPath,
    {
      path: `/${params.slug.join('/')}`,
    },
  );
  if (
    typeof data !== 'undefined' &&
    typeof data.route !== 'undefined' &&
    data.route !== null &&
    data.route.__typename === 'RouteInternal' &&
    data.route.entity &&
    (('status' in data.route.entity && data.route.entity.status) || isEnabled)
  ) {
    switch (data.route.entity.__typename) {
      case 'NodeArticle':
        return <ArticleFull entity={data.route.entity} />;
      case 'NodePage':
        return <BasicPage entity={data.route.entity} />;
      default:
        notFound();
    }
  } else {
    notFound();
  }
}

export default NodeFull;
