import clsx from 'clsx';
import { JSX, useEffect, useRef, useState } from 'react';
import DropdownItem from './DropdownItem';
import styles from './dropdown.module.css';

export interface DropdownProps {
  /**
   * Array of items to display in the dropdown
   */
  items: DropdownItem[];

  /**
   * Currently selected item
   */
  selectedItem?: DropdownItem;

  /**
   * Callback function when an item is selected
   */
  onSelect?: (item: DropdownItem) => void;

  /**
   * Additional CSS class name
   */
  className?: string;

  /**
   * Whether the dropdown is disabled
   */
  disabled?: boolean;

  /**
   * Pre-expanded items
   */
  expandedItems?: Record<string | number, boolean>;
}

/**
 * Dropdown menu component
 */
function Dropdown({
  items,
  selectedItem,
  onSelect,
  className = '',
  disabled = false,
  expandedItems: initialExpandedItems,
}: DropdownProps): JSX.Element {
  const [selected, setSelected] = useState<DropdownItem | undefined>(
    selectedItem,
  );
  const [expandedItems, setExpandedItems] = useState<
    Record<string | number, boolean>
  >(initialExpandedItems || {});
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Update selected item when prop changes
  useEffect(() => {
    setSelected(selectedItem);
  }, [selectedItem]);

  // Function to close all open menus
  const closeAllMenus = () => {
    setExpandedItems({});
  };

  // Helper function to check if an element is a descendant of another element
  const isElementDescendantOf = (child: Node, parent: Node): boolean => {
    let node = child.parentNode;
    while (node !== null) {
      if (node === parent) {
        return true;
      }
      node = node.parentNode;
    }
    return false;
  };

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

  // Add event listeners for click outside, ESC key, and focus management only if a menu is open
  useEffect(() => {
    // Check if any menu is open
    const isAnyMenuOpen = Object.values(expandedItems).some(Boolean);

    // Only add event listeners if a menu is open
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

      const handleFocusOut = (event: FocusEvent) => {
        // If the dropdown doesn't contain the element that lost focus, do nothing
        if (!dropdownRef.current?.contains(event.target as Node)) {
          return;
        }

        // If the related target (element receiving focus) is null or outside the dropdown, close all menus
        if (
          !event.relatedTarget ||
          !dropdownRef.current.contains(event.relatedTarget as Node)
        ) {
          closeAllMenus();
          return;
        }

        // Find the menu item that lost focus
        const menuItems = dropdownRef.current.querySelectorAll(
          `.${styles.item}`,
        );
        let lostFocusItem: Element | null = null;
        let lostFocusItemTitle: string | null = null;

        Array.from(menuItems).some(item => {
          if (item.contains(event.target as Node)) {
            lostFocusItem = item;
            // Try to extract the title from the data attribute or text content
            const titleElement = item.querySelector('a, button');
            if (titleElement) {
              lostFocusItemTitle = titleElement.textContent?.trim() || null;
            }
            return true; // Break the loop
          }
          return false;
        });

        // If we couldn't find the menu item that lost focus, do nothing
        if (!lostFocusItem || !lostFocusItemTitle) {
          return;
        }

        // If the element receiving focus is a descendant of the menu item that lost focus, do nothing
        if (isElementDescendantOf(event.relatedTarget as Node, lostFocusItem)) {
          return;
        }

        // Find the item that is receiving focus
        let receivingFocusItem: Element | null = null;
        let receivingFocusItemTitle: string | null = null;

        Array.from(menuItems).some(item => {
          if (item.contains(event.relatedTarget as Node)) {
            receivingFocusItem = item;
            // Try to extract the title from the data attribute or text content
            const titleElement = item.querySelector('a, button');
            if (titleElement) {
              receivingFocusItemTitle =
                titleElement.textContent?.trim() || null;
            }
            return true; // Break the loop
          }
          return false;
        });

        // If we couldn't find the item receiving focus, close all menus
        if (!receivingFocusItem || !receivingFocusItemTitle) {
          closeAllMenus();
          return;
        }

        // Check if the receiving focus item is a direct parent of the lost focus item
        const lostFocusParentTitle = findParentOf(lostFocusItemTitle, items);

        // If the receiving focus item is the direct parent of the lost focus item,
        // or it's the toggle button for the parent, don't close the menu
        if (lostFocusParentTitle === receivingFocusItemTitle) {
          return;
        }

        // Check if the receiving focus item is a top-level item
        const isReceivingFocusTopLevel = items.some(
          item => item.title === receivingFocusItemTitle,
        );

        // Check if the lost focus item is a top-level item
        const isLostFocusTopLevel = items.some(
          item => item.title === lostFocusItemTitle,
        );

        // If moving from a child item to a different top-level item, close all menus except the new one
        if (isReceivingFocusTopLevel && !isLostFocusTopLevel) {
          setExpandedItems(prev => {
            const newExpandedItems: Record<string, boolean> = {};
            // Only keep the receiving focus item expanded if it was already expanded
            if (receivingFocusItemTitle && prev[receivingFocusItemTitle]) {
              newExpandedItems[receivingFocusItemTitle] = true;
            }
            return newExpandedItems;
          });
          return;
        }

        // If moving between items at the same level that share the same parent,
        // close the lost focus item's submenu but keep the parent menu open
        if (
          lostFocusParentTitle &&
          lostFocusParentTitle === findParentOf(receivingFocusItemTitle, items)
        ) {
          setExpandedItems(prev => {
            const newExpandedItems: Record<string, boolean> = { ...prev };

            // Only close the lost focus item if it's expanded
            if (lostFocusItemTitle && newExpandedItems[lostFocusItemTitle]) {
              newExpandedItems[lostFocusItemTitle] = false;

              // Also close any children of the lost focus item
              const findAndCloseChildren = (itemsToSearch: DropdownItem[]) => {
                for (const item of itemsToSearch) {
                  if (item.title === lostFocusItemTitle && item.below) {
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

            return newExpandedItems;
          });
          return;
        }

        // If the receiving focus item is a sibling of the parent of the lost focus item,
        // close the parent of the lost focus item and all its children
        if (lostFocusParentTitle) {
          // Find the parent of the parent of the lost focus item
          const lostFocusGrandparentTitle = findParentOf(
            lostFocusParentTitle,
            items,
          );

          // Find the parent of the receiving focus item
          const receivingFocusParentTitle = findParentOf(
            receivingFocusItemTitle,
            items,
          );

          // If they share the same parent (grandparent of lost focus item),
          // then the receiving focus item is a sibling of the parent of the lost focus item
          if (
            lostFocusGrandparentTitle &&
            lostFocusGrandparentTitle === receivingFocusParentTitle
          ) {
            setExpandedItems(prev => {
              const newExpandedItems: Record<string, boolean> = { ...prev };

              // Close the parent of the lost focus item
              if (newExpandedItems[lostFocusParentTitle]) {
                newExpandedItems[lostFocusParentTitle] = false;

                // Also close any children of the parent of the lost focus item
                const findAndCloseChildren = (
                  itemsToSearch: DropdownItem[],
                ) => {
                  for (const item of itemsToSearch) {
                    if (item.title === lostFocusParentTitle && item.below) {
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

              return newExpandedItems;
            });
            return;
          }
        }

        // For any other case, close the lost focus item's submenu
        setExpandedItems(prev => {
          const newExpandedItems: Record<string, boolean> = { ...prev };

          // Only close the lost focus item if it's expanded
          if (lostFocusItemTitle && newExpandedItems[lostFocusItemTitle]) {
            newExpandedItems[lostFocusItemTitle] = false;

            // Also close any children of the lost focus item
            const findAndCloseChildren = (itemsToSearch: DropdownItem[]) => {
              for (const item of itemsToSearch) {
                if (item.title === lostFocusItemTitle && item.below) {
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

          return newExpandedItems;
        });
      };

      // Add event listeners
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscKey);
      document.addEventListener('focusout', handleFocusOut);

      // Clean up event listeners
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleEscKey);
        document.removeEventListener('focusout', handleFocusOut);
      };
    }

    // No cleanup needed if no listeners were added
    return undefined;
  }, [expandedItems]);

  const toggleExpandItem = (itemTitle: string, event: React.MouseEvent) => {
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
          if (keyParent === parentTitle) {
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

      return newExpandedItems;
    });
  };

  const handleSelect = (item: DropdownItem) => {
    setSelected(item);
    if (onSelect) {
      onSelect(item);
    }
  };

  const renderDropdownItem = (item: DropdownItem, isChild = false) => {
    // Get properties from item
    const itemTitle = item.title;
    const itemUrl = item.url || '';
    const itemBelow = item.below || [];
    const hasChildren = itemBelow.length > 0;
    const isExpanded = expandedItems[itemTitle] || false;
    const isActive = item.is_active || selected?.title === item.title || false;
    const isInActiveTrail = item.in_active_trail || false;

    // For top-level items without children, render as links
    if (!hasChildren && !isChild && itemUrl) {
      return (
        <li
          key={itemTitle}
          className={`${styles.item} ${isActive ? styles['item--selected'] : ''} ${isInActiveTrail ? styles['item--active-trail'] : ''}`}
          role="none"
        >
          <a href={itemUrl} className={styles.link}>
            {itemTitle}
          </a>
        </li>
      );
    }

    // For top-level items with children, render as buttons
    if (hasChildren && !isChild) {
      return (
        <li
          key={itemTitle}
          className={`${styles.item} ${styles['has-subnav']} ${isExpanded ? styles['item--expanded'] : ''} ${isInActiveTrail ? styles['item--active-trail'] : ''}`}
          role="none"
        >
          <button
            type="button"
            className={clsx(styles.link, styles['has-subnav'])}
            onClick={e => toggleExpandItem(itemTitle, e)}
            aria-expanded={isExpanded}
            aria-haspopup="true"
          >
            {itemTitle}
          </button>
          {isExpanded && itemBelow.length > 0 && (
            <ul className={styles.submenu}>
              {itemBelow.map(child => renderDropdownItem(child, true))}
            </ul>
          )}
        </li>
      );
    }

    // For child items with children, render as link + button
    if (isChild && hasChildren) {
      return (
        <li
          key={itemTitle}
          className={`${styles.item} ${styles['item--child']} ${styles['item--has-children']} ${isExpanded ? styles['item--expanded'] : ''} ${isActive ? styles['item--selected'] : ''} ${isInActiveTrail ? styles['item--active-trail'] : ''}`}
          role="none"
        >
          <div className={styles['item-wrapper']}>
            <a
              href={itemUrl}
              className={clsx(styles.link, styles['has-subnav'])}
            >
              {itemTitle}
            </a>
            <button
              type="button"
              className={styles['subnav-toggle']}
              onClick={e => toggleExpandItem(itemTitle, e)}
              aria-expanded={isExpanded}
              aria-label={`Toggle ${itemTitle} submenu`}
            />
          </div>
          {isExpanded && itemBelow.length > 0 && (
            <ul className={`${styles.submenu} ${styles['submenu--nested']}`}>
              {itemBelow.map(child => renderDropdownItem(child, true))}
            </ul>
          )}
        </li>
      );
    }

    // For child items without children, render as links
    if (isChild && !hasChildren) {
      return (
        <li
          key={itemTitle}
          className={`${styles.item} ${styles['item--child']} ${isActive ? styles['item--selected'] : ''} ${isInActiveTrail ? styles['item--active-trail'] : ''}`}
          role="none"
        >
          <a href={itemUrl} className={styles.link}>
            {itemTitle}
          </a>
        </li>
      );
    }

    // Fallback for any other case
    return (
      <li
        key={itemTitle}
        className={`${styles.item} ${isActive ? styles['item--selected'] : ''} ${isInActiveTrail ? styles['item--active-trail'] : ''}`}
        onClick={() => handleSelect(item)}
        role="option"
        aria-selected={isActive}
      >
        {itemTitle}
      </li>
    );
  };

  return (
    <div
      className={`${styles.dropdown} ${className} ${disabled ? styles['dropdown--disabled'] : ''}`}
      ref={dropdownRef}
    >
      <ul className={styles.dropdown} role="menu">
        {items.map(item => renderDropdownItem(item))}
      </ul>
    </div>
  );
}

export default Dropdown;
