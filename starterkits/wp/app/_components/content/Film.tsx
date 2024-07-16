import Constrain, {
  ConstrainSmall,
} from '@/source/02-layouts/Constrain/Constrain';
import Sidebar from '@/source/02-layouts/Sidebar/Sidebar';
import HeroBgImage from '@/source/03-components/HeroBgImage/HeroBgImage';
import Poster from '@/source/03-components/Poster/Poster';
import { JSX, ReactElement, ReactNode } from 'react';

interface FilmProps {
  title: string;
  quote?: string | null;
  citation?: string | null;
  director?: string | null;
  releaseYear?: string | null;
  blocks?: ReactNode;
  image?: ReactElement;
  heroImage?: ReactElement;
}

function Film({
  title,
  quote,
  citation,
  director,
  releaseYear,
  blocks,
  image,
  heroImage = image,
}: FilmProps): JSX.Element {
  return (
    <article>
      <HeroBgImage title={title} hasOverlay={true} heroImage={heroImage} />
      <Constrain modifierClasses="u-spacing-block-5">
        {quote && (
          <ConstrainSmall>
            <blockquote>
              <p>{quote}</p>
              {citation && <cite>{citation}</cite>}
            </blockquote>
          </ConstrainSmall>
        )}
        <Sidebar
          sidebarFirst={image ? <Poster>{image}</Poster> : <div />}
          main={
            <>
              <h2>{title}</h2>
              <dl>
                {director && (
                  <>
                    <dt>Director:</dt>
                    <dd>{director}</dd>
                  </>
                )}
                {releaseYear && (
                  <>
                    <dt>Release Year:</dt>
                    <dd>{releaseYear}</dd>
                  </>
                )}
                <dt>Summary:</dt>
                <dd>{blocks}</dd>
              </dl>
            </>
          }
        />
      </Constrain>
    </article>
  );
}

export default Film;
