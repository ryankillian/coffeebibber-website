<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import Input from '$lib/components/form/Input.svelte';
	import type { ActionData } from './$types';
	import toast from 'svelte-french-toast';
	import { goto } from '$app/navigation';
	import Heading from '$lib/components/page/Heading.svelte';
	import SEO from '$lib/components/seo/producer/Edit.svelte';

	export let form: ActionData;

	export let data;

	const { producer } = data;

	const submit: SubmitFunction = async ({}) => {
		return ({ result, update }) => {
			if (result.type == 'redirect') {
				toast.success('Producer updated!');
			}
			update();
		};
	};
</script>

<SEO />
<Heading heading={'Edit producer'} />
<form action="?/update" method="POST" use:enhance={submit}>
	<Input
		type="text"
		id="name"
		label="Name *"
		value={form?.data?.name || producer.name}
		errors={form?.errors?.name}
		required
	/>
	<Input
		type="text"
		id="owner"
		label="Owner"
		value={form?.data?.owner || producer.owner}
		errors={form?.errors?.owner}
	/>
	<Input
		type="text"
		id="address"
		label="Origin | Region | Address"
		value={form?.data?.address || producer.address}
		errors={form?.errors?.address}
	/>
	<Input
		type="text"
		id="country"
		label="Country"
		value={form?.data?.country || producer.country}
		errors={form?.errors?.name}
	/>
	<input type="hidden" name="id" value={producer.id} />
	<button>Update Producer</button>
</form>
<button on:click={() => goto(`/producer/${producer.id}/delete`)}>Delete</button>
