// @vitest-environment jsdom
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Accordion from './Accordion';

vi.mock(import('~utility/slide'), () => ({
  slideExpand: vi.fn(),
  slideCollapse: vi.fn(),
}));

function makeItems(count: number, openIndex?: number) {
  return Array.from({ length: count }, (_, index) => ({
    id: `item-${index}`,
    title: `Item ${index}`,
    content: `Content ${index}`,
    isOpen: index === openIndex,
  }));
}

describe('Accordion click behavior', () => {
  it('opens a closed item when its toggle is clicked', () => {
    render(<Accordion accordionItems={makeItems(3)} />);

    fireEvent.click(screen.getByRole('button', { name: 'Item 1' }));

    expect(screen.getByRole('button', { name: 'Item 1' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
  });

  it('closes the previously open item when a different item opens, without allowMultiple', () => {
    render(<Accordion accordionItems={makeItems(3, 0)} />);

    fireEvent.click(screen.getByRole('button', { name: 'Item 1' }));

    expect(screen.getByRole('button', { name: 'Item 0' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
    expect(screen.getByRole('button', { name: 'Item 1' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
  });

  it('leaves other open items alone when allowMultiple is set', () => {
    render(<Accordion accordionItems={makeItems(3, 0)} allowMultiple={true} />);

    fireEvent.click(screen.getByRole('button', { name: 'Item 1' }));

    expect(screen.getByRole('button', { name: 'Item 0' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
    expect(screen.getByRole('button', { name: 'Item 1' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
  });

  it('closes an open item on click when allowToggle is set', () => {
    render(<Accordion accordionItems={makeItems(3, 0)} allowToggle={true} />);

    fireEvent.click(screen.getByRole('button', { name: 'Item 0' }));

    expect(screen.getByRole('button', { name: 'Item 0' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  });

  it('does nothing when clicking an open item without allowToggle', () => {
    render(<Accordion accordionItems={makeItems(3, 0)} />);

    fireEvent.click(screen.getByRole('button', { name: 'Item 0' }));

    expect(screen.getByRole('button', { name: 'Item 0' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
  });
});

describe('Accordion keyboard navigation', () => {
  it('moves focus to the next item on ArrowDown and wraps at the end', () => {
    render(<Accordion accordionItems={makeItems(3)} />);
    const toggles = screen.getAllByRole('button');

    toggles[2].focus();
    fireEvent.keyDown(toggles[2], { key: 'ArrowDown' });

    expect(toggles[0]).toHaveFocus();
  });

  it('moves focus to the previous item on ArrowUp and wraps at the start', () => {
    render(<Accordion accordionItems={makeItems(3)} />);
    const toggles = screen.getAllByRole('button');

    toggles[0].focus();
    fireEvent.keyDown(toggles[0], { key: 'ArrowUp' });

    expect(toggles[2]).toHaveFocus();
  });

  it('moves focus to the first item on Home', () => {
    render(<Accordion accordionItems={makeItems(3)} />);
    const toggles = screen.getAllByRole('button');

    toggles[2].focus();
    fireEvent.keyDown(toggles[2], { key: 'Home' });

    expect(toggles[0]).toHaveFocus();
  });

  it('moves focus to the last item on End', () => {
    render(<Accordion accordionItems={makeItems(3)} />);
    const toggles = screen.getAllByRole('button');

    toggles[0].focus();
    fireEvent.keyDown(toggles[0], { key: 'End' });

    expect(toggles[2]).toHaveFocus();
  });
});
