// @vitest-environment jsdom
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import OverlayMenu from './OverlayMenu';

const items = [
  { title: 'Home', url: '/' },
  { title: 'About', url: '/about' },
  { title: 'Contact', url: '/contact' },
];

describe('OverlayMenu open/close behavior', () => {
  it('renders closed by default, showing the menu button and hiding the close button', () => {
    render(<OverlayMenu items={items} />);

    expect(screen.getByRole('button', { name: 'Menu' })).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Close' }),
    ).not.toBeInTheDocument();
  });

  it('opens the menu when the menu button is clicked', () => {
    render(<OverlayMenu items={items} />);

    fireEvent.click(screen.getByRole('button', { name: 'Menu' }));

    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Menu' }),
    ).not.toBeInTheDocument();
  });

  it('closes the menu when the close button is clicked', () => {
    render(<OverlayMenu items={items} />);

    fireEvent.click(screen.getByRole('button', { name: 'Menu' }));
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));

    expect(screen.getByRole('button', { name: 'Menu' })).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Close' }),
    ).not.toBeInTheDocument();
  });

  it('closes the menu when the escape key is pressed', () => {
    render(<OverlayMenu items={items} />);

    fireEvent.click(screen.getByRole('button', { name: 'Menu' }));
    fireEvent.keyDown(window, { key: 'Escape' });

    expect(screen.getByRole('button', { name: 'Menu' })).toBeInTheDocument();
  });

  it('sets aria-expanded correctly on both buttons', () => {
    render(<OverlayMenu items={items} />);

    expect(screen.getByRole('button', { name: 'Menu' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );

    fireEvent.click(screen.getByRole('button', { name: 'Menu' }));

    expect(screen.getByRole('button', { name: 'Close' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
  });

  it('adds has-open-menu class to body when open and removes it when closed', () => {
    render(<OverlayMenu items={items} />);

    fireEvent.click(screen.getByRole('button', { name: 'Menu' }));
    expect(document.body.classList.contains('has-open-menu')).toBe(true);

    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(document.body.classList.contains('has-open-menu')).toBe(false);
  });

  it('renders the menu items as links', () => {
    render(<OverlayMenu items={items} />);

    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute(
      'href',
      '/',
    );
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute(
      'href',
      '/about',
    );
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute(
      'href',
      '/contact',
    );
  });
});

describe('OverlayMenu focus trapping', () => {
  it('wraps focus from the last focusable element to the first on Tab', () => {
    render(<OverlayMenu items={items} />);

    fireEvent.click(screen.getByRole('button', { name: 'Menu' }));

    const links = screen.getAllByRole('link');
    const lastLink = links[links.length - 1];
    lastLink.focus();

    fireEvent.keyDown(lastLink, { key: 'Tab' });

    expect(screen.getByRole('button', { name: 'Close' })).toHaveFocus();
  });

  it('wraps focus from the first focusable element to the last on Shift+Tab', () => {
    render(<OverlayMenu items={items} />);

    fireEvent.click(screen.getByRole('button', { name: 'Menu' }));

    const closeButton = screen.getByRole('button', { name: 'Close' });
    closeButton.focus();

    fireEvent.keyDown(closeButton, { key: 'Tab', shiftKey: true });

    const links = screen.getAllByRole('link');
    const lastLink = links[links.length - 1];

    expect(lastLink).toHaveFocus();
  });
});
