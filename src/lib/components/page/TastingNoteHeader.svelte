<script lang="ts">
	import { goto } from '$app/navigation';
	import type { TastingNoteExpanded } from '$lib/types';

	export let note: TastingNoteExpanded;
</script>

<button class="contrast" on:click={() => goto(`/coffee/${note.coffee_id}`)}>
	{note?.roaster_name} - {note?.producer_name} - {note?.cultivar_name}
	{note?.harvest_date}
</button>
