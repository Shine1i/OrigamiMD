import { NoteManager, TauriFileOperations } from '$lib';
import { writable } from 'svelte/store';

export const fileHandlerStore = writable(new NoteManager('Notes', new TauriFileOperations()));
interface NoteController {
	currentNote: string;
	noteContent: string;
	notes: string[];
}

export const editorStore = writable<NoteController>({
	currentNote: '',
	noteContent: '',
	notes: []
});
