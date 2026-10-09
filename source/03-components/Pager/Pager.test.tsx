// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import {
  ReadonlyURLSearchParams,
  usePathname,
  useSearchParams,
} from 'next/navigation';
import { describe, expect, it, vi } from 'vitest';
import Pager from './Pager';

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
  useSearchParams: vi.fn(),
  ReadonlyURLSearchParams: URLSearchParams,
}));

function mockRoute(pathname: string, search = '') {
  vi.mocked(usePathname).mockReturnValue(pathname);
  vi.mocked(useSearchParams).mockReturnValue(
    new ReadonlyURLSearchParams(search),
  );
}

describe('Pager rendering', () => {
  it('renders a link for every page when totalPages is below the display cutoff', () => {
    mockRoute('/blog');
    render(<Pager totalPages={5} />);

    expect(screen.getAllByRole('link')).toHaveLength(5);
    expect(
      screen.getByText('Currently on page').parentElement?.textContent,
    ).toContain('1');
  });

  it('marks the current page and does not render a link for it', () => {
    mockRoute('/blog', 'page=3');
    render(<Pager totalPages={5} />);

    expect(screen.queryByRole('link', { name: 'Page 3' })).toBeNull();
    expect(screen.getByText('Currently on page')).toBeInTheDocument();
  });

  it('renders first, previous, next, and last links when there are enough pages', () => {
    mockRoute('/blog', 'page=10');
    render(<Pager totalPages={20} />);

    expect(screen.getByRole('link', { name: /First/ })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Previous/ })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Next/ })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Last/ })).toBeInTheDocument();
  });

  it('does not render first/previous links on the first page', () => {
    mockRoute('/blog', 'page=1');
    render(<Pager totalPages={10} />);

    expect(screen.queryByRole('link', { name: /First/ })).toBeNull();
    expect(screen.queryByRole('link', { name: /Previous/ })).toBeNull();
  });

  it('does not render next/last links on the last page', () => {
    mockRoute('/blog', 'page=10');
    render(<Pager totalPages={10} />);

    expect(screen.queryByRole('link', { name: /Next/ })).toBeNull();
    expect(screen.queryByRole('link', { name: /Last/ })).toBeNull();
  });

  it('renders an ellipsis for non-visible pages', () => {
    mockRoute('/blog', 'page=10');
    render(<Pager totalPages={20} />);

    expect(
      screen.getAllByLabelText('ellipsis indicating non-visible pages').length,
    ).toBeGreaterThan(0);
  });

  it('uses the default heading as the nav aria-label', () => {
    mockRoute('/blog');
    render(<Pager totalPages={5} />);

    expect(
      screen.getByRole('navigation', { name: 'Pagination' }),
    ).toBeInTheDocument();
  });

  it('uses a custom heading as the nav aria-label', () => {
    mockRoute('/blog');
    render(<Pager totalPages={5} heading="Blog pages" />);

    expect(
      screen.getByRole('navigation', { name: 'Blog pages' }),
    ).toBeInTheDocument();
  });

  it('applies modifier classes to the nav element', () => {
    mockRoute('/blog');
    render(<Pager totalPages={5} modifierClasses="custom-class" />);

    expect(screen.getByRole('navigation')).toHaveClass('custom-class');
  });
});

describe('Pager links', () => {
  it('builds page links that preserve the pathname and set the page query param', () => {
    mockRoute('/blog', 'page=1&category=news');
    render(<Pager totalPages={5} />);

    expect(screen.getByRole('link', { name: 'Page 2' })).toHaveAttribute(
      'href',
      '/blog?page=2&category=news',
    );
  });

  it('links previous and next to the adjacent pages', () => {
    mockRoute('/blog', 'page=10');
    render(<Pager totalPages={20} />);

    expect(screen.getByRole('link', { name: /Previous/ })).toHaveAttribute(
      'href',
      '/blog?page=9',
    );
    expect(screen.getByRole('link', { name: /Next/ })).toHaveAttribute(
      'href',
      '/blog?page=11',
    );
  });

  it('links first and last to page 1 and totalPages', () => {
    mockRoute('/blog', 'page=10');
    render(<Pager totalPages={20} />);

    expect(screen.getByRole('link', { name: /First/ })).toHaveAttribute(
      'href',
      '/blog?page=1',
    );
    expect(screen.getByRole('link', { name: /Last/ })).toHaveAttribute(
      'href',
      '/blog?page=20',
    );
  });

  it('falls back to page 1 when there is no page query param', () => {
    mockRoute('/blog');
    render(<Pager totalPages={5} />);

    expect(screen.getByText('Currently on page')).toBeInTheDocument();
  });

  it('builds page links when there are no existing search params', () => {
    mockRoute('/blog');
    render(<Pager totalPages={5} />);

    expect(screen.getByRole('link', { name: 'Page 2' })).toHaveAttribute(
      'href',
      '/blog?page=2',
    );
  });
});
