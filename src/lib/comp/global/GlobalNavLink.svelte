<script>
	import { ExternalLink } from 'lucide-svelte';

	export let href = '#';
	export let label = '#';
	/**
	 * @type {string | undefined}
	 */
	export let after = undefined;

	/**
	 * @type {boolean}
	 */
	export let disabled = false;
</script>

{#if !disabled}
	<li>
		<a class="nav__link" {href}>
			{label}
		</a>
		{#if after}
			<a class="after" href={after} target="_blank"><ExternalLink size="1em" /></a>
		{/if}
	</li>
{/if}

<style>
	/* li {
		display: flex;
		align-items: center;
	} */
	li {
		margin-bottom: 0;
	}

	a.nav__link {
		padding: 0.5em;
	}
	/* a.after {
		font-size: 0.5em;
	} */
</style>
