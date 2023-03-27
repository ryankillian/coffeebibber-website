<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import Input from '$lib/components/form/Input.svelte';
	import type { ActionData } from './$types';
	import toast from 'svelte-french-toast';
	import Heading from '$lib/components/page/Heading.svelte';
	import SEO from '$lib/components/seo/producer/Add.svelte';

	export let form: ActionData;

	const submit: SubmitFunction = async ({}) => {
		return ({ result, update }) => {
			if (result.type == 'redirect') {
				toast.success('Producer created. Great!');
			}
			update();
		};
	};
</script>

<SEO />
<Heading heading={'Add producer'} subHeading={'Name is a required field'} />
<form action="?/create" method="POST" use:enhance={submit}>
	<Input
		type="text"
		id="name"
		label="Name *"
		value={form?.data?.name || ''}
		errors={form?.errors?.name}
		required
	/>
	<Input
		type="text"
		id="owner"
		label="Owner"
		value={form?.data?.owner || ''}
		errors={form?.errors?.owner}
	/>
	<Input
		type="text"
		id="address"
		label="Origin | Region | Address"
		value={form?.data?.address || ''}
		errors={form?.errors?.address}
	/>
	<Input
		type="text"
		id="country"
		label="Country"
		value={form?.data?.country || ''}
		errors={form?.errors?.country}
	/>
	<button>Add Producer</button>
</form>
