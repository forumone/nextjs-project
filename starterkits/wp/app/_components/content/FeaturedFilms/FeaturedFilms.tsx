import clsx from 'clsx';
import { GessoComponent } from 'gesso';
import { ElementType, JSX, ReactNode } from 'react';
import styles from './featured-films.module.css';

interface FeaturedFilmsProps extends GessoComponent {
  title?: string;
  headingElement?: ElementType;
  filmSelectorBlocks: ReactNode;
}

function FeaturedFilms({
  title,
  headingElement: HeadingElement = 'h2',
  modifierClasses,
  filmSelectorBlocks,
}: FeaturedFilmsProps): JSX.Element {
  return (
    <div className={clsx(styles.block, modifierClasses)}>
      {title && (
        <HeadingElement className={styles.title}>{title}</HeadingElement>
      )}
      {filmSelectorBlocks}
    </div>
  );
}

const overlayColor = '#020927';
const overlayOpacity = '80';
const overlay = `linear-gradient(${overlayColor}${overlayOpacity}, ${overlayColor}${overlayOpacity})`;

interface FilmLinkProps {
  imgSrc: string;
  slug: string;
  title: string;
}

function FilmLink({ imgSrc, slug, title }: FilmLinkProps) {
  return (
    <a
      className={styles.film}
      href={`/film/${slug}`}
      style={{
        backgroundImage: imgSrc ? `${overlay}, url(${imgSrc})` : overlay,
      }}
    >
      <span>{title}</span>
    </a>
  );
}

export { FilmLink };
export default FeaturedFilms;
