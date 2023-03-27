import { getCultivarsForProducer } from '$lib/helper';
import type { CultivarsForProducerRecord } from '$lib/types';
import { serializeNonPOJOs, VIEW_CULTIVARS_FOR_PRODUCER } from '$lib/utils';
import { error } from '@sveltejs/kit';
import type { ClientResponseError } from 'pocketbase';

export const load = async ({ locals, params }) => {
	let records: CultivarsForProducerRecord[] = [];

	try {
		records = serializeNonPOJOs<CultivarsForProducerRecord[]>(
			await locals.pb
				.collection(VIEW_CULTIVARS_FOR_PRODUCER)
				.getFullList<CultivarsForProducerRecord>({
					filter: `producer_id = "${params.id}"`
				})
		);
	} catch (err) {
		console.log('Error: ', err);
		const e = err as ClientResponseError;
		throw error(e.status, e.message);
	}

	return {
		producerCultivars: getCultivarsForProducer(records)
	};
};
