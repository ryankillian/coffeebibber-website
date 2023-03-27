<script lang="ts">
	import { readable } from 'svelte/store';
	import { createTable } from 'svelte-headless-table';
	import { addSortBy, addPagination, addTableFilter } from 'svelte-headless-table/plugins';
	import type { CultivarDTO } from '$lib/types';
	import Pagination from '../table/TablePagination.svelte';
	import TableHead from '../table/TableHead.svelte';
	import TableSearch from '../table/TableSearch.svelte';
	import TableBody from '../table/TableBody.svelte';
	import { includesFilter } from './utils';

	export let cultivars: CultivarDTO[] = [];
	const data = readable(cultivars);

	const table = createTable(data, {
		sort: addSortBy(),
		page: addPagination(),
		tableFilter: addTableFilter({
			fn: includesFilter
		})
	});

	const columns = table.createColumns([
		table.column({
			header: 'Cultivar Name',
			accessor: (data: CultivarDTO) => data.name,
			id: 'cultivar'
		})
	]);

	const { visibleColumns, headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates } =
		table.createViewModel(columns, {
			rowDataId: (item, index) => item.id
		});
	const { filterValue } = pluginStates.tableFilter;
</script>

<article>
	<figure>
		<TableSearch {filterValue} />
		<table {...$tableAttrs} role="grid">
			<TableHead rows={$headerRows} />
			<TableBody attrs={$tableBodyAttrs} rows={$pageRows} path={'cultivar'} />
		</table>
	</figure>
	<Pagination rowCount={$data.length} page={pluginStates.page} />
</article>
