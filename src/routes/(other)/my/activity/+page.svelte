<script lang="ts">
	import type { LogRecord } from '$lib/types';
	import {
		COFFEE,
		CREATE,
		CULTIVAR,
		DELETE,
		formatDate,
		PRODUCER,
		PRODUCER_CULTIVAR,
		ROASTER,
		TASTING_NOTE,
		timeFormat,
		UPDATE
	} from '$lib/utils';
	import type { PageData } from './$types';

	export let data: PageData;
	const { records } = data;

	function getTableName(name: string) {
		let displayName = '';
		switch (name) {
			case ROASTER:
				displayName = 'Roaster';
				break;
			case CULTIVAR:
				displayName = 'Cultivar';
				break;
			case PRODUCER:
				displayName = 'Producer';
				break;
			case PRODUCER_CULTIVAR:
				displayName = 'Producers Cultivars';
				break;
			case COFFEE:
				displayName = 'Coffee';
				break;
			case TASTING_NOTE:
				displayName = 'Tasting note';
				break;
		}
		return displayName;
	}

	function getEventName(name: string) {
		let displayName = '';
		switch (name) {
			case CREATE:
				displayName = 'created';
				break;
			case UPDATE:
				displayName = 'updated';
				break;
			case DELETE:
				displayName = 'deleted';
				break;
		}
		return displayName;
	}

	function getLink(item: LogRecord) {
		let link = item.record_id;
		switch (item.table_name) {
			case ROASTER:
				link = '/roaster/' + item.record_id;
				break;
			case CULTIVAR:
				link = '/cultivar/' + item.record_id;
				break;
			case PRODUCER:
				link = '/producer/' + item.record_id;
				break;
			case PRODUCER_CULTIVAR:
				link = '/pc/';
				break;
			case COFFEE:
				link = '/coffee/' + item.record_id;
				break;
			case TASTING_NOTE:
				link = '/note/' + item.record_id;
				break;
		}
		return link;
	}
</script>

{#if records.length > 0}
	<article>
		<p>A total of {records.length} activities.</p>
		<p>
			{records.filter((x) => x.event_type === CREATE).length} creations. {records.filter(
				(x) => x.event_type === UPDATE
			).length} updates. {records.filter((x) => x.event_type === DELETE).length} deletions.
		</p>
	</article>
	{#each records as item}
		<article>
			<p>
				<a href={getLink(item)}>{getTableName(item.table_name)} {getEventName(item.event_type)}</a>
			</p>
			<p>
				{formatDate(item.updated, timeFormat)}
			</p>
		</article>
	{/each}
{:else}
	<p>Not activities found</p>
{/if}
