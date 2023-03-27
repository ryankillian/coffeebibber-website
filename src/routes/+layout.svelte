<script lang="ts">
	import '@picocss/pico';
	import './styles.css';

	import { Toaster } from 'svelte-french-toast';

	import type { LayoutData } from './$types';
	import Footer from '$lib/components/page/Footer.svelte';

	export let data: LayoutData;
</script>

<Toaster />

<div class="stretch">
	<header>
		<nav>
			<ul>
				<li>
					<a href="/">Coffee Bibber</a>
				</li>
			</ul>
			{#if !data.user}
				<ul>
					<li>
						<a href="/login">Login</a>
					</li>
					<li>
						<a href="/register">Register</a>
					</li>
				</ul>
			{:else}
				<ul>
					<li role="list" dir="rtl">
						<!-- svelte-ignore a11y-no-interactive-element-to-noninteractive-role -->
						<a href="/" role="listitem">Menu</a>
						<ul>
							<li><a href="/info">Read Me</a></li>
							<li><a href="/cultivar">Cultivars 🌱</a></li>
							<li><a href="/producer">Producers</a></li>
							<li><a href="/pc">Producer's Cultivars</a></li>
							<li><a href="/roaster">Roasters 🔥</a></li>
							<li><a href="/coffee">Coffees</a></li>
							<li><a href="/note">Tasting Notes 💬</a></li>
							<li><a href="/contact">Contact Form</a></li>
						</ul>
					</li>
					<li />
					<li role="list" dir="rtl">
						<!-- svelte-ignore a11y-no-interactive-element-to-noninteractive-role -->
						<a href="/" role="listitem">{data.user.username}</a>
						<ul>
							<li><a href="/my/note">My tasting notes</a></li>
							<li><a href="/my/activity">My activity</a></li>
							<li><a href="/my/username">Update username</a></li>
							<li><a href="/my/email">Update email</a></li>
							<li><a href="/my/password">Update password</a></li>
							<li><form action="/logout" method="POST"><button>Logout</button></form></li>
						</ul>
					</li>
				</ul>
			{/if}
		</nav>
	</header>
	<main class="sticky container">
		<slot />
	</main>
	<Footer />
</div>

<style>
	.stretch {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}
	.sticky {
		flex: 1;
	}
	nav {
		margin: 0 0.2em;
	}
</style>
