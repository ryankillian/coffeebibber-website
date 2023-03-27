<script lang="ts">
	import toast from 'svelte-french-toast';
	import { enhance, type SubmitFunction } from '$app/forms';
	import Input from '$lib/components/form/Input.svelte';
	import Heading from '$lib/components/page/Heading.svelte';
	import SEO from '$lib/components/seo/cultivar/Delete.svelte';

	export let data;

	const { cultivar } = data;

	const submit: SubmitFunction = async ({}) => {
		return ({ result, update }) => {
			if (result.type == 'redirect') {
				toast.success('Cultivar deleted. Great!');
			}
			update();
		};
	};

	let toggle = false;
</script>

<SEO />
<Heading heading={'Delete cultivar'} />
<Input type="text" id="name" label="Name" value={cultivar?.name} readonly />
<button on:click={() => (toggle = !toggle)}>Delete Cultivar?</button>
{#if toggle}
	<form action="?/delete" method="POST" use:enhance={submit}>
		<input type="hidden" name="id" value={cultivar?.id} />
		<button>Confirm Delete</button>
	</form>
{/if}
