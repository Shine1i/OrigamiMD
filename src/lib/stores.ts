import { MarkdownFileHandler } from '$lib/markdown/utils/fileHandler';
import { writable } from 'svelte/store';

export const fileHandlerStore = writable(new MarkdownFileHandler('Notes'));
export const selectedNoteStore = writable(''); // Initially empty
export const markdownStore = writable('');
