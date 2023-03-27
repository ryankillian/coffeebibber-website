<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import Heading from '$lib/components/page/Heading.svelte';
	import SEO from '$lib/components/seo/coffee/Add.svelte';
	import { processes } from '$lib/utils';
	import toast from 'svelte-french-toast';

	export let data;
	let { roasters, producerCultivars } = data;

	const submit: SubmitFunction = async ({}) => {
		return ({ result, update }) => {
			if (result.type == 'redirect') {
				toast.success('Coffee created. Great!');
			}
			update();
		};
	};
</script>

<SEO />
<Heading
	heading={'Add new coffee'}
	subHeading={"Roaster and producer's cultivar are required fields"}
/>

<form action="?/create" method="POST" use:enhance={submit}>
	<label for="roaster">Choose a roaster *</label>
	<select id="roaster" name="roaster">
		{#each roasters as roaster}
			<option value={roaster.id}>{roaster.name}</option>
		{/each}
	</select>
	<label for="producer_cultivar">Choose a cultivar from producer *</label>
	<select id="producer_cultivar" name="producer_cultivar">
		{#each producerCultivars as pc}
			<option value={pc.pc_id}>{pc.producer_name} {pc.cultivar_name} {pc.harvest_date}</option>
		{/each}
	</select>
	<label for="process">Choose a process</label>
	<select id="process" name="process">
		{#each processes as process}
			<option value={process}>{process}</option>
		{/each}
	</select>
	<button>Add Coffee</button>
</form>

<p>Can't find roaster? <a href="/roaster/new">Add new roaster</a></p>
<p>Can't find producer? <a href="/producer/new">Add new producer</a></p>
<p>Can't find cultivar for producer? <a href="/pc/new">Add cultivar to producer</a></p>
