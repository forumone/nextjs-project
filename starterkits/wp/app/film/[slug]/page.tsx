import BlocksViewer from '@/app/_components/content/BlocksViewer';
import Film from '@/app/_components/content/Film';
import { NextSearchParamsProp } from '@/types/wp/NextSearchParams';
import {
  FilmDetailPageQueryQuery,
  FilmDetailPageQueryQueryVariables,
  FilmIdType,
} from '@/types/wp/__generated__/graphql';
import normalizeImageUrl from '@/utils/wp/normalizeImageUrl';
import { getClient } from '@faustwp/experimental-app-router';
import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import filmDetailPageQuery from './filmDetailPageQuery';

async function getFilmData(id: string) {
  const client = await getClient();

  const { data } = await client.query<
    FilmDetailPageQueryQuery,
    FilmDetailPageQueryQueryVariables
  >({
    query: filmDetailPageQuery,
    variables: {
      id: id,
      idType: FilmIdType.Slug,
    },
  });

  return data;
}

interface FilmPageProps extends NextSearchParamsProp {
  params: { slug: string };
}

export async function generateMetadata({
  params: { slug },
}: FilmPageProps): Promise<Metadata> {
  const data = await getFilmData(slug);
  const metadata: Metadata = {};
  if (data.film?.title) {
    metadata.title = data.film.title;
  }
  return metadata;
}

export default async function FilmDetailPage(props: FilmPageProps) {
  const id = props.params.slug;
  const data = await getFilmData(id);

  if (!data.film) {
    // Film not found
    notFound();
  }

  const { editorBlocks, featuredImage } = data.film;
  const title = data.film.title || '';

  const image =
    featuredImage?.node.sourceUrl && featuredImage.node.mediaDetails
      ? {
          alt: featuredImage.node.altText || featuredImage.node.title || title,
          height: featuredImage.node.mediaDetails.height || undefined,
          src: normalizeImageUrl(featuredImage.node.sourceUrl),
          width: featuredImage.node.mediaDetails.width || undefined,
        }
      : null;
  const featuredQuote =
    (data.film.quote && {
      content: data.film.quote,
      attribution: data.film.quoteAttribution,
    }) ||
    null;
  const releaseYear = data.film.releaseYear;
  const director = data.film.director;

  return (
    <Film
      title={title}
      quote={featuredQuote?.content}
      citation={featuredQuote?.attribution}
      director={director}
      releaseYear={releaseYear}
      blocks={<BlocksViewer blocks={editorBlocks || undefined} />}
      image={
        image ? (
          <Image
            src={image.src}
            alt={image.alt}
            width={285}
            height={
              image.height
                ? (285 / (image.width || 1)) * image.height
                : undefined
            }
          />
        ) : undefined
      }
      heroImage={
        image ? (
          <Image src={image.src} alt={image.alt} fill={true} sizes="100vw" />
        ) : undefined
      }
    />
  );
}
