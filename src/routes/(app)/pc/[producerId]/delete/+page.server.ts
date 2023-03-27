import { deleteProducerCultivarSchema, IdSchema } from '$lib/schemas';
import { auditTrail } from '$lib/services/Logger';
import { DELETE, PRODUCER_CULTIVAR, validateData } from '$lib/utils';
import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import type { ClientResponseError } from 'pocketbase';

export const load = async ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}
};

export const actions: Actions = {
	delete: async ({ request, locals, params }) => {
		if (!locals.user) {
			throw fail(400);
		}

		const { formData, errors } = await validateData(
			await request.formData(),
			deleteProducerCultivarSchema
		);

		if (errors) {
			return fail(400, {
				data: formData,
				errors: errors.fieldErrors
			});
		}

		try {
			await locals.pb.collection(PRODUCER_CULTIVAR).delete(formData.producer_cultivar);

			await auditTrail(
				locals.pb,
				PRODUCER_CULTIVAR,
				formData.producer_cultivar,
				DELETE,
				locals.user.id
			);
		} catch (err) {
			console.log('Error: ', err);
			const e = err as ClientResponseError;
			throw error(e.status, e.message);
		}

		throw redirect(303, `/pc/${params.id}`);
	}
};
