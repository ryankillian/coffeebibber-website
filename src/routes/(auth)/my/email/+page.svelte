<script lang="ts">
	import toast from 'svelte-french-toast';
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import Input from '$lib/components/form/Input.svelte';
	import Heading from '$lib/components/page/Heading.svelte';
	import SEO from '$lib/components/seo/settings/Email.svelte';
	import type { ActionData } from './$types';

	export let data;
	export let form: ActionData;

	let loading = false;

	const submit: SubmitFunction = () => {
		loading = true;

		return async ({ result }) => {
			switch (result.type) {
				case 'redirect':
					toast.success('Success! Please check your email inbox');
					await invalidateAll();

					break;
				case 'error':
					toast.error('Something went wrong updating your email');
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
		heading={'Update email'}
		subHeading={'A new verification email will be sent to the inbox of the new email address. You will be able to log in using the new email address once it has been verified. The old email address will be logged out from Coffee Bibber and you can then log in with the new email address.'}
	/>

	<form action="?/update" method="POST" use:enhance={submit}>
		<Input
			type="email"
			label="Enter your new email address"
			id="email"
			required
			value={data.user?.email ?? ''}
			disabled={loading}
			errors={form?.errors?.emailErrors?.email}
		/>
		<button disabled={loading}>Change my Email address</button>
	</form>
</article>
