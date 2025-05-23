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
import DropdownItem from './DropdownItem';
import styles from './dropdown.module.css';

interface DropdownProps extends GessoComponent {
  /**
   * Array of items to display in the dropdown
   */
  items: DropdownItem[];

  /**
   * Whether to use arrow keys for navigation
   */
  useArrowKeys?: boolean;
}

// Helper function to check if an item is a descendant of another item
const isDescendantOf = (
  childTitle: string,
  parentTitle: string,
  itemsToSearch: DropdownItem[],
): boolean => {
  for (const item of itemsToSearch) {
    if (item.title === parentTitle && item.below) {
      // Check if the child is a direct descendant
      if (item.below.some(child => child.title === childTitle)) {
        return true;
      }

      // Check if the child is a descendant of any of the children
      for (const child of item.below) {
        if (child.below && isDescendantOf(childTitle, child.title, [child])) {
          return true;
        }
      }
    }

    // Check in the item's children
    if (item.below && item.below.length > 0) {
      if (isDescendantOf(childTitle, parentTitle, item.below)) {
        return true;
      }
    }
  }
  return false;
};

// Helper function to find the parent of an item
const findParentOf = (
  childTitle: string,
  itemsToSearch: DropdownItem[],
  currentPath: string[] = [],
): string | null => {
  for (const item of itemsToSearch) {
    if (item.below) {
      // Check if the child is a direct descendant
      if (item.below.some(child => child.title === childTitle)) {
        return item.title;
      }

      // Check in the item's children
      for (const child of item.below) {
        const result = findParentOf(
          childTitle,
          [child],
          [...currentPath, item.title],
        );
        if (result) {
          return result;
        }
      }
    }
  }
  return null;
};

/**
 * Dropdown menu component
 */
function Dropdown({
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

  // Function to toggle expanding/collapsing an item
  const toggleExpandItem = (itemTitle: string, event: ReactMouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    setExpandedItems(prev => {
      const newExpandedItems = { ...prev };
      const isCurrentlyExpanded = prev[itemTitle] || false;

      // Toggle the current item
      newExpandedItems[itemTitle] = !isCurrentlyExpanded;

      // If we're closing an item, also close all its children
      if (isCurrentlyExpanded) {
        // Find the item in the items array (or nested arrays)
        const findAndCloseChildren = (itemsToSearch: DropdownItem[]) => {
          for (const item of itemsToSearch) {
            if (item.title === itemTitle && item.below) {
              // Close all direct children
              item.below.forEach(child => {
                newExpandedItems[child.title] = false;
                // Recursively close any grandchildren
                if (child.below && child.below.length > 0) {
                  findAndCloseChildren(child.below);
                }
              });
              return true; // Item found and processed
            }

            // Check in the item's children
            if (item.below && item.below.length > 0) {
              const found = findAndCloseChildren(item.below);
              if (found) return true;
            }
          }
          return false; // Item not found in this branch
        };

        findAndCloseChildren(items);
      } else {
        // We're opening an item
        // Find the parent of the current item
        const parentTitle = findParentOf(itemTitle, items);

        // On desktop, only allow one submenu to be open at a time
        // On mobile, allow multiple submenus to be open simultaneously
        if (isDesktop) {
          // Close all other open items at the same level
          Object.keys(prev).forEach(key => {
            // Skip the current item
            if (key === itemTitle) return;

            // Skip if the item is a parent of the current item
            if (parentTitle && key === parentTitle) return;

            // Skip if the item is an ancestor of the current item
            if (isDescendantOf(itemTitle, key, items)) return;

            // Skip if the current item is an ancestor of this item
            if (isDescendantOf(key, itemTitle, items)) return;

            // If we're at the same level, close the other item
            const keyParent = findParentOf(key, items);
            // For top-level items (parentTitle is null), only close other items on desktop
            // For nested items, close other items at the same level regardless of desktop/mobile
            if (
              keyParent === parentTitle &&
              (parentTitle !== null || isDesktop)
            ) {
              newExpandedItems[key] = false;

              // Also close all children of this item
              const findAndCloseChildren = (itemsToSearch: DropdownItem[]) => {
                for (const item of itemsToSearch) {
                  if (item.title === key && item.below) {
                    // Close all direct children
                    item.below.forEach(child => {
                      newExpandedItems[child.title] = false;
                      // Recursively close any grandchildren
                      if (child.below && child.below.length > 0) {
                        findAndCloseChildren(child.below);
                      }
                    });
                    return true; // Item found and processed
                  }

                  // Check in the item's children
                  if (item.below && item.below.length > 0) {
                    const found = findAndCloseChildren(item.below);
                    if (found) return true;
                  }
                }
                return false; // Item not found in this branch
              };

              findAndCloseChildren(items);
            }
          });
        }
      }

      return newExpandedItems;
    });
  };

  // Function to close all open menus
  const closeAllMenus = () => {
    setExpandedItems({});
  };

  /**
   * Handles keyboard navigation using arrow keys.
   *
   * @param {React.KeyboardEvent} event - The keyboard event triggered by user interaction.
   *
   * Behavior:
   * - Focus management is applied only if the currently active element is inside the dropdown menu.
   * - Validates whether the active element is a button or a link within its hierarchical context (top-level or nested submenu).
   * - Handles different navigation keys:
   *   - ArrowDown/ArrowRight: Moves focus to the next focusable element or handles submenu expansion.
   *   - ArrowUp/ArrowLeft: Moves focus to the previous focusable element within the menu.
   *   - Home: Moves focus to the first focusable element within the current menu level.
   *   - End: Moves focus to the last focusable element within the current menu level.
   * - For dropdown buttons, ensures expanded state is managed and focuses on the first element within the submenu if applicable.
   */
  const handleArrowKeysNavigation = (event: ReactKeyboardEvent) => {
    if (!dropdownRef.current) return;

    // Find the currently focused element
    const focusedElement = document.activeElement as HTMLElement;
    if (!focusedElement || !dropdownRef.current.contains(focusedElement)) {
      return;
    }

    // Check if the focused element is a button
    const isFocusedButton = focusedElement.tagName.toLowerCase() === 'button';

    // Check if the button's dropdown is expanded
    const isDropdownExpanded =
      isFocusedButton &&
      focusedElement.getAttribute('aria-expanded') === 'true';

    const parentSubmenu = focusedElement.closest('ul');

    if (!parentSubmenu) return;

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

    // Handle arrow keys
    if (event.key === 'ArrowDown' && isFocusedButton) {
      event.preventDefault();
      if (!isDropdownExpanded) {
        // Get the title of the button
        const buttonTitle = focusedElement.textContent?.trim();
        if (buttonTitle) {
          // Expand the submenu by directly updating the expandedItems state
          flushSync(() =>
            setExpandedItems(prev => {
              const newExpandedItems = { ...prev };
              newExpandedItems[buttonTitle] = true;
              return newExpandedItems;
            }),
          );
        }

        // Find the first link in the dropdown
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
    } else if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      event.preventDefault();
      if (focusedIndex < focusableElements.length - 1) {
        focusableElements[focusedIndex + 1].focus();
      }
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      event.preventDefault();
      if (focusedIndex > 0) {
        focusableElements[focusedIndex - 1].focus();
      }
    } else if (event.key === 'Home') {
      event.preventDefault();
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    } else if (event.key === 'End') {
      event.preventDefault();
      if (focusableElements.length > 0) {
        focusableElements[focusableElements.length - 1].focus();
      }
    }
  };

  /**
   * Handles the focus out event for dropdown menu items.
   *
   * Behavior:
   * - If the dropdown container does not encompass the currentTarget (the element losing focus), the function does nothing.
   * - If the related target (element receiving focus) is null or outside the dropdown boundaries, all menus are closed.
   * - Ensures that focus transitions within the same menu or menu hierarchy do not cause unnecessary state changes.
   * - Updates the `expandedItems` state based on whether the focus transition relates to valid menu hierarchies.
   *
   * @param {React.FocusEvent<HTMLAnchorElement | HTMLButtonElement>} event - The focus out event object.
   */
  const handleFocusOut: FocusEventHandler<
    HTMLAnchorElement | HTMLButtonElement
  > = event => {
    const { currentTarget, relatedTarget } = event;
    // If the dropdown doesn't contain the element that lost focus, do nothing
    if (!dropdownRef.current?.contains(currentTarget)) {
      return;
    }

    // If the related target (element receiving focus) is null or outside the dropdown, close all menus
    if (
      !relatedTarget ||
      !dropdownRef.current.contains(relatedTarget as Element)
    ) {
      closeAllMenus();
      return;
    }

    const lostFocusItem = currentTarget.closest('li');
    const lostFocusItemTitle = currentTarget.textContent?.trim() || null;

    // If we couldn't find the menu item that lost focus, do nothing
    if (!lostFocusItem || !lostFocusItemTitle) {
      return;
    }

    // If the element receiving focus is a descendant of the menu item that lost focus, do nothing
    if (lostFocusItem.contains(relatedTarget as Element)) {
      return;
    }

    const receivingFocusItem = relatedTarget.closest('li');
    if (!receivingFocusItem) {
      closeAllMenus();
      return;
    }
    const receivingFocusTitleElement = receivingFocusItem.querySelector<
      HTMLAnchorElement | HTMLButtonElement
    >(`:scope > :is(a, button)`);
    const receivingFocusItemTitle: string | null =
      receivingFocusTitleElement?.textContent?.trim() || null;
    if (!receivingFocusItemTitle) {
      closeAllMenus();
      return;
    }

    const allMenuItems = Array.from(
      dropdownRef.current.querySelectorAll<
        HTMLAnchorElement | HTMLButtonElement
      >('a, button'),
    );

    const newExpandedItems = Object.entries(expandedItems).map(([key]) => {
      const menuButtonOrLink = allMenuItems.find(
        v => v?.textContent?.trim() === key,
      );
      if (!menuButtonOrLink) {
        return [key, false];
      }
      const menuItem = menuButtonOrLink.closest('li');
      if (!menuItem) {
        return [key, false];
      }

      // Keep the menu open if the element receiving focus is an ancestor of the menu item.
      if (receivingFocusItem.contains(menuItem)) {
        return [key, true];
      }

      // Keep the menu open if the menu item is an ancestor of the element receiving focus.
      if (menuItem.contains(receivingFocusItem)) {
        return [key, true];
      }

      return [key, false];
    });

    setExpandedItems(Object.fromEntries(newExpandedItems));
  };

  // Add event listeners for click outside, ESC key, keyboard navigation, and focus management
  useEffect(() => {
    if (!dropdownRef.current) return;
    // Only add event listeners while a menu is open
    if (isAnyMenuOpen) {
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

      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscKey);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleEscKey);
      };
    }
  }, [isAnyMenuOpen]);

  const renderDropdownItem = (item: DropdownItem, isChild = false) => {
    const { title, url } = item;

    const hasChildren = item.below?.length && item.below.length > 0;
    const isExpanded = expandedItems[item.title] || false;
    const isInActiveTrail = item.in_active_trail || false;

    // For top-level items without children, render as links
    if (!hasChildren && !isChild && url) {
      return (
        <li key={title} className={clsx(styles.item)}>
          <a
            href={url}
            className={styles.link}
            onKeyDown={useArrowKeys ? handleArrowKeysNavigation : undefined}
            onBlur={handleFocusOut}
          >
            {title}
          </a>
        </li>
      );
    }

    // For top-level items with children, render as buttons
    if (hasChildren && !isChild) {
      return (
        <li
          key={title}
          className={clsx(styles.item, styles['has-subnav'], {
            [styles['item--expanded']]: isExpanded,
            [styles['item--active-trail']]: isInActiveTrail,
          })}
        >
          <button
            type="button"
            className={clsx(styles.link, styles['has-subnav'])}
            onClick={e => toggleExpandItem(title, e)}
            aria-expanded={isExpanded}
            aria-haspopup="true"
            onKeyDown={useArrowKeys ? handleArrowKeysNavigation : undefined}
            onBlur={handleFocusOut}
          >
            {title}
          </button>
          {isExpanded && hasChildren && (
            <ul className={styles.submenu}>
              {item.below.map(child => renderDropdownItem(child, true))}
            </ul>
          )}
        </li>
      );
    }

    // For child items with children, render as link + button
    if (isChild && hasChildren) {
      return (
        <li
          key={title}
          className={clsx(
            styles.item,
            styles['item--child'],
            styles['item--has-children'],
            {
              [styles['item--active-trail']]: isExpanded,
              [styles['item--active-trail']]: isInActiveTrail,
            },
          )}
        >
          <a
            href={url}
            className={clsx(styles.link, styles['has-subnav'])}
            onKeyDown={useArrowKeys ? handleArrowKeysNavigation : undefined}
            onBlur={handleFocusOut}
          >
            {title}
          </a>
          <button
            type="button"
            className={styles['subnav-toggle']}
            onClick={e => toggleExpandItem(title, e)}
            aria-expanded={isExpanded}
            aria-label={`Toggle ${title} submenu`}
            onBlur={handleFocusOut}
          />
          {isExpanded && hasChildren && (
            <ul className={`${styles.submenu} ${styles['submenu--nested']}`}>
              {item.below.map(child => renderDropdownItem(child, true))}
            </ul>
          )}
        </li>
      );
    }

    // For child items without children, render as links
    if (isChild && !hasChildren) {
      return (
        <li
          key={title}
          className={clsx(styles.item, styles['item--child'], {
            [styles['item--active-trail']]: isInActiveTrail,
          })}
        >
          <a
            href={url}
            className={styles.link}
            onKeyDown={useArrowKeys ? handleArrowKeysNavigation : undefined}
            onBlur={handleFocusOut}
          >
            {title}
          </a>
        </li>
      );
    }

    // Fallback for any other case
    return (
      <li
        key={title}
        className={clsx(styles.item, {
          [styles['item--active-trail']]: isInActiveTrail,
        })}
      >
        {title}
      </li>
    );
  };

  return (
    <nav className={clsx(styles.dropdown, modifierClasses)}>
      <ul className={styles.dropdown} ref={dropdownRef}>
        {items.map(item => renderDropdownItem(item))}
      </ul>
    </nav>
  );
}

export default Dropdown;
export type { DropdownProps };
