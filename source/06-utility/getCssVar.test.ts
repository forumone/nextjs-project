// @vitest-environment jsdom
import { afterEach, describe, expect, it } from 'vitest';
import getCssVar from './getCssVar';

describe('getCssVar', () => {
  afterEach(() => {
    document.body.removeAttribute('style');
  });

  it('returns the value of a custom property set on the body', () => {
    document.body.style.setProperty('--color-primary', '#ff0000');
    expect(getCssVar('color-primary')).toBe('#ff0000');
  });

  it('returns an empty string when the property is not set', () => {
    expect(getCssVar('does-not-exist')).toBe('');
  });
});
