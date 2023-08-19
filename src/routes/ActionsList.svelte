<script>
	import SampleButton from '$lib/comp/utils/SampleButton.svelte';

	/**
	 * @type {string | number | bigint}
	 */
	export let id;
</script>

<ul>
	<li>
		<SampleButton notab={true}>
			<a href="/action1/{id}">Action 1</a>
		</SampleButton>
	</li>
	<li>
		<SampleButton notab={true}>
			<a href="/action2/{id}">Action 2</a>
		</SampleButton>
	</li>
	<li>
		<SampleButton notab={true}>
			<a href="/action3/{id}">Action 3</a>
		</SampleButton>
	</li>
</ul>

<style lang="scss">
	ul {
		list-style-type: none;
		padding: 0;
	}
	a {
		position: relative;
		display: inline-block;
		min-width: 30ch;
		padding: 0.2em;
		font-size: 1.4em;
	}
</style>
