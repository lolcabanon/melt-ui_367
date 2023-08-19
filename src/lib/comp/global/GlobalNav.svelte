<script>
	import GlobalNavLink from './GlobalNavLink.svelte';
	import GlobalNavLogo from './GlobalNavLogo.svelte';

	/**
	 * @typedef {{href: string, label: string, after?: string, disabled?: boolean}} NavLink
	 */

	/**
	 * @typedef {Object} NavLinkBis
	 * @property {string} href
	 * @property {string} label
	 * @property {string} [after]
	 * @property {boolean} [disabled]
	 */

	/**
	 * @type {NavLink[]}
	 */
	const navlinks = [
		{
			href: '/',
			label: 'Datatable'
		}
	];
</script>

<nav>
	<ul>
		<GlobalNavLogo src="" alt="Logo" href="#" />

		{#each navlinks as { href, label, after, disabled }}
			<GlobalNavLink {href} {label} {after} {disabled} />
		{/each}
	</ul>
</nav>

<style>
	ul {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 1em;
		margin: 0;
		padding: 0;
	}
</style>
