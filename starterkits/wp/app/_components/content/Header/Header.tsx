import Constrain from '@/source/02-layouts/Constrain/Constrain';
import clsx from 'clsx';
import { ConstrainComponent } from 'gesso';
import { JSX, ReactNode } from 'react';
import styles from './header.module.css';

interface HeaderProps extends ConstrainComponent {
  branding?: ReactNode;
  primary?: ReactNode;
  utility?: ReactNode;
}

function Header({
  branding,
  primary,
  utility,
  hasConstrain = true,
  modifierClasses,
  constrainClasses,
}: HeaderProps): JSX.Element {
  return (
    <header role="banner" className={clsx(styles.wrapper, modifierClasses)}>
      <Constrain isHidden={!hasConstrain} modifierClasses={constrainClasses}>
        <div className={styles.inner}>
          <div className={styles.primary}>
            {branding}
            <div className={styles['primary-menu']}>{primary}</div>
          </div>
          {utility && <div className={styles.utility}>{utility}</div>}
        </div>
      </Constrain>
    </header>
  );
}

export default Header;
