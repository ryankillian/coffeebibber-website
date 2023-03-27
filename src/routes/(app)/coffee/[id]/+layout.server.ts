import type { ClientResponseError } from 'pocketbase';
import { error } from '@sveltejs/kit';
import { toCoffeeExpanded, toTastingNoteExpanded } from '$lib/helper';
import { serializeNonPOJOs, VIEW_COFFEE_EXPANDED, VIEW_TASTING_NOTE_EXPANDED } from '$lib/utils';
import type {
	CoffeeExpanded,
	CoffeeExpandedRecord,
	TastingNoteExpanded,
	TastingNoteExpandedRecord
} from '$lib/types';

export const load = async ({ locals, params }) => {
	let tastingNoteRecords: TastingNoteExpandedRecord[] = [];
	let tastingNotes: TastingNoteExpanded[] = [];
	let coffeeRecord: CoffeeExpandedRecord;
	let coffee: CoffeeExpanded;
	try {
		coffeeRecord = serializeNonPOJOs<CoffeeExpandedRecord>(
			await locals.pb.collection(VIEW_COFFEE_EXPANDED).getOne<CoffeeExpandedRecord>(params.id)
		);

		tastingNoteRecords = serializeNonPOJOs<TastingNoteExpandedRecord[]>(
			await locals.pb
				.collection(VIEW_TASTING_NOTE_EXPANDED)
				.getFullList<TastingNoteExpandedRecord>(undefined, {
					filter: `coffee_id = "${params.id}"`,
					sort: '-updated'
				})
		);
	} catch (err) {
		console.log('Error: ', err);
		const e = err as ClientResponseError;
		throw error(e.status, e.message);
	}

	coffee = toCoffeeExpanded(coffeeRecord);
	tastingNotes = tastingNoteRecords.map(toTastingNoteExpanded);
	return {
		coffee,
		tastingNotes
	};
};
