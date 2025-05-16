import styles from '@/source/03-components/Menu/DropdownMenu/dropdown-menu.module.css';
import DropdownMenuContext from '@/source/03-components/Menu/DropdownMenu/DropdownMenuContext';
import { DropdownMenuItem } from '@/source/03-components/Menu/DropdownMenu/MenuBar';
import PopupMenu, {
  PopupMenuRef,
} from '@/source/03-components/Menu/DropdownMenu/PopupMenu';
import { MenuProps } from '@/source/03-components/Menu/Menu';
import clsx from 'clsx';
import Link from 'next/link';
import {
  FocusEventHandler,
  forwardRef,
  JSX,
  KeyboardEventHandler,
  MouseEventHandler,
  useContext,
  useId,
  useImperativeHandle,
  useRef,
} from 'react';
import { flushSync } from 'react-dom';

interface PopupMenuItemProps extends DropdownMenuItem {
  isExpanded: boolean;
  setParentExpanded: (expandedItem: DropdownMenuItem['id'] | null) => void;
  setFocusToFirstItem: () => void;
  setFocusToLastItem: () => void;
  setFocusToPreviousItem: (currentItem: DropdownMenuItem['id']) => void;
  setFocusToNextItem: (currentItem: DropdownMenuItem['id']) => void;
  focusOnControllerPrevious: () => void;
  focusOnControllerNext: () => void;
  focusOnController: () => void;
  setFocus: (hasFocus: boolean) => void;
  setHover: (hasHover: boolean) => void;
  menuLevel: number;
  closeParent: (force?: boolean) => void;
  itemClasses?: MenuProps['itemClasses'];
}

interface PopupMenuItemRef {
  focus: () => void;
}

const PopupMenuItem = forwardRef<PopupMenuItemRef, PopupMenuItemProps>(
  function PopupMenuItem(
    {
      below,
      title,
      url,
      isExpanded,
      setParentExpanded,
      id,
      setFocusToPreviousItem,
      setFocusToNextItem,
      setFocusToLastItem,
      setFocusToFirstItem,
      focusOnControllerNext,
      focusOnControllerPrevious,
      focusOnController,
      setFocus,
      setHover,
      menuLevel,
      closeParent,
      itemClasses,
    },
    popupMenuItemRef,
  ): JSX.Element {
    const ref = useRef<HTMLAnchorElement>(null);
    const submenuRef = useRef<PopupMenuRef>(null);

    const submenuId = useId();
    const { useArrowKeys, showMenusOnHover } = useContext(DropdownMenuContext);

    const focusOnSelf = () => {
      ref.current?.focus();
    };

    const focusOnPreviousSibling = () => {
      setFocusToPreviousItem(id);
    };

    const focusOnNextSibling = () => {
      setFocusToPreviousItem(id);
    };

    const openMenu = () => {
      setParentExpanded(id);
    };

    const closeMenu = (force?: boolean) => {
      closeParent(force);
    };

    useImperativeHandle(popupMenuItemRef, () => {
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
        focusOnController();
        closeMenu(true);
      }
    };

    const handleKeydown: KeyboardEventHandler<
      HTMLAnchorElement | HTMLButtonElement
    > = e => {
      const { currentTarget, key } = e;
      let flag = false;
      let clickEvent;
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
          if (submenuRef.current) {
            flushSync(() => {
              setParentExpanded(id);
            });
            submenuRef.current.setFocusToFirstItem();
          } else {
            // Create simulated mouse event to mimic the behavior of ATs
            // and let the event handler handleClick do the housekeeping.
            clickEvent = new MouseEvent('click', {
              view: window,
              bubbles: true,
              cancelable: true,
            });
            currentTarget.dispatchEvent(clickEvent);
          }
          flag = true;
          break;

        case 'ArrowUp':
          setFocusToPreviousItem(id);
          flag = true;
          break;

        case 'ArrowDown':
          setFocusToNextItem(id);
          flag = true;
          break;

        case 'ArrowLeft':
          focusOnControllerPrevious();
          closeMenu(true);
          flag = true;
          break;

        case 'ArrowRight':
          if (submenuRef.current) {
            flushSync(() => {
              setParentExpanded(id);
            });
            submenuRef.current.setFocusToFirstItem();
          } else {
            focusOnControllerNext();
            closeMenu(true);
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

        case 'Escape':
          focusOnController();
          closeMenu(true);
          flag = true;
          break;

        default:
          break;
      }

      if (flag) {
        e.stopPropagation();
        e.preventDefault();
      }
    };

    const handleToggleKeydown: KeyboardEventHandler<HTMLButtonElement> = e => {
      const { key } = e;
      if (key === 'ArrowLeft' || key === 'ArrowRight') {
        handleClick();
      } else if (key === 'Escape') {
        handleKeydown(e);
      }
    };

    const handleBlur: FocusEventHandler = e => {
      const { relatedTarget, target } = e;
      if (
        !relatedTarget ||
        ((!ref.current ||
          !ref.current.parentElement?.contains(relatedTarget)) &&
          relatedTarget?.parentElement?.nextElementSibling !== target)
      ) {
        setFocus(false);
        setTimeout(() => {
          closeMenu(false);
        }, 300);
      }
    };

    const handleMouseover: MouseEventHandler = () => {
      setHover(true);
      if (showMenusOnHover) {
        openMenu();
      }
    };

    const handleMouseout: MouseEventHandler = () => {
      setHover(false);
      if (showMenusOnHover) {
        setTimeout(() => {
          closeParent(false);
        }, 300);
      }
    };

    return (
      <li
        className={clsx(styles.item, itemClasses)}
        onMouseEnter={handleMouseover}
        onMouseLeave={handleMouseout}
      >
        <Link
          className={clsx(styles.link)}
          href={url}
          ref={ref}
          onKeyDown={handleKeydown}
          onBlur={handleBlur}
        >
          {title}
        </Link>
        {below ? (
          <>
            <button
              type="button"
              className={styles.toggle}
              aria-controls={submenuId}
              aria-expanded={isExpanded}
              onClick={handleClick}
              onKeyDown={handleToggleKeydown}
            >
              <span className="u-visually-hidden">
                {isExpanded ? 'Hide' : 'Show'} submenu for {title}
              </span>{' '}
            </button>
            <PopupMenu
              ref={submenuRef}
              htmlId={submenuId}
              items={below}
              isHidden={!isExpanded}
              focusOnController={focusOnSelf}
              focusOnControllerNext={focusOnNextSibling}
              focusOnControllerPrevious={focusOnPreviousSibling}
              menuLevel={menuLevel + 1}
              openSelf={openMenu}
              closeSelf={closeMenu}
            />
          </>
        ) : null}
      </li>
    );
  },
);

export default PopupMenuItem;
export type { PopupMenuItemProps, PopupMenuItemRef };
