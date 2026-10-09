'use client';

import { GessoComponent } from 'gesso';
import { useEffect, useState, type JSX } from 'react';
import Menu, { MenuItem } from '~components/Menu/Menu';
import OverlayMenu from '~components/Menu/OverlayMenu/OverlayMenu';
import { MOBILE_MENU_BREAKPOINT } from '~components/Menu/ResponsiveMenu/constants';
import styles from './responsive-menu.module.css';

interface ResponsiveMenuProps extends GessoComponent {
  items: MenuItem[];
}

function ResponsiveMenu({
  items,
  modifierClasses,
}: ResponsiveMenuProps): JSX.Element {
  const [mobile, setMobile] = useState(true);
  const modifierClassesArr = modifierClasses
    ? Array.isArray(modifierClasses)
      ? [...modifierClasses]
      : [modifierClasses]
    : [];

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      `(min-width: ${MOBILE_MENU_BREAKPOINT})`,
    );
    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) {
        setMobile(false);
      } else {
        setMobile(true);
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    handleChange(mediaQuery);
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return (
    <>
      {mobile ? (
        <OverlayMenu items={items} />
      ) : (
        <Menu
          items={items}
          modifierClasses={[styles.menu, ...modifierClassesArr]}
          itemClasses={styles.item}
          linkClasses={styles.link}
        />
      )}
    </>
  );
}

export default ResponsiveMenu;
export type { ResponsiveMenuProps };
