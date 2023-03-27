<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import Heading from '$lib/components/page/Heading.svelte';
	import SEO from '$lib/components/seo/pc/Delete.svelte';
	import toast from 'svelte-french-toast';
	import type { ActionData } from './$types';

	export let data;
	export let form: ActionData;

	const { producerCultivars, producer } = data;

	const submit: SubmitFunction = async ({}) => {
		return ({ result, update }) => {
			if (result.type == 'redirect') {
				toast.success('Cultivar deleted!');
			}
			update();
		};
	};

	let toggle = false;
</script>

<SEO />
<Heading heading={'Delete cultivar'} />

{#if producerCultivars?.length > 0}
	<form action="?/delete" method="POST" use:enhance={submit}>
		<div class="radios">
			{#each producerCultivars as pc}
				<div>
					<input type="radio" id={pc.pc_id} name="producer_cultivar" value={pc.pc_id} />
					<label for="huey">{pc.cultivar_name} {pc.harvest_date}</label>
				</div>
			{/each}
		</div>
		<input type="hidden" name="id" value={producer.id} />
		<button on:click|preventDefault={() => (toggle = !toggle)}>Delete Cultivar?</button>
		{#if toggle}
			<button>Confirm Delete</button>
		{/if}
	</form>
{:else}
	No Cultivars found.
{/if}

{#if form?.errors?.producer_cultivar}
	{#each form?.errors?.producer_cultivar as error}
		<small><span class="contrast">{error}</span></small>
	{/each}
{/if}

<style>
	.radios {
		display: grid;
		place-content: center;
		margin-bottom: 2em;
	}
</style>
