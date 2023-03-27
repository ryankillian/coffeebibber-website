<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import Input from '$lib/components/form/Input.svelte';
	import type { ActionData } from './$types';
	import toast from 'svelte-french-toast';
	import Heading from '$lib/components/page/Heading.svelte';
	import SEO from '$lib/components/seo/pc/Add.svelte';

	export let form: ActionData;
	export let data;

	const { producerCultivars, cultivars, producer } = data;

	let selected = '';

	const submit: SubmitFunction = async ({}) => {
		return ({ result, update }) => {
			if (result.type == 'redirect') {
				toast.success('Cultivar added. Great!');
			}
			update();
		};
	};
</script>

<SEO />
<Heading
	heading={'Add cultivar'}
	subHeading={'Name is a required field. Please add harvest date too if you can.'}
/>

{#if producerCultivars?.length > 0}
	<details>
		<summary>{producer.name} cultivar list</summary>
		<ul>
			{#each producerCultivars as pc}
				<li>
					{pc.cultivar_name}
					{pc.harvest_date}
				</li>
			{/each}
		</ul>
	</details>
{/if}

<form action="?/create" method="POST" use:enhance={submit}>
	<select id="cultivar" name="cultivar" bind:value={selected}>
		<option value="">{`-- Please choose a cultivar --`}</option>
		{#each cultivars as cultivar}
			<option value={cultivar.id}>{cultivar.name}</option>
		{/each}
	</select>
	{#if form?.errors.cultivar}
		{#each form?.errors.cultivar as error}
			<small><span class="contrast">{error}</span></small>
		{/each}
	{/if}
	<Input type="month" id="harvest_date" label="Harvest Date" errors={form?.errors?.harvest_date} />
	<input type="hidden" name="producer" value={producer.id} />
	<button>Add to {producer.name}</button>
</form>

<style>
	li {
		list-style: none;
	}
</style>
