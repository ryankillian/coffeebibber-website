<script lang="ts">
	import SEO from '$lib/components/seo/Main.svelte';
</script>

<SEO />

<h1>Coffee Bibber</h1>
<p>The best site for coffee connoisseurs</p>

<div>
	<a href="/cultivar" role="button" class="primary"> Cultivars</a>
	<a href="/producer" role="button" class="primary"> Producers</a>
	<a href="/roaster" role="button" class="primary"> Roasters</a>
	<a href="/coffee" role="button" class="primary"> Coffees</a>
	<a href="/note" role="button" class="primary"> Tasting Notes</a>
</div>

<style>
	p {
		text-align: center;
	}
	div {
		display: flex;
		flex-direction: column;
		gap: 1em;
	}
</style>
