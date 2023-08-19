<script>
	import { writable } from 'svelte/store';

	// #region DEBUG

	/**
	 * @type {import('svelte/store').Writable<boolean>}
	 */
	export let debug = writable(false);
	$: debug;

	// #endregion

	export let tableViewModel;

	const {
		tableAttrs,
		tableHeadAttrs,
		tableBodyAttrs,
		headerRows,
		rows,
		pageRows,
		originalRows,
		visibleColumns,
		flatColumns,
		pluginStates
	} = tableViewModel;

	const { expandedIds, getRowState: getExpandedState } = pluginStates.expanded;
	// const {} = pluginStates.subRows;
	// const {} = pluginStates.grid;
	const { filterValues: colFilterValues, preFilteredRows: preColFilteredRows } =
		pluginStates.columnFilter;
	const { columnIdOrder } = pluginStates.columnOrder;
	const { depth } = pluginStates.flatten;
	const { groupByIds } = pluginStates.group;
	const { hiddenColumnIds } = pluginStates.hidden;
	const { hasNextPage, hasPreviousPage, pageCount, pageIndex, pageSize, serverItemCount } =
		pluginStates.pagination;
	const { columnWidths } = pluginStates.resize;
	const {
		allPageRowsSelected,
		allRowsSelected,
		getRowState: getSelectedState,
		selectedDataIds,
		somePageRowsSelected,
		someRowsSelected
	} = pluginStates.select;
	const { preSortedRows, sortKeys } = pluginStates.sort;
	const { filterValue: tableFilterValue, preFilteredRows: preTabFilteredRows } =
		pluginStates.tableFilter;
</script>

{#if $debug}
	<div class="debug">
		<span>Debug</span>

		<div class="debug__box">
			<pre>$sortKeys = {JSON.stringify($sortKeys, null, 2)}</pre>
			<pre>$selectedDataIds = {JSON.stringify($selectedDataIds, null, 2)}</pre>
			<pre>$hiddenColumnIds = {JSON.stringify($hiddenColumnIds, null, 2)}</pre>
			<pre>$depth = {JSON.stringify($depth, null, 2)}</pre>
			<pre>$columnIdOrder = {JSON.stringify($columnIdOrder, null, 2)}</pre>
			<pre>$groupByIds = {JSON.stringify($groupByIds, null, 2)}</pre>
			<pre>$expandedIds = {JSON.stringify($expandedIds, null, 2)}</pre>
			<pre>$columnWidths = {JSON.stringify($columnWidths, null, 2)}</pre>
			<pre>$colFilterValues = {JSON.stringify($colFilterValues, null, 2)}</pre>
			<pre>$tableFilterValue = {JSON.stringify($tableFilterValue, null, 2)}</pre>
			<pre>{JSON.stringify(
					{
						$pageIndex: $pageIndex,
						$pageCount: $pageCount,
						$pageSize: $pageSize
					},
					null,
					2
				)}</pre>
		</div>
	</div>
{/if}

<style lang="scss">
	:global(html) {
		margin-bottom: 3em;
	}
	.debug {
		// position: relative;
		// width: 100%;
		position: fixed;
		left: 0.5em;
		bottom: 0.5em;
		// margin-top: 1em;
		z-index: 3;

		span {
			padding: 0.5em;
			background: darkgreen;
			border-radius: 0.5em;
		}

		&__box {
			position: absolute;
			top: 0;
			transform: translateY(-100%);
			max-height: 80vh;
			// width: 100%;
			display: none;
			background: darkgreen;
			padding: 1em;
			z-index: 1;
			overflow: auto;
			width: 40vw;

			&,
			pre {
				border-radius: 0.5em;
			}

			:last-child {
				margin-bottom: 0;
			}
		}
		&:hover &__box {
			display: block;
		}
	}
</style>
