import Poster from '@/app/_components/content/Poster/Poster';
import Constrain from '@/source/02-layouts/Constrain/Constrain';
import constrainStyle from '@/source/02-layouts/Constrain/constrain.module.css';
import Sidebar from '@/source/02-layouts/Sidebar/Sidebar';
import HeroBgImage from '@/source/03-components/HeroBgImage/HeroBgImage';
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
          <Constrain modifierClasses={constrainStyle['constrain--small']}>
            <blockquote>
              <p>{quote}</p>
              {citation && <cite>{citation}</cite>}
            </blockquote>
          </Constrain>
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
