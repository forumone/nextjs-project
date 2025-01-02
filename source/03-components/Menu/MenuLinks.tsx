'use client';

import clsx from 'clsx';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { MenuProps } from './Menu';
import styles from './menu.module.css';
import MenuListItem from './MenuListItem';

interface MenuLinksProps extends MenuProps {
  menuLevel: number;
  isVisible?: boolean;
}

interface MenuLinksRef {
  setFocusToFirstItem: () => void;
  setFocusToLastItem: () => void;
}

const MenuLinks = forwardRef(function MenuLinks(
  {
    items,
    menuLevel,
    modifierClasses,
    itemClasses,
    linkClasses,
    subnavClasses,
    showSubmenuOnHover,
    showSubmenuOnClick,
    showSubmenuOnKeyUp,
    isVisible = true,
  }: MenuLinksProps,
  ref,
) {
  const firstItem = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const lastItem = useRef<HTMLButtonElement | HTMLAnchorElement>(null);

  useImperativeHandle(
    ref,
    (): MenuLinksRef => ({
      setFocusToFirstItem() {
        firstItem.current?.focus();
      },
      setFocusToLastItem() {
        lastItem.current?.focus();
      },
    }),
    [],
  );

  return (
    <ul
      className={clsx(
        {
          [styles.menu]: menuLevel === 0,
          [styles.subnav]: menuLevel > 0,
          ['is-hidden']: !isVisible,
        },
        menuLevel === 0 ? modifierClasses : subnavClasses,
      )}
    >
      {items.map((item, i) => (
        <MenuListItem
          key={i}
          ref={
            i === 0 ? firstItem : i === items.length - 1 ? lastItem : undefined
          }
          item={item}
          menuLevel={menuLevel}
          itemClasses={itemClasses}
          linkClasses={linkClasses}
          subnavClasses={subnavClasses}
          showSubmenuOnClick={showSubmenuOnClick}
          showSubmenuOnHover={showSubmenuOnHover}
          showSubmenuOnKeyUp={showSubmenuOnKeyUp}
        />
      ))}
    </ul>
  );
});

export default MenuLinks;
export type { MenuLinksProps, MenuLinksRef };
