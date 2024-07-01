import { JSX, MouseEvent } from 'react';
import Sort from '../../01-global/icon/icons/Sort';
import Sorted from '../../01-global/icon/icons/Sorted';
import styles from './table.module.css';

interface SortableHeaderProps {
  column: string;
  label: string;
  direction?: 'ascending' | 'descending';
  updateSort: (newSortColumn: string) => void;
}

function SortableHeader({
  column,
  label,
  direction,
  updateSort,
}: SortableHeaderProps): JSX.Element {
  const Icon = direction ? Sorted : Sort;

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    updateSort(column);
  };

  return (
    <th
      scope="col"
      data-sortable={true}
      aria-label={`${label}, sortable column, currently ${direction ? `sorted ${direction}` : 'unsorted'}`}
      aria-sort={direction}
    >
      <div className={styles['header-inner']}>
        {label}
        <button
          className={styles['header-button']}
          onClick={handleClick}
          type="button"
          title={`Click to sort by ${label} in ${direction === 'ascending' ? 'descending' : 'ascending'} order.`}
        >
          <Icon isHidden={true} />
        </button>
      </div>
    </th>
  );
}

export default SortableHeader;
