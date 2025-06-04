'use client';

import clsx from 'clsx';
import { GessoComponent } from 'gesso';
import {
  JSX,
  ReactElement,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import HamburgerButton from '../../HamburgerButton/HamburgerButton';
import buttonStyles from '../../HamburgerButton/hamburger-button.module.css';
import styles from './overlay-menu.module.css';

interface OverlayMenuProps extends GessoComponent {
  children: ReactElement;
}

const focusableElementsString =
  'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';

function OverlayMenu({
  children,
  modifierClasses,
}: OverlayMenuProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const dialogId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const focusableElements = dialogRef.current?.querySelectorAll<HTMLElement>(
    focusableElementsString,
  );

  const handleKeydown = useCallback(
    (event: KeyboardEvent) => {
      // Trap focus within the menu
      if (focusableElements) {
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.key === 'Tab') {
          if (event.shiftKey && document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          } else if (
            !event.shiftKey &&
            document.activeElement === lastElement
          ) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      }
      // Close the menu when the escape key is pressed
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    },
    [focusableElements],
  );

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('has-open-menu');
      window.addEventListener('keydown', handleKeydown);
    } else {
      document.body.classList.remove('has-open-menu');
      window.removeEventListener('keydown', handleKeydown);
      // Focus menu button on close
      const button = document.querySelector(
        `[aria-controls="${dialogId}"]`,
      ) as HTMLButtonElement;
      button?.focus();
    }
    return () => {
      document.body.classList.remove('has-open-menu');
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [isOpen, dialogId, focusableElements, handleKeydown]);

  return (
    <>
      <HamburgerButton
        aria-controls={dialogId}
        aria-expanded={isOpen}
        onClick={() => {
          setIsOpen(true);
          dialogRef.current?.showModal();
        }}
        hidden={isOpen}
        text="Menu"
        modifierClasses={buttonStyles['button--menu']}
      />
      <dialog
        className={clsx(styles.overlay, modifierClasses)}
        id={dialogId}
        ref={dialogRef}
      >
        <HamburgerButton
          onClick={() => {
            setIsOpen(false);
            dialogRef.current?.close();
          }}
          aria-controls={dialogId}
          aria-expanded={isOpen}
          hidden={!isOpen}
          text="Close"
          modifierClasses={buttonStyles['button--close']}
          autoFocus={true}
        />
        {children}
      </dialog>
    </>
  );
}

export default OverlayMenu;
export type { OverlayMenuProps };
