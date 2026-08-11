// @vitest-environment jsdom
import { act, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import ResponsiveMenu from './ResponsiveMenu';

const items = [
  { title: 'Home', url: '/' },
  { title: 'About', url: '/about' },
  { title: 'Contact', url: '/contact' },
];

function mockMatchMedia(matches: boolean) {
  const listeners: Array<(e: MediaQueryListEvent) => void> = [];
  const mediaQueryList = {
    matches,
    media: '(min-width: 700px)',
    addEventListener: vi.fn((_event: string, listener: EventListener) => {
      listeners.push(listener);
    }),
    removeEventListener: vi.fn(),
  };

  window.matchMedia = vi.fn().mockReturnValue(mediaQueryList);

  return {
    fireChange(newMatches: boolean) {
      mediaQueryList.matches = newMatches;
      act(() => {
        listeners.forEach(listener =>
          listener({ matches: newMatches } as MediaQueryListEvent),
        );
      });
    },
  };
}

describe('ResponsiveMenu', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the overlay menu when the viewport does not match the desktop query', () => {
    mockMatchMedia(false);

    render(<ResponsiveMenu items={items} />);

    expect(screen.getByRole('button', { name: 'Menu' })).toBeInTheDocument();
  });

  it('renders the standard menu when the viewport matches the desktop query', () => {
    mockMatchMedia(true);

    render(<ResponsiveMenu items={items} />);

    expect(
      screen.queryByRole('button', { name: 'Menu' }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute(
      'href',
      '/',
    );
  });

  it('switches from the overlay menu to the standard menu when the viewport changes to desktop', () => {
    const { fireChange } = mockMatchMedia(false);

    render(<ResponsiveMenu items={items} />);

    expect(screen.getByRole('button', { name: 'Menu' })).toBeInTheDocument();

    fireChange(true);

    expect(
      screen.queryByRole('button', { name: 'Menu' }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
  });

  it('switches from the standard menu to the overlay menu when the viewport changes to mobile', () => {
    const { fireChange } = mockMatchMedia(true);

    render(<ResponsiveMenu items={items} />);

    expect(
      screen.queryByRole('button', { name: 'Menu' }),
    ).not.toBeInTheDocument();

    fireChange(false);

    expect(screen.getByRole('button', { name: 'Menu' })).toBeInTheDocument();
  });
});
