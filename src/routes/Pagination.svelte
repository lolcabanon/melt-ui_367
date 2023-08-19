<script>
	import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-svelte';

	export let pageIndex;
	export let pageCount;

	//  * @type {EventListener}
	//  * @listens MouseEvent
	//  * @type {import('svelte/elements').MouseEventHandler}
	/**
	 * @param {MouseEvent } e
	 */
	function toFirstPage(e) {
		$pageIndex = 0;
	}

	/**
	 * @param {MouseEvent} e
	 */
	function toPreviousPage(e) {
		$pageIndex--;
	}

	/**
	 * @param {number} i
	 */
	function toPage(i) {
		$pageIndex = i;
	}
	/**
	 * @param {MouseEvent } e
	 */
	function toNextPage(e) {
		$pageIndex++;
	}

	/**
	 * @param {MouseEvent} e
	 */
	function toLastPage(e) {
		$pageIndex = $pageCount - 1;
	}
</script>

<div class="pagination">
	<div>
		<button on:click={toFirstPage} disabled={$pageIndex <= 1}>
			<ChevronsLeft size="1em" />
		</button>
		<button on:click={toPreviousPage} disabled={$pageIndex == 0}>
			<ChevronLeft size="1em" />
		</button>
	</div>
	<div>
		<button class="three-dots" disabled={$pageIndex - 3 < 0}>…</button>
		<!-- {#if $pageIndex - 3 >= 0}{:else}
						<button>_</button>
					{/if} -->

		{#if $pageIndex - 2 >= 0}
			<button on:click={() => toPage($pageIndex - 2)}>
				{$pageIndex - 1}
			</button>
		{:else}
			<button disabled>∴</button>
		{/if}

		{#if $pageIndex - 1 >= 0}
			<button on:click={() => toPage($pageIndex - 1)}>
				{$pageIndex}
			</button>
		{:else}
			<button disabled>∴</button>
		{/if}

		<button class="current-page">
			{$pageIndex + 1}
		</button>

		{#if $pageIndex < $pageCount - 1}
			<button on:click={() => toPage($pageIndex + 1)}>
				{$pageIndex + 2}
			</button>
		{:else}
			<button disabled>∴</button>
		{/if}

		{#if $pageIndex < $pageCount - 2}
			<button on:click={() => toPage($pageIndex + 2)}>
				{$pageIndex + 3}
			</button>
		{:else}
			<button disabled>∴</button>
		{/if}

		<button class="three-dots" disabled={$pageIndex >= $pageCount - 3}>…</button>
		<!-- {#if $pageIndex < $pageCount - 3}{:else}
						<button>_</button>
					{/if} -->
	</div>
	<div>
		<button on:click={toNextPage} disabled={$pageIndex == $pageCount - 1}>
			<ChevronRight size="1em" />
		</button>

		<button on:click={toLastPage} disabled={$pageIndex >= $pageCount - 2}>
			<ChevronsRight size="1em" />
		</button>
	</div>
</div>

<style lang="scss">
	.pagination {
		margin-top: 0.5em;
		display: flex;
		justify-content: space-between;

		button {
			font-family: monospace;
			font-weight: bold;
			// font-size: 1.2em;
			// border-radius: 0.25em;
			background-color: var(--color-blossom);
			color: var(--color-bg);
			border: none;

			&.three-dots,
			&.current-page,
			&:disabled {
				pointer-events: none;
			}
			&:not(.current-page) {
				background-color: var(--color-text);
				color: var(--color-bg);
			}

			&:disabled {
				background-color: dimgrey;
				color: black;
			}
		}
	}
</style>
