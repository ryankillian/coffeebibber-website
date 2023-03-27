import { toTastingNoteExpanded } from '$lib/helper';
import type { TastingNoteExpanded, TastingNoteExpandedRecord, TastingNoteRecord } from '$lib/types';
import { serializeNonPOJOs, TASTING_NOTE, VIEW_TASTING_NOTE_EXPANDED } from '$lib/utils';
import { error, redirect } from '@sveltejs/kit';
import type { ClientResponseError } from 'pocketbase';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}

	let records: TastingNoteExpandedRecord[] = [];
	let tastingNotes: TastingNoteExpanded[] = [];
	try {
		records = serializeNonPOJOs<TastingNoteExpandedRecord[]>(
			await locals.pb
				.collection(VIEW_TASTING_NOTE_EXPANDED)
				.getFullList<TastingNoteExpandedRecord>({
					sort: 'updated'
				})
		);
	} catch (err) {
		console.log('Error: ', err);
		const e = err as ClientResponseError;
		throw error(e.status, e.message);
	}

	tastingNotes = records.map(toTastingNoteExpanded);

	return {
		tastingNotes
	};
};

// export const load: PageServerLoad = async ({ locals }) => {
// 	if (!locals.pb.authStore.isValid) {
// 		throw redirect(303, '/login');
// 	}

// 	let tastingNoteRecords: TastingNoteRecord[] = [];
// 	try {
// 		tastingNoteRecords = serializeNonPOJOs<TastingNoteRecord[]>(
// 			await locals.pb.collection(TASTING_NOTE).getFullList<TastingNoteRecord>(undefined, {
// 				sort: '-updated',
// 				filter: `user = "${locals.user?.id}"`,
// 				expand:
// 					'coffee, coffee.roaster, coffee.producer_cultivar.producer, coffee.producer_cultivar.cultivar, user'
// 			})
// 		);
// 	} catch (err) {
// 		console.log('Error: ', err);
// 		const e = err as ClientResponseError;
// 		throw error(e.status, e.message);
// 	}
// 	return {
// 		tastingNotes: tastingNoteRecords.map(toTastingNoteExpanded)
// 	};
// };
