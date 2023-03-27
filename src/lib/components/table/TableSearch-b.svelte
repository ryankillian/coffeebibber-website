<script lang="ts">
	import type { Writable } from 'svelte/store';

	export let filterValue: Writable<string>;
	export let colspan: number;
</script>

<tr>
	<th {colspan}>
		<input type="text" bind:value={$filterValue} placeholder="Search rows..." />
	</th>
</tr>
