<script lang="ts">
	import CoffeeTable from '$lib/components/datatable/CoffeeTable.svelte';
	import Heading from '$lib/components/page/Heading.svelte';
	import SEO from '$lib/components/seo/coffee/Main.svelte';

	export let data;
	let { coffees } = data;
</script>

<SEO />
<Heading heading={'Browse all coffees below'} />
<CoffeeTable {coffees} />
