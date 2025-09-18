'use client';

import HamburgerButton from '@/source/03-components/HamburgerButton/HamburgerButton';
import buttonStyles from '@/source/03-components/HamburgerButton/hamburger-button.module.css';
import DropdownMenu from '@/source/03-components/Menu/DropdownMenu/DropdownMenu';
import { DropdownMenuItem } from '@/source/03-components/Menu/DropdownMenu/MenuBar';
import useMenuModal from '@/source/03-components/Menu/useMenuModal';
import clsx from 'clsx';
import { GessoComponent } from 'gesso';
import { useEffect, useState, type JSX } from 'react';
import styles from './responsive-menu.module.css';

interface ResponsiveMenuProps extends GessoComponent {
  items: DropdownMenuItem[];
}

function ResponsiveMenu({
  items,
  modifierClasses,
}: ResponsiveMenuProps): JSX.Element {
  const [mobile, setMobile] = useState(true);
  const { navId, isOpen, navRef, openModal, closeModal } = useMenuModal();
  const modifierClassesArr = modifierClasses
    ? Array.isArray(modifierClasses)
      ? [...modifierClasses]
      : [modifierClasses]
    : [];

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
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
        <>
          <HamburgerButton
            aria-controls={navId}
            aria-expanded={isOpen}
            onClick={openModal}
            hidden={isOpen}
            text="Menu"
            modifierClasses={buttonStyles['button--menu']}
          />
          <nav
            className={clsx(
              styles.overlay,
              isOpen && 'is-open',
              modifierClasses,
            )}
            id={navId}
            ref={navRef}
          >
            <HamburgerButton
              onClick={closeModal}
              aria-controls={navId}
              aria-expanded={isOpen}
              hidden={!isOpen}
              text="Close"
              modifierClasses={buttonStyles['button--close']}
              autoFocus
            />
            <DropdownMenu
              items={items}
              modifierClasses={[styles.menu, ...modifierClassesArr]}
              itemClasses={styles.item}
              linkClasses={styles.link}
            />
          </nav>
        </>
      ) : (
        <DropdownMenu items={items} />
      )}
    </>
  );
}

export default ResponsiveMenu;
export type { ResponsiveMenuProps };
