<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import Input from '$lib/components/form/Input.svelte';
	import Heading from '$lib/components/page/Heading.svelte';
	import SEO from '$lib/components/seo/producer/Delete.svelte';
	import toast from 'svelte-french-toast';

	export let data;

	const { producer } = data;

	const submit: SubmitFunction = async ({}) => {
		return ({ result, update }) => {
			if (result.type == 'redirect') {
				toast.success('Producer deleted!');
			}
			update();
		};
	};

	let toggle = false;
</script>

<SEO />
<Heading heading={'Delete producer'} />
<Input type="text" id="name" label="Name" value={producer.name} readonly />
<button on:click={() => (toggle = !toggle)}>Delete Producer?</button>
{#if toggle}
	<form action="?/delete" method="POST" use:enhance={submit}>
		<input type="hidden" name="id" value={producer.id} />
		<button>Confirm Delete</button>
	</form>
{/if}
