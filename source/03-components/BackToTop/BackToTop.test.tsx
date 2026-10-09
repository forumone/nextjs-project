// @vitest-environment jsdom
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import BackToTop from './BackToTop';

function setScrollY(value: number) {
  Object.defineProperty(window, 'scrollY', {
    value,
    writable: true,
    configurable: true,
  });
}

describe('BackToTop visibility', () => {
  beforeEach(() => {
    setScrollY(0);
  });

  it('is hidden by default', () => {
    render(<BackToTop text="Back to top" topElement="main" />);

    expect(screen.getByRole('link', { hidden: true })).toHaveAttribute(
      'aria-hidden',
      'true',
    );
  });

  it('becomes visible once the scroll threshold is reached', async () => {
    render(<BackToTop text="Back to top" topElement="main" threshold={100} />);

    setScrollY(150);
    fireEvent.scroll(window);

    await waitFor(() =>
      expect(screen.getByRole('link', { hidden: true })).toHaveAttribute(
        'aria-hidden',
        'false',
      ),
    );
  });

  it('becomes hidden again once scrolling back above the threshold element', async () => {
    render(<BackToTop text="Back to top" topElement="main" threshold={100} />);

    setScrollY(150);
    fireEvent.scroll(window);
    await waitFor(() =>
      expect(screen.getByRole('link', { hidden: true })).toHaveAttribute(
        'aria-hidden',
        'false',
      ),
    );

    setScrollY(0);
    fireEvent.scroll(window);

    await waitFor(() =>
      expect(screen.getByRole('link', { hidden: true })).toHaveAttribute(
        'aria-hidden',
        'true',
      ),
    );
  });

  it('does not listen for scroll events when threshold is 0', () => {
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
    render(<BackToTop text="Back to top" topElement="main" threshold={0} />);

    expect(addEventListenerSpy).not.toHaveBeenCalledWith(
      'scroll',
      expect.any(Function),
    );
  });
});

describe('BackToTop click behavior', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('smooth scrolls to and focuses the top element when smoothScroll is enabled', () => {
    document.body.innerHTML = '<div id="main"></div>';
    const target = document.getElementById('main') as HTMLElement;
    const scrollToSpy = vi.fn();
    window.scrollTo = scrollToSpy;
    const focusSpy = vi.spyOn(target, 'focus');

    render(<BackToTop text="Back to top" topElement="main" />);
    fireEvent.click(screen.getByRole('link', { hidden: true }));

    expect(scrollToSpy).toHaveBeenCalledWith(
      expect.objectContaining({ behavior: 'smooth' }),
    );
    expect(target).toHaveAttribute('tabIndex', '-1');
    expect(focusSpy).toHaveBeenCalled();
  });

  it('does not intercept the click when smoothScroll is disabled', () => {
    document.body.innerHTML = '<div id="main"></div>';
    const scrollToSpy = vi.fn();
    window.scrollTo = scrollToSpy;

    render(
      <BackToTop text="Back to top" topElement="main" smoothScroll={false} />,
    );
    fireEvent.click(screen.getByRole('link', { hidden: true }));

    expect(scrollToSpy).not.toHaveBeenCalled();
  });

  it('does nothing when the target element does not exist', () => {
    const scrollToSpy = vi.fn();
    window.scrollTo = scrollToSpy;

    render(<BackToTop text="Back to top" topElement="missing" />);
    fireEvent.click(screen.getByRole('link', { hidden: true }));

    expect(scrollToSpy).not.toHaveBeenCalled();
  });
});

describe('BackToTop rendering', () => {
  it('renders the link with the correct href and title', () => {
    render(<BackToTop text="Back to top" topElement="main" />);

    const link = screen.getByRole('link', { hidden: true });
    expect(link).toHaveAttribute('href', '#main');
    expect(link).toHaveAttribute('title', 'Back to top');
  });

  it('applies modifier classes to the link', () => {
    render(
      <BackToTop
        text="Back to top"
        topElement="main"
        modifierClasses="custom-class"
      />,
    );

    expect(screen.getByRole('link', { hidden: true })).toHaveClass(
      'custom-class',
    );
  });
});
