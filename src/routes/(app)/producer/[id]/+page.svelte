<script lang="ts">
	import { goto } from '$app/navigation';
	import ProducerCultivarsTable from '$lib/components/datatable/ProducerCultivarsTable.svelte';
	import Input from '$lib/components/form/Input.svelte';
	import Heading from '$lib/components/page/Heading.svelte';
	import SEO from '$lib/components/seo/producer/Details.svelte';

	export let data;
	const { producer, producerCultivars } = data;
</script>

<SEO />
<section>
	<Heading heading={'Producer details'} />
	<Input type="text" id="name" label="Name " value={producer.name} readonly />
	<Input type="text" id="owner" label="Owner" value={producer.owner} readonly />
	<Input
		type="text"
		id="address"
		label="Origin | Region | Address"
		value={producer.address}
		readonly
	/>
	<Input type="text" id="country" label="Country" value={producer.country} readonly />
	<button on:click={() => goto(`/producer/${producer.id}/edit`)}>Edit Details</button>
</section>
<section>
	{#if producerCultivars && producerCultivars.length > 0}
		<details>
			<summary><Heading heading={'Cultivar Details'} /></summary>
			<ProducerCultivarsTable producerId={producer.id} cultivars={producerCultivars} />
		</details>
	{:else}
		<Heading heading={`No cultivars found at ${producer.name}`} />
	{/if}

	<button on:click={() => goto(`/pc/${producer.id}`)}>Add Cultivar to Producer</button>
</section>
