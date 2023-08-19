<script>
	import { writable } from 'svelte/store';
	import Liste from './Liste.svelte';

	const tabledata = [
		{
			id: 1,
			firstname: 'John',
			lastname: 'Smith'
		},
		{
			id: 2,
			firstname: 'Johnny',
			lastname: 'Smithy'
		},
		{
			id: 3,
			firstname: 'Alex',
			lastname: 'Sander'
		},
		{
			id: 4,
			firstname: 'Alex',
			lastname: 'Trem'
		},
		{
			id: 5,
			firstname: 'Sam',
			lastname: 'Sung'
		}
	];
</script>

<Liste {tabledata} tableTitle="List of something" debug={writable(true)} />
