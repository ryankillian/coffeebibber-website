<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import Input from '$lib/components/form/Input.svelte';
	import InputNumeric from '$lib/components/form/InputNumeric.svelte';
	import TextArea from '$lib/components/form/TextArea.svelte';
	import toast from 'svelte-french-toast';
	import type { ActionData } from './$types';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import Heading from '$lib/components/page/Heading.svelte';
	import SEO from '$lib/components/seo/note/Add.svelte';

	let selectedOption = '';

	if (browser) {
		onMount(() => {
			selectedOption = $page.url.searchParams.get('selected') || '';
		});
	}

	export let data;
	let { coffees } = data;

	export let form: ActionData;

	const submit: SubmitFunction = async ({}) => {
		return ({ result, update }) => {
			if (result.type == 'redirect') {
				if (result.location != '/login') {
					toast.success('Tasting note created!');
				}
			}
			update();
		};
	};
</script>

<SEO />
<Heading heading={'Add tasting note'} subHeading={'Rating is a required field'} />

<form action="?/create" method="POST" use:enhance={submit}>
	<label for="coffee">Choose a coffee *</label>
	<select id="coffee" name="coffee">
		{#each coffees as coffee}
			<option value={coffee.id} selected={selectedOption == coffee.id}
				>{coffee.roaster_name}
				{coffee.producer_name}
				{coffee.cultivar_name}
				{coffee.harvest_date}</option
			>
		{/each}
	</select>
	<InputNumeric id="rating" label="Rating (0-100) *" required />
	<Input
		type="text"
		id="tagline"
		label="Tagline (e.g Sweet!)"
		value={form?.data?.tagline || ''}
		errors={form?.errors?.tagline}
	/>
	<TextArea
		id="detail"
		label="Tasting note"
		value={form?.data?.detail || ''}
		errors={form?.errors?.detail}
	/>
	<button>Add Note</button>
</form>
