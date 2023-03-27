import { toProducerDTO } from '$lib/helper';
import type { ProducerRecord } from '$lib/types';
import { PRODUCER, serializeNonPOJOs } from '$lib/utils';
import { error } from '@sveltejs/kit';
import type { ClientResponseError } from 'pocketbase';

export const load = async ({ locals, params }) => {
	let record: ProducerRecord;

	try {
		record = serializeNonPOJOs<ProducerRecord>(
			await locals.pb.collection(PRODUCER).getOne<ProducerRecord>(params.id)
		);
	} catch (err) {
		console.log('Error: ', err);
		const e = err as ClientResponseError;
		throw error(e.status, e.message);
	}

	return {
		producer: toProducerDTO(record)
	};
};

// function isCultivar(c: any): c is CultivarRecord {
// 	return typeof c === 'object' && c !== null && 'name' in c && 'harvest_date' in c;
// }

// TODO hack to bring back cultivar id
// for (const item of producerCultivars.items) {
// 	let cultivar = item.expand?.cultivar as CultivarRecord;
// 	let pc: ProducerCultivar = {
// 		producer: cultivar ? cultivar.id : '',
// 		cultivar: cultivar ? cultivar.name : '',
// 		harvest_date: item.harvest_date
// 	};
// 	cultivars.push(pc);
// }

// cultivars.sort((a, b) => {
// 	if (a.cultivar === b.cultivar) {
// 		if (!a.harvest_date) {
// 			return 1;
// 		}
// 		if (!b.harvest_date) {
// 			return -1;
// 		}
// 		return new Date(b.harvest_date).getTime() - new Date(a.harvest_date).getTime();
// 	}
// 	return a.cultivar.localeCompare(b.cultivar);
// });
