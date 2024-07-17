import clsx from 'clsx';
import { GessoComponent } from 'gesso';
import { JSX, PropsWithChildren } from 'react';
import styles from './poster.module.css';

interface PosterProps extends PropsWithChildren, GessoComponent {}

function Poster({ children, modifierClasses }: PosterProps): JSX.Element {
  return (
    <figure className={clsx(styles.wrapper, modifierClasses)}>
      {children}
    </figure>
  );
}

export default Poster;
