import { updateCultivarSchema } from '$lib/schemas';
import { auditTrail } from '$lib/services/Logger';
import type { CultivarRecord } from '$lib/types';
import { CULTIVAR, toCamelCase, UPDATE, validateData } from '$lib/utils';
import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import type { ClientResponseError } from 'pocketbase';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}
};

export const actions: Actions = {
	update: async ({ request, locals }) => {
		if (!locals.user) {
			throw fail(400);
		}

		const { formData, errors } = await validateData(await request.formData(), updateCultivarSchema);

		if (errors) {
			return fail(400, {
				data: formData,
				errors: errors.fieldErrors
			});
		}

		try {
			let name = toCamelCase(formData.name);

			const record = await locals.pb
				.collection(CULTIVAR)
				.update<CultivarRecord>(formData.id, { name: formData.name });

			await auditTrail(locals.pb, CULTIVAR, record.id, UPDATE, locals.user.id);
		} catch (err) {
			console.log('Error: ', err);
			const e = err as ClientResponseError;
			throw error(e.status, e.message);
		}

		throw redirect(303, `/cultivar/${formData.id}`);
	}
};
