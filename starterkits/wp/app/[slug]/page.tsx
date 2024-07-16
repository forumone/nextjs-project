import BlocksViewer from '@/app/_components/content/BlocksViewer';
import Main from '@/source/02-layouts/Main/Main';
import Article from '@/source/03-components/Article/Article';
import { NextSearchParamsProp } from '@/types/wp/NextSearchParams';
import {
  ContentNodeIdTypeEnum,
  GetContentNodeQuery,
  GetContentNodeQueryVariables,
} from '@/types/wp/__generated__/graphql';
import { hasPreviewProps } from '@/utils/wp/hasPreviewProp';
import { ApolloClient } from '@apollo/client';
import { getAuthClient, getClient } from '@faustwp/experimental-app-router';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import LoginForm from './LoginForm';
import getContentNodeQuery from './getContentNodeQuery';

async function getBasicPageData(
  id: string,
  isPreview: boolean,
  client: ApolloClient<unknown>,
) {
  const { data } = await client.query<
    GetContentNodeQuery,
    GetContentNodeQueryVariables
  >({
    query: getContentNodeQuery,
    variables: {
      id,
      idType: isPreview
        ? ContentNodeIdTypeEnum.DatabaseId
        : ContentNodeIdTypeEnum.Uri,
      asPreview: isPreview,
    },
  });

  return data;
}

interface BasicPageProps extends NextSearchParamsProp {
  params: { slug: string };
}

export async function generateMetadata({
  params: { slug },
}: BasicPageProps): Promise<Metadata> {
  // We do not care about using preview data for metadata,
  // so use the regular client.
  const client = await getClient();
  const data = await getBasicPageData(slug, false, client);
  const metadata: Metadata = {};
  if (data.contentNode?.title) {
    metadata.title = data.contentNode.title;
  }
  return metadata;
}

export default async function Page(props: BasicPageProps) {
  const isPreview = hasPreviewProps(props);
  const id = isPreview ? props.searchParams.p : props.params.slug;

  const client = isPreview ? await getAuthClient() : await getClient();
  if (!client) {
    // If no client, this means that the user is attempting to see preview
    // and that the user is currently not "logged in" on the app.
    // Show the login form so user can do so.
    return <LoginForm />;
  }

  const idString = Array.isArray(id) ? id[0] : id;
  if (!idString) {
    // Page ID/slug not found in props.
    notFound();
  }

  const data = await getBasicPageData(idString, isPreview, client);

  if (!data.contentNode) {
    // Content not found in WordPress.
    notFound();
  }

  const editorBlocks =
    ('editorBlocks' in data.contentNode && data.contentNode.editorBlocks) ||
    undefined;

  return (
    <Main>
      <Article title={data.contentNode.title}>
        <BlocksViewer blocks={editorBlocks} />
      </Article>
    </Main>
  );
}
