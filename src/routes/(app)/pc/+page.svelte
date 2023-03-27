<script lang="ts">
	import ProducerTable from '$lib/components/datatable/ProducerTable.svelte';
	import Heading from '$lib/components/page/Heading.svelte';
	import SEO from '$lib/components/seo/pc/Main.svelte';

	export let data;
	const { producers } = data;
</script>

<SEO />
<Heading
	heading={'Browse all producers below'}
	subHeading={'Click on a producer to see the cultivars grown'}
/>
<ProducerTable {producers} path="pc" />
<p>Can't find Producer? <a href="/producer/new">Add a Producer?</a></p>
