import clsx from 'clsx';
import { GessoComponent } from 'gesso';
import { useEffect, useRef } from 'react';
import Close from '../../../01-global/icon/icons/Close';
import MegaMenuLink, { MegaMenuLinkProps } from './MegaMenuLink';
import styles from './mega-menu.module.css';

interface MegaMenuProps extends GessoComponent {
  items: MegaMenuLinkProps[];
  menuName: string;
  useArrowKeys?: boolean;
}

function MegaMenu({
  items,
  menuName,
  useArrowKeys = true,
  modifierClasses,
}: MegaMenuProps): JSX.Element {
  const megaMenuRef = useRef<HTMLUListElement | null>(null);
  const topLevelItems = useRef<HTMLElement[]>([]);

  useEffect(() => {
    if (megaMenuRef.current) {
      topLevelItems.current = Array.from(
        megaMenuRef.current.querySelectorAll<HTMLElement>(
          'button[aria-expanded][aria-controls]',
        ),
      );
    }

    topLevelItems.current.forEach(button => {
      toggleSection(button.nextElementSibling as HTMLDivElement, true);
    });

    document.addEventListener('click', handleClickAnywhere);
    document.addEventListener('keydown', handleKeydownAnywhere);

    return () => {
      document.removeEventListener('click', handleClickAnywhere);
      document.removeEventListener('keydown', handleKeydownAnywhere);
    };
  });

  const toggleSection = (section: HTMLDivElement, hide: boolean) => {
    const button = section.previousElementSibling as HTMLButtonElement;

    if (hide) {
      section.hidden = true;
      button.setAttribute('aria-expanded', 'false');
    } else {
      section.hidden = !section.hidden;
      button.setAttribute('aria-expanded', section.hidden ? 'false' : 'true');
    }

    const focusable = section.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]',
    );
    focusable.forEach(focusableItem => {
      const focusableElement = focusableItem as HTMLElement;
      focusableElement.tabIndex = section.hidden ? -1 : 0;
    });

    if (!section.hidden) {
      const firstFocusable = focusable[0] as HTMLElement;
      firstFocusable.focus();
    }
  };

  const handleClickAnywhere = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest(`.${styles.megaMenu}`)) {
      const sections = document.querySelectorAll(`.${styles.section}`);
      sections.forEach(section => {
        toggleSection(section as HTMLDivElement, true);
      });
    }
  };

  const handleKeydownAnywhere = (event: KeyboardEvent) => {
    const openButton = document.querySelector('button[aria-expanded="true"]');

    if (event.key === 'Escape' && openButton) {
      const sections = document.querySelectorAll(`.${styles.section}`);
      sections.forEach(section => {
        toggleSection(section as HTMLDivElement, true);
      });
    } else if (event.key === 'Tab') {
      setTimeout(() => {
        if (
          document.activeElement &&
          document.activeElement.classList.contains(`${styles.link}`) &&
          document.activeElement instanceof HTMLButtonElement
        ) {
          if (openButton) {
            toggleSection(
              openButton.nextElementSibling as HTMLDivElement,
              true,
            );
          }
        }
      }, 0);
    }
  };

  const controlFocusByKey = (
    event: React.KeyboardEvent<HTMLElement>,
    menuLinks: HTMLElement[],
    currentIndex: number,
  ) => {
    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowLeft':
        event.preventDefault();
        if (currentIndex > -1) {
          const prevIndex = Math.max(0, currentIndex - 1);
          menuLinks[prevIndex].focus();
        }
        break;
      case 'ArrowDown':
      case 'ArrowRight':
        event.preventDefault();
        if (currentIndex > -1) {
          const nextIndex = Math.min(menuLinks.length - 1, currentIndex + 1);
          menuLinks[nextIndex].focus();
        }
        break;
      case 'Home':
        event.preventDefault();
        menuLinks[0].focus();
        break;
      case 'End':
        event.preventDefault();
        menuLinks[menuLinks.length - 1].focus();
        break;
      default:
        // Do nothing.
        break;
    }
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;

    const currentSection = button.nextElementSibling as HTMLDivElement;
    const currentSectionId = currentSection.getAttribute('id');

    button.setAttribute(
      'aria-expanded',
      currentSection.hidden === true ? 'true' : 'false',
    );

    toggleSection(currentSection, !currentSection.hidden);

    const megaMenu = button.closest(`.${styles.megaMenu}`);
    if (megaMenu) {
      const sections = megaMenu.querySelectorAll(`.${styles.section}`);
      sections.forEach(section => {
        if (currentSectionId !== section.getAttribute('id')) {
          toggleSection(section as HTMLDivElement, true);
        }
      });
    }
  };

  const handleButtonKeydown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
  ) => {
    const button = event.currentTarget;

    if (!useArrowKeys) return;
    const targetButtonIndex = topLevelItems.current.indexOf(button);

    if (
      button.getAttribute('aria-expanded') == 'true' &&
      event.key === 'ArrowDown'
    ) {
      event.preventDefault();

      const section = button.nextElementSibling;
      if (section instanceof HTMLElement) {
        const focusableElement = section.querySelector('a, button');
        if (focusableElement instanceof HTMLElement) {
          focusableElement.focus();
        }
      }
    } else {
      controlFocusByKey(event, topLevelItems.current, targetButtonIndex);
    }
  };

  const handleSectionKeydown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const section = event.currentTarget;

    if (section.hidden || !useArrowKeys) return;

    const active = document.activeElement as HTMLElement;
    if (section instanceof HTMLElement) {
      const menuLinks = [
        ...Array.from(section.querySelectorAll<HTMLElement>('a, button')),
      ];
      const currentIndex = menuLinks.indexOf(active);
      controlFocusByKey(event, menuLinks, currentIndex);
    }
  };

  const handleCloseClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const closeButton = event.target as HTMLButtonElement;
    const section = closeButton.closest(`.${styles.section}`);
    toggleSection(section as HTMLDivElement, true);
  };

  return (
    <>
      {items && (
        <ul
          ref={megaMenuRef}
          className={clsx(styles.megaMenu, modifierClasses)}
        >
          {items.map((item, index) => {
            return (
              <li
                key={index}
                className={clsx(
                  styles.item,
                  item.below && styles['has-subnav'],
                )}
              >
                <button
                  className={styles.link}
                  aria-expanded="false"
                  aria-controls={`mega-menu-${menuName}--${index}`}
                  aria-current={item.isActive ? 'page' : 'false'}
                  onClick={handleButtonClick}
                  onKeyDown={handleButtonKeydown}
                >
                  <span>{item.title}</span>
                </button>
                <div
                  className={styles.section}
                  id={`mega-menu-${menuName}--${index}`}
                  hidden
                  onKeyDown={handleSectionKeydown}
                >
                  <div className={styles.sectionInner}>
                    <div className={styles.overview}>
                      <h2 className={styles.sectionTitle}>{item.title}</h2>
                    </div>
                    {item.below && (
                      <MegaMenuLink items={item.below} menuLevel={1} />
                    )}
                    {item.featured}
                  </div>
                  <button
                    aria-label="Close menu"
                    className={styles.sectionClose}
                    onClick={handleCloseClick}
                  >
                    <Close isHidden={false} />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

export default MegaMenu;
