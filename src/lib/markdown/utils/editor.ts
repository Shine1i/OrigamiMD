import type { JSONContent } from '@tiptap/core';
import { NoteManager } from '$lib';
let typingTimeout: NodeJS.Timeout;
export function updateNoteContent(
	content: JSONContent,
	noteManager: NoteManager,
	currentNote: string
) {
	clearTimeout(typingTimeout);
	typingTimeout = setTimeout(async () => {
		await noteManager.updateNoteContent(currentNote, content);
		console.log('Markdown saved to file');
	}, 1000);
}
