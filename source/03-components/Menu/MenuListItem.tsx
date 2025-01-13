'use client';

import { MenuLinksRef } from '@/source/03-components/Menu/MenuLinks';
import clsx from 'clsx';
import { forwardRef, JSX, KeyboardEventHandler, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { MenuItemProps, MenuLink, MenuLinks, MenuProps } from './Menu';
import styles from './menu.module.css';

interface MenuListItemProps
  extends Pick<MenuProps, 'itemClasses' | 'linkClasses' | 'subnavClasses'> {
  item: MenuItemProps;
  menuLevel: number;
  showSubmenuOnHover?: boolean;
  showSubmenuOnClick?: boolean;
  showSubmenuOnKeyUp?: boolean;
  useArrowKeys?: boolean;
  setFocusToNextItem?: (currentItem: MenuItemProps['id']) => void;
  setFocusToPreviousItem?: (currentItem: MenuItemProps['id']) => void;
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
    useArrowKeys,
    setFocusToNextItem,
    setFocusToPreviousItem,
  },
  ref,
): JSX.Element {
  const [hideSubnav, setHideSubnav] = useState(
    !!showSubmenuOnHover || !!showSubmenuOnKeyUp || !!showSubmenuOnClick,
  );
  const menuLinkRef = useRef<MenuLinksRef>(null);

  const handleKeyDown: KeyboardEventHandler = e => {
    const { key } = e;
    let flag = false;
    if (
      !useArrowKeys &&
      key !== ' ' &&
      key !== 'Spacebar' &&
      key !== 'Enter' &&
      key !== 'Escape'
    )
      return;
    switch (key) {
      case ' ':
      case 'Spacebar':
      case 'ArrowDown':
        if (menuLinkRef.current) {
          flushSync(() => {
            setHideSubnav(false);
          });
          menuLinkRef.current.setFocusToFirstItem();
          flag = true;
        }
        break;
      case 'Escape':
      case 'Tab':
        if (item.below) {
          setHideSubnav(true);
        }
        break;
      case 'ArrowRight':
        if (setFocusToNextItem) {
          setFocusToNextItem(item.id);
        }
        flag = true;
        break;
      case 'ArrowLeft':
        if (setFocusToPreviousItem) {
          setFocusToPreviousItem(item.id);
        }
        flag = true;
        break;
      case 'ArrowUp':
        if (menuLinkRef.current) {
          flushSync(() => {
            setHideSubnav(false);
          });
          menuLinkRef.current.setFocusToLastItem();
          flag = true;
        }
        break;
      default:
        break;
    }
    if (flag) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  if (!item.below) {
    const { id, ...itemProps } = item;
    return (
      <li
        className={clsx(
          styles.item,
          item.inActiveTrail && 'in-active-trail',
          itemClasses,
        )}
      >
        <MenuLink
          {...itemProps}
          ref={ref}
          onKeyDown={useArrowKeys ? handleKeyDown : undefined}
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
        ref={ref}
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
        onKeyDown={
          showSubmenuOnKeyUp || useArrowKeys ? handleKeyDown : undefined
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
        ref={menuLinkRef}
        useArrowKeys={useArrowKeys}
      />
    </li>
  );
});

export default MenuListItem;
