<script lang="ts">
	import { goto } from '$app/navigation';
	import Heading from '$lib/components/page/Heading.svelte';
	import TastingNoteHeader from '$lib/components/page/TastingNoteHeader.svelte';
	import { dayFormat, formatDate, timeFormat } from '$lib/utils';
	import type { PageData } from './$types';

	export let data: PageData;
	const { tastingNotes } = data;
</script>

{#if tastingNotes.length > 0}
	{#each tastingNotes as note}
		<article>
			<TastingNoteHeader {note} />

			<p>
				<a href={`/note/${note.id}`}
					>{note.rating}
					{note.tagline}</a
				>
			</p>
			<p>{note.detail}</p>
			<p>
				{formatDate(note.updated, timeFormat)}
			</p>
		</article>
	{/each}
{:else}
	<p>Not tasting notes found</p>
{/if}
