import { GOOGLE_FORM } from '$env/static/private';
import { fail } from '@sveltejs/kit';
import type { z, ZodError } from 'zod';
import type { Actions } from './$types';

import { contactSchema } from '$lib/schemas';

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = Object.fromEntries(await request.formData());

		try {
			const { username, email, message } = contactSchema.parse(formData);

			try {
				let prefilled = `https://docs.google.com/forms/d/e/${GOOGLE_FORM}/formResponse?usp=pp_url&entry.937228720=${username}&entry.2022838017=${email}&entry.1308471587=${message}&submit=Submit`;

				const res = await fetch(prefilled);
			} catch (err) {
				console.log(err);
			}
		} catch (err) {
			const { fieldErrors: errors } = (err as ZodError).flatten();
			const data = formData as {
				message: string;
				username: string;
				email: string;
			};
			return fail(400, {
				data,
				errors
			});
		}

		return {
			success: true
		};
	}
};
