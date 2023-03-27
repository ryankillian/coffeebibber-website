<script lang="ts">
	import { readable } from 'svelte/store';
	import { createTable } from 'svelte-headless-table';
	import { addSortBy, addPagination, addTableFilter } from 'svelte-headless-table/plugins';
	import type { CultivarsForProducer } from '$lib/types';
	import TableHead from '../table/TableHead.svelte';
	import TableSearch from '../table/TableSearch.svelte';
	import TableBody from '../table/TableBody.svelte';
	import TablePagination from '../table/TablePagination.svelte';
	import { includesFilter } from './utils';

	export let path = '/pc';
	export let producerId: string;
	export let cultivars: CultivarsForProducer[];

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
			accessor: (data) => data.cultivar_name,
			id: 'cultivar-name'
		}),
		table.column({
			header: 'Harvest Date',
			accessor: (data) => data.harvest_date,
			id: 'harvest-date',
			plugins: {
				sort: {
					getSortValue: (value) => {
						const date = new Date(value);
						return isNaN(date.getTime()) ? '' : date.toISOString();
					}
				}
			}
		})
	]);

	const { visibleColumns, headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates } =
		table.createViewModel(columns, {
			rowDataId: (item, index) => producerId
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
