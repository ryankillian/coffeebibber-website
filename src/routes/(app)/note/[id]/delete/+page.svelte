<script lang="ts">
	import Input from '$lib/components/form/Input.svelte';
	import { enhance, type SubmitFunction } from '$app/forms';
	import toast from 'svelte-french-toast';
	import InputNumeric from '$lib/components/form/InputNumeric.svelte';
	import TextArea from '$lib/components/form/TextArea.svelte';
	import Heading from '$lib/components/page/Heading.svelte';
	import TastingNoteHeader from '$lib/components/page/TastingNoteHeader.svelte';
	import SEO from '$lib/components/seo/note/Delete.svelte';

	export let data;
	const { tastingNote } = data;

	const submit: SubmitFunction = async ({}) => {
		return ({ result, update }) => {
			if (result.type == 'redirect') {
				toast.success('Tasting note deleted!');
			}
			update();
		};
	};

	let toggle = false;
</script>

<SEO />
<Heading heading={'Delete tasting note'} />

<TastingNoteHeader note={tastingNote} />

<InputNumeric id="rating" label="Rating" value={String(tastingNote?.rating)} />
<Input type="text" id="tagline" label="Tagline" value={tastingNote?.tagline} />
<TextArea id="detail" label="Tasting note" value={tastingNote?.detail} />
<button on:click={() => (toggle = !toggle)}>Delete Tasting Note?</button>
{#if toggle}
	<form action="?/delete" method="POST" use:enhance={submit}>
		<input type="hidden" name="id" value={tastingNote.id} />
		<button>Confirm Delete</button>
	</form>
{/if}
