<script lang="ts">
	import { Subscribe, Render, type HeaderRow } from 'svelte-headless-table';
	import CaretDownIcon from './CaretDownIcon.svelte';
	export let rows: HeaderRow<any, any>[];
</script>

<thead>
	{#each rows as headerRow (headerRow.id)}
		<Subscribe rowAttrs={headerRow.attrs()} let:rowAttrs>
			<tr {...rowAttrs}>
				{#each headerRow.cells as cell (cell.id)}
					<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
						<th {...attrs} on:click={props.sort.toggle}>
							<Render of={cell.render()} />
							{#if props.sort.order !== undefined}
								<CaretDownIcon
									class="transition-transform {props.sort.order === 'desc' && '-scale-y-100'}"
								/>
							{/if}
						</th>
					</Subscribe>
				{/each}
			</tr>
		</Subscribe>
	{/each}
</thead>

<style>
	:global(.transition-transform) {
		transition: transform 200ms ease-in-out;
	}
	:global(.-scale-y-100) {
		transform: scaleY(-1);
	}
</style>
