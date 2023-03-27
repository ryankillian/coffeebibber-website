import type { ClientResponseError } from 'pocketbase';
import { error } from '@sveltejs/kit';
import { toTastingNoteExpanded } from '$lib/helper';
import type { TastingNoteExpandedRecord } from '$lib/types';
import { serializeNonPOJOs, VIEW_TASTING_NOTE_EXPANDED } from '$lib/utils';

export const load = async ({ locals, params }) => {
	let record: TastingNoteExpandedRecord;

	try {
		record = serializeNonPOJOs<TastingNoteExpandedRecord>(
			await locals.pb
				.collection(VIEW_TASTING_NOTE_EXPANDED)
				.getOne<TastingNoteExpandedRecord>(params.id)
		);
	} catch (err) {
		console.log('Error: ', err);
		const e = err as ClientResponseError;
		throw error(e.status, e.message);
	}

	return {
		tastingNote: toTastingNoteExpanded(record)
	};
};
