import Menu, { MenuProps } from '@/source/03-components/Menu/Menu';
import clsx from 'clsx';
import { JSX } from 'react';
import styles from './dropdown-menu.module.css';

interface DropdownMenuProps extends MenuProps {
  showOnHover?: boolean;
  useArrowKeys?: boolean;
}

function DropdownMenu({
  modifierClasses,
  showOnHover = true,
  useArrowKeys = true,
  ...props
}: DropdownMenuProps): JSX.Element {
  return (
    <Menu
      {...props}
      modifierClasses={clsx(modifierClasses, styles.menu)}
      itemClasses={styles.item}
      linkClasses={styles.link}
      subnavClasses={styles.subnav}
      showSubmenuOnKeyUp={true}
      showSubmenuOnHover={showOnHover}
      showSubmenuOnClick={!showOnHover}
    />
  );
}

export default DropdownMenu;
export type { DropdownMenuProps };
