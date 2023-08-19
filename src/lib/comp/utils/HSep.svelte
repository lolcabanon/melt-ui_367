<script>
	import { createSeparator } from '@melt-ui/svelte';

	const { root: horizontalSeparator } = createSeparator({
		orientation: 'horizontal',
		decorative: true
	});
</script>

<!-- ! sep w conditional slot -->
<div melt={$horizontalSeparator} class="sep-ctn w-full">
	<span class="sep-ctn-elem" />
	{#if $$slots.default}
		<span class="sep-txt"><slot /></span>
	{/if}
	<span class="sep-ctn-elem" />
</div>

<!-- #region TESTING -->

<!-- 
<p>sep w default slot</p>
<div class="sep-ctn w-full">
	<span melt={$horizontalSeparator} class="my-3.5 h-[1px] bg-white sep-ctn-elem" />
	<slot />
	<span melt={$horizontalSeparator} class="my-3.5 h-[1px] bg-white sep-ctn-elem" />
</div>
-->

<!-- 
<p>sep w conditional slot</p>
<div class="sep-ctn w-full">
	<span melt={$horizontalSeparator} class="my-3.5 h-[1px] bg-white sep-ctn-elem" />
	{#if $$slots.default}
		<span class="sep-txt"><slot /></span>
	{/if}
	<span melt={$horizontalSeparator} class="my-3.5 h-[1px] bg-white sep-ctn-elem" />
</div>
-->

<!-- 
<p>sep w text prop</p>
<div class="sep-ctn w-full">
	<span melt={$horizontalSeparator} class="my-3.5 h-[1px] bg-white sep-ctn-elem" />
	{#if text}
		<span class="sep-txt">
			{text}
		</span>
	{/if}
	<span melt={$horizontalSeparator} class="my-3.5 h-[1px] bg-white sep-ctn-elem" />
</div>
-->

<!-- 
<p>sep w named slot</p>
<div class="sep-ctn w-full">
	<span melt={$horizontalSeparator} class="my-3.5 h-[1px] bg-white sep-ctn-elem" />
	<slot name="txt" />
	<span melt={$horizontalSeparator} class="my-3.5 h-[1px] bg-white sep-ctn-elem" />
</div>
 -->

<!-- <div {...$horizontalSeparator} use:horizontalSeparator class="my-3.5 h-[1px] w-full bg-white" /> -->

<!-- #endregion -->

<style>
	.sep-ctn {
		display: flex;
		align-items: center;
		margin-block: 1em;
	}
	.sep-ctn-elem {
		height: 1px;
		flex: 1;
		background-color: var(--sep-bg-color, currentColor);
	}
	.sep-txt {
		display: inline-flex;
		align-items: center;
		gap: 0.5em;
		padding-inline: 1em;
		color: var(--sep-text-color, currentColor);
		opacity: 0.5;
	}
</style>
