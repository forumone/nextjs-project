// @vitest-environment jsdom
import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Modal from './Modal';

afterEach(() => {
  document.body.innerHTML = '';
});

beforeEach(() => {
  HTMLDialogElement.prototype.showModal = vi.fn(function (
    this: HTMLDialogElement,
  ) {
    this.setAttribute('open', '');
  });
  HTMLDialogElement.prototype.close = vi.fn(function (this: HTMLDialogElement) {
    this.removeAttribute('open');
  });
  document.body.classList.remove('has-open-modal');
});

describe('Modal opening', () => {
  it('does not open by default', () => {
    render(<Modal id="test">Content</Modal>);

    expect(HTMLDialogElement.prototype.showModal).not.toHaveBeenCalled();
    expect(document.body).not.toHaveClass('has-open-modal');
  });

  it('opens automatically when defaultOpen is set', () => {
    render(
      <Modal id="test" defaultOpen={true}>
        Content
      </Modal>,
    );

    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();
    expect(document.body).toHaveClass('has-open-modal');
  });

  it('opens when a control button with matching aria-controls is clicked', () => {
    document.body.insertAdjacentHTML(
      'beforeend',
      '<button aria-controls="modal-test">Open</button>',
    );
    render(<Modal id="test">Content</Modal>);

    fireEvent.click(screen.getByRole('button', { name: 'Open' }));

    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();
    expect(document.body).toHaveClass('has-open-modal');
  });
});

describe('Modal closing', () => {
  it('closes when the close button is clicked', () => {
    render(
      <Modal id="test" defaultOpen={true}>
        Content
      </Modal>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Close modal' }));

    expect(HTMLDialogElement.prototype.close).toHaveBeenCalled();
    expect(document.body).not.toHaveClass('has-open-modal');
  });

  it('closes when the overlay (outside the inner content) is clicked', () => {
    render(
      <Modal id="test" defaultOpen={true}>
        Content
      </Modal>,
    );

    fireEvent.click(screen.getByRole('dialog', { hidden: true }));

    expect(HTMLDialogElement.prototype.close).toHaveBeenCalled();
  });

  it('does not close when clicking inside the inner content', () => {
    render(
      <Modal id="test" defaultOpen={true}>
        <button>Inside</button>
      </Modal>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Inside' }));

    expect(HTMLDialogElement.prototype.close).not.toHaveBeenCalled();
  });

  it('closes when Escape is pressed', () => {
    render(
      <Modal id="test" defaultOpen={true}>
        Content
      </Modal>,
    );

    fireEvent.keyDown(screen.getByRole('dialog', { hidden: true }), {
      key: 'Escape',
    });

    expect(HTMLDialogElement.prototype.close).toHaveBeenCalled();
  });
});

describe('Modal rendering', () => {
  it('renders the title when provided', () => {
    render(
      <Modal id="test" title="My title">
        Content
      </Modal>,
    );

    expect(
      screen.getByRole('heading', { name: 'My title', hidden: true }),
    ).toBeInTheDocument();
  });

  it('does not render a title heading when title is omitted', () => {
    render(<Modal id="test">Content</Modal>);

    expect(
      screen.queryByRole('heading', { hidden: true }),
    ).not.toBeInTheDocument();
  });

  it('renders children content', () => {
    render(
      <Modal id="test">
        <p>Modal body</p>
      </Modal>,
    );

    expect(screen.getByText('Modal body')).toBeInTheDocument();
  });

  it('applies modifier classes to the dialog', () => {
    render(
      <Modal id="test" modifierClasses="custom-class">
        Content
      </Modal>,
    );

    expect(screen.getByRole('dialog', { hidden: true })).toHaveClass(
      'custom-class',
    );
  });

  it('uses the provided id to build element ids', () => {
    render(
      <Modal id="custom-id" title="Title">
        Content
      </Modal>,
    );

    expect(screen.getByRole('dialog', { hidden: true })).toHaveAttribute(
      'id',
      'modal-custom-id',
    );
  });
});
