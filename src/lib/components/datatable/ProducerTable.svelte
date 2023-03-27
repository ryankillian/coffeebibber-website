<script lang="ts">
	import { readable } from 'svelte/store';
	import { createTable } from 'svelte-headless-table';
	import { addSortBy, addPagination, addTableFilter } from 'svelte-headless-table/plugins';
	import type { ProducerDTO } from '$lib/types';
	import TableHead from '../table/TableHead.svelte';
	import TableSearch from '../table/TableSearch.svelte';
	import TableBody from '../table/TableBody.svelte';
	import TablePagination from '../table/TablePagination.svelte';
	import { includesFilter } from './utils';

	export let path = 'producer';
	export let producers: ProducerDTO[];
	const data = readable(producers);

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
			header: 'Owner',
			accessor: (data) => data.owner,
			id: 'owner'
		}),
		table.column({
			header: 'Address',
			accessor: (data) => data.address,
			id: 'address'
		}),
		table.column({
			header: 'Country',
			accessor: (data) => data.country,
			id: 'country'
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
			<TableBody attrs={$tableBodyAttrs} rows={$pageRows} {path} />
		</table>
	</figure>
	<TablePagination rowCount={$data.length} page={pluginStates.page} />
</article>
