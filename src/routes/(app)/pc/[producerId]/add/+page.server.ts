import type { ClientResponseError } from 'pocketbase';
import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import { toCultivarDTO } from '$lib/helper';
import { createProducerCultivarSchema } from '$lib/schemas';
import { auditTrail } from '$lib/services/Logger';
import type { CultivarRecord, ProducerCultivarRecord } from '$lib/types';
import {
	CREATE,
	CULTIVAR,
	formatISODate,
	PRODUCER_CULTIVAR,
	serializeNonPOJOs,
	validateData
} from '$lib/utils';

export const load = async ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}

	let records: CultivarRecord[];
	try {
		records = serializeNonPOJOs<CultivarRecord[]>(
			await locals.pb.collection(CULTIVAR).getFullList<CultivarRecord>(undefined, { sort: 'name' })
		);
	} catch (err) {
		console.log('Error: ', err);
		const e = err as ClientResponseError;
		throw error(e.status, e.message);
	}

	return {
		cultivars: records.map(toCultivarDTO)
	};
};

export const actions: Actions = {
	create: async ({ request, locals }) => {
		if (!locals.user) {
			throw fail(400);
		}

		const { formData, errors } = await validateData(
			await request.formData(),
			createProducerCultivarSchema
		);

		if (errors) {
			return fail(400, {
				data: formData,
				errors: errors.fieldErrors
			});
		}

		const harvest_date = formatISODate(formData.harvest_date);

		try {
			const listResults = await locals.pb
				.collection(PRODUCER_CULTIVAR)
				.getList<ProducerCultivarRecord>(1, 50, {
					filter: `producer = "${formData.producer}" && cultivar = "${formData.cultivar}" && harvest_date = "${harvest_date}"`
				});

			if (listResults.totalItems == 0) {
				const record = await locals.pb
					.collection(PRODUCER_CULTIVAR)
					.create<ProducerCultivarRecord>({
						producer: formData.producer,
						cultivar: formData.cultivar,
						harvest_date
					});

				await auditTrail(locals.pb, PRODUCER_CULTIVAR, record.id, CREATE, locals.user.id);
			}
		} catch (err) {
			console.log('Error: ', err);
			const e = err as ClientResponseError;
			throw error(e.status, e.message);
		}

		throw redirect(303, `/pc/${formData.producer}`);
	}
};
