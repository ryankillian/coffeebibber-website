import type { LayoutServerLoad } from './$types';
import type { User } from '$lib/types';

export const load: LayoutServerLoad = ({ locals }) => {
	if (locals.user) {
		let user: User = {
			id: locals.user.id,
			username: locals.user.username,
			email: locals.user.email
		};
		return {
			user
		};
	}

	return {
		user: undefined
	};
};
