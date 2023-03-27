<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { Subscribe, Render, type BodyCell } from 'svelte-headless-table';
	import { goto } from '$app/navigation';
	export let attrs: HTMLAttributes<HTMLTableRowElement>;
	export let cells: BodyCell<any, any>[];
	export let path: string;
</script>

<tr
	{...attrs}
	on:click={() => {
		goto(path);
	}}
>
	{#each cells as cell (cell.id)}
		<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
			<td {...attrs} class:matches={props.tableFilter.matches}>
				<Render of={cell.render()} />
			</td>
		</Subscribe>
	{/each}
</tr>

<style>
	tr {
		cursor: pointer;
	}
</style>
