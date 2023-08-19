<script>
	import '../app.scss';
	import '../app.postcss';

	import GlobalFooter from '$lib/comp/global/GlobalFooter.svelte';
	import GlobalHeader from '$lib/comp/global/GlobalHeader.svelte';
</script>

<GlobalHeader />

<main>
	<slot />
</main>

<GlobalFooter />

<style>
	main {
		flex: 1;
	}
</style>
