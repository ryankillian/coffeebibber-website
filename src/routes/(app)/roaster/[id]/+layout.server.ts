import { toRoasterDTO } from '$lib/helper';
import type { RoasterRecord } from '$lib/types';
import { ROASTER, serializeNonPOJOs } from '$lib/utils';
import { error } from '@sveltejs/kit';
import type { ClientResponseError } from 'pocketbase';

export const load = async ({ locals, params }) => {
	let record: RoasterRecord;

	try {
		record = serializeNonPOJOs<RoasterRecord>(
			await locals.pb.collection(ROASTER).getOne<RoasterRecord>(params.id)
		);
	} catch (err) {
		console.log('Error: ', err);
		const e = err as ClientResponseError;
		throw error(e.status, e.message);
	}

	return {
		roaster: toRoasterDTO(record)
	};
};

// import type { RoasterDTO } from '$lib/types';

// export const load = async ({ params, parent }) => {
// 	let { roasters } = await parent();
// 	let roaster = roasters.find((x) => x.id === params.id) as RoasterDTO;
// 	roasters = [];
// 	return { roaster, roasters };
// };
