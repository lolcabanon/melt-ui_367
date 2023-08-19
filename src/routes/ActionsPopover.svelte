<script>
	import { createPopover, melt } from '@melt-ui/svelte';
	import { ExternalLink, Settings2, X } from 'lucide-svelte';
	import ActionsList from './ActionsList.svelte';

	/**
	 * @type {{
	 			id: number
				firstname: string
				lastname: string
			}}
	 */
	export let item;

	const {
		elements: { trigger, content, arrow, close },
		states: { open }
	} = createPopover({
		positioning: {
			placement: 'right'
		},
		arrowSize: 48,
		preventScroll: true
	});
</script>

<button use:melt={$trigger}>
	<ExternalLink />
</button>

{#if $open}
	<div use:melt={$content} class="popover__content">
		<div use:melt={$arrow} />

		<h3>{item.firstname} {item.lastname}</h3>

		<h4>Forms</h4>

		<ActionsList id={item.id} />

		<button class="close" use:melt={$close}>
			<X />
		</button>
	</div>
{/if}

<style lang="scss">
	button {
		background: none;
		padding: 0 0.2em;
		color: currentColor;
		font-size: 1.2em;
		border: none;
	}
	.popover__content {
		z-index: 50;

		max-height: 85vh;
		width: 90vw;
		max-width: 80ch;

		border: 2px solid var(--color-bg-alt);
		border-radius: 0.5em;
		background: var(--color-bg);
		color: var(--text-color);
		text-align: center;
	}
	[data-melt-popover-arrow] {
		border-left: inherit;
		border-top: inherit;
	}
	.close {
		position: absolute;
		top: 0.5em;
		right: 0.5em;
		border-radius: 0.5em;
	}
</style>
