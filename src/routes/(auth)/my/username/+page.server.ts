import { error, fail, redirect } from '@sveltejs/kit';
import { updateUsernameSchema } from '$lib/schemas';
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
		const { formData, errors } = await validateData(await request.formData(), updateUsernameSchema);

		if (errors) {
			return fail(400, {
				data: formData,
				errors: {
					usernameErrors: errors.fieldErrors
				}
			});
		}

		try {
			await locals.pb.collection('users').update(locals.user?.id as string, formData);
		} catch (err) {
			console.log('Error: ', err);
			const e = err as ClientResponseError;
			throw error(e.status, e.data.message);
		}

		return {
			success: true,
			data: formData
		};
	}
};
