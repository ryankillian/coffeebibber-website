import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter(),
		csp: {
			directives: {
				'base-uri': ["'self'"],
				'object-src': ["'none'"],
				'script-src': ["'self'"]
			}
		}
	}
};

export default config;
