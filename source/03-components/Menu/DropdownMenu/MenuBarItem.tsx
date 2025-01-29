import DropdownMenuContext from '@/source/03-components/Menu/DropdownMenu/DropdownMenuContext';
import { DropdownMenuItem } from '@/source/03-components/Menu/DropdownMenu/MenuBar';
import PopupMenu, {
  PopupMenuRef,
} from '@/source/03-components/Menu/DropdownMenu/PopupMenu';
import clsx from 'clsx';
import Link from 'next/link';
import {
  forwardRef,
  JSX,
  KeyboardEventHandler,
  MouseEventHandler,
  RefObject,
  useContext,
  useId,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { flushSync } from 'react-dom';
import styles from './dropdown-menu.module.css';

interface MenuBarItemProps extends DropdownMenuItem {
  isExpanded: boolean;
  setParentExpanded: (expandedItem: DropdownMenuItem['id'] | null) => void;
  setFocusToFirstItem: () => void;
  setFocusToLastItem: () => void;
  setFocusToPreviousItem: (currentItem: DropdownMenuItem['id']) => void;
  setFocusToNextItem: (currentItem: DropdownMenuItem['id']) => void;
}

interface MenuBarItemRef {
  focus: () => void;
}

const MenuBarItem = forwardRef<MenuBarItemRef, MenuBarItemProps>(
  function MenuBarItem(
    {
      id,
      below,
      isButton = !!below,
      isExpanded,
      title,
      url,
      setParentExpanded,
      setFocusToPreviousItem,
      setFocusToNextItem,
      setFocusToLastItem,
      setFocusToFirstItem,
    },
    menuBarItemRef,
  ): JSX.Element {
    const [hasHover, setHasHover] = useState(false);
    const submenuId = useId();
    const submenuRef = useRef<PopupMenuRef>(null);
    const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
    const { useArrowKeys, showMenusOnHover } = useContext(DropdownMenuContext);

    const focusOnPreviousSibling = () => {
      setFocusToPreviousItem(id);
    };

    const focusOnNextSibling = () => {
      setFocusToPreviousItem(id);
    };

    const focusOnSelf = () => {
      ref.current?.focus();
    };

    const openMenu = () => {
      setParentExpanded(id);
    };

    const closeMenu = () => {
      setParentExpanded(null);
    };

    useImperativeHandle(menuBarItemRef, () => {
      return {
        focus() {
          focusOnSelf();
        },
      };
    });

    const handleClick = () => {
      const isNowExpanded = !isExpanded;
      if (isNowExpanded) {
        openMenu();
      } else {
        closeMenu();
      }
    };

    const handleKeydown: KeyboardEventHandler = e => {
      const { key } = e;
      let flag = false;
      if (
        !useArrowKeys &&
        key !== ' ' &&
        key !== 'Spacebar' &&
        key !== 'Escape'
      )
        return;
      switch (key) {
        case ' ':
        case 'Spacebar':
        case 'ArrowDown':
          if (submenuRef.current) {
            flushSync(() => {
              openMenu();
            });
            submenuRef.current.setFocusToFirstItem();
          }
          flag = true;
          break;
        case 'ArrowLeft':
          focusOnPreviousSibling();
          flag = true;
          break;
        case 'ArrowRight':
          setFocusToNextItem(id);
          flag = true;
          break;
        case 'ArrowUp':
          if (submenuRef.current) {
            flushSync(() => {
              openMenu();
            });
            submenuRef.current.setFocusToLastItem();
          }
          flag = true;
          break;
        case 'Home':
        case 'PageUp':
          setFocusToFirstItem();
          flag = true;
          break;
        case 'End':
        case 'PageDown':
          setFocusToLastItem();
          flag = true;
          break;
        case 'Tab':
          closeMenu();
          break;
        case 'Escape':
          closeMenu();
          break;
        default:
          break;
      }
      if (flag) {
        e.stopPropagation();
        e.preventDefault();
      }
    };

    const handleMouseover: MouseEventHandler = () => {
      setHasHover(true);
      if (showMenusOnHover) {
        openMenu();
      }
    };

    return (
      <>
        {isButton ? (
          <button
            className={clsx(styles.link, {
              'has-subnav': below,
            })}
            type="button"
            aria-controls={submenuId}
            aria-expanded={isExpanded}
            ref={ref as RefObject<HTMLButtonElement>}
            onClick={handleClick}
            onKeyDown={handleKeydown}
            onMouseOver={handleMouseover}
          >
            {title}
          </button>
        ) : (
          <Link
            className={clsx(styles.link)}
            href={url}
            ref={ref as RefObject<HTMLAnchorElement>}
            onKeyDown={handleKeydown}
            onMouseOver={handleMouseover}
          >
            {title}
          </Link>
        )}
        {below ? (
          <PopupMenu
            ref={submenuRef}
            htmlId={submenuId}
            items={below}
            isHidden={!isExpanded}
            focusOnControllerPrevious={focusOnPreviousSibling}
            focusOnControllerNext={focusOnNextSibling}
            focusOnController={focusOnSelf}
            menuLevel={1}
            parentHasHover={hasHover}
            openSelf={openMenu}
            closeSelf={closeMenu}
          />
        ) : null}
      </>
    );
  },
);

export default MenuBarItem;
export type { MenuBarItemProps, MenuBarItemRef };
