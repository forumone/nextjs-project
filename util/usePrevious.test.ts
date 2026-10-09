// @vitest-environment jsdom
import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import usePrevious from './usePrevious';

describe('usePrevious', () => {
  it('returns null on initial render', () => {
    const { result } = renderHook(() => usePrevious('a'));
    expect(result.current).toBeNull();
  });

  it('returns the previous value after the value changes', () => {
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: 'a' },
    });

    rerender({ value: 'b' });
    expect(result.current).toBe('a');

    rerender({ value: 'c' });
    expect(result.current).toBe('b');
  });

  it('does not update when the value stays the same', () => {
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: 'a' },
    });

    rerender({ value: 'a' });
    expect(result.current).toBeNull();
  });
});
