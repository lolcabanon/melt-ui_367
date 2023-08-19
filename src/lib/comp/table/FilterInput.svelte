<script>
	import { Search } from 'lucide-svelte';

	/**
	 * @type {string}
	 */
	export let id;
	/**
	 * @type {string | any}
	 */
	export let value;
	/**
	 * @type {string | undefined}
	 */
	export let placeholder = undefined;
</script>

<label for="{id}_filter">
	<input
		type="text"
		name="{id}_filter"
		id="{id}_filter"
		bind:value={$value}
		placeholder={placeholder || 'Rechercher...'}
	/>
	<Search
		size="1em"
		style="position: absolute; right: .5em; height: 100%"
		cursor="text"
		opacity=".5"
	/>
</label>

<style>
	label {
		position: relative;
		display: inline-block;
		width: min(20ch, 100%);
	}
	input {
		margin-bottom: 0;
		width: 100%;
	}
</style>
