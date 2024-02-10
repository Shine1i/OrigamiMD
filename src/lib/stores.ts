import { NoteManager, TauriFileOperations } from '$lib';
import { writable } from 'svelte/store';
import { Editor } from 'svelte-tiptap';
import type { TableOfContentData } from '@tiptap-pro/extension-table-of-contents';

export const fileHandlerStore = writable(new NoteManager('Notes'));
interface NoteController {
	editor: Editor | undefined;
	currentNote: string;
	noteContent: string;
	notes: string[];
	toc: TableOfContentData | null;
}

export const editorStore = writable<NoteController>({
	editor: undefined,
	currentNote: '',
	noteContent: '',
	notes: [],
	toc: null
});
