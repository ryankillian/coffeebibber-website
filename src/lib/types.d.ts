import type { Record } from 'pocketbase';
import type { z } from 'zod';

import {
	updateEmailSchema,
	updateUsernameSchema,
	createRoasterSchema,
	createCoffeeSchema,
	createProducerSchema,
	createCultivarSchema,
	createProducerCultivarSchema,
	createTastingNoteSchema
} from '$lib/schemas';

interface ID {
	id: string;
}

type Cultivar = z.infer<typeof createCultivarSchema>;
interface CultivarRecord extends Cultiver, Record {}
interface CultivarDTO extends Cultivar, ID {}

type Producer = z.infer<typeof createProducerSchema>;
interface ProducerRecord extends Producer, Record {}
interface ProducerDTO extends Producer, ID {}

type ProducerCultivar = z.infer<typeof createProducerCultivarSchema>;
interface ProducerCultivarRecord extends ProducerCultivar, Record {}

type Roaster = z.infer<typeof createRoasterSchema>;
interface RoasterRecord extends Roaster, Record {}
interface RoasterDTO extends Roaster, ID {}

type Coffee = z.infer<typeof createCoffeeSchema>;
interface CoffeeRecord extends Coffee, Record {}

type TastingNote = z.infer<typeof createTastingNoteSchema>;
interface TastingNoteRecord extends TastingNote, Record {}

interface LogRecord extends Log, Record {}

interface CultivarsForProducer {
	pc_id: string;
	producer_id: string;
	producer_name: string;
	harvest_date: string;
	cultivar_id: string;
	cultivar_name: string;
}

interface CultivarsForProducerRecord extends CultivarsForProducer, Record {}

interface TastingNoteExpanded {
	id: string;
	rating: number;
	tagline: string;
	detail: string;
	updated: string;
	user_name: string;
	coffee_id: string;
	roaster_name: string;
	producer_name: string;
	cultivar_name: string;
	harvest_date: string;
}

interface TastingNoteExpandedRecord extends TastingNoteExpanded, Record {}

interface CoffeeExpanded {
	id: string;
	process: string;
	roaster_name: string;
	producer_name: string;
	cultivar_name: string;
	harvest_date: string;
	average_rating: number;
}

interface CoffeeExpandedRecord extends CoffeeExpanded, Record {}

interface Log {
	table_name: string;
	record_id: string;
	event_type: string;
	user_id: string;
}

interface PageView {
	path_name: string;
}

interface User {
	id: string;
	email: string;
	username: string;
}

interface UserRecord extends User, Record {}

type UpdateEmailErrors = z.inferFlattenedErrors<typeof updateEmailDto>['fieldErrors'];
type UpdateUsernameErrors = z.inferFlattenedErrors<typeof updateUsernameDto>['fieldErrors'];

interface UpdateAccountActionData {
	data?: UpdateEmailDto | UpdateUsernameDto;
	errors?: {
		emailErrors?: UpdateEmailErrors;
		usernameErrors?: UpdateUsernameErrors;
	};
	success?: boolean;
}

interface Option {
	value: string;
	label: string;
}
