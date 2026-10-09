import { describe, expect, it } from 'vitest';
import generatePagination from './generatePagination';

describe('generatePagination', () => {
  it('shows all pages without ellipsis when total pages is within the display limit', () => {
    expect(generatePagination(1, 5)).toEqual({
      previous: undefined,
      next: 2,
      pages: [1, 2, 3, 4, 5],
    });
  });

  it('omits the previous link on the first page and the next link on the last page', () => {
    expect(generatePagination(1, 3).previous).toBeUndefined();
    expect(generatePagination(3, 3).next).toBeUndefined();
  });

  it('shows a trailing ellipsis and last page when near the start of a long list', () => {
    expect(generatePagination(1, 10)).toEqual({
      previous: undefined,
      next: 2,
      pages: [1, 2, 3, '...'],
      last: 10,
    });
  });

  it('shows a leading ellipsis and first page when near the end of a long list', () => {
    expect(generatePagination(10, 10)).toEqual({
      previous: 9,
      next: undefined,
      first: 1,
      pages: ['...', 8, 9, 10],
    });
  });

  it('shows ellipses on both sides when in the middle of a long list', () => {
    expect(generatePagination(5, 10)).toEqual({
      previous: 4,
      next: 6,
      first: 1,
      pages: ['...', 4, 5, 6, '...'],
      last: 10,
    });
  });

  it('respects custom displayAllPages and pagesToShow options', () => {
    expect(
      generatePagination(1, 4, { displayAllPages: 3, pagesToShow: 2 }),
    ).toEqual({
      previous: undefined,
      next: 2,
      pages: [1, 2, '...'],
      last: 4,
    });
  });
});
