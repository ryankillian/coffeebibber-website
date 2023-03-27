import { error, fail, redirect } from '@sveltejs/kit';
import { updateEmailSchema } from '$lib/schemas';
import { validateData } from '$lib/utils';
import type { Actions } from './$types';
import type { ClientResponseError } from 'pocketbase';

export const load = ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}
};

export const actions: Actions = {
	update: async ({ request, locals }) => {
		const { formData, errors } = await validateData(await request.formData(), updateEmailSchema);

		if (errors) {
			return fail(400, {
				data: formData,
				errors: {
					emailErrors: errors.fieldErrors
				}
			});
		}

		try {
			await locals.pb.collection('users').requestEmailChange(formData.email);
		} catch (err) {
			console.log('Error: ', err);
			const e = err as ClientResponseError;
			throw error(e.status, e.data.message);
		}

		locals.pb.authStore.clear();
		locals.user = null;

		throw redirect(303, '/login');
	}
};
