import { updateRoasterSchema } from '$lib/schemas';
import { auditTrail } from '$lib/services/Logger';
import type { RoasterRecord } from '$lib/types';
import { ROASTER, toCamelCase, UPDATE, validateData } from '$lib/utils';
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

		const { formData, errors } = await validateData(await request.formData(), updateRoasterSchema);

		if (errors) {
			return fail(400, {
				data: formData,
				errors: errors.fieldErrors
			});
		}

		try {
			let name = toCamelCase(formData.name);

			const record = await locals.pb.collection(ROASTER).update<RoasterRecord>(formData.id, {
				name,
				country: formData.country,
				url: formData.url,
				mailorder: formData.mailorder,
				subscription: formData.subscription
			});

			await auditTrail(locals.pb, ROASTER, record.id, UPDATE, locals.user.id);
		} catch (err) {
			console.log('Error: ', err);
			const e = err as ClientResponseError;
			throw error(e.status, e.message);
		}

		throw redirect(303, `/roaster/${formData.id}`);
	}
};
