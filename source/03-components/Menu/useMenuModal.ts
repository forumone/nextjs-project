import { useCallback, useEffect, useId, useRef, useState } from 'react';

const FOCUSABLE_ELEMENTS_SELECTOR =
  'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';

function useMenuModal() {
  const [isOpen, setIsOpen] = useState(false);
  const navId = useId();
  const navRef = useRef<HTMLElement>(null);
  const focusableElements = navRef.current?.querySelectorAll<HTMLElement>(
    FOCUSABLE_ELEMENTS_SELECTOR,
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

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('has-open-menu');
      const firstElement = focusableElements && focusableElements[0];
      firstElement?.focus();
      window.addEventListener('keydown', handleKeydown);
    } else {
      document.body.classList.remove('has-open-menu');
      window.removeEventListener('keydown', handleKeydown);
      // Focus menu button on close
      const button = document.querySelector(
        `[aria-controls="${navId}"]`,
      ) as HTMLButtonElement;
      button?.focus();
    }
    return () => {
      document.body.classList.remove('has-open-menu');
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [isOpen, navId, focusableElements, handleKeydown]);

  return { handleKeydown, navRef, navId, isOpen, openModal, closeModal };
}

export default useMenuModal;
