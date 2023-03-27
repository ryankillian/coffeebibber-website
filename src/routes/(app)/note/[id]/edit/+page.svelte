<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import { goto } from '$app/navigation';
	import Input from '$lib/components/form/Input.svelte';
	import InputNumeric from '$lib/components/form/InputNumeric.svelte';
	import TextArea from '$lib/components/form/TextArea.svelte';
	import Heading from '$lib/components/page/Heading.svelte';
	import TastingNoteHeader from '$lib/components/page/TastingNoteHeader.svelte';
	import SEO from '$lib/components/seo/note/Edit.svelte';
	import toast from 'svelte-french-toast';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	let { tastingNote, user } = data;

	export let form: ActionData;

	const submit: SubmitFunction = async ({}) => {
		return ({ result, update }) => {
			if (result.type == 'redirect') {
				toast.success('Tasting note updated!');
			}
			update();
		};
	};
</script>

<SEO />
<Heading heading={'Edit tasting note'} />
<TastingNoteHeader note={tastingNote} />
{#if user?.username != tastingNote.user_name}
	<p>Only the original tasting note author can edit this tasting note.</p>
{:else}
	<form action="?/update" method="POST" use:enhance={submit}>
		<InputNumeric
			id="rating"
			label="Rating"
			value={form?.data?.rating ? String(form?.data?.rating) : String(tastingNote?.rating)}
			errors={form?.errors.rating}
		/>
		<Input
			type="text"
			id="tagline"
			label="Tagline"
			value={form?.data.tagline || tastingNote?.tagline}
			errors={form?.errors.tagline}
		/>
		<TextArea
			id="detail"
			label="Tasting note"
			value={form?.data.detail || tastingNote?.detail}
			errors={form?.errors.detail}
		/>
		<button>Edit</button>
	</form>

	<button on:click={() => goto(`/note/${tastingNote.id}/delete`)}>Delete</button>
{/if}
