<script lang="ts">
	import type { ActionData } from './$types';
	import { enhance, type SubmitFunction } from '$app/forms';
	import Heading from '$lib/components/page/Heading.svelte';
	import SEO from '$lib/components/seo/contact/Main.svelte';
	export let form: ActionData;

	let loading = false;

	const submitMessage: SubmitFunction = (input) => {
		loading = true;
		return async ({ update }) => {
			loading = false;
			await update();
		};
	};
</script>

<SEO />

<Heading
	heading={'Get in Touch with Us!'}
	subHeading={"We're always eager to hear from our fellow coffee enthusiasts. Whether you have questions, suggestions, or simply want to share your passion for coffee, we'd love to connect. Use the contact form below to send us your message, and we'll get back to you as soon as possible."}
/>

{#if form?.success}
	<p class="message">Thanks for your message. I'll get back to you as soon as I can.</p>
	<p class="message"><a href="/">Go to home page?</a></p>
{:else}
	<form method="POST" use:enhance={submitMessage}>
		<label for="username">Name</label>
		<input type="text" id="username" name="username" value={form?.data?.username ?? ''} required />
		{#if form?.errors?.username}
			<label for="name"><span class="error">{form?.errors.username[0]}</span></label>
		{/if}

		<label for="email">Email</label>
		<input type="email" id="email" name="email" value={form?.data?.email ?? ''} required />

		{#if form?.errors?.email}
			<label for="email"><span class="error">{form?.errors.email[0]}</span></label>
		{/if}

		<label for="message">Message</label>
		<textarea id="message" name="message" rows="4" value={form?.data?.message ?? ''} required />
		{#if form?.errors?.message}
			<label for="message"><span class="error">{form?.errors.message[0]}</span></label>
		{/if}

		<button disabled={loading}>Send Message</button>
	</form>
{/if}

<style>
	.message {
		text-align: center;
	}
	.error {
		color: pink;
	}
</style>
