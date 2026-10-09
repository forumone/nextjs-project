// @vitest-environment jsdom
import { afterEach, describe, expect, it } from 'vitest';
import getCssVariables from './getCssVariables';

function addStyleSheet(css: string) {
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
  return style;
}

afterEach(() => {
  document.querySelectorAll('style').forEach(style => style.remove());
});

describe('getCssVariables', () => {
  it('returns an empty array when there are no style sheets', () => {
    expect(getCssVariables()).toEqual([]);
  });

  it('returns an empty array when a style sheet has no custom properties', () => {
    addStyleSheet('.foo { color: red; }');
    expect(getCssVariables()).toEqual([]);
  });

  it('extracts custom properties from a top-level rule', () => {
    addStyleSheet(':root { --color-primary: #ff0000; --spacing-sm: 4px; }');
    expect(getCssVariables()).toEqual([
      ['--color-primary', '#ff0000'],
      ['--spacing-sm', '4px'],
    ]);
  });

  it('ignores non-custom properties on the same rule', () => {
    addStyleSheet(':root { color: red; --color-primary: #ff0000; }');
    expect(getCssVariables()).toEqual([['--color-primary', '#ff0000']]);
  });

  it('extracts custom properties nested inside a grouping rule such as a media query', () => {
    addStyleSheet('@media (min-width: 768px) { :root { --spacing-md: 8px; } }');
    expect(getCssVariables()).toEqual([['--spacing-md', '8px']]);
  });

  it('combines custom properties across multiple style sheets', () => {
    addStyleSheet(':root { --color-primary: #ff0000; }');
    addStyleSheet(':root { --color-secondary: #00ff00; }');
    expect(getCssVariables()).toEqual([
      ['--color-primary', '#ff0000'],
      ['--color-secondary', '#00ff00'],
    ]);
  });

  it('combines custom properties from multiple rules within the same style sheet', () => {
    addStyleSheet(
      ':root { --color-primary: #ff0000; } .foo { --color-secondary: #00ff00; }',
    );
    expect(getCssVariables()).toEqual([
      ['--color-primary', '#ff0000'],
      ['--color-secondary', '#00ff00'],
    ]);
  });
});
