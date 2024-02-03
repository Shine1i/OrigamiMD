import { NoteManager, TauriFileOperations } from '$lib';
import { writable } from 'svelte/store';
import type { Editor } from '@milkdown/core';

export const fileHandlerStore = writable(new NoteManager('Notes', new TauriFileOperations()));
interface EditorStore {
	editorInstance: Editor | null;
	currentNote: string;
	noteContent: string;
}
export const editorStore = writable<EditorStore>({
	editorInstance: null,
	currentNote: '',
	noteContent: ''
});
