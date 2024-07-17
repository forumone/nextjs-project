'use client';

import Icons from '@/source/01-global/icon/icons';
import Menu, { MenuItem } from '@/source/03-components/Menu/Menu';
import { isNotNullNorUndefined } from '@/util/isNullOrUndefined';
import { GessoComponent } from 'gesso';
import { ReactNode } from 'react';
import styles from './social-menu.module.css';

interface SocialMenuItem {
  title: string;
  url: string;
  icon?: string | string[];
}

interface SocialMenuProps extends GessoComponent {
  items: SocialMenuItem[];
}

function isIconKey(possKey: string): possKey is keyof typeof Icons {
  return Object.keys(Icons).includes(possKey);
}

function SocialMenu({ items }: SocialMenuProps): JSX.Element | null {
  const menuItems = items
    .map<MenuItem | null>(menuItem => {
      if (!menuItem) {
        return null;
      }
      let title: ReactNode = menuItem.title;
      // Use icon as title if available.
      const icon = Array.isArray(menuItem.icon)
        ? menuItem.icon[0]
        : menuItem.icon;
      if (icon && isIconKey(icon)) {
        const MenuIcon = Icons[icon];
        if (MenuIcon) {
          title = <MenuIcon title={menuItem.title} />;
        }
      }
      return {
        title,
        url: menuItem.url,
      };
    })
    .filter(isNotNullNorUndefined);
  // If resulting items array is empty, do not display.
  if (menuItems.length === 0) {
    return null;
  }
  return (
    <Menu
      items={menuItems}
      modifierClasses={styles.menu}
      itemClasses={styles.item}
    />
  );
}

export type { SocialMenuItem };
export default SocialMenu;
