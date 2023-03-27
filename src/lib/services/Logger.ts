import type { Log } from '$lib/types';
import { LOG } from '$lib/utils';
import { error } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';

export const auditTrail = async (
	pb: App.Locals['pb'],
	table_name: string,
	record_id: string,
	event_type: string,
	user_id: string
) => {
	try {
		const log: Log = {
			table_name,
			record_id,
			event_type,
			user_id
		};
		await pb.collection(LOG).create<Log>(log);
	} catch (err) {
		if (err instanceof ClientResponseError) {
			throw error(err.status, err.data.message);
		} else {
			throw error(500, 'Something went wrong getting the project');
		}
	}
};
