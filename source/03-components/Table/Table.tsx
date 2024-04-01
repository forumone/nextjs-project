import clsx from 'clsx';
import { GessoComponent } from 'gesso';
import {
  DetailedReactHTMLElement,
  HTMLAttributes,
  JSX,
  ReactNode,
} from 'react';

type TableCell =
  | DetailedReactHTMLElement<
      HTMLAttributes<HTMLTableHeaderCellElement>,
      HTMLTableHeaderCellElement
    >
  | DetailedReactHTMLElement<
      HTMLAttributes<HTMLTableDataCellElement>,
      HTMLTableDataCellElement
    >;

interface TableProps extends GessoComponent {
  isScrollable?: boolean;
  isSortable?: boolean;
  caption?: ReactNode;
  header?: TableCell[];
  footer?: TableCell[];
}

function Table({
  caption,
  header,
  footer,
  modifierClasses,
}: TableProps): JSX.Element {
  return (
    <table className={clsx(modifierClasses)}>
      {caption && <caption>{caption}</caption>}
      {header ? (
        <thead>
          <tr>{header.map(cell => cell)}</tr>
        </thead>
      ) : null}
      {footer ? (
        <tfoot>
          <tr>{footer.map(cell => cell)}</tr>
        </tfoot>
      ) : null}
    </table>
  );
}
