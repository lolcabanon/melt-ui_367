<script>
	/**
	 * @type {string | undefined}
	 */
	export let href = undefined;
	/**
	 * @type {string}
	 */
	export let src;
	/**
	 * @type {string}
	 */
	export let alt;
</script>

<li>
	{#if href}
		<a {href}>
			<img {src} {alt} />
		</a>
	{:else}
		<img {src} {alt} />
	{/if}
</li>

<style>
	li {
		margin-bottom: 0;
		display: inline-flex;
	}

	a {
		display: inline-flex;
		background: white;
		border-radius: 0.2em;
	}

	img {
		/* max-width: 4em; */
		width: auto;
		max-height: 2em;
		height: auto;
		margin-bottom: 0;
		padding: 0.2em;
	}
</style>
