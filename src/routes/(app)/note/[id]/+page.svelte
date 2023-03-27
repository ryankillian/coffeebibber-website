<script lang="ts">
	import { goto } from '$app/navigation';
	import Input from '$lib/components/form/Input.svelte';
	import InputNumeric from '$lib/components/form/InputNumeric.svelte';
	import TextArea from '$lib/components/form/TextArea.svelte';
	import Heading from '$lib/components/page/Heading.svelte';
	import TastingNoteHeader from '$lib/components/page/TastingNoteHeader.svelte';
	import SEO from '$lib/components/seo/note/Details.svelte';

	export let data;
	let { tastingNote } = data;
</script>

<SEO />
<Heading heading={'Tasting note details'} />
<TastingNoteHeader note={tastingNote} />
<InputNumeric id="rating" label="Rating" value={String(tastingNote?.rating)} readonly />
<Input type="text" id="tagline" label="Tagline" value={tastingNote?.tagline} readonly />
<TextArea id="detail" label="Tasting note" value={tastingNote?.detail} readonly />
<button on:click={() => goto(`/note/${tastingNote.id}/edit`)}>Edit</button>
