import type {
	CoffeeExpanded,
	CoffeeExpandedRecord,
	CultivarDTO,
	CultivarRecord,
	CultivarsForProducer,
	CultivarsForProducerRecord,
	ProducerDTO,
	ProducerRecord,
	RoasterDTO,
	RoasterRecord,
	TastingNoteExpanded,
	TastingNoteExpandedRecord
} from './types';
import { formatDate, monthFormat } from './utils';

export const toProducerDTO = (record: ProducerRecord): ProducerDTO => {
	return {
		id: record.id,
		name: record.name,
		owner: record.owner,
		address: record.address,
		country: record.country
	};
};

export const toCultivarDTO = (cultivar: CultivarRecord): CultivarDTO => {
	return {
		id: cultivar.id,
		name: cultivar.name
	};
};

export const toCoffeeExpanded = (coffee: CoffeeExpandedRecord): CoffeeExpanded => {
	return {
		id: coffee.id,
		process: coffee.process,
		roaster_name: coffee.roaster_name,
		producer_name: coffee.producer_name,
		cultivar_name: coffee.cultivar_name,
		harvest_date: formatDate(coffee.harvest_date, monthFormat),
		average_rating: coffee.average_rating
	};
};

export const toTastingNoteExpanded = (note: TastingNoteExpandedRecord): TastingNoteExpanded => {
	return {
		id: note.id,
		rating: note.rating ?? 0,
		tagline: note.tagline ?? '',
		detail: note.detail ?? '',
		updated: note.updated,
		user_name: note.user_name,
		coffee_id: note.coffee_id,
		roaster_name: note.roaster_name,
		producer_name: note.producer_name,
		cultivar_name: note.cultivar_name,
		harvest_date: formatDate(note.harvest_date, monthFormat)
	};
};

export const getCultivarsForProducer = (
	records: CultivarsForProducerRecord[]
): CultivarsForProducer[] => {
	if (records.length === 0) {
		return [];
	} else {
		return records.map(toCultivarsForProducer);
	}
};

export const toCultivarsForProducer = (pc: CultivarsForProducerRecord): CultivarsForProducer => {
	return {
		pc_id: pc.id,
		producer_id: pc.producer_id,
		producer_name: pc.producer_name,
		cultivar_id: pc.cultivar_id,
		cultivar_name: pc.cultivar_name,
		harvest_date: formatDate(pc.harvest_date, monthFormat)
	};
};

export const toRoasterDTO = (record: RoasterRecord): RoasterDTO => {
	return {
		id: record.id,
		name: record.name,
		url: record.url || '',
		country: record.country || '',
		subscription: record.subscription,
		mailorder: record.mailorder
	};
};

// export const getCultivarDTOs(records: ProducerCultivarRecord[]): CultivarDTO[] => {
// 	return records.map(toCultivarDTO)
// }

// export function sortCoffees(coffeeDTOs: CoffeeDTO[]): CoffeeDTO[] {
// 	return coffeeDTOs.sort((a, b) => {
// 		// Sort by roaster name
// 		const roasterComparison: number = a.roaster.name.localeCompare(b.roaster.name);
// 		if (roasterComparison !== 0) {
// 			return roasterComparison;
// 		}

// 		// Sort by producer name
// 		const producerComparison: number = a.producer.name.localeCompare(b.producer.name);
// 		if (producerComparison !== 0) {
// 			return producerComparison;
// 		}

// 		// Sort by cultivar name
// 		const cultivarComparison: number = a.cultivar.name.localeCompare(b.cultivar.name);
// 		if (cultivarComparison !== 0) {
// 			return cultivarComparison;
// 		}

// 		// Sort by harvest date (ascending)
// 		if (a.cultivar.harvest_date && b.cultivar.harvest_date) {
// 			return a.cultivar.harvest_date.localeCompare(b.cultivar.harvest_date);
// 		} else if (!a.cultivar.harvest_date && b.cultivar.harvest_date) {
// 			return 1;
// 		} else if (a.cultivar.harvest_date && !b.cultivar.harvest_date) {
// 			return -1;
// 		} else {
// 			return 0;
// 		}
// 	});
// }
