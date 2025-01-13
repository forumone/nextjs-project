'use client';

import clsx from 'clsx';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { MenuItemProps, MenuProps } from './Menu';
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
    useArrowKeys,
  }: MenuLinksProps,
  ref,
) {
  const itemsRef = useRef<Map<
    MenuItemProps['id'],
    HTMLButtonElement | HTMLAnchorElement
  > | null>(null);

  const getItems = useCallback(() => {
    if (!itemsRef.current) {
      itemsRef.current = new Map<
        MenuItemProps['id'],
        HTMLButtonElement | HTMLAnchorElement
      >();
    }
    return itemsRef.current;
  }, []);

  useImperativeHandle(
    ref,
    (): MenuLinksRef => ({
      setFocusToFirstItem() {
        if (isVisible) {
          const items = getItems();
          if (items.size) {
            const node = items.values().next().value;
            if (node) {
              node.focus();
            }
          }
        }
      },
      setFocusToLastItem() {
        if (isVisible) {
          const items = getItems();
          if (items.size) {
            const itemIds = Array.from(items.keys());
            const node = items.get(itemIds[itemIds.length - 1]);
            if (node) {
              node.focus();
            }
          }
        }
      },
    }),
    [getItems, isVisible],
  );

  function setFocusToNextItem(currentItem: MenuItemProps['id']) {
    let newItem;
    const items = getItems();
    const itemIds = Array.from(items.keys());
    if (currentItem === itemIds[itemIds.length - 1]) {
      newItem = items.get(itemIds[0]);
    } else {
      const currentItemIndex = itemIds.indexOf(currentItem);
      newItem = items.get(itemIds[currentItemIndex + 1]);
    }
    if (newItem) {
      newItem.focus();
    }
  }

  function setFocusToPreviousItem(currentItem: MenuItemProps['id']) {
    let newItem;
    const items = getItems();
    const itemIds = Array.from(items.keys());
    if (currentItem === itemIds[0]) {
      newItem = items.get(itemIds[itemIds.length - 1]);
    } else {
      const currentItemIndex = itemIds.indexOf(currentItem);
      newItem = items.get(itemIds[currentItemIndex - 1]);
    }
    if (newItem) {
      newItem.focus();
    }
  }

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
      {items.map(item => (
        <MenuListItem
          key={item.id}
          ref={node => {
            if (node) {
              const menuItems = getItems();
              menuItems.set(item.id, node);
            }
            return () => {
              const menuItems = getItems();
              menuItems?.delete(item.id);
            };
          }}
          item={item}
          menuLevel={menuLevel}
          itemClasses={itemClasses}
          linkClasses={linkClasses}
          subnavClasses={subnavClasses}
          showSubmenuOnClick={showSubmenuOnClick}
          showSubmenuOnHover={showSubmenuOnHover}
          showSubmenuOnKeyUp={showSubmenuOnKeyUp}
          useArrowKeys={useArrowKeys}
          setFocusToNextItem={useArrowKeys ? setFocusToNextItem : undefined}
          setFocusToPreviousItem={
            useArrowKeys ? setFocusToPreviousItem : undefined
          }
        />
      ))}
    </ul>
  );
});

export default MenuLinks;
export type { MenuLinksProps, MenuLinksRef };
