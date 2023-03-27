import type { z, ZodError } from 'zod';

export const ROASTER = 'roaster';
export const PRODUCER = 'producer';
export const CULTIVAR = 'cultivar';
export const PRODUCER_CULTIVAR = 'producer_cultivar';
export const COFFEE = 'coffee';
export const TASTING_NOTE = 'tasting_note';
export const USER = 'user';
export const LOG = 'log';
export const PAGE_VIEW = 'page_view';

export const VIEW_CULTIVARS_FOR_PRODUCER = 'vw_cultivar_for_producer';
export const VIEW_TASTING_NOTE_EXPANDED = 'vw_tasting_note_expanded';
export const VIEW_COFFEE_EXPANDED = 'vw_coffee_expanded';

export const CREATE = 'create';
export const UPDATE = 'update';
export const DELETE = 'delete';

export const processes = ['Washed', 'Semi-washed', 'Natural', 'Honey'];

export const FAILED_TO_DELETE_RECORD = 'Failed to delete record';

export const toCamelCase = (str: string) => {
	return str.replace(/\b\w/g, (match: string) => match.toUpperCase());
};

export const serializeNonPOJOs = <T>(obj: T): T => {
	return structuredClone(obj);
};

export const monthFormat: Intl.DateTimeFormatOptions = {
	year: 'numeric',
	month: 'long'
};

export const dayFormat: Intl.DateTimeFormatOptions = {
	weekday: 'long',
	year: 'numeric',
	month: 'long',
	day: 'numeric'
};

export const timeFormat: Intl.DateTimeFormatOptions = {
	weekday: 'long',
	year: 'numeric',
	month: 'long',
	day: 'numeric',
	hour: 'numeric',
	minute: 'numeric'
};

export const formatISODate = (date: string | undefined): string => {
	if (!date) {
		return '';
	}
	const parsedDate = new Date(String(date));

	if (isNaN(parsedDate.getTime())) {
		return '';
	}
	return parsedDate.toISOString().slice(0, 19).replace('T', ' ') + '.000Z';
};

export const formatDate = (date: string | undefined, options: Intl.DateTimeFormatOptions) => {
	if (!date) {
		return '';
	}
	const parsedDate = new Date(date);

	if (isNaN(parsedDate.getTime())) {
		return '';
	}

	return parsedDate.toLocaleDateString('en-US', options);
};

export const validateData = async <T extends z.ZodTypeAny>(
	formData: FormData,
	schema: T
): Promise<{ formData: z.infer<T>; errors: z.inferFlattenedErrors<typeof schema> | null }> => {
	const body = Object.fromEntries(formData);

	try {
		const data = schema.parse(body);
		return {
			formData: data,
			errors: null
		};
	} catch (err) {
		console.log('Error: ', err);
		const errors = (err as ZodError).flatten();
		return {
			formData: body,
			errors
		};
	}
};

export const validateFormData = async <T extends z.ZodTypeAny>(
	formData: FormData,
	schema: T
): Promise<{ formData: z.infer<T>; errors: z.inferFlattenedErrors<typeof schema> | null }> => {
	try {
		const data = schema.parse(formData);
		return {
			formData: data,
			errors: null
		};
	} catch (err) {
		console.log('Error:', err);
		const errors = (err as ZodError).flatten();
		return {
			formData: Object.fromEntries(formData),
			errors
		};
	}
};
