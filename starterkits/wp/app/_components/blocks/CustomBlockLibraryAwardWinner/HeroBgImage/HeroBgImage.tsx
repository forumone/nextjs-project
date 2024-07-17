import { LinkButton } from '@/source/03-components/Button';
import { LinkProps } from '@/source/03-components/Button/Button';
import clsx from 'clsx';
import { GessoComponent } from 'gesso';
import { JSX, ReactNode } from 'react';
import styles from './hero-bg-image.module.css';

interface HeroBgImageProps extends GessoComponent {
  hasOverlay?: boolean;
  heroImage?: ReactNode;
  title?: string;
  summary?: ReactNode;
  summaryPosition?: 'aboveTitle' | 'belowTitle';
  button?: LinkProps;
}

function HeroBgImage({
  summaryPosition = 'belowTitle',
  hasOverlay,
  heroImage,
  title,
  summary,
  button,
  modifierClasses,
}: HeroBgImageProps): JSX.Element {
  return (
    <div
      className={clsx(
        styles.hero,
        hasOverlay && styles['has-overlay'],
        modifierClasses,
      )}
    >
      {heroImage}
      <div className={styles.content}>
        {summary && summaryPosition === 'aboveTitle' && (
          <div className={styles.summary}>{summary}</div>
        )}
        {title && <h1 className={styles.title}>{title}</h1>}
        {summary && summaryPosition === 'belowTitle' && (
          <div className={styles.summary}>{summary}</div>
        )}
        {button && <LinkButton styleSize="large" {...button} />}
      </div>
    </div>
  );
}

export default HeroBgImage;
export type { HeroBgImageProps };
