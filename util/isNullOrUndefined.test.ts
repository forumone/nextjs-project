import { describe, expect, it } from 'vitest';
import isNullOrUndefined, { isNotNullNorUndefined } from './isNullOrUndefined';

describe('isNullOrUndefined', () => {
  it('returns true for null', () => {
    expect(isNullOrUndefined(null)).toBe(true);
  });

  it('returns true for undefined', () => {
    expect(isNullOrUndefined(undefined)).toBe(true);
  });

  it.each([0, '', false, NaN, 'value', {}, [], 42])(
    'returns false for %p',
    value => {
      expect(isNullOrUndefined(value)).toBe(false);
    },
  );
});

describe('isNotNullNorUndefined', () => {
  it('returns false for null', () => {
    expect(isNotNullNorUndefined(null)).toBe(false);
  });

  it('returns false for undefined', () => {
    expect(isNotNullNorUndefined(undefined)).toBe(false);
  });

  it.each([0, '', false, NaN, 'value', {}, [], 42])(
    'returns true for %p',
    value => {
      expect(isNotNullNorUndefined(value)).toBe(true);
    },
  );
});
