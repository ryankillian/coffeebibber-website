<script lang="ts">
	import Input from '$lib/components/form/Input.svelte';
	import Heading from '$lib/components/page/Heading.svelte';
	import SEO from '$lib/components/seo/auth/Login.svelte';
	import type { ActionData } from './$types';
	export let form: ActionData;
</script>

<SEO />
<Heading heading="Log in" />
<form action="?/login" method="POST">
	<Input
		type="email"
		id="email"
		label="Email"
		value={form?.data?.email ?? ''}
		errors={form?.errors?.email}
	/>
	<fieldset>
		<Input type="password" id="password" label="Password" errors={form?.errors?.password} />
		<a href="reset-password">Forgot Password?</a>
	</fieldset>
	<button>Login</button>
	{#if form?.notVerified}
		<p>Please verify your email address before login (check spam folder)</p>
	{/if}
</form>
<p>Don't have an account? <a href="/register">Sign up</a></p>
