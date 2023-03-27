<script lang="ts">
	import { goto } from '$app/navigation';
	import Heading from '$lib/components/page/Heading.svelte';
	import SEO from '$lib/components/seo/pc/Add.svelte';

	export let data;
	let { producers } = data;

	function handleOptionSelection(event: Event) {
		const selectedOption = (event.target as HTMLSelectElement).value;
		goto(`/pc/${selectedOption}`);
	}
</script>

<SEO />
<Heading heading={'Choose a producer'} subHeading={'To view their cultivars'} />
<select on:change={handleOptionSelection}>
	<option value="">{`-- Please choose a producer --`}</option>
	{#each producers as producer}
		<option value={producer.id}>{producer.name}</option>
	{/each}
</select>
