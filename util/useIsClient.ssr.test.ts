// @vitest-environment node
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import useIsClient from './useIsClient';

function TestComponent() {
  return createElement('span', null, String(useIsClient()));
}

describe('useIsClient (server-side rendering)', () => {
  it('returns false when rendered outside a browser environment', () => {
    const html = renderToString(createElement(TestComponent));
    expect(html).toContain('false');
  });
});
