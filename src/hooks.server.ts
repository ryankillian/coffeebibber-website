import PocketBase from 'pocketbase';
import { POCKETBASE_URL } from '$env/static/private';
import { PAGE_VIEW, serializeNonPOJOs } from '$lib/utils';
import type { PageView, UserRecord } from '$lib/types';

import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { createHandler, defaultOptions } from 'svelte-kit-bot-block';

const botHandle = createHandler({
	block: true,
	pathnames: [
		...defaultOptions.pathnames,
		/\.sql$/,
		/^\/reset-password$/,
		/^\/wp/,
		/^\/wordpress/,
		/^\/backup/,
		/^\/bk/,
		/^\/bc/
	]
});

const mainHandle: Handle = async ({ event, resolve }) => {
	event.locals.pb = new PocketBase(POCKETBASE_URL);
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	try {
		if (event.locals.pb.authStore.isValid) {
			const authData = await event.locals.pb.collection('users').authRefresh();
		}
	} catch (_) {
		event.locals.pb.authStore.clear();
	}

	if (event.locals.pb.authStore.isValid) {
		event.locals.user = serializeNonPOJOs<UserRecord>(
			event.locals.pb.authStore.model as UserRecord
		);
	} else {
		event.locals.user = null;
	}

	try {
		event.locals.pb.collection(PAGE_VIEW).create<PageView>({ path_name: event.url.pathname });
	} catch (_) {
		// TODO: Page views not essential. No await used.
	}

	const response = await resolve(event);

	// TODO: toggle this for dev
	// response.headers.set('set-cookie', event.locals.pb.authStore.exportToCookie({ secure: false }));
	response.headers.set('set-cookie', event.locals.pb.authStore.exportToCookie());

	return response;
};

export const handle = sequence(botHandle, mainHandle);
