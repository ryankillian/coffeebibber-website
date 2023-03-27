import { updateProducerSchema } from '$lib/schemas';
import { auditTrail } from '$lib/services/Logger';
import type { ProducerRecord } from '$lib/types';
import { PRODUCER, toCamelCase, UPDATE, validateData } from '$lib/utils';
import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import type { ClientResponseError } from 'pocketbase';

export const load = async ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}
};

export const actions: Actions = {
	update: async ({ request, locals }) => {
		if (!locals.user) {
			throw fail(400);
		}

		const { formData, errors } = await validateData(await request.formData(), updateProducerSchema);

		if (errors) {
			return fail(400, {
				data: formData,
				errors: errors.fieldErrors
			});
		}

		try {
			let name = toCamelCase(formData.name);

			const record = await locals.pb.collection(PRODUCER).update<ProducerRecord>(formData.id, {
				name,
				owner: formData.owner,
				address: formData.address,
				country: formData.country
			});

			await auditTrail(locals.pb, PRODUCER, record.id, UPDATE, locals.user.id);
		} catch (err) {
			console.log('Error: ', err);
			const e = err as ClientResponseError;
			throw error(e.status, e.message);
		}

		throw redirect(303, `/producer/${formData.id}`);
	}
};
