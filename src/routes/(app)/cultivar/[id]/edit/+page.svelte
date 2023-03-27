<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import Input from '$lib/components/form/Input.svelte';
	import type { ActionData } from './$types';
	import toast from 'svelte-french-toast';
	import { goto } from '$app/navigation';
	import Heading from '$lib/components/page/Heading.svelte';
	import SEO from '$lib/components/seo/cultivar/Details.svelte';

	export let form: ActionData;

	export let data;

	const { cultivar } = data;

	const submit: SubmitFunction = async ({}) => {
		return ({ result, update }) => {
			if (result.type == 'redirect') {
				toast.success('Cultivar updated. Great!');
			}
			update();
		};
	};
</script>

<SEO />
<Heading heading={'Edit cultivar'} />
<form action="?/update" method="POST" use:enhance={submit}>
	<Input
		type="text"
		id="name"
		label="Name *"
		value={form?.data?.name || cultivar?.name}
		errors={form?.errors?.name}
		required
	/>
	<input type="hidden" name="id" value={cultivar?.id} />
	<button>Update Cultivar</button>
</form>
<button on:click={() => goto(`/cultivar/${cultivar?.id}/delete`)}>Delete</button>
