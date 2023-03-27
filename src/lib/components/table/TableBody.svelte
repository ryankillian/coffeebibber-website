<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { Render, Subscribe, type BodyRow } from 'svelte-headless-table';
	import { goto } from '$app/navigation';
	import TableRow from './TableRow.svelte';
	export let attrs: HTMLAttributes<HTMLTableSectionElement>;
	export let rows: BodyRow<any, any>[];
	export let path: string;
</script>

<!-- <tbody {...attrs}>
	{#each rows as row (row.id)}
		<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
			<tr
				{...rowAttrs}
				on:click={() => {
					if (row.isData()) {
						goto(`/${path}/${row.dataId}`);
					}
				}}
			>
				{#each row.cells as cell (cell.id)}
					<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
						<td {...attrs} class:matches={props.tableFilter.matches}>
							<Render of={cell.render()} />
						</td>
					</Subscribe>
				{/each}
			</tr>
		</Subscribe>
	{/each}
</tbody> -->

<tbody {...attrs}>
	{#each rows as row (row.id)}
		<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
			<TableRow
				attrs={rowAttrs}
				cells={row.cells}
				path={row.isData() ? `${path}/${row.dataId}` : '/'}
			/>
		</Subscribe>
	{/each}
</tbody>

<!-- <style>
	tbody tr {
		cursor: pointer;
	}
</style> -->
