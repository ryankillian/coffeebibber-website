<script lang="ts">
	import toast from 'svelte-french-toast';
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';
	import type { ActionData } from './$types';
	import { invalidateAll } from '$app/navigation';
	import Input from '$lib/components/form/Input.svelte';
	import Heading from '$lib/components/page/Heading.svelte';
	import SEO from '$lib/components/seo/settings/Username.svelte';

	export let data;
	export let form: ActionData;

	let loading = false;

	const submit: SubmitFunction = () => {
		loading = true;
		return async ({ result }) => {
			switch (result.type) {
				case 'success':
					toast.success('Username changed!');
					await invalidateAll();
					break;
				case 'error':
					toast.error('Username already taken.');
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
		heading={'Update username'}
		subHeading={'Username appears in tasting notes, and at the top right of every screen'}
	/>
	<Input
		label="Current user name"
		id="currentUsername"
		value={data?.user?.username ?? ''}
		readonly
		disabled
	/>
	<form action="?/update" method="POST" use:enhance={submit}>
		<Input
			label="Enter your new user name"
			id="username"
			required
			disabled={loading}
			errors={form?.errors?.usernameErrors?.username}
		/>

		<button disabled={loading}>Change my Username</button>
	</form>
</article>
