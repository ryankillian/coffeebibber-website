import { error, fail, redirect } from '@sveltejs/kit';
import { updatePasswordSchema } from '$lib/schemas';
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
		const { formData, errors } = await validateData(await request.formData(), updatePasswordSchema);

		if (errors) {
			return fail(400, {
				errors: errors.fieldErrors
			});
		}

		try {
			await locals.pb.collection('users').update(locals.user?.id as string, formData);
			locals.pb.authStore.clear();
		} catch (err) {
			const e = err as ClientResponseError;
			console.log('Error: ', e.data.data);
			throw error(e.status, e.data.message);
		}

		throw redirect(303, '/login');
	}
};
