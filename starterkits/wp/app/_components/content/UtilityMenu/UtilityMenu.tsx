'use client';

import Menu, { BaseMenuProps } from '@/source/03-components/Menu/Menu';
import useMobileHeader from '@/util/wp/useMobileHeader';
import { JSX } from 'react';
import styles from './utility-menu.module.css';

interface UtilityMenuProps extends BaseMenuProps {}

function UtilityMenu({ items }: UtilityMenuProps): JSX.Element | null {
  const mobile = useMobileHeader();
  return mobile ? null : (
    <Menu
      items={items}
      modifierClasses={styles.menu}
      linkClasses={styles.link}
    />
  );
}

export default UtilityMenu;
