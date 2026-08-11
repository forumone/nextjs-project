// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { slideCollapse, slideExpand, slideToggle } from './slide';

function flushRaf() {
  vi.runAllTimers();
}

let matchMediaMatches = false;

beforeEach(() => {
  matchMediaMatches = false;
  vi.useFakeTimers();
  vi.stubGlobal(
    'requestAnimationFrame',
    (callback: FrameRequestCallback) =>
      setTimeout(() => callback(0), 0) as unknown as number,
  );
  vi.stubGlobal(
    'matchMedia',
    vi.fn().mockImplementation(() => ({
      get matches() {
        return matchMediaMatches;
      },
    })),
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  vi.useRealTimers();
});

function fireTransitionEnd(target: HTMLElement) {
  target.dispatchEvent(new Event('transitionend'));
}

describe('slideCollapse', () => {
  it('hides the target and dispatches finishslider when the transition ends', () => {
    const target = document.createElement('div');
    document.body.appendChild(target);
    const onFinish = vi.fn();
    target.addEventListener('finishslider', onFinish);

    slideCollapse(target, '200ms', 'ease-in-out', true);
    flushRaf();
    flushRaf();

    expect(target.style.height).toBe('0px');
    fireTransitionEnd(target);

    expect(target.style.display).toBe('none');
    expect(target.style.height).toBe('');
    expect(onFinish).toHaveBeenCalledTimes(1);
  });

  it('collapses to max-height 0 without hiding content when hideContent is false', () => {
    const target = document.createElement('div');
    document.body.appendChild(target);

    slideCollapse(target, '200ms', 'ease-in-out', false);
    flushRaf();
    flushRaf();
    fireTransitionEnd(target);

    expect(target.style.maxHeight).toBe('0px');
    expect(target.style.display).toBe('');
  });

  it('uses a 1ms duration when the user prefers reduced motion', () => {
    matchMediaMatches = true;
    const target = document.createElement('div');
    document.body.appendChild(target);

    slideCollapse(target, '200ms', 'ease-in-out', true);
    flushRaf();

    expect(target.style.transitionDuration).toBe('1ms');
  });
});

describe('slideExpand', () => {
  it('reveals the target and dispatches finishslider when the transition ends', () => {
    const target = document.createElement('div');
    target.style.display = 'none';
    document.body.appendChild(target);
    const onFinish = vi.fn();
    target.addEventListener('finishslider', onFinish);

    slideExpand(target, '200ms', 'ease-in-out', true);
    flushRaf();
    flushRaf();

    expect(target.style.display).not.toBe('none');
    fireTransitionEnd(target);

    expect(target.style.height).toBe('');
    expect(onFinish).toHaveBeenCalledTimes(1);
  });

  it('removes max-height and overflow when hideContent is false', () => {
    const target = document.createElement('div');
    target.style.maxHeight = '0px';
    document.body.appendChild(target);

    slideExpand(target, '200ms', 'ease-in-out', false);
    flushRaf();
    flushRaf();
    fireTransitionEnd(target);

    expect(target.style.maxHeight).toBe('');
    expect(target.style.overflow).toBe('');
  });
});

describe('slideToggle', () => {
  it('expands a hidden target', () => {
    const target = document.createElement('div');
    target.style.display = 'none';
    document.body.appendChild(target);

    slideToggle(target, '200ms', 'ease-in-out', true);

    expect(target.dataset.isSliding).toBe('true');
    flushRaf();
    flushRaf();
    fireTransitionEnd(target);

    expect(target.dataset.isSliding).toBeUndefined();
    expect(target.style.display).not.toBe('none');
  });

  it('collapses a visible target', () => {
    const target = document.createElement('div');
    document.body.appendChild(target);

    slideToggle(target, '200ms', 'ease-in-out', true);

    expect(target.dataset.isSliding).toBe('true');
    flushRaf();
    flushRaf();
    fireTransitionEnd(target);

    expect(target.style.display).toBe('none');
  });

  it('does nothing while a slide is already in progress', () => {
    const target = document.createElement('div');
    document.body.appendChild(target);
    target.dataset.isSliding = 'true';

    slideToggle(target, '200ms', 'ease-in-out', true);
    flushRaf();

    expect(target.style.transitionProperty).toBe('');
  });
});
