'use client';

import { GessoComponent } from 'gesso';
import { JSX, ReactNode, useEffect } from 'react';
import setScrollbarProperty from '../../06-utility/setScrollbarProperty';
import styles from './site-container.module.css';

interface SiteContainerProps extends GessoComponent {
  children: ReactNode;
}

function SiteContainer({ children }: SiteContainerProps): JSX.Element {
  useEffect(() => {
    setScrollbarProperty();
  }, []);

  return <div className={styles['site-container']}>{children}</div>;
}

export default SiteContainer;
