import getPageQuery from '@/app/[slug]/getPageQuery';
import BlocksViewer from '@/app/_components/content/BlocksViewer';
import CursorNavigation, {
  ArchiveParams,
} from '@/app/_components/content/CursorNavigation';
import blogArchiveQuery from '@/app/blog/blogArchiveQuery';
import Article from '@/source/03-components/Article/Article';
import LandingPage from '@/source/04-templates/LandingPage/LandingPage';
import { NextSearchParamsProp } from '@/types/NextSearchParams';
import {
  BlogArchiveQuery,
  BlogArchiveQueryVariables,
  GetPageQuery,
  GetPageQueryVariables,
  GetReadingSettingsQuery,
  HomeMetadataQuery,
  PageIdType,
} from '@/types/__generated__/graphql';
import { hasPreviewProps } from '@/util/wp/hasPreviewProp';
import { getAuthClient, getClient } from '@faustwp/experimental-app-router';
import { Metadata } from 'next';
import Link from 'next/link';
import LoginForm from './[slug]/LoginForm';
import homeMetadataQuery from './homeMetadataQuery';
import readingSettingsQuery from './readingSettingsQuery';

interface HomeProps extends NextSearchParamsProp {}

export async function generateMetadata(): Promise<Metadata> {
  const client = await getClient();

  const { data } = await client.query<HomeMetadataQuery>({
    query: homeMetadataQuery,
  });

  const metadata: Metadata = {};

  if (data.generalSettings?.title) {
    metadata.title = data.generalSettings.title;
  }
  if (data.generalSettings?.description) {
    metadata.description = data.generalSettings.description;
  }

  return metadata;
}

export default async function Home(props: HomeProps) {
  function getParam(key: string): string | undefined {
    const value = props.searchParams[key];
    return Array.isArray(value) ? value[0] : value;
  }

  const isPreview = hasPreviewProps(props);

  const client = isPreview ? await getAuthClient() : await getClient();
  if (!client) {
    // If no client, this means that the user is attempting to see preview
    // and that the user is currently not "logged in" on the app.
    // Show the login form so user can do so.
    return <LoginForm />;
  }

  const { data: frontData } = await client.query<GetReadingSettingsQuery>({
    query: readingSettingsQuery,
  });

  if (!frontData.readingSettings || !frontData.generalSettings) {
    throw new Error('Query failed.');
  }

  if (frontData.readingSettings.showOnFront !== 'page') {
    // Blog posts on home page

    // Use cursor based pagination. Prioritize "after" over "before".
    const after = getParam(ArchiveParams.AFTER) || undefined;
    const before = (!after && getParam(ArchiveParams.BEFORE)) || undefined;
    // "first" should be 12 for all queries that do not use "before".
    const first = (!before && 12) || undefined;
    const last = (before && 12) || undefined;

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

    const { posts } = data || {};
    if (!posts) {
      throw new Error('Query failed.');
    }

    return (
      <LandingPage title={frontData.generalSettings.title || ''}>
        <Article title="Posts">
          <ul>
            {posts.edges.map(({ node }) => (
              <li key={node.id}>
                <Link href={`/blog/${node.slug}`}>{node.title}</Link>
              </li>
            ))}
          </ul>
          <CursorNavigation pageInfo={posts.pageInfo} />
        </Article>
      </LandingPage>
    );
  }

  // Page configured as front page
  const { data, error } = await client.query<
    GetPageQuery,
    GetPageQueryVariables
  >({
    query: getPageQuery,
    variables: {
      id: String(frontData.readingSettings.pageOnFront),
      idType: PageIdType.DatabaseId,
      asPreview: isPreview,
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  const { page } = data;
  if (!page) {
    throw new Error('Query failed.');
  }

  return (
    <LandingPage title={frontData.generalSettings.title || ''}>
      <Article>
        <BlocksViewer blocks={page.editorBlocks || []} />
      </Article>
    </LandingPage>
  );
}
