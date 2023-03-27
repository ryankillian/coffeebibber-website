<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import toast from 'svelte-french-toast';
	import Heading from '$lib/components/page/Heading.svelte';
	import CoffeeDetail from '$lib/components/page/CoffeeDetail.svelte';
	import SEO from '$lib/components/seo/coffee/Delete.svelte';

	export let data;
	const { coffee } = data;

	const submit: SubmitFunction = async ({}) => {
		return ({ result, update }) => {
			if (result.type == 'redirect') {
				toast.success('Coffee deleted. Great!');
			}
			update();
		};
	};

	let toggle = false;
</script>

<SEO />
<Heading heading={'Delete coffee'} />
<CoffeeDetail {coffee} />
<button on:click={() => (toggle = !toggle)}>Delete Coffee?</button>
{#if toggle}
	<form action="?/delete" method="POST" use:enhance={submit}>
		<input type="hidden" name="id" value={coffee.id} />
		<button>Confirm Delete</button>
	</form>
{/if}
