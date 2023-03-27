import { toCultivarDTO } from '$lib/helper';
import type { CultivarRecord } from '$lib/types';
import { CULTIVAR, serializeNonPOJOs } from '$lib/utils';
import { error } from '@sveltejs/kit';
import type { ClientResponseError } from 'pocketbase';

export const load = async ({ locals }) => {
	let records: CultivarRecord[] = [];

	try {
		records = serializeNonPOJOs<CultivarRecord[]>(
			await locals.pb.collection(CULTIVAR).getFullList<CultivarRecord>(undefined, { sort: 'name' })
		);
	} catch (err) {
		console.error('Error: ', err);
		const { status, message } = err as ClientResponseError;
		throw error(status, message);
	}

	return {
		cultivars: records.map(toCultivarDTO)
	};
};
