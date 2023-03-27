import { toTastingNoteExpanded } from '$lib/helper';
import type { LogRecord, TastingNoteRecord } from '$lib/types';
import { LOG, serializeNonPOJOs, TASTING_NOTE } from '$lib/utils';
import { error, redirect } from '@sveltejs/kit';
import type { ClientResponseError } from 'pocketbase';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}

	let records: LogRecord[] = [];
	try {
		records = serializeNonPOJOs<LogRecord[]>(
			await locals.pb.collection(LOG).getFullList<LogRecord>(undefined, {
				sort: '-updated',
				filter: `user_id = "${locals.user?.id}"`
			})
		);
	} catch (err) {
		console.log('Error: ', err);
		const e = err as ClientResponseError;
		throw error(e.status, e.message);
	}
	return {
		records
	};
};
