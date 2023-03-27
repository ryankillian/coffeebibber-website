<script lang="ts">
	import CultivarTable from '$lib/components/datatable/CultivarTable.svelte';
	import Heading from '$lib/components/page/Heading.svelte';
	import SEO from '$lib/components/seo/cultivar/Main.svelte';
	export let data;
	let { cultivars } = data;
</script>

<SEO />
<Heading heading={'Browse all cultivars below'} />
<CultivarTable {cultivars} />
