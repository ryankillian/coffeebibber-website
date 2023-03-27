import { toTastingNoteExpanded } from '$lib/helper';
import type { TastingNoteExpandedRecord } from '$lib/types';
import { serializeNonPOJOs, VIEW_TASTING_NOTE_EXPANDED } from '$lib/utils';
import { error } from '@sveltejs/kit';
import type { ClientResponseError } from 'pocketbase';

export const load = async ({ locals }) => {
	let records: TastingNoteExpandedRecord[] = [];
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

	return {
		tastingNotes: records.map(toTastingNoteExpanded)
	};
};
