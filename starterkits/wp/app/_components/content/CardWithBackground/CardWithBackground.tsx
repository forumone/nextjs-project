import clsx from 'clsx';
import { GessoComponent } from 'gesso';
import Link from 'next/link';
import { ReactNode } from 'react';
import styles from './card-with-background.module.css';

interface CardWithBackgroundProps extends GessoComponent {
  url?: string;
  title: string;
  backgroundImage?: ReactNode;
}

function CardWithBackground({
  url,
  title,
  backgroundImage,
  modifierClasses,
}: CardWithBackgroundProps): JSX.Element {
  return (
    <div className={clsx(styles.card, modifierClasses)}>
      {backgroundImage}
      <div className={styles.opaque}></div>
      <div className={styles.body}>
        <h3 className={styles.title}>
          {url ? <Link href={url}>{title}</Link> : title}
        </h3>
      </div>
    </div>
  );
}

export type { CardWithBackgroundProps };
export default CardWithBackground;
