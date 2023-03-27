import { toProducerDTO } from '$lib/helper';
import type { ProducerRecord } from '$lib/types';
import { PRODUCER, serializeNonPOJOs } from '$lib/utils';
import { error } from '@sveltejs/kit';
import type { ClientResponseError } from 'pocketbase';

export const load = async ({ locals }) => {
	let records: ProducerRecord[];
	try {
		records = serializeNonPOJOs<ProducerRecord[]>(
			await locals.pb.collection(PRODUCER).getFullList<ProducerRecord>(undefined)
		);
	} catch (err) {
		console.log('Error: ', err);
		const e = err as ClientResponseError;
		throw error(e.status, e.message);
	}

	return {
		producers: records.map(toProducerDTO)
	};
};
