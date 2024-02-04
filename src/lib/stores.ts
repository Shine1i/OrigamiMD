import { NoteManager, TauriFileOperations } from '$lib';
import { type Readable, writable } from 'svelte/store';
import { Editor } from 'svelte-tiptap';
import type { TableOfContentData } from '@tiptap-pro/extension-table-of-contents';

export const fileHandlerStore = writable(new NoteManager('Notes', new TauriFileOperations()));
interface NoteController {
	editor: Editor | null;
	currentNote: string;
	noteContent: string;
	notes: string[];
	toc: TableOfContentData | null;
}

export const editorStore = writable<NoteController>({
	editor: null,
	currentNote: '',
	noteContent: '',
	notes: [],
	toc: null
});
