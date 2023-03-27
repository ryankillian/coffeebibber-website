<script lang="ts">
	import { page } from '$app/stores';
</script>

<div>
	{#if $page.status === 404}
		<h1>Page not found</h1>
	{:else}
		<h1>Whoops!</h1>
		<h3>Status code: {$page.status}</h3>
		<h3>{$page.error?.message}</h3>
	{/if}
	<h4><a href="/">Go to homepage</a></h4>

	{#if $page.error?.errorId}
		<p>Error ID: {$page.error.errorId}</p>
	{/if}
</div>
