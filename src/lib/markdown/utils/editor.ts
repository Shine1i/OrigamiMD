import type { JSONContent } from '@tiptap/core';
import { NoteManager } from '$lib';
import { Editor } from 'svelte-tiptap';
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
export function scrollToSelection(editor: Editor): void {
	let { node } = editor.view.domAtPos(editor.state.selection.anchor);

	if (node.nodeType === Node.TEXT_NODE) {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		node = node.parentElement;
	}

	if (node) {
		(node as HTMLElement).scrollIntoView?.(false);
	}
}
