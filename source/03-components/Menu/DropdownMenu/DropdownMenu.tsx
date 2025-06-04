import { MenuItem, MenuProps } from '@/source/03-components/Menu/Menu';
import OverlayMenu from '@/source/03-components/Menu/OverlayMenu/OverlayMenu';
import clsx from 'clsx';
import { GessoComponent } from 'gesso';
import {
  FocusEventHandler,
  JSX,
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent as ReactMouseEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { flushSync } from 'react-dom';
import styles from './dropdown-menu.module.css';
import DropdownContext from './DropdownContext';
import DropdownItem from './DropdownItem';

interface DropdownProps extends GessoComponent, MenuProps {
  /**
   * Whether to use arrow keys for navigation
   */
  useArrowKeys?: boolean;
}

function hasDirectDescendant(item: MenuItem, childId: MenuItem['id']): boolean {
  return item.below?.some(child => child.id === childId) || false;
}

function hasDescendantInChildren(
  item: MenuItem,
  childId: MenuItem['id'],
): boolean {
  return (
    item.below?.some(
      // Mutual recursion is incompatible with ESLint's no use before define rule
      // See bottom of https://eslint.org/docs/latest/rules/no-use-before-define
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      child => child.below && isDescendantOf(childId, child.id, [child]),
    ) || false
  );
}

/**
 * Determines if a given child item is a descendant of a specified parent item
 * within a hierarchy of dropdown items.
 */
function isDescendantOf(
  childId: MenuItem['id'],
  parentId: MenuItem['id'],
  itemsToSearch: MenuItem[],
): boolean {
  for (const item of itemsToSearch) {
    // Case 1: Current item is the parent we're looking for
    if (item.id === parentId && item.below) {
      if (hasDirectDescendant(item, childId)) {
        return true;
      }

      if (hasDescendantInChildren(item, childId)) {
        return true;
      }
    }

    // Case 2: The parent might be in the item's children
    if (item?.below?.length && isDescendantOf(childId, parentId, item.below)) {
      return true;
    }
  }
  return false;
}

/**
 * Finds the parent ID of a given child ID within a hierarchical structure of dropdown items.
 */
function findParentOf(
  childId: string | number,
  itemsToSearch: MenuItem[],
): string | number | null {
  for (const item of itemsToSearch) {
    if (item.below) {
      // Check if the child is a direct descendant
      if (hasDirectDescendant(item, childId)) {
        return item.id;
      }

      // Check in the item's children
      if (item.below.length > 0) {
        for (const child of item.below) {
          const result = findParentOf(childId, [child]);
          if (result !== null) {
            return result;
          }
        }
      }
    }
  }
  return null;
}

/**
 * Searches for an item by its unique identifier within a hierarchical list of dropdown items.
 */
function findItemById(
  itemsToSearch: MenuItem[],
  id: string | number,
): MenuItem | null {
  for (const item of itemsToSearch) {
    if (item.id === id) {
      return item;
    }

    if (item.below?.length) {
      const found = findItemById(item.below, id);
      if (found) return found;
    }
  }
  return null;
}

/**
 * DropdownMenu menu component
 */
function DropdownMenu({
  items,
  modifierClasses,
  useArrowKeys = true,
}: DropdownProps): JSX.Element {
  const [expandedItems, setExpandedItems] = useState<
    Record<string | number, boolean>
  >({});
  const [isDesktop, setIsDesktop] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLUListElement>(null);

  // Check if any menu is open
  const isAnyMenuOpen = Object.values(expandedItems).some(Boolean);

  // Close an item and all its children
  const closeItemAndChildren = (
    id: string | number,
    newExpandedItems: Record<string | number, boolean>,
  ) => {
    newExpandedItems[id] = false;
    const itemToClose = findItemById(items, id);

    if (itemToClose?.below?.length) {
      itemToClose.below.forEach(child => {
        closeItemAndChildren(child.id, newExpandedItems);
      });
    }
  };

  const toggleExpandItem = (itemId: string | number) => {
    setExpandedItems(prev => {
      const newExpandedItems = { ...prev };
      const isCurrentlyExpanded = prev[itemId] || false;

      // Toggle the current item
      newExpandedItems[itemId] = !isCurrentlyExpanded;

      // If we're closing an item, also close all its children
      if (isCurrentlyExpanded) {
        const item = findItemById(items, itemId);
        if (item?.below?.length) {
          item.below.forEach(child =>
            closeItemAndChildren(child.id, newExpandedItems),
          );
        }
      } else if (isDesktop) {
        // We're opening an item and on desktop
        const parentId = findParentOf(itemId, items);

        // Close siblings
        Object.keys(prev).forEach(key => {
          // Skip if this is the current item or has a parent/child relationship with it
          if (
            key === itemId ||
            (parentId && key === parentId) ||
            isDescendantOf(itemId, key, items) ||
            isDescendantOf(key, itemId, items)
          ) {
            return;
          }

          // If we're at the same level, close the other item and its children
          const keyParent = findParentOf(key, items);
          if (keyParent === parentId && (parentId !== null || isDesktop)) {
            closeItemAndChildren(key, newExpandedItems);
          }
        });
      }

      return newExpandedItems;
    });
  };

  // Function to close all open menus
  const closeAllMenus = () => {
    setExpandedItems({});
  };

  const handleClick = (itemId: string | number, event: ReactMouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    toggleExpandItem(itemId);
  };

  /**
   * Handles keyboard navigation using arrow keys.
   */
  const handleArrowKeysNavigation = (event: ReactKeyboardEvent) => {
    if (!dropdownRef.current) return;
    const focusedElement = document.activeElement as HTMLElement;

    // Exit if we're not in the dropdown menu or we're not even focused.
    if (!focusedElement || !dropdownRef.current.contains(focusedElement)) {
      return;
    }

    const parentSubmenu = focusedElement.closest('ul');

    // How did you get within the dropdown menu but not in a submenu?
    // Shouldn't be possible but just in case, exit if it is.
    if (!parentSubmenu) {
      return;
    }

    // Check if the focused element is a button with an expanded dropdown.
    const isButton = focusedElement.tagName.toLowerCase() === 'button';
    const isDropdownExpanded =
      isButton && focusedElement.getAttribute('aria-expanded') === 'true';

    // Determine if the focused element is in the top level or a nested level
    const isTopLevel = parentSubmenu === dropdownRef.current;

    // For top level, get all focusable elements
    // For nested levels, only get links if not a top-level item
    const selector = isTopLevel ? 'button, a' : 'a';

    // Get the appropriate focusable elements based on the level, but only within the current submenu
    const focusableElements = parentSubmenu.querySelectorAll<HTMLElement>(
      `:scope > li > :is(${selector})`,
    );

    if (focusableElements.length === 0) return;

    // Find the index of the focused element
    const focusedIndex = Array.from(focusableElements).indexOf(focusedElement);
    if (focusedIndex === -1) return;

    // Down arrow: expand the submenu only if on a button and focus on the first submenu item.
    if (event.key === 'ArrowDown' && isButton) {
      event.preventDefault();
      if (!isDropdownExpanded) {
        const buttonId = focusedElement.getAttribute('data-id');
        if (buttonId) {
          // Expand the submenu by directly updating the expandedItems state
          flushSync(() =>
            setExpandedItems(prev => {
              const newExpandedItems = { ...prev };
              newExpandedItems[buttonId] = true;
              return newExpandedItems;
            }),
          );
        }
        const buttonParent = focusedElement.closest('li');
        if (buttonParent) {
          const firstLink = buttonParent.querySelector<HTMLAnchorElement>(
            ':scope > ul > li > a',
          );
          if (firstLink) {
            firstLink.focus();
          }
        }
        return;
      }
    }
    // Down arrow/Right arrow: focus on the next item
    else if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      event.preventDefault();
      if (focusedIndex < focusableElements.length - 1) {
        focusableElements[focusedIndex + 1].focus();
      }
    }
    // Up arrow/Left arrow: focus on the previous item
    else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      event.preventDefault();
      if (focusedIndex > 0) {
        focusableElements[focusedIndex - 1].focus();
      }
    }
    // Home: focus on the first item
    else if (event.key === 'Home') {
      event.preventDefault();
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    }
    // End: focus on the last item
    else if (event.key === 'End') {
      event.preventDefault();
      if (focusableElements.length > 0) {
        focusableElements[focusableElements.length - 1].focus();
      }
    }
  };

  /**
   * Handles the focus out event for dropdown menu items
   */
  const handleFocusOut: FocusEventHandler<
    HTMLAnchorElement | HTMLButtonElement
  > = event => {
    const { currentTarget, relatedTarget } = event;
    // If the dropdown doesn't contain the element that lost focus, do nothing
    if (!dropdownRef.current?.contains(currentTarget)) {
      return;
    }

    // If the element receiving focus is null or outside the dropdown, close all menus
    if (
      !relatedTarget ||
      !dropdownRef.current.contains(relatedTarget as Element)
    ) {
      closeAllMenus();
      return;
    }

    const lostFocusItem = currentTarget.closest('li');
    const lostFocusItemId = currentTarget.getAttribute('data-id') || null;

    // If we couldn't find the menu item that lost focus,
    // or if the element receiving focus is a descendent of the one that lost focus,
    // do nothing.
    if (
      !lostFocusItem ||
      !lostFocusItemId ||
      lostFocusItem.contains(relatedTarget as Element)
    ) {
      return;
    }

    const receivingFocusItem = relatedTarget.closest('li');
    if (!receivingFocusItem) {
      closeAllMenus();
      return;
    }
    const receivingFocusElement = receivingFocusItem.querySelector<
      HTMLAnchorElement | HTMLButtonElement
    >(`:scope > :is(a, button)`);
    const receivingFocusItemId: string | null =
      receivingFocusElement?.getAttribute('data-id') || null;
    if (!receivingFocusItemId) {
      closeAllMenus();
      return;
    }

    setExpandedItems(prevState => {
      const newState = { ...prevState };
      Object.keys(newState).forEach(key => {
        const menuButtonOrLink = dropdownRef.current?.querySelector(
          `[data-id="${key}"]`,
        );
        if (!menuButtonOrLink) {
          newState[key] = false;
          return;
        }
        const menuItem = menuButtonOrLink.closest('li');
        if (!menuItem) {
          newState[key] = false;
          return;
        }

        // Keep the menu open if the element receiving focus is an ancestor of the menu item or vice-versa.
        if (
          receivingFocusItem.contains(menuItem) ||
          menuItem.contains(receivingFocusItem)
        ) {
          return;
        }

        closeItemAndChildren(key, newState);
      });
      return newState;
    });
  };

  useEffect(() => {
    const desktopMediaQuery = window.matchMedia('(width >= 64em)');
    const handleMediaQueryChange = (
      e: MediaQueryList | MediaQueryListEvent,
    ) => {
      setIsDesktop(e.matches);
    };
    desktopMediaQuery.addEventListener('change', handleMediaQueryChange);
    handleMediaQueryChange(desktopMediaQuery);
    return () => {
      desktopMediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);

  useEffect(() => {
    if (!dropdownRef.current) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeAllMenus();
      }
    };
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeAllMenus();
      }
    };

    // Only add event listeners while a menu is open
    if (isAnyMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscKey);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleEscKey);
      };
    }
  }, [isAnyMenuOpen]);

  const DropdownMenuInner = (
    <ul className={styles.dropdown} ref={dropdownRef}>
      {items.map(item => (
        <DropdownItem
          key={item.id}
          item={item}
          isChild={false}
          isExpanded={expandedItems[item.id] || false}
          useArrowKeys={useArrowKeys}
          onItemClick={handleClick}
          onKeyDown={handleArrowKeysNavigation}
          onBlur={handleFocusOut}
        />
      ))}
    </ul>
  );

  return (
    <DropdownContext.Provider value={expandedItems}>
      {isDesktop ? (
        <nav className={clsx(modifierClasses)}>{DropdownMenuInner}</nav>
      ) : (
        <OverlayMenu>{DropdownMenuInner}</OverlayMenu>
      )}
    </DropdownContext.Provider>
  );
}

export default DropdownMenu;
export type { DropdownProps };
