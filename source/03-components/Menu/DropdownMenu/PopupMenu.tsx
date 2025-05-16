import DropdownMenuContext from '@/source/03-components/Menu/DropdownMenu/DropdownMenuContext';
import { DropdownMenuItem } from '@/source/03-components/Menu/DropdownMenu/MenuBar';
import PopupMenuItem, {
  PopupMenuItemProps,
  PopupMenuItemRef,
} from '@/source/03-components/Menu/DropdownMenu/PopupMenuItem';
import { MenuProps } from '@/source/03-components/Menu/Menu';
import clsx from 'clsx';
import {
  forwardRef,
  JSX,
  MouseEventHandler,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import styles from './dropdown-menu.module.css';

interface PopupMenuProps
  extends Pick<
      PopupMenuItemProps,
      | 'focusOnController'
      | 'focusOnControllerPrevious'
      | 'focusOnControllerNext'
      | 'menuLevel'
    >,
    MenuProps {
  items: DropdownMenuItem[];
  isHidden: boolean;
  htmlId?: string;
  parentHasHover?: boolean;
  openSelf: () => void;
  closeSelf: () => void;
}

interface PopupMenuRef {
  setFocusToFirstItem: () => void;
  setFocusToLastItem: () => void;
}

const PopupMenu = forwardRef<PopupMenuRef, PopupMenuProps>(function PopupMenu(
  {
    items: menuItems,
    itemClasses,
    isHidden,
    modifierClasses,
    htmlId,
    parentHasHover,
    menuLevel,
    closeSelf,
    ...props
  },
  popupMenuRef,
): JSX.Element {
  const [expandedItem, setExpandedItem] = useState<
    DropdownMenuItem['id'] | null
  >(null);
  const [hasHover, setHasHover] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  const itemsRef = useRef<Map<DropdownMenuItem['id'], PopupMenuItemRef> | null>(
    null,
  );
  const { showMenusOnHover } = useContext(DropdownMenuContext);

  const getItems = useCallback(() => {
    if (!itemsRef.current) {
      itemsRef.current = new Map<DropdownMenuItem['id'], PopupMenuItemRef>();
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

  const setFocusToNextItem = (currentItem: DropdownMenuItem['id']) => {
    const items = getItems();
    const itemIds = Array.from(items.keys());
    const newItem =
      currentItem === itemIds[itemIds.length - 1]
        ? getFirstItem()
        : itemIds[itemIds.indexOf(currentItem) + 1];
    if (newItem) {
      setFocusToItem(newItem);
    }
  };

  const setFocusToPreviousItem = (currentItem: DropdownMenuItem['id']) => {
    const items = getItems();
    const itemIds = Array.from(items.keys());
    const newItem =
      currentItem === itemIds[0]
        ? getLastItem()
        : itemIds[itemIds.indexOf(currentItem) - 1];
    if (newItem) {
      setFocusToItem(newItem);
    }
  };

  const handleMouseover: MouseEventHandler = () => {
    setHasHover(true);
  };

  const handleMouseout: MouseEventHandler = () => {
    setHasHover(false);
  };

  const close = (force?: boolean) => {
    const controllerHasHover = parentHasHover && menuLevel === 1;

    if (force || (!hasFocus && !hasHover && !controllerHasHover)) {
      closeSelf();
    }
  };

  useImperativeHandle(popupMenuRef, () => {
    return {
      setFocusToFirstItem,
      setFocusToLastItem,
    };
  });

  useEffect(() => {
    if (isHidden && expandedItem !== null) {
      setExpandedItem(null);
    }
  }, [expandedItem, isHidden]);

  useEffect(() => {
    if (showMenusOnHover) {
      setHasHover(!!parentHasHover);
    }
  }, [parentHasHover, showMenusOnHover]);

  return (
    <ul
      className={clsx(styles.subnav, modifierClasses, {
        'is-hidden': isHidden,
      })}
      id={htmlId}
      onMouseOver={showMenusOnHover ? handleMouseover : undefined}
      onMouseOut={showMenusOnHover ? handleMouseout : undefined}
    >
      {menuItems.map(item => (
        <PopupMenuItem
          {...item}
          {...props}
          isExpanded={expandedItem === item.id}
          setParentExpanded={setExpandedItem}
          setFocusToFirstItem={setFocusToFirstItem}
          setFocusToLastItem={setFocusToLastItem}
          setFocusToPreviousItem={setFocusToPreviousItem}
          setFocusToNextItem={setFocusToNextItem}
          setFocus={setHasFocus}
          setHover={setHasHover}
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
          menuLevel={menuLevel}
          closeParent={close}
          key={item.id}
        />
      ))}
    </ul>
  );
});

export default PopupMenu;
export type { PopupMenuProps, PopupMenuRef };
