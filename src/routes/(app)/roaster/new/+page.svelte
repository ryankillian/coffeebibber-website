<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import Input from '$lib/components/form/Input.svelte';
	import type { ActionData } from './$types';
	import toast from 'svelte-french-toast';
	import Heading from '$lib/components/page/Heading.svelte';
	import SEO from '$lib/components/seo/roaster/Add.svelte';

	export let form: ActionData;

	const submit: SubmitFunction = async ({}) => {
		return ({ result, update }) => {
			if (result.type == 'redirect') {
				toast.success('Roaster created. Great!');
			}
			update();
		};
	};
</script>

<SEO />
<Heading heading={'Add roaster'} subHeading={'Name is a required field'} />

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
		id="country"
		label="Country"
		value={form?.data?.country || ''}
		errors={form?.errors?.country}
	/>
	<Input type="url" id="url" label="URL" value={form?.data?.url || ''} errors={form?.errors?.url} />
	<label for="mailorder">
		<input
			type="checkbox"
			id="mailorder"
			name="mailorder"
			checked={form?.data?.mailorder || true}
			role="switch"
		/>
		Mailorder
	</label>
	<label for="subscription">
		<input
			type="checkbox"
			id="subscription"
			name="subscription"
			checked={form?.data?.subscription || true}
			role="switch"
		/>
		Subscription
	</label>
	<button>Add Roaster</button>
</form>

<style>
	label {
		margin: 1.5em 0;
	}
</style>
