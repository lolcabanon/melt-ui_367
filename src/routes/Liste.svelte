<script>
	import {
		Search,
		ArrowUpDown,
		ArrowDownNarrowWide,
		ArrowUpWideNarrow,
		Group,
		Ungroup,
		ExternalLink
	} from 'lucide-svelte';
	import { Render, Subscribe } from 'svelte-headless-table';
	import { getTableViewModel } from './getTableViewModel';
	import Pagination from './Pagination.svelte';
	import ListeDebug from './ListeDebug.svelte';
	import { writable } from 'svelte/store';

	/**
	 * @type {import('svelte/store').Writable<boolean>}
	 */
	export let debug = writable(false);

	/**
	 * @type {Object.<string, any>[]}
	 */
	export let tabledata;

	/**
	 * @type {string}
	 */
	export let tableTitle = 'Table';

	const tableViewModel = getTableViewModel(tabledata);

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

	/**
	 * @type {string}
	 */
	let strPageSize = $pageSize.toString();
	$: $pageSize = Number(strPageSize);
</script>

<ListeDebug {tableViewModel} {debug} />

<h2>{tableTitle}</h2>

<div class="report">
	<p>@melt-ui tester :</p>

	Click on the <ExternalLink /> icon to open row actions (the infamous <u>Popover</u>).<br />
</div>

<header class="table-header">
	<span>
		Combien par page?
		<select bind:value={strPageSize}>
			<option value="5">5</option>
			<option value="10">10</option>
			<option value="15">15</option>
			<option value="20">20</option>
			<option value="25">25</option>
			<option value="30">30</option>
		</select>
	</span>
	<span>
		<label for="tableSearch">
			<Search size="1em" />
			<input
				type="text"
				id="tableSearch"
				bind:value={$tableFilterValue}
				placeholder="Recherche globale..."
			/>
		</label>
	</span>
</header>
<div class="table-wrapper">
	<table {...$tableAttrs}>
		<thead {...$tableHeadAttrs}>
			{#each $headerRows as headerRow (headerRow.id)}
				<Subscribe
					hrowAttrs={headerRow.attrs()}
					let:hrowAttrs
					hrowProps={headerRow.props()}
					let:hrowProps
				>
					<tr {...hrowAttrs}>
						<!-- <th>#</th> -->
						{#each headerRow.cells as cell (cell.id)}
							<Subscribe
								hcellAttrs={cell.attrs()}
								let:hcellAttrs
								hcellProps={cell.props()}
								let:hcellProps
							>
								<th {...hcellAttrs} use:hcellProps.resize>
									{#if !hcellProps.resize.disabled}
										<div class="resizer" use:hcellProps.resize.drag />
									{/if}

									{#if cell.isData()}
										<div class="header-cell-wrapper">
											<div>
												<button title="Trier" on:click={hcellProps.sort.toggle}>
													{#if hcellProps.sort.order === 'asc'}
														<!-- <SortAsc /> -->
														<ArrowDownNarrowWide size=".8em" />
													{:else if hcellProps.sort.order === 'desc'}
														<!-- <SortDesc size=".8em" /> -->
														<ArrowUpWideNarrow size=".8em" />
													{:else}
														<ArrowUpDown size=".8em" />
													{/if}
												</button>

												<Render of={cell.render()} />
											</div>

											{#if cell.isData() && !hcellProps.group.disabled}
												<button
													title={hcellProps.group.grouped ? 'Dégrouper' : 'Grouper'}
													on:click={hcellProps.group.toggle}
												>
													{#if hcellProps.group.grouped}
														<Ungroup size=".8em" />
													{:else}
														<Group size=".8em" />
													{/if}
												</button>
											{/if}
										</div>
									{:else}
										<Render of={cell.render()} />
									{/if}
								</th>
							</Subscribe>
						{/each}
					</tr>
					<tr {...hrowAttrs}>
						{#each headerRow.cells as cell (cell.id)}
							<Subscribe
								hcellAttrs={cell.attrs()}
								let:hcellAttrs
								hcellProps={cell.props()}
								let:hcellProps
							>
								<th {...hcellAttrs}>
									{#if hcellProps.columnFilter}
										<Render of={hcellProps.columnFilter.render} />
									{/if}
								</th>
							</Subscribe>
						{/each}
					</tr>
				</Subscribe>
			{/each}
		</thead>
		<tbody {...$tableBodyAttrs}>
			{#each $pageRows as pageRow, i (pageRow.id)}
				<Subscribe
					pageRowAttrs={pageRow.attrs()}
					let:pageRowAttrs
					pageRowProps={pageRow.props()}
					let:pageRowProps
				>
					<tr
						{...pageRowAttrs}
						data-row-index={i}
						on:click={() => {
							// pluginStates.select.getRowState(pageRow).isSelected.set(!pageRowProps.select.selected);
							// // pageRowProps.select.selected = !pageRowProps.select.selected;
							// alert(`clicked! selected:${pageRowProps.select.selected}`);
							// showModal(pageRow.id);
							console.log('row clicked :', pageRow.id);
						}}
					>
						<!-- <td>{i + 1}</td> -->
						{#each pageRow.cells as cell (cell.id)}
							<Subscribe
								cellAttrs={cell.attrs()}
								let:cellAttrs
								cellProps={cell.props()}
								let:cellProps
							>
								<td
									{...cellAttrs}
									class:match={cellProps.tableFilter.matches}
									class:datacell={cell.isData()}
								>
									<Render of={cell.render()} />
								</td>
							</Subscribe>
						{/each}
					</tr>
				</Subscribe>
			{/each}

			{#each Array($pageSize - $pageRows.length) as _, index}
				<tr class="padding-row" data-row-index={$pageRows.length + index + 1} />
			{/each}
		</tbody>
	</table>
</div>

<Pagination {pageIndex} {pageCount} />

<style lang="scss">
	.report {
		display: inline-block;
		border: 2px solid pink;
		padding: 1em;
		margin: 0.5em 0.5em 1em;
		border-radius: 0.5em;

		p {
			font-size: 1.2em;
		}
	}

	.table-wrapper {
		border: 3px solid var(--color-bg-alt);
		border-radius: 0.5em;
		overflow-x: auto;
	}

	.table-header {
		display: flex;
		justify-content: space-between;
	}

	#tableSearch {
		min-width: min(30ch, 20vw);
	}

	table {
		justify-content: start;
		// border: 4px solid red;
		padding: 0 0.5em;

		// @include scrollbar(var(--color-bg), var(--color-bg-alt), 0.5);

		thead,
		tbody {
			button {
				background: none;
				padding: 0 0.2em;
				color: currentColor;
				font-size: 1.2em;
				border-color: currentColor;
				border-radius: 0.2em;
			}
		}

		thead tr {
			--row-bg-color: var(--color-bg);
			--row-bg-color-alt: var(--color-bg);
		}

		tbody tr {
			--row-bg-color: var(--color-bg-alt);
			--row-bg-color-alt: var(--color-bg);

			&:nth-child(odd) {
				--row-bg-color: var(--color-bg);
				--row-bg-color-alt: var(--color-bg-alt);
			}

			td {
				background-color: var(--row-bg-color);

				&.datacell:not(:last-child) {
					border-right: 2px solid var(--row-bg-color-alt);
				}
			}
		}

		td,
		th {
			&:nth-child(1),
			&:nth-child(2),
			&:nth-child(3) {
				position: sticky;
				background-color: var(--row-bg-color, white);

				z-index: 2;
			}

			&:nth-child(1) {
				left: -2px;
			}
			&:nth-child(2) {
				left: 38px;
				// border-right: 0.2em solid var(--row-bg-color-alt) inset;
				// box-shadow: -0.2em 0 0 0 var(--row-bg-color-alt) inset;
			}
			&:nth-child(3) {
				left: 78px;
				box-shadow: -0.2em 0 0 0 var(--row-bg-color-alt) inset;
			}
		}
	}

	.header-cell-wrapper {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 1em;
	}

	th {
		position: relative;
	}

	.resizer {
		position: absolute;
		top: 0;
		bottom: 0;
		right: -1px;
		width: 3px;
		// background: lightgray;
		background: var(--color-bg-alt);
		// background: none;
		border-radius: 0.4em;
		cursor: col-resize;
		z-index: 1;

		&:hover {
			background: var(--color-blossom);
			width: 6px;
		}
	}

	td.match {
		color: red;
	}

	.padding-row {
		min-height: 3em;
		grid-column-start: 1;
		grid-column-end: -1;
	}
</style>
