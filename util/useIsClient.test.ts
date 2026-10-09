// @vitest-environment jsdom
import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import useIsClient from './useIsClient';

describe('useIsClient', () => {
  it('returns true when rendered in a browser-like environment', () => {
    const { result } = renderHook(() => useIsClient());
    expect(result.current).toBe(true);
  });
});
