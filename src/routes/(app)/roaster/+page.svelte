<script lang="ts">
	import RoasterTable from '$lib/components/datatable/RoasterTable.svelte';
	import Heading from '$lib/components/page/Heading.svelte';
	import SEO from '$lib/components/seo/roaster/Main.svelte';

	export let data;
	let { roasters } = data;
</script>

<SEO />
<Heading heading={'Browse all roasters below'} />
<RoasterTable {roasters} />
