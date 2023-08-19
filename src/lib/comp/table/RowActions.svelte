<script>
	import { ExternalLink } from 'lucide-svelte';

	/**
	 * @type {string | number}
	 */
	export let id;
	/**
	 * @type {function | undefined}
	 * @param {string | number} id
	 */
	export let callback = undefined;
</script>

<button
	on:click={() => {
		if (callback) callback(id);
	}}
>
	<ExternalLink />
</button>

<style>
	button {
		background: none;
		padding: 0 0.2em;
		color: currentColor;
		font-size: 1.2em;
		border: none;
		cursor: default;
		/* border-color: currentColor; */
		/* border-radius: 0.2em; */
	}
</style>
