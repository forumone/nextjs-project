'use client';

import clsx from 'clsx';
import { forwardRef, JSX, useState } from 'react';
import { MenuItemProps, MenuLink, MenuLinks, MenuProps } from './Menu';
import styles from './menu.module.css';

interface MenuListItemProps
  extends Pick<MenuProps, 'itemClasses' | 'linkClasses' | 'subnavClasses'> {
  item: MenuItemProps;
  menuLevel: number;
  showSubmenuOnHover?: boolean;
  showSubmenuOnClick?: boolean;
  showSubmenuOnKeyUp?: boolean;
}

const MenuListItem = forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  MenuListItemProps
>(function MenuListItem(
  {
    item,
    menuLevel,
    itemClasses,
    linkClasses,
    subnavClasses,
    showSubmenuOnKeyUp,
    showSubmenuOnClick,
    showSubmenuOnHover,
  },
  ref,
): JSX.Element {
  const [hideSubnav, setHideSubnav] = useState(
    !!showSubmenuOnHover || !!showSubmenuOnKeyUp || !!showSubmenuOnClick,
  );

  if (!item.below) {
    return (
      <li
        className={clsx(
          styles.item,
          item.inActiveTrail && 'in-active-trail',
          itemClasses,
        )}
      >
        <MenuLink
          {...item}
          ref={ref}
          className={clsx(
            styles.link,
            linkClasses,
            item.inActiveTrail && 'in-active-trail',
          )}
        />
      </li>
    );
  }

  return (
    <li
      className={clsx(
        styles.item,
        'has-subnav',
        item.inActiveTrail && 'in-active-trail',
        itemClasses,
      )}
    >
      <MenuLink
        title={item.title}
        url={item.url}
        isButton={item.isButton}
        aria-expanded={hideSubnav ? 'false' : 'true'}
        className={clsx(styles.link, linkClasses, {
          'has-subnav': menuLevel === 0 || !showSubmenuOnClick,
          'in-active-trail': item.inActiveTrail,
        })}
        onClick={
          showSubmenuOnClick ? () => setHideSubnav(prev => !prev) : undefined
        }
        onKeyUp={
          showSubmenuOnKeyUp
            ? e => {
                const { key } = e;
                if (key === ' ' || key === 'Spacebar' || key === 'Enter') {
                  setHideSubnav(false);
                  e.stopPropagation();
                  e.preventDefault();
                } else if (key === 'Escape' || key === 'Tab') {
                  setHideSubnav(true);
                }
              }
            : undefined
        }
      />
      <MenuLinks
        menuLevel={menuLevel + 1}
        items={item.below}
        itemClasses={itemClasses}
        linkClasses={linkClasses}
        subnavClasses={subnavClasses}
        isVisible={!hideSubnav}
        showSubmenuOnClick={showSubmenuOnClick}
        showSubmenuOnHover={showSubmenuOnHover}
        showSubmenuOnKeyUp={showSubmenuOnKeyUp}
      />
    </li>
  );
});

export default MenuListItem;
