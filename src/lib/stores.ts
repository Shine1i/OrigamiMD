import { NoteManager, TauriFileOperations } from '$lib';
import { type Readable, writable } from 'svelte/store';
import { Editor } from 'svelte-tiptap';

export const fileHandlerStore = writable(new NoteManager('Notes', new TauriFileOperations()));
interface NoteController {
	editor: Editor | null;
	currentNote: string;
	noteContent: string;
	notes: string[];
}

export const editorStore = writable<NoteController>({
	editor: null,
	currentNote: '',
	noteContent: '',
	notes: []
});
