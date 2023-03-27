<script lang="ts">
	import { goto } from '$app/navigation';
	import Input from '$lib/components/form/Input.svelte';
	import Heading from '$lib/components/page/Heading.svelte';
	import SEO from '$lib/components/seo/cultivar/Add.svelte';

	export let data;
	const { cultivar } = data;
</script>

<SEO />
<Heading heading="Cultivar Details" />
<Input type="text" id="name" label="Name " value={cultivar?.name} readonly />
<button on:click={() => goto(`/cultivar/${cultivar?.id}/edit`)}>Edit</button>
