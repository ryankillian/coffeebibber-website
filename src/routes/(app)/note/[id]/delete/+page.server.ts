import type { ClientResponseError } from 'pocketbase';
import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import { IdSchema } from '$lib/schemas';
import { auditTrail } from '$lib/services/Logger';
import { DELETE, TASTING_NOTE, validateData } from '$lib/utils';

export const load = async ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}
};

export const actions: Actions = {
	delete: async ({ request, locals }) => {
		if (!locals.user) {
			throw fail(400);
		}

		const { formData, errors } = await validateData(await request.formData(), IdSchema);

		if (errors) {
			return fail(400, {
				data: formData,
				errors: errors.fieldErrors
			});
		}

		try {
			let note = await locals.pb.collection(TASTING_NOTE).getOne(formData.id);
			if (note.user != locals.user.id) {
				throw fail(400);
			}
			await locals.pb.collection(TASTING_NOTE).delete(formData.id);

			await auditTrail(locals.pb, TASTING_NOTE, formData.id, DELETE, locals.user.id);
		} catch (err) {
			console.log('Error: ', err);
			const e = err as ClientResponseError;
			throw error(e.status, e.message);
		}

		throw redirect(303, '/note');
	}
};
