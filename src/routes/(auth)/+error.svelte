<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="error-container">
	{#if $page.status === 404}
		<h1>Whoops. Page not found.</h1>
		<a href="/">Go to home page</a>
	{:else if $page.status === 400}
		<h1>Whoops. Something happened.</h1>
		<h2>{$page?.error?.message}</h2>
		<h3><a href="/login">Try to log in again?</a></h3>
	{:else}
		<h1>Whoops. We weren't expecting that</h1>
		<p>We're investigating the issue.</p>
	{/if}

	{#if $page.error?.errorId}
		<p>Error ID: {$page.error.errorId}</p>
	{/if}
</div>
