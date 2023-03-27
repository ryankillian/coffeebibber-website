<script lang="ts">
	import toast from 'svelte-french-toast';
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import Input from '$lib/components/form/Input.svelte';
	import Heading from '$lib/components/page/Heading.svelte';
	import SEO from '$lib/components/seo/settings/Password.svelte';
	import type { ActionData } from './$types';

	export let form: ActionData;

	let loading = false;

	const submit: SubmitFunction = () => {
		loading = true;
		return async ({ result }) => {
			switch (result.type) {
				case 'redirect':
					toast.success('Password updated successfully!');
					await invalidateAll();
					break;
				case 'error':
					toast.error('Could not change password. Please check your credentials and try again.');
					break;
				default:
					await applyAction(result);
			}
			loading = false;
		};
	};
</script>

<SEO />
<article data-theme="dark">
	<Heading
		heading={'Update password'}
		subHeading={'Both old and new passwords are required fields. If the password change is successful, you will be logged out from Coffee Bibber and must log in using the new password.'}
	/>
	<form action="?/update" method="POST" use:enhance={submit}>
		<Input
			id="oldPassword"
			label="Old Password *"
			type="password"
			required
			errors={form?.errors?.oldPassword}
		/>
		<Input
			id="password"
			label="New Password *"
			type="password"
			required
			errors={form?.errors?.password}
		/>
		<Input
			id="passwordConfirm"
			label="Confirm Password *"
			type="password"
			required
			errors={form?.errors?.passwordConfirm}
		/>
		<button disabled={loading}>Update Password</button>
	</form>
	<a href="/reset-password">Forgot password?</a>
</article>
