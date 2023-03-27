<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import Input from '$lib/components/form/Input.svelte';
	import type { ActionData } from './$types';
	import toast from 'svelte-french-toast';
	import Heading from '$lib/components/page/Heading.svelte';
	import SEO from '$lib/components/seo/cultivar/Add.svelte';

	export let form: ActionData;

	const submit: SubmitFunction = async ({}) => {
		return ({ result, update }) => {
			if (result.type == 'redirect') {
				toast.success('Cultivar created. Great!');
			}
			update();
		};
	};
</script>

<SEO />
<Heading heading={'Add cultivar'} subHeading={'Name is a required field'} />
<form action="?/create" method="POST" use:enhance={submit}>
	<Input
		type="text"
		id="name"
		label="Name *"
		value={form?.data?.name || ''}
		errors={form?.errors?.name}
		required
	/>
	<button>Add Cultivar</button>
</form>
