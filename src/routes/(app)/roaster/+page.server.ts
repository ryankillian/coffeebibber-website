import { toRoasterDTO } from '$lib/helper';
import type { RoasterRecord } from '$lib/types';
import { ROASTER, serializeNonPOJOs } from '$lib/utils';
import { error } from '@sveltejs/kit';
import type { ClientResponseError } from 'pocketbase';

export const load = async ({ locals }) => {
	let records: RoasterRecord[];
	try {
		records = serializeNonPOJOs<RoasterRecord[]>(
			await locals.pb.collection(ROASTER).getFullList<RoasterRecord>(undefined, { sort: 'country' })
		);
	} catch (err) {
		console.log('Error: ', err);
		const e = err as ClientResponseError;
		throw error(e.status, e.message);
	}

	return {
		roasters: records.map(toRoasterDTO)
	};
};
