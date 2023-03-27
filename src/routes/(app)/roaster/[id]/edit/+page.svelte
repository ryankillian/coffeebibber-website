<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import Input from '$lib/components/form/Input.svelte';
	import type { ActionData } from './$types';
	import toast from 'svelte-french-toast';
	import { goto } from '$app/navigation';
	import Heading from '$lib/components/page/Heading.svelte';
	import SEO from '$lib/components/seo/roaster/Edit.svelte';

	export let form: ActionData;

	export let data;

	const { roaster } = data;

	const submit: SubmitFunction = async ({}) => {
		return ({ result, update }) => {
			if (result.type == 'redirect') {
				toast.success('Roaster updated!');
			}
			update();
		};
	};

	const getUrl = (url: string | null | undefined): string | undefined => {
		if (typeof url === 'string') {
			return url;
		}
		return undefined;
	};
</script>

<SEO />
<Heading heading={'Edit roaster'} />

<form action="?/update" method="POST" use:enhance={submit}>
	<Input
		type="text"
		id="name"
		label="Name *"
		value={form?.data?.name || data?.roaster?.name}
		errors={form?.errors?.name}
		required
	/>
	<Input
		type="text"
		id="country"
		label="Country"
		value={form?.data?.country || data?.roaster?.country}
		errors={form?.errors?.country}
	/>
	<Input
		type="url"
		id="url"
		label="URL"
		value={getUrl(form?.data?.url) || getUrl(data?.roaster?.url)}
		errors={form?.errors?.url}
	/>
	<label for="mailorder">
		<input
			type="checkbox"
			id="mailorder"
			name="mailorder"
			checked={form?.data?.mailorder || data?.roaster?.mailorder}
			role="switch"
		/>
		Mailorder
	</label>
	<label for="subscription">
		<input
			type="checkbox"
			id="subscription"
			name="subscription"
			checked={form?.data?.subscription || data?.roaster?.subscription}
			role="switch"
		/>
		Subscription
	</label>
	<input type="hidden" name="id" value={roaster.id} />
	<button>Update Roaster</button>
</form>
<button on:click={() => goto(`/roaster/${roaster.id}/delete`)}>Delete</button>

<style>
	label {
		margin: 1.5em 0;
	}
</style>
