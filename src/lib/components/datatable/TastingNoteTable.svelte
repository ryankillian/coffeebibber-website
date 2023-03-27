<script lang="ts">
	import { readable } from 'svelte/store';
	import { createTable } from 'svelte-headless-table';
	import { addSortBy, addPagination, addTableFilter } from 'svelte-headless-table/plugins';
	import TableHead from '../table/TableHead.svelte';
	import TableSearch from '../table/TableSearch.svelte';
	import TableBody from '../table/TableBody.svelte';
	import TablePagination from '../table/TablePagination.svelte';
	import { includesFilter } from './utils';
	import type { TastingNoteExpanded } from '$lib/types';

	export let tastingNotes: TastingNoteExpanded[];
	const data = readable(tastingNotes);

	const table = createTable(data, {
		sort: addSortBy(),
		page: addPagination(),
		tableFilter: addTableFilter({
			fn: includesFilter
		})
	});

	const columns = table.createColumns([
		table.column({
			header: 'Roaster',
			accessor: (data) => data.roaster_name,
			id: 'roaster'
		}),
		table.column({
			header: 'Producer',
			accessor: (data) => data.producer_name,
			id: 'producer'
		}),
		table.column({
			header: 'Cultivar',
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
		}),
		table.column({
			header: 'Rating',
			accessor: (data) => data.rating,
			id: 'rating'
		}),
		table.column({
			header: 'User',
			accessor: (data) => data.user_name,
			id: 'user'
		})
	]);

	const { visibleColumns, headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates } =
		table.createViewModel(columns, {
			rowDataId: (item, _) => item.id
		});

	const { filterValue } = pluginStates.tableFilter;
</script>

<article>
	<figure>
		<TableSearch {filterValue} />
		<table {...$tableAttrs} role="grid">
			<TableHead rows={$headerRows} />
			<TableBody attrs={$tableBodyAttrs} rows={$pageRows} path={'note'} />
		</table>
	</figure>
	<TablePagination rowCount={$data.length} page={pluginStates.page} />
</article>
