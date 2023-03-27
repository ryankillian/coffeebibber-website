<script lang="ts">
	import { goto } from '$app/navigation';
	import Input from '$lib/components/form/Input.svelte';
	import Heading from '$lib/components/page/Heading.svelte';
	import SEO from '$lib/components/seo/roaster/Details.svelte';

	export let data;
	const { roaster } = data;
</script>

<SEO />
<Heading heading={'Roaster details'} />
<Input type="text" id="name" label="Name" value={data?.roaster?.name || ''} readonly />
<Input type="text" id="country" label="Country" value={data?.roaster?.country || ''} readonly />
<Input type="url" id="url" label="URL" value={data?.roaster?.url || ''} readonly />

<label for="mailorder">
	<input
		type="checkbox"
		id="mailorder"
		name="mailorder"
		checked={data?.roaster?.mailorder}
		role="switch"
	/>
	Mailorder</label
>
<label for="subscription">
	<input
		type="checkbox"
		id="subscription"
		name="subscription"
		checked={data?.roaster?.subscription}
		role="switch"
	/>
	Subscription
</label>

<button on:click={() => goto(`/roaster/${roaster.id}/edit`)}>Edit Roaster Details</button>

<style>
	label {
		margin: 1.5em 0;
	}
</style>
