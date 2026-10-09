import { describe, expect, it } from 'vitest';
import entityIsType from './entityIsType';

describe('entityIsType', () => {
  it('returns true when __typename matches', () => {
    const entity = { __typename: 'Article' };
    expect(entityIsType(entity, 'Article')).toBe(true);
  });

  it('returns false when __typename does not match', () => {
    const entity = { __typename: 'Page' };
    expect(entityIsType(entity, 'Article')).toBe(false);
  });

  it('returns false when __typename is undefined', () => {
    const entity = {};
    expect(entityIsType(entity, 'Article')).toBe(false);
  });
});
