import { describe, expect, it } from 'vitest';
import addBasePath from './addBasePath';

describe('addBasePath', () => {
  it('prepends the path with a leading slash when no basePath is set', () => {
    expect(addBasePath('foo')).toBe('/foo');
  });

  it('collapses duplicate slashes between basePath and path', () => {
    expect(addBasePath('/foo')).toBe('/foo');
  });

  it('handles nested paths', () => {
    expect(addBasePath('foo/bar')).toBe('/foo/bar');
  });

  it('handles an empty path', () => {
    expect(addBasePath('')).toBe('/');
  });
});
