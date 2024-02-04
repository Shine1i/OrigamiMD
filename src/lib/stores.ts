import { NoteManager, TauriFileOperations } from '$lib';
import { writable } from 'svelte/store';

export const fileHandlerStore = writable(new NoteManager('Notes', new TauriFileOperations()));
interface NoteController {
	currentNote: string;
	noteContent: string;
}
export const editorStore = writable<NoteController>({
	currentNote: '',
	noteContent: ''
});
