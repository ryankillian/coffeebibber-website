<script lang="ts">
	export let label: string;
	export let type = 'text';
	export let id: string;
	export let value = '';
	export let disabled = false;
	export let required = false;
	export let readonly = false;
	export let errors: string[] = [];
</script>

<label for={id}>{label}</label>
<input {type} {id} name={id} {value} {required} {disabled} {readonly} spellcheck="false" />

{#if errors}
	{#each errors as error}
		<small><span class="contrast">{error}</span></small>
	{/each}
{/if}
