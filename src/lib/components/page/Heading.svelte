<script lang="ts">
	export let heading: string;
	export let subHeading = '';
</script>

{#if subHeading}
	<hgroup>
		<h3>{heading}</h3>
		<h4>{subHeading}</h4>
	</hgroup>
{:else}
	<h3>{heading}</h3>
{/if}
