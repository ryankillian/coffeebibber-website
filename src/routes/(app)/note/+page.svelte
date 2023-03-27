<script lang="ts">
	import TastingNoteTable from '$lib/components/datatable/TastingNoteTable.svelte';
	import Heading from '$lib/components/page/Heading.svelte';
	import SEO from '$lib/components/seo/note/Main.svelte';

	export let data;
	let { tastingNotes } = data;
</script>

<SEO />
<Heading heading={'Browse all tasting notes below'} />
<TastingNoteTable {tastingNotes} />
