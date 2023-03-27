<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import Input from '$lib/components/form/Input.svelte';
	import Heading from '$lib/components/page/Heading.svelte';
	import SEO from '$lib/components/seo/auth/Register.svelte';
	import toast from 'svelte-french-toast';
	import type { ActionData } from './$types';
	export let form: ActionData;

	const submit: SubmitFunction = async ({}) => {
		return ({ result, update }) => {
			if (result.type == 'redirect') {
				toast.success('Verification email sent');
			}
			update();
		};
	};
</script>

<SEO />
<Heading heading="Register" />
<form action="?/register" method="POST" use:enhance={submit}>
	<Input
		type="email"
		id="email"
		label="Email"
		value={form?.data?.email ?? ''}
		errors={form?.errors?.email}
	/>
	<Input type="password" id="password" label="Password" errors={form?.errors?.password} />
	<button>Register</button>
</form>
<p>Have an account already? <a href="/login">Log in</a></p>
