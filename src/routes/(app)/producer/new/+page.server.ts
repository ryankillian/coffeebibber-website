import { createProducerSchema } from '$lib/schemas';
import { auditTrail } from '$lib/services/Logger';
import type { ProducerRecord } from '$lib/types';
import { CREATE, PRODUCER, toCamelCase, validateData } from '$lib/utils';
import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import type { ClientResponseError } from 'pocketbase';

export const load = async ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}
};

export const actions: Actions = {
	create: async ({ request, locals }) => {
		if (!locals.user) {
			throw fail(400);
		}

		const { formData, errors } = await validateData(await request.formData(), createProducerSchema);

		if (errors) {
			return fail(400, {
				data: formData,
				errors: errors.fieldErrors
			});
		}

		try {
			let name = toCamelCase(formData.name);

			const list = await locals.pb
				.collection(PRODUCER)
				.getList<ProducerRecord>(1, 1, { filter: `name = "${name}"` });

			if (list.items.length == 0) {
				const { id } = await locals.pb.collection(PRODUCER).create<ProducerRecord>(formData);

				await auditTrail(locals.pb, PRODUCER, id, CREATE, locals.user.id);
			}
		} catch (err) {
			console.log('Error: ', err);
			const e = err as ClientResponseError;
			throw error(e.status, e.message);
		}

		throw redirect(303, '/producer');
	}
};
