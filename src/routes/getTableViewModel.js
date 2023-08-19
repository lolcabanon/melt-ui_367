import { createRender, createTable } from 'svelte-headless-table';
import RowActions from '$lib/comp/table/RowActions.svelte';
import FilterInput from '$lib/comp/table/FilterInput.svelte';
import * as TablePlugins from 'svelte-headless-table/plugins';
import { readable } from 'svelte/store';
import ActionsPopover from './ActionsPopover.svelte';

export const getTableViewModel = (data) => {
  const CELL_WIDTH = {
    SHORT: 40,
    MED: 140,
    LARGE: 180,
    MAX: 240
  };

  const table = createTable(readable(data), {
    columnFilter: TablePlugins.addColumnFilters(),
    tableFilter: TablePlugins.addTableFilter({
      fn: ({ filterValue, value }) => {
        return value.toLowerCase().includes(filterValue.toLowerCase());
      }
    }),
    select: TablePlugins.addSelectedRows(),
    group: TablePlugins.addGroupBy({
      disableMultiGroup: true
    }),
    sort: TablePlugins.addSortBy(),
    columnOrder: TablePlugins.addColumnOrder(),
    hidden: TablePlugins.addHiddenColumns(),
    pagination: TablePlugins.addPagination({
      initialPageSize: 5
    }),
    expanded: TablePlugins.addExpandedRows(),
    resize: TablePlugins.addResizedColumns(),
    grid: TablePlugins.addGridLayout(),
    flatten: TablePlugins.addFlatten()
  });

  const columns = table.createColumns([
    table.display({
      id: 'actions',
      header: createRender(RowActions, {
        id: ''
      }),
      cell: ({ row }, { pluginStates }) => {
        return createRender(ActionsPopover, {
          item: data[Number(row.id)]
        });
      },

      plugins: {
        sort: { disable: false, getSortValue: (x) => x },
        resize: {
          disable: true,
          initialWidth: CELL_WIDTH.SHORT
        }
      }
    }),

    table.column({
      header: 'First name',
      accessor: 'firstname',
      plugins: {
        columnFilter: {
          fn: ({ filterValue, value }) => {
            return value.toLowerCase().includes(filterValue.toLowerCase());
          },
          render: (renderProps) =>
            createRender(FilterInput, {
              id: renderProps.id,
              value: renderProps.filterValue
            })
        },
        group: {
          disable: true,
          getAggregateValue: (value) =>
            `${value.length} resident${value.length > 1 ? 's' : ''}`
        },
        resize: {
          initialWidth: CELL_WIDTH.MAX,
          minWidth: CELL_WIDTH.MED
        }
      }
    }),

    table.column({
      header: 'Last name',
      accessor: 'lastname',
      plugins: {
        columnFilter: {
          fn: ({ filterValue, value }) => {
            return value.toLowerCase().includes(filterValue.toLowerCase());
          },
          render: (renderProps) =>
            createRender(FilterInput, {
              id: renderProps.id,
              value: renderProps.filterValue
            })
        },
        group: {
          disable: true
        },
        resize: {
          initialWidth: CELL_WIDTH.MAX,
          minWidth: CELL_WIDTH.MED
        }
      }
    })
  ]);

  const tableViewModel = table.createViewModel(columns, {
    rowDataId: (item, index) => item.id.toString()
  });

  return tableViewModel;
};
