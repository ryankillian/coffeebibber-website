<script lang="ts">
	import { goto } from '$app/navigation';
	import CoffeeDetail from '$lib/components/page/CoffeeDetail.svelte';
	import Heading from '$lib/components/page/Heading.svelte';
	import SEO from '$lib/components/seo/coffee/Details.svelte';
	import { formatDate, timeFormat } from '$lib/utils';

	export let data;
	const { coffee, tastingNotes } = data;
</script>

<SEO />
<Heading heading={'Coffee details'} />
<CoffeeDetail {coffee} />
<button on:click={() => goto(`/note/new?selected=${coffee.id}`)}>Add Tasting Note</button>

{#if tastingNotes && tastingNotes.length > 0}
	<article>
		<h3>Tasting notes</h3>
		{#each tastingNotes as note}
			<article class="note-container">
				<div>
					<a href={`/note/${note.id}`}>{note.rating} points! {note.tagline} by {note.user_name}</a>
				</div>
				<div>{note.detail}</div>
				<div>
					{formatDate(note.updated, timeFormat)}
				</div>
			</article>
		{/each}
	</article>
{:else}
	No tasting notes found.
	<button on:click={() => goto(`/coffee/${coffee.id}/delete`)}>Delete Coffee</button>
{/if}

<style>
	.note-container {
		display: flex;
		flex-direction: column;
		gap: 0.3em;
	}
</style>
