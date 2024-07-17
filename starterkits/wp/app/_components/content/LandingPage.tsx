import CardWithBackground from '@/app/_components/content/CardWithBackground/CardWithBackground';
import { MAIN_ID } from '@/source/00-config/constants';
import Main from '@/source/02-layouts/Main/Main';
import { LinkButton } from '@/source/03-components/Button';
import PageTitle from '@/source/03-components/PageTitle/PageTitle';
import Image from 'next/image';
import { JSX, ReactNode } from 'react';

type LandingPageCard = {
  url?: string;
  title: string;
  image?:
    | {
        src: string;
        alt: string;
      }
    | null
    | undefined;
};

interface LandingPageProps {
  mainId?: string;
  title: string;
  hidePageTitle?: boolean;
  children?: ReactNode;
  cards?: LandingPageCard[];
  pageInfo?: {
    hasNextPage: boolean;
    startCursor?: string | null | undefined;
    endCursor?: string | null | undefined;
    hasPreviousPage: boolean;
  };
}

function LandingPage({
  mainId = MAIN_ID,
  title,
  hidePageTitle,
  children,
  cards,
  pageInfo,
}: LandingPageProps): JSX.Element {
  return (
    <Main id={mainId}>
      {!hidePageTitle && title && <PageTitle pageTitle={title} />}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}
      >
        {children}
        {cards &&
          cards.map(card => (
            <CardWithBackground
              key={card.title}
              url={card.url}
              title={card.title}
              backgroundImage={
                card.image ? (
                  <Image
                    className={'background'}
                    src={card.image.src}
                    alt={card.image.alt}
                    fill={true}
                    sizes="100vw"
                    style={{ objectFit: 'cover' }}
                  />
                ) : (
                  ''
                )
              }
            />
          ))}
      </div>
      {pageInfo?.hasPreviousPage && pageInfo.startCursor ? (
        <LinkButton
          label="Previous"
          href={`/film?before=` + pageInfo.startCursor}
        />
      ) : null}
      {pageInfo?.hasNextPage && pageInfo.endCursor ? (
        <LinkButton label="Next" href={`/film?after=` + pageInfo.endCursor} />
      ) : null}
    </Main>
  );
}

export type { LandingPageCard };
export default LandingPage;
