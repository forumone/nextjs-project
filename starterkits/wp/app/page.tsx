import BlocksViewer from '@/app/_components/content/BlocksViewer';
import Main from '@/source/02-layouts/Main/Main';
import Article from '@/source/03-components/Article/Article';
import { NextSearchParamsProp } from '@/types/NextSearchParams';
import {
  ContentNodeIdTypeEnum,
  GetContentNodeQuery,
  GetContentNodeQueryVariables,
  GetIndexPostsQuery,
  GetReadingSettingsQuery,
  HomeMetadataQuery,
} from '@/types/__generated__/graphql';
import { hasPreviewProps } from '@/util/wp/hasPreviewProp';
import { getAuthClient, getClient } from '@faustwp/experimental-app-router';
import { Metadata } from 'next';
import Link from 'next/link';
import LoginForm from './[slug]/LoginForm';
import getContentNodeQuery from './[slug]/getContentNodeQuery';
import getIndexPostsQuery from './getIndexPostsQuery';
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

  if (!frontData.readingSettings) {
    throw new Error('Query failed.');
  }

  if (frontData.readingSettings.showOnFront !== 'page') {
    // Blog posts on home page
    const { data } = await client.query<GetIndexPostsQuery>({
      query: getIndexPostsQuery,
    });

    if (!data.posts) {
      throw new Error('Query failed.');
    }

    return (
      <Main>
        <Article title="Posts">
          <ul>
            {data.posts.nodes.map(post => (
              <li key={post.id}>
                <Link href={`/${post.slug}`}>{post.title}</Link>
              </li>
            ))}
          </ul>
        </Article>
      </Main>
    );
  }

  // Page configured as front page
  const { data } = await client.query<
    GetContentNodeQuery,
    GetContentNodeQueryVariables
  >({
    query: getContentNodeQuery,
    variables: {
      id: String(frontData.readingSettings.pageOnFront),
      idType: ContentNodeIdTypeEnum.DatabaseId,
      asPreview: isPreview,
    },
  });

  if (!data.contentNode) {
    throw new Error('Query failed.');
  }

  const editorBlocks =
    ('editorBlocks' in data.contentNode && data.contentNode.editorBlocks) ||
    undefined;

  return <BlocksViewer blocks={editorBlocks} />;
}
