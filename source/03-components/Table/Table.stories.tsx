import { Meta, StoryObj } from '@storybook/react';
import clsx from 'clsx';
import { useMemo, useState } from 'react';
import { withGlobalWrapper } from '../../../.storybook/decorators';
import SiteContainer from '../../02-layouts/SiteContainer/SiteContainer';
import SortableHeader from './SortableHeader';
import tableData from './table.data.yml';
import styles from './table.module.css';

type ExampleData = {
  city: string;
  country: string;
  population: number;
};

const settings: Meta<{
  isScrollable?: boolean;
  caption?: string;
  data: ExampleData[];
}> = {
  title: 'Components/Table',
  decorators: [
    Story => (
      <SiteContainer>
        <Story />
      </SiteContainer>
    ),
    withGlobalWrapper,
  ],
  args: {
    isScrollable: false,
    caption: 'Table caption',
  },
  argTypes: {
    isScrollable: {
      type: 'boolean',
    },
    caption: {
      type: 'string',
    },
  },
  parameters: {
    controls: {
      include: ['isScrollable', 'caption'],
    },
  },
  tags: ['autodocs'],
};

type Story = StoryObj<{
  isScrollable?: boolean;
  caption?: string;
  data: ExampleData[];
}>;

const Default: Story = {
  render: ({ isScrollable, caption, data }) => {
    return (
      <table
        className={clsx({
          [styles['is-scrollable']]: isScrollable,
        })}
      >
        {caption && <caption>{caption}</caption>}
        <thead>
          <tr>
            <th scope="col">City</th>
            <th scope="col">Country</th>
            <th scope="col">Population</th>
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr key={row.city}>
              <td>{row.city}</td>
              <td>{row.country}</td>
              <td>{Number(row.population).toLocaleString('en-US')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  },
  args: {
    ...tableData,
  },
};

const Sortable: Story = {
  render: function SortableTable({ isScrollable, caption, data }) {
    const [sortColumn, setSortColumn] = useState<
      'city' | 'country' | 'population' | undefined
    >(undefined);
    const [sortDirection, setSortDirection] = useState<
      'ascending' | 'descending'
    >('ascending');
    const sortedData = useMemo(
      () =>
        sortColumn
          ? [...data].sort((thisRow, nextRow) => {
              const cellA =
                sortDirection === 'ascending'
                  ? thisRow[sortColumn]
                  : nextRow[sortColumn];
              const cellB =
                sortDirection === 'ascending'
                  ? nextRow[sortColumn]
                  : thisRow[sortColumn];
              if (typeof cellA === 'number' && typeof cellB === 'number') {
                return cellA - cellB;
              }
              return cellA.toString().localeCompare(cellB.toString());
            })
          : data,
      [data, sortColumn, sortDirection],
    );

    const updateSort = (newSortColumn: string) => {
      if (sortColumn === newSortColumn) {
        setSortDirection(prevState =>
          prevState === 'ascending' ? 'descending' : 'ascending',
        );
      } else {
        setSortColumn(newSortColumn as 'city' | 'country' | 'population');
        setSortDirection('ascending');
      }
    };

    return (
      <>
        <table
          className={clsx(styles['is-sortable'], {
            [styles['is-scrollable']]: isScrollable,
          })}
        >
          {caption && <caption>{caption}</caption>}
          <thead>
            <tr>
              <SortableHeader
                key="city"
                column="city"
                label="City"
                updateSort={updateSort}
                direction={sortColumn === 'city' ? sortDirection : undefined}
              />
              <SortableHeader
                key="country"
                column="country"
                label="Country"
                updateSort={updateSort}
                direction={sortColumn === 'country' ? sortDirection : undefined}
              />
              <SortableHeader
                key="population"
                column="population"
                label="Population"
                updateSort={updateSort}
                direction={
                  sortColumn === 'population' ? sortDirection : undefined
                }
              />
            </tr>
          </thead>
          <tbody>
            {sortedData.map(row => (
              <tr key={row.city}>
                <td>{row.city}</td>
                <td>{row.country}</td>
                <td>{Number(row.population).toLocaleString('en-US')}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles['announcement-region']} aria-live="polite">
          {sortColumn
            ? `The table ${caption && `named "${caption}"`} is now sorted by
          ${sortColumn} in ${sortDirection} order.`
            : ''}
        </div>
      </>
    );
  },
  args: {
    ...tableData,
  },
};

export default settings;
export { Default, Sortable };
