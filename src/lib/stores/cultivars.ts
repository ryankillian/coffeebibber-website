import type { CultivarRecord } from '$lib/types';
import { writable } from 'svelte/store';
export const cultivarStore = writable<CultivarRecord[]>([]);
