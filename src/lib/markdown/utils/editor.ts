import { type Config, Editor } from '@milkdown/core';
import type { MilkdownPlugin } from '@milkdown/ctx';
import { NoteManager } from '$lib/markdown/utils/fileHandler';

export async function addPlugin(editor: Editor, plugin: MilkdownPlugin | MilkdownPlugin[]) {
	editor.use(plugin);
	await recreateEditor(editor);
}

export async function removePlugin(editor: Editor, plugin: MilkdownPlugin | MilkdownPlugin[]) {
	await editor.remove(plugin);
	await recreateEditor(editor);
}

export async function removeConfig(editor: Editor, config: Config) {
	editor.removeConfig(config);
	await recreateEditor(editor);
}

export async function recreateEditor(editor: Editor) {
	await editor.destroy();
	await editor.create();
}
let typingTimeout: NodeJS.Timeout | undefined;
export function saveMarkdownToFile(
	markdown: string,
	noteManager: NoteManager,
	currentNote: string
) {
	clearTimeout(typingTimeout);
	typingTimeout = setTimeout(async () => {
		await noteManager.updateNoteContent(currentNote, markdown);
		console.log('Markdown saved to file');
	}, 1000);
}
