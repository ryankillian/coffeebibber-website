<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import Input from '$lib/components/form/Input.svelte';
	import Heading from '$lib/components/page/Heading.svelte';
	import SEO from '$lib/components/seo/roaster/Delete.svelte';
	import toast from 'svelte-french-toast';

	export let data;

	const { roaster } = data;

	const submit: SubmitFunction = async ({}) => {
		return ({ result, update }) => {
			if (result.type == 'redirect') {
				toast.success('Roaster deleted!');
			}
			update();
		};
	};

	let toggle = false;
</script>

<SEO />
<Heading heading={'Delete roaster'} />

<Input type="text" id="name" label="Name" value={roaster.name} readonly />
<button on:click={() => (toggle = !toggle)}>Delete Roaster?</button>
{#if toggle}
	<form action="?/delete" method="POST" use:enhance={submit}>
		<input type="hidden" name="id" value={roaster.id} />
		<button>Confirm Delete</button>
	</form>
{/if}
