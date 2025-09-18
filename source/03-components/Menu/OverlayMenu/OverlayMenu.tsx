'use client';

import useMenuModal from '@/source/03-components/Menu/useMenuModal';
import clsx from 'clsx';
import { GessoComponent } from 'gesso';
import { JSX } from 'react';
import HamburgerButton from '../../HamburgerButton/HamburgerButton';
import buttonStyles from '../../HamburgerButton/hamburger-button.module.css';
import Menu, { MenuItem } from '../Menu';
import styles from './overlay-menu.module.css';

interface OverlayMenuProps extends GessoComponent {
  items: MenuItem[];
}

function OverlayMenu({
  items,
  modifierClasses,
}: OverlayMenuProps): JSX.Element {
  const { navId, isOpen, navRef, openModal, closeModal } = useMenuModal();

  return (
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
        className={clsx(styles.overlay, isOpen && 'is-open', modifierClasses)}
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
        <Menu
          items={items}
          modifierClasses={styles.menu}
          linkClasses={styles.link}
        />
      </nav>
    </>
  );
}

export default OverlayMenu;
export type { OverlayMenuProps };
