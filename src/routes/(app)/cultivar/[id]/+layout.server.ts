import { toCultivarDTO } from '$lib/helper';
import type { CultivarRecord } from '$lib/types';
import { CULTIVAR, serializeNonPOJOs } from '$lib/utils';
import { error } from '@sveltejs/kit';
import type { ClientResponseError } from 'pocketbase';

export const load = async ({ locals, params }) => {
	let record: CultivarRecord;

	try {
		record = serializeNonPOJOs<CultivarRecord>(
			await locals.pb.collection(CULTIVAR).getOne<CultivarRecord>(params.id)
		);
	} catch (err) {
		console.log('Error: ', err);
		const e = err as ClientResponseError;
		throw error(e.status, e.message);
	}

	return {
		cultivar: toCultivarDTO(record)
	};
};

// layout.ts
// export const load = async ({ params, parent }) => {
// 	let { cultivars } = await parent();
// 	let cultivar = cultivars.find((x) => x.id === params.id);
// 	cultivars = [];
// 	return { cultivar };
// };
