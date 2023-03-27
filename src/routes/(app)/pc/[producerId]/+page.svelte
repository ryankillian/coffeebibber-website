<script lang="ts">
	import { goto } from '$app/navigation';
	import ProducerCultivarsTable from '$lib/components/datatable/ProducerCultivarsTable.svelte';
	import Heading from '$lib/components/page/Heading.svelte';
	import SEO from '$lib/components/seo/pc/Details.svelte';

	export let data;
	const { producer, producerCultivars } = data;
</script>

<SEO />
{#if producerCultivars?.length > 0}
	<Heading
		heading={'List of cultivars'}
		subHeading={`With harvest dates, produced at ${producer.name}`}
	/>
	<ProducerCultivarsTable producerId={producer.id} cultivars={producerCultivars} />
{:else}
	<Heading heading={`No cultivars found at ${producer.name}`} />
{/if}

<button on:click={() => goto(`/pc/${producer.id}/add`)}
	>Add Cultivar or Harvest Date to {producer.name}</button
>
{#if producerCultivars?.length > 0}
	<button on:click={() => goto(`/pc/${producer.id}/delete`)}
		>Delete Cultivar or Harvest Date from {producer.name}</button
	>
{/if}
