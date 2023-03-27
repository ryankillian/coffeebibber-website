import { z } from 'zod';
import { zfd } from 'zod-form-data';

export const IdSchema = z.object({
	id: z
		.string({ required_error: 'ID is required' })
		.length(15, { message: 'ID is required' })
		.trim()
});

export const createCultivarSchema = z.object({
	name: z
		.string({ required_error: 'Name is required' })
		.min(3, { message: 'Name is required' })
		.max(128, { message: 'Name must be 64 characters or less' })
		.trim()
});

export const updateCultivarSchema = createCultivarSchema.merge(IdSchema);

export const createProducerSchema = z.object({
	name: z
		.string({ required_error: 'Name is required' })
		.min(3, { message: 'Name must be at least 1 character' })
		.max(128, { message: 'Name must be 128 characters or less' }),
	owner: z.string().max(128, { message: 'Owner must be 128 characters or less' }).optional(),
	address: z.string().max(128, { message: 'Address must be 128 characters or less' }).optional(),
	country: z.string().max(128, { message: 'Country must be 128 characters or less' }).optional()
});

export const updateProducerSchema = createProducerSchema.merge(IdSchema);

export const createProducerCultivarSchema = z.object({
	producer: z
		.string({ required_error: 'Producer is required' })
		.length(15, { message: 'Producer Id  must be at 15 character' }),
	cultivar: z
		.string({ required_error: 'Cultivar is required' })
		.length(15, { message: 'Cultivar is required' }),
	harvest_date: z
		.string({ required_error: 'Harvest Date is required' })
		.max(64, { message: 'Harvest Date must be 64 characters or less' })
		.optional()
});

export const updateProducerCultivarSchema = createProducerCultivarSchema.merge(IdSchema);

export const deleteProducerCultivarSchema = z.object({
	producer_cultivar: z
		.string({ required_error: 'Producer Cultivar is required' })
		.length(15, { message: 'Producer Cultivar is required' })
		.trim()
});

export const createRoasterSchema = zfd.formData({
	name: zfd.text(
		z
			.string({ required_error: 'Name is required' })
			.min(1, { message: 'Name must be at least 1 character' })
			.max(128, { message: 'Name must be 128 characters or less' })
	),
	country: zfd.text(
		z
			.string()
			.min(1, { message: 'Country must be at least 1 character' })
			.max(128, { message: 'Country must be 128 characters or less' })
			.optional()
	),
	url: zfd.text(
		z
			.string()
			.url()
			.min(1, { message: 'URL must be at least 1 character' })
			.max(128, { message: 'URL must be 128 characters or less' })
			.nullable()
			.optional()
	),
	mailorder: zfd.checkbox(),
	subscription: zfd.checkbox()
});

export const updateRoasterSchema = zfd.formData({
	id: zfd.text(
		z
			.string({ required_error: 'ID is required' })
			.length(15, { message: 'Name must be at least 1 character' })
	),
	name: zfd.text(
		z
			.string({ required_error: 'Name is required' })
			.min(1, { message: 'Name must be at least 1 character' })
			.max(128, { message: 'Name must be 128 characters or less' })
	),
	country: zfd.text(
		z
			.string()
			.min(1, { message: 'Country must be at least 1 character' })
			.max(128, { message: 'Country must be 128 characters or less' })
			.optional()
	),
	url: zfd.text(
		z
			.string()
			.url()
			.min(1, { message: 'URL must be at least 1 character' })
			.max(128, { message: 'URL must be 128 characters or less' })
			.nullable()
			.optional()
	),
	mailorder: zfd.checkbox(),
	subscription: zfd.checkbox()
});

export const createCoffeeSchema = z.object({
	roaster: z
		.string({ required_error: 'Roaster is required' })
		.length(15, { message: 'Roaster is invalid' }),
	producer_cultivar: z
		.string({ required_error: 'Producer Cultivar is required' })
		.length(15, { message: 'Producer Cultivar is invalid' }),
	process: z.string().max(128, { message: 'Process must be 128 characters or less' }).optional()
});

export const createTastingNoteSchema = z.object({
	coffee: z
		.string({ required_error: 'Coffee is required' })
		.length(15, { message: 'Coffee is required' })
		.trim(),
	rating: z
		.string()
		.transform((val) => parseFloat(val))
		.refine((val) => val >= 0, { message: 'Rating must be between 0 and 100' })
		.refine((val) => val <= 100, { message: 'Rating must be between 0 and 100' })
		.optional(),
	tagline: z.string().max(128, { message: 'Tagline must be 128 characters or less' }).optional(),
	detail: z.string().max(512, { message: 'Tasting note must be 512 characters or less' }).optional()
});

export const updateTastingNoteSchema = createTastingNoteSchema.omit({ coffee: true });

export const loginUserSchema = z.object({
	email: z
		.string({ required_error: 'Email is required' })
		.email({ message: 'Email must be a valid email.' }),
	password: z.string({ required_error: 'Password is required' })
});

export const registerUserSchema = z.object({
	email: z
		.string({ required_error: 'Email is required' })
		.email({ message: 'Email must be a valid email' }),
	password: z
		.string({ required_error: 'Password is required' })
		.regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
			message:
				'Password must be a minimum of 8 characters & contain at least one letter, one number, and one special character.'
		})
});

export const updateEmailSchema = z.object({
	email: z
		.string({ required_error: 'Email is required' })
		.email({ message: 'Email must be a valid email' })
});

export const updateUsernameSchema = z.object({
	username: z
		.string({ required_error: 'Username is required' })
		.min(3, { message: 'Username must be at least 3 characters' })
		.max(24, { message: 'Username must be 24 characters or less' })
		.regex(/^[a-zA-Z0-9]*$/, { message: 'Username can only contain letters or numbers.' })
});

export const updatePasswordSchema = z
	.object({
		oldPassword: z.string({ required_error: 'Old password is required' }),
		password: z
			.string({ required_error: 'Password is required' })
			.regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
				message:
					'Password must be a minimum of 8 characters & contain at least one letter, one number, and one special character.'
			}),
		passwordConfirm: z
			.string({ required_error: 'Confirm Password is required' })
			.regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
				message:
					'Password must be a minimum of 8 characters & contain at least one letter, one number, and one special character.'
			})
	})
	.superRefine(({ passwordConfirm, password }, ctx) => {
		if (passwordConfirm !== password) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Password & Confirm password must match',
				path: ['password']
			});
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Password & Confirm password must match',
				path: ['passwordConfirm']
			});
		}
	});

export const updateProfileSchema = z.object({
	name: z
		.string({ required_error: 'Name is required' })
		.min(1, { message: 'Name is required' })
		.max(64, { message: 'Name must be 64 characters or less' })
		.trim()
});

export const contactSchema = z.object({
	username: z
		.string({ required_error: 'Name is required' })
		.min(1, { message: 'Name must be more than 1 character' })
		.max(64, { message: 'Name must be less than 64 characters' })
		.trim(),
	email: z
		.string({ required_error: 'Email is required' })
		.min(6, { message: 'Email is required' })
		.max(64, { message: 'Email must be less than 64 characters' })
		.email({ message: 'Email must be a valid email address' }),
	message: z
		.string({ required_error: 'Message is required' })
		.min(1, { message: 'Message must be more than 1 character' })
		.max(512, { message: 'Message must be less than 512 characters' })
		.trim()
});

// name: z
// 	.string({ required_error: 'Name is required' })
// 	.regex(/^[a-zA-z\s]*$/, { message: 'Name can only contain letters and spaces.' })
// 	.min(2, { message: 'Name must be at least 2 characters' })
// 	.max(64, { message: 'Name must be less than 64 characters' })
// 	.trim(),

// producer: z
// 	.string({ required_error: 'Producer is required' })
// 	.length(15, { message: 'Producer is invalid' }),
// cultivar: z
// 	.string({ required_error: 'Cultivar is required' })
// 	.length(15, { message: 'Cultivar is invalid' }),
// harvestDate: z.union([
// 	z.literal(''),
// 	z
// 		.string()
// 		.transform((string) => new Date(string))
// 		.pipe(z.date())
// 		.optional()
// ]),
// harvest_date: z
// 	.string({ required_error: 'Harvest Date is required' })
// 	.max(64, { message: 'Harvest Date must be 64 characters or less' })
// 	.optional(),
