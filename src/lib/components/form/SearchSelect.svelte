<!-- Searchable Select Box Component -->
<script lang="ts">
	import type { Option } from '$lib/types';

	export let options: Option[];
	export let name = '';

	export let selected = '';

	$: filteredOptions = options;
	let searchQuery = '';

	function handleSearchQuery(event: Event) {
		searchQuery = (event.target as HTMLInputElement).value.toLowerCase();
		filteredOptions = options.filter((option) => option.label.toLowerCase().includes(searchQuery));
	}

	function handleOptionSelection(event: Event) {
		const selectedOption = (event.target as HTMLSelectElement).value;
		// do something with the selected option, e.g., save to database
		console.log('Selected Option:', selectedOption);
	}
</script>

<div class="searchable-select-box">
	<input type="search" placeholder="Search for an option..." on:input={handleSearchQuery} />
	<select bind:value={selected}>
		<option value="">{`- Please choose a ${name} -`}</option>
		{#each filteredOptions as option}
			<option value={option.value}>{option.label}</option>
		{/each}
	</select>
</div>
