import { NoteManager, TauriFileOperations } from '$lib';
import { writable } from 'svelte/store';

export const fileHandlerStore = writable(new NoteManager('Notes',new TauriFileOperations()));
export const selectedNoteStore = writable(''); // Initially empty
export const markdownStore = writable('');
