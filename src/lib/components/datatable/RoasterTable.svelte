<script lang="ts">
	import { readable } from 'svelte/store';
	import { createTable } from 'svelte-headless-table';
	import { addSortBy, addPagination, addTableFilter } from 'svelte-headless-table/plugins';
	import type { RoasterDTO } from '$lib/types';
	import { includesFilter } from './utils';
	import TableHead from '../table/TableHead.svelte';
	import TableSearch from '../table/TableSearch.svelte';
	import TableBody from '../table/TableBody.svelte';
	import TablePagination from '../table/TablePagination.svelte';

	export let roasters: RoasterDTO[];
	const data = readable(roasters);

	const table = createTable(data, {
		sort: addSortBy(),
		page: addPagination(),
		tableFilter: addTableFilter({
			fn: includesFilter
		})
	});

	const columns = table.createColumns([
		table.column({
			header: 'Name',
			accessor: (data) => data.name,
			id: 'name'
		}),
		table.column({
			header: 'Country',
			accessor: (data) => data.country,
			id: 'country'
		})
	]);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates } = table.createViewModel(
		columns,
		{
			rowDataId: (item, _) => item.id
		}
	);
	const { filterValue } = pluginStates.tableFilter;
</script>

<article>
	<figure>
		<TableSearch {filterValue} />
		<table {...$tableAttrs} role="grid">
			<TableHead rows={$headerRows} />
			<TableBody attrs={$tableBodyAttrs} rows={$pageRows} path={'roaster'} />
		</table>
	</figure>
	<TablePagination rowCount={$data.length} page={pluginStates.page} />
</article>
