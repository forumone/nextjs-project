import LandingPage, {
  LandingPageCard,
} from '@/app/_components/content/LandingPage';
import { NextSearchParamsProp } from '@/types/NextSearchParams';
import {
  BlogArchiveQuery,
  BlogArchiveQueryVariables,
} from '@/types/__generated__/graphql';
import { isNotNullNorUndefined } from '@/util/isNullOrUndefined';
import normalizeImageUrl from '@/util/wp/normalizeImageUrl';
import { getClient } from '@faustwp/experimental-app-router';
import { Metadata } from 'next';
import ArchiveParams from '../film/ArchiveParams';
import blogArchiveQuery from './blogArchiveQuery';

const PAGE_TITLE = 'Blog';
export const metadata: Metadata = {
  title: PAGE_TITLE,
};

interface BlogArchiveProps extends NextSearchParamsProp {}

async function BlogArchive({ searchParams }: BlogArchiveProps) {
  function getParam(key: string): string | undefined {
    const value = searchParams[key];
    return Array.isArray(value) ? value[0] : value;
  }

  // Use cursor based pagination. Prioritize "after" over "before".
  const after = getParam(ArchiveParams.AFTER) || undefined;
  const before = (!after && getParam(ArchiveParams.BEFORE)) || undefined;
  // "first" should be 12 for all queries that do not use "before".
  const first = (!before && 12) || undefined;
  const last = (before && 12) || undefined;

  const client = await getClient();
  const { data, error } = await client.query<
    BlogArchiveQuery,
    BlogArchiveQueryVariables
  >({
    query: blogArchiveQuery,
    variables: {
      first,
      after,
      last,
      before,
    },
  });

  if (error) {
    throw new Error(error.message);
  }
  if (!data.posts) {
    throw new Error(
      'An error has occured when trying to retrieve the list of films.',
    );
  }

  return (
    <LandingPage
      title={PAGE_TITLE}
      hidePageTitle={false}
      cards={data.posts?.edges
        .map(d => {
          if (!d.node.title) {
            return null;
          }
          const item: LandingPageCard = {
            url: d.node.uri || undefined,
            title: d.node.title,
            image: d.node.featuredImage && {
              src: normalizeImageUrl(d.node.featuredImage.node.sourceUrl || ''),
              alt: d.node.featuredImage?.node.altText || d.node.title,
            },
          };
          return item;
        })
        .filter(isNotNullNorUndefined)}
      pageInfo={data.posts?.pageInfo}
    />
  );
}

export default BlogArchive;
