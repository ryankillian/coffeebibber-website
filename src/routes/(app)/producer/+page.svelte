<script lang="ts">
	import ProducerTable from '$lib/components/datatable/ProducerTable.svelte';
	import Heading from '$lib/components/page/Heading.svelte';
	import SEO from '$lib/components/seo/producer/Main.svelte';

	export let data;
	let { producers } = data;
</script>

<SEO />
<Heading heading={'Browse all producers below'} />
<ProducerTable {producers} />
