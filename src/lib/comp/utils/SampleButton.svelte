<script>
	export let text = '';
	export let notab = false;
</script>

<button tabindex={notab ? -1 : null}>
	{text}
	<slot />
</button>

<style>
	button {
		display: inline-flex;
		background: var(--color-bg-alt);
		border-radius: 0.5em;
	}
</style>
