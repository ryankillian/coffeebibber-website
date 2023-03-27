import { toCoffeeExpanded } from '$lib/helper';
import { createTastingNoteSchema } from '$lib/schemas';
import { auditTrail } from '$lib/services/Logger';
import type { CoffeeExpandedRecord, TastingNoteRecord } from '$lib/types';
import {
	CREATE,
	serializeNonPOJOs,
	TASTING_NOTE,
	validateData,
	VIEW_COFFEE_EXPANDED
} from '$lib/utils';
import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import type { ClientResponseError } from 'pocketbase';

export const load = async ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}
	let records: CoffeeExpandedRecord[] = [];

	try {
		records = serializeNonPOJOs<CoffeeExpandedRecord[]>(
			await locals.pb.collection(VIEW_COFFEE_EXPANDED).getFullList<CoffeeExpandedRecord>({
				sort: 'roaster_name, producer_name, cultivar_name, -harvest_date'
			})
		);
	} catch (err) {
		console.log('Error: ', err);
		const e = err as ClientResponseError;
		throw error(e.status, e.message);
	}

	return { coffees: records.map(toCoffeeExpanded) };
};

export const actions: Actions = {
	create: async ({ request, locals }) => {
		if (!locals.user) {
			// throw fail(400);
			throw redirect(303, '/login');
		}

		const { formData, errors } = await validateData(
			await request.formData(),
			createTastingNoteSchema
		);

		if (errors) {
			return fail(400, {
				data: formData,
				errors: errors.fieldErrors
			});
		}

		try {
			const { id } = await locals.pb.collection(TASTING_NOTE).create<TastingNoteRecord>({
				user: locals.user?.id,
				coffee: formData.coffee,
				rating: Number(formData.rating),
				tagline: formData.tagline,
				detail: formData.detail
			});

			await auditTrail(locals.pb, TASTING_NOTE, id, CREATE, locals.user.id);
		} catch (err) {
			console.log('Error: ', err);
			const e = err as ClientResponseError;
			throw error(e.status, e.message);
		}

		throw redirect(303, '/note');
	}
};
