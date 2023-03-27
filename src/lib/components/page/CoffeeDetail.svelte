<script lang="ts">
	import { formatDate, monthFormat } from '$lib/utils';
	import Input from '$lib/components/form/Input.svelte';
	import type { CoffeeExpanded } from '$lib/types';
	export let coffee: CoffeeExpanded;
</script>

<Input type="text" id="roaster_name" label="Roaster name" value={coffee.roaster_name} readonly />
<Input type="text" id="producer_name" label="Producer name" value={coffee.producer_name} readonly />
<Input type="text" id="cultivar_name" label="Cultivar name" value={coffee.cultivar_name} readonly />
<Input
	type="text"
	id="harvest_date"
	label="Harvest date"
	value={formatDate(coffee.harvest_date, monthFormat)}
	readonly
/>
<Input type="text" id="process" label="Process" value={coffee.process} readonly />
