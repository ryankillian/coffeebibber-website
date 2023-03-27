import { toCultivarsForProducer, toRoasterDTO } from '$lib/helper';
import { createCoffeeSchema } from '$lib/schemas';
import { auditTrail } from '$lib/services/Logger';
import type {
	CoffeeRecord,
	CultivarsForProducer,
	CultivarsForProducerRecord,
	RoasterDTO,
	RoasterRecord
} from '$lib/types';
import {
	COFFEE,
	CREATE,
	ROASTER,
	serializeNonPOJOs,
	validateData,
	VIEW_CULTIVARS_FOR_PRODUCER
} from '$lib/utils';
import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import type { ClientResponseError } from 'pocketbase';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}
	let roasterRecords: RoasterRecord[] = [];
	let roasters: RoasterDTO[] = [];
	let records: CultivarsForProducerRecord[] = [];
	let producerCultivars: CultivarsForProducer[] = [];

	try {
		roasterRecords = serializeNonPOJOs<RoasterRecord[]>(
			await locals.pb.collection(ROASTER).getFullList<RoasterRecord>(undefined)
		);
		records = serializeNonPOJOs<CultivarsForProducerRecord[]>(
			await locals.pb
				.collection(VIEW_CULTIVARS_FOR_PRODUCER)
				.getFullList<CultivarsForProducerRecord>()
		);
	} catch (err) {
		console.log('Error: ', err);
		const e = err as ClientResponseError;
		throw error(e.status, e.message);
	}

	producerCultivars = records.map(toCultivarsForProducer);
	roasters = roasterRecords.map(toRoasterDTO);

	return {
		roasters,
		producerCultivars
	};
};

export const actions: Actions = {
	create: async ({ request, locals }) => {
		if (!locals.user) {
			throw fail(400);
		}

		const { formData, errors } = await validateData(await request.formData(), createCoffeeSchema);

		if (errors) {
			return fail(400, {
				data: formData,
				errors: errors.fieldErrors
			});
		}
		let coffeeId;
		try {
			const list = await locals.pb.collection(COFFEE).getList<CoffeeRecord>(1, 1, {
				filter: `roaster = "${formData.roaster}" && producer_cultivar = "${formData.producer_cultivar}"`
			});

			if (list.items.length == 0) {
				const { id } = await locals.pb.collection(COFFEE).create<CoffeeRecord>({
					roaster: formData.roaster,
					process: formData.process,
					producer_cultivar: formData.producer_cultivar
				});

				coffeeId = id;

				await auditTrail(locals.pb, COFFEE, id, CREATE, locals.user.id);
			}
		} catch (err) {
			console.log('Error: ', err);
			const e = err as ClientResponseError;
			throw error(e.status, e.message);
		}

		throw redirect(303, `/coffee`);
	}
};

// export const load: PageServerLoad = async ({ locals }) => {
// 	if (!locals.pb.authStore.isValid) {
// 		throw redirect(303, '/login');
// 	}
// 	let roasters: RoasterRecord[];
// 	let producer_cultivars: ProducerCultivarRecord[];
// 	try {
// 		roasters = serializeNonPOJOs<RoasterRecord[]>(
// 			await locals.pb.collection(ROASTER).getFullList<RoasterRecord>(undefined)
// 		);
// 		producer_cultivars = serializeNonPOJOs<ProducerCultivarRecord[]>(
// 			await locals.pb.collection(PRODUCER_CULTIVAR).getFullList<ProducerCultivarRecord>(undefined, {
// 				sort: 'producer, cultivar',
// 				expand: 'producer, cultivar'
// 			})
// 		);
// 	} catch (err) {
// 		console.log('Error: ', err);
// 		const e = err as ClientResponseError;
// 		throw error(e.status, e.message);
// 	}

// 	return {
// 		roasters: getRoasterDTOs(roasters),
// 		producer_cultivars: getProducerCultivarDTOs(producer_cultivars)
// 	};
// };
