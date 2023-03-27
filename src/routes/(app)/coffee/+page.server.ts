import type { CoffeeExpanded, CoffeeExpandedRecord } from '$lib/types';
import { serializeNonPOJOs, VIEW_COFFEE_EXPANDED } from '$lib/utils';
import { toCoffeeExpanded } from '$lib/helper';
import { error } from '@sveltejs/kit';
import type { ClientResponseError } from 'pocketbase';

export const load = async ({ locals }) => {
	let records: CoffeeExpandedRecord[] = [];
	let coffees: CoffeeExpanded[] = [];
	try {
		records = serializeNonPOJOs<CoffeeExpandedRecord[]>(
			await locals.pb.collection(VIEW_COFFEE_EXPANDED).getFullList<CoffeeExpandedRecord>({
				sort: '-average_rating'
			})
		);
	} catch (err) {
		console.log('Error: ', err);
		const e = err as ClientResponseError;
		throw error(e.status, e.message);
	}
	coffees = records.map(toCoffeeExpanded);

	return { coffees };
};

// export const load: PageServerLoad = async ({ locals }) => {
// 	let coffees: CoffeeRecord[];
// 	let tastingNoteRecords: TastingNoteRecord[];
// 	try {
// 		coffees = serializeNonPOJOs<CoffeeRecord[]>(
// 			await locals.pb.collection(COFFEE).getFullList<CoffeeRecord>(undefined, {
// 				sort: 'roaster',
// 				expand: 'roaster, producer_cultivar.producer, producer_cultivar.cultivar'
// 			})
// 		);
// 		tastingNoteRecords = serializeNonPOJOs<TastingNoteRecord[]>(
// 			await locals.pb.collection(TASTING_NOTE).getFullList<TastingNoteRecord>(undefined)
// 		);
// 	} catch (err) {
// 		console.log('Error: ', err);
// 		const e = err as ClientResponseError;
// 		throw error(e.status, e.message);
// 	}

// 	const tastingNotesByCoffeeId: Record<string, TastingNoteRecord[]> = {};
// 	for (const tastingNote of tastingNoteRecords) {
// 		if (tastingNote.rating !== undefined) {
// 			if (!tastingNotesByCoffeeId[tastingNote.coffee]) {
// 				tastingNotesByCoffeeId[tastingNote.coffee] = [];
// 			}
// 			tastingNotesByCoffeeId[tastingNote.coffee].push(tastingNote);
// 		}
// 	}
// 	let coffeeDTOs: CoffeeDTO[] = getDTOs(coffees);
// 	const coffeeDTOsWithAvgRating: CoffeeDTO[] = coffeeDTOs.map((coffee) => {
// 		const tastingNotes = tastingNotesByCoffeeId[String(coffee.id)] ?? [];
// 		const totalRating = tastingNotes.reduce((sum, tn) => sum + tn.rating!, 0);
// 		const averageRating = totalRating / tastingNotes.length || 0;
// 		return {
// 			...coffee,
// 			averageRating
// 		};
// 	});

// 	return { coffees: coffeeDTOsWithAvgRating };
// };

// export const load: LayoutServerLoad = async ({ locals }) => {
// 	let coffees: CoffeeRecord[];
// 	let producer_cultivars: ProducerCultivarRecord[];
// 	try {
// 		coffees = serializeNonPOJOs<CoffeeRecord[]>(
// 			await locals.pb.collection(COFFEE).getFullList<CoffeeRecord>(undefined, {
// 				sort: 'roaster',
// 				expand: 'roaster'
// 			})
// 		);
// 		producer_cultivars = serializeNonPOJOs<ProducerCultivarRecord[]>(
// 			await locals.pb.collection(PRODUCER_CULTIVAR).getFullList<ProducerCultivarRecord>(undefined, {
// 				sort: 'producer, cultivar',
// 				expand: 'producer, cultivar'
// 			})
// 		);
// 	} catch (err) {
// 		console.log('Error: ', err);
// 		const e = err as ClientResponseError;
// 		throw error(e.status, e.message);
// 	}

// 	return {
// 		coffeeDTOs: getCoffeeDTOs(coffees, producer_cultivars),
// 		producer_cultivars: getProducerCultivarDTOs(producer_cultivars)
// 	};
// };

// function getProducerCultivarDTOs(producer_cultivars: ProducerCultivarRecord[]) {
// 	const DT0s: ProducerCultivarDTO[] = producer_cultivars.map(
// 		({ id, expand: { producer, cultivar }, harvest_date }) => ({
// 			id,
// 			producer: {
// 				id: (producer as ProducerRecord).id,
// 				name: (producer as ProducerRecord).name
// 			},
// 			cultivar: {
// 				id: (cultivar as CultivarRecord).id,
// 				name: (cultivar as CultivarRecord).name,
// 				harvest_date: formatDate(harvest_date, monthFormat)
// 			}
// 		})
// 	);
// 	return DT0s;
// }

// function getCoffeeDTOs(coffees: CoffeeRecord[], producer_cultivars: ProducerCultivarRecord[]) {
// 	// Join coffee and producer_cultivar arrays by producer_cultivar id
// 	const joinedData = coffees.map((c) => {
// 		const pc = producer_cultivars.find((p) => p.id === c.producer_cultivar);
// 		return { ...c, producer_cultivar: pc };
// 	}) as Array<CoffeeRecord & { producer_cultivar: ProducerCultivarRecord }>;

// 	const coffeeDTOs: CoffeeDTO[] = joinedData.map(
// 		({
// 			expand: { roaster },
// 			producer_cultivar: {
// 				expand: { producer, cultivar },
// 				harvest_date
// 			},
// 			id
// 		}) => ({
// 			id,
// 			roaster: {
// 				id: (roaster as RoasterRecord).id,
// 				name: (roaster as RoasterRecord).name,
// 				url: (roaster as RoasterRecord).url || ''
// 			},
// 			producer: {
// 				id: (producer as ProducerRecord).id,
// 				name: (producer as ProducerRecord).name
// 			},
// 			cultivar: {
// 				id: (cultivar as CultivarRecord).id,
// 				name: (cultivar as CultivarRecord).name,
// 				harvest_date: harvest_date || ''
// 			}
// 		})
// 	);

// 	return {
// 		sortedCoffeeDTOs: sortCoffees(coffeeDTOs)
// 	};
// }

// ----------- older -----------
// const joinedData = coffees.map((c) => {
// 	const pc = producerCultivars.find((p) => p.id === c.producer_cultivar);
// 	return { ...c, producerCultivars: pc };
// });

// Sort the joined data by roaster, then producer, then cultivar, then harvest date
// joinedData.sort(
// 	(
// 		a: CoffeeRecord & { producer_cultivar: ProducerCultivarRecord },
// 		b: CoffeeRecord & { producer_cultivar: ProducerCultivarRecord }
// 	) => {
// 		if (
// 			(a.producer_cultivar?.expand.producer as ProducerRecord).name >
// 			(b.producer_cultivar?.expand.producer as ProducerRecord).name
// 		) {
// 			return 1;
// 		} else if (
// 			(a.producer_cultivar?.expand.producer as ProducerRecord).name <
// 			(b.producer_cultivar?.expand.producer as ProducerRecord).name
// 		) {
// 			return -1;
// 		} else {
// 			if ((a.expand.roaster as RoasterRecord).name > (b.expand.roaster as RoasterRecord).name) {
// 				return 1;
// 			} else if (
// 				(a.expand.roaster as RoasterRecord).name < (b.expand.roaster as RoasterRecord).name
// 			) {
// 				return -1;
// 			} else {
// 				if (
// 					(a.producer_cultivar.expand.cultivar as CultivarRecord).name >
// 					(b.producer_cultivar.expand.cultivar as CultivarRecord).name
// 				) {
// 					return 1;
// 				} else if (
// 					(a.producer_cultivar.expand.cultivar as CultivarRecord).name <
// 					(b.producer_cultivar.expand.cultivar as CultivarRecord).name
// 				) {
// 					return -1;
// 				} else {
// 					if (a.producer_cultivar?.harvest_date && b.producer_cultivar?.harvest_date) {
// 						if (a.producer_cultivar.harvest_date > b.producer_cultivar.harvest_date) {
// 							return 1;
// 						} else if (a.producer_cultivar.harvest_date < b.producer_cultivar.harvest_date) {
// 							return -1;
// 						} else {
// 							return 0;
// 						}
// 					} else if (a.producer_cultivar?.harvest_date) {
// 						return -1;
// 					} else if (b.producer_cultivar?.harvest_date) {
// 						return 1;
// 					} else {
// 						return 0;
// 					}
// 				}
// 			}
// 		}
// 	}
// );
