import { getCultivarsForProducer } from '$lib/helper';
import type { CultivarsForProducerRecord, ProducerDTO, ProducerRecord } from '$lib/types';
import { PRODUCER, serializeNonPOJOs, VIEW_CULTIVARS_FOR_PRODUCER } from '$lib/utils';
import { error } from '@sveltejs/kit';
import type { ClientResponseError } from 'pocketbase';

export const load = async ({ locals, params, parent }) => {
	let records: CultivarsForProducerRecord[] = [];

	try {
		records = serializeNonPOJOs<CultivarsForProducerRecord[]>(
			await locals.pb
				.collection(VIEW_CULTIVARS_FOR_PRODUCER)
				.getFullList<CultivarsForProducerRecord>({
					filter: `producer_id = "${params.producerId}"`
				})
		);
	} catch (err) {
		console.log('Error: ', err);
		const e = err as ClientResponseError;
		throw error(e.status, e.message);
	}

	let { producers } = await parent();
	let producer = producers.find((x) => x.id === params.producerId) as ProducerDTO;

	return {
		producer,
		producerCultivars: getCultivarsForProducer(records)
	};
};

// TODO hack to bring back cultivar id
// for (const item of producerCultivars.items) {
// 	let cultivar = item.expand?.cultivar as CultivarRecord;
// 	let pc: ProducerCultivarDT0 = {
// 		cultivar_id: cultivar ? cultivar.id : '',
// 		cultivar_name: cultivar ? cultivar.name : '',
// 		producer_cultivar_id: item.id,
// 		harvest_date: item.harvest_date
// 	};
// 	cultivars.push(pc);
// }

// cultivars.sort((a, b) => {
// 	if (a.cultivar_name === b.cultivar_name) {
// 		if (!a.harvest_date) {
// 			return 1;
// 		}
// 		if (!b.harvest_date) {
// 			return -1;
// 		}
// 		return new Date(b.harvest_date).getTime() - new Date(a.harvest_date).getTime();
// 	}
// 	return a.cultivar_name.localeCompare(b.cultivar_name);
// });
