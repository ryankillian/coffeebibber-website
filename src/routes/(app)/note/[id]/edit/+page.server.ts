import type { ClientResponseError } from 'pocketbase';
import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import { updateTastingNoteSchema } from '$lib/schemas';
import { auditTrail } from '$lib/services/Logger';
import type { TastingNoteRecord } from '$lib/types';
import { TASTING_NOTE, UPDATE, validateData } from '$lib/utils';

export const load = async ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}
};

export const actions: Actions = {
	update: async ({ request, locals, params }) => {
		if (!locals.user) {
			throw fail(400);
		}

		const { formData, errors } = await validateData(
			await request.formData(),
			updateTastingNoteSchema
		);

		console.log(formData);

		if (errors) {
			return fail(400, {
				data: formData,
				errors: errors.fieldErrors
			});
		}

		try {
			let note = await locals.pb.collection(TASTING_NOTE).getOne(String(params.id));
			if (note.user != locals.user.id) {
				throw fail(400);
			}
			const record = await locals.pb
				.collection(TASTING_NOTE)
				.update<TastingNoteRecord>(String(params.id), formData);

			await auditTrail(locals.pb, TASTING_NOTE, record.id, UPDATE, locals.user.id);
		} catch (err) {
			console.log('Error: ', err);
			const e = err as ClientResponseError;
			throw error(e.status, e.message);
		}

		throw redirect(303, `/note/${params.id}`);
	}
};
