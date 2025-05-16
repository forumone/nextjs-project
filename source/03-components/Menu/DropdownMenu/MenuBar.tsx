import MenuBarItem, {
  MenuBarItemRef,
} from '@/source/03-components/Menu/DropdownMenu/MenuBarItem';
import { MenuItem, MenuProps } from '@/source/03-components/Menu/Menu';
import clsx from 'clsx';
import { JSX, useCallback, useRef, useState } from 'react';
import styles from './dropdown-menu.module.css';

interface DropdownMenuItem extends MenuItem {
  id: string | number;
  isButton?: boolean;
  below?: DropdownMenuItem[];
}

interface MenuBarProps extends MenuProps {
  items: DropdownMenuItem[];
}

function MenuBar({
  items: menuItems,
  modifierClasses,
  itemClasses,
}: MenuBarProps): JSX.Element {
  const [expandedItem, setExpandedItem] = useState<
    DropdownMenuItem['id'] | null
  >(null);

  const itemsRef = useRef<Map<DropdownMenuItem['id'], MenuBarItemRef> | null>(
    null,
  );

  const getItems = useCallback(() => {
    if (!itemsRef.current) {
      itemsRef.current = new Map<DropdownMenuItem['id'], MenuBarItemRef>();
    }
    return itemsRef.current;
  }, []);

  const getFirstItem = useCallback(() => {
    const items = getItems();
    if (items.size) {
      const itemIds = Array.from(items.keys());
      return itemIds[0];
    }
  }, [getItems]);

  const getLastItem = useCallback(() => {
    const items = getItems();
    if (items.size) {
      const itemIds = Array.from(items.keys());
      return itemIds[itemIds.length - 1];
    }
  }, [getItems]);

  const setFocusToItem = (newItem: DropdownMenuItem['id']): void => {
    const items = getItems();
    const node = items.get(newItem);
    if (node) {
      node.focus();
    }
  };

  const setFocusToFirstItem = () => {
    const first = getFirstItem();
    if (first) {
      setFocusToItem(first);
    }
  };

  const setFocusToLastItem = () => {
    const last = getLastItem();
    if (last) {
      setFocusToItem(last);
    }
  };

  function setFocusToNextItem(currentItem: DropdownMenuItem['id']) {
    const items = getItems();
    const itemIds = Array.from(items.keys());
    const newItem =
      currentItem === itemIds[itemIds.length - 1]
        ? getFirstItem()
        : itemIds[itemIds.indexOf(currentItem) + 1];
    if (newItem) {
      setFocusToItem(newItem);
    }
  }

  function setFocusToPreviousItem(currentItem: DropdownMenuItem['id']) {
    const items = getItems();
    const itemIds = Array.from(items.keys());
    const newItem =
      currentItem === itemIds[0]
        ? getLastItem()
        : itemIds[itemIds.indexOf(currentItem) - 1];
    if (newItem) {
      setFocusToItem(newItem);
    }
  }

  return (
    <ul className={clsx(styles.menu, modifierClasses)}>
      {menuItems.map(({ ...item }) => (
        <li key={item.id} className={clsx(styles.item, itemClasses)}>
          <MenuBarItem
            {...item}
            isExpanded={expandedItem === item.id}
            setParentExpanded={setExpandedItem}
            setFocusToNextItem={setFocusToNextItem}
            setFocusToPreviousItem={setFocusToPreviousItem}
            setFocusToLastItem={setFocusToLastItem}
            setFocusToFirstItem={setFocusToFirstItem}
            ref={node => {
              if (node) {
                const items = getItems();
                items.set(item.id, node);
              }
              return () => {
                const items = getItems();
                items?.delete(item.id);
              };
            }}
          />
        </li>
      ))}
    </ul>
  );
}

export default MenuBar;
export type { DropdownMenuItem, MenuBarProps };
