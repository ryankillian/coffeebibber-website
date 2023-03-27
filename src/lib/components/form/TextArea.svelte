<script lang="ts">
	export let label: string;
	export let id: string;
	export let value = '';
	export let disabled = false;
	export let readonly = false;
	export let errors: string[] = [];
</script>

<label for={id}>{label}</label>
<textarea {id} name={id} {value} rows="5" cols="35" {disabled} {readonly} spellcheck="false" />
{#if errors}
	{#each errors as error}
		<label for={id}><small><span class="contrast">{error}</span></small></label>
	{/each}
{/if}
