<script lang="ts">
	import Heading from '$lib/components/page/Heading.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	let { message } = data;
</script>

<Heading heading="Failed to delete record" subHeading={message} />
<h3><a href="/">Go to home page</a></h3>
