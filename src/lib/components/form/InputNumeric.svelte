<script lang="ts">
	export let label: string;
	export let id: string;
	export let value = '';
	export let disabled = false;
	export let required = false;
	export let readonly = false;
	export let errors: string[] = [];
</script>

<label for={id}>{label}</label>
<input
	type="number"
	{id}
	name={id}
	{value}
	{required}
	{disabled}
	{readonly}
	min="0"
	max="100"
	step="0.000001"
/>

{#if errors}
	{#each errors as error}
		<small><span class="contrast">{error}</span></small>
	{/each}
{/if}
