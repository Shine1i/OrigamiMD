// Import relevant dependencies
import { editorStore } from '$lib/stores';
import { NoteManager } from '$lib';
import { get } from 'svelte/store';

export const getNotes = async (fileHandlerStore: NoteManager) => {
	if (fileHandlerStore) {
		const notes = await fileHandlerStore.fetchAllNotes();

		const store = get(editorStore);
		store.notes = notes;

		editorStore.set(store);
	}
};

export const selectNote = async (noteName: string, fileHandlerStore: NoteManager) => {
	const markdownContent = await fileHandlerStore.retrieveNote(noteName);

	editorStore.update((state) => ({
		...state,
		currentNote: noteName,
		noteContent: markdownContent
	}));
};

export const deleteNote = async (noteName: string, fileHandlerStore: NoteManager) => {
	await fileHandlerStore.removeNote(noteName);
	editorStore.update((state) => {
		state.notes = state.notes.filter((note) => note !== noteName);
		return state;
	});
};

export const addNote = async (fileHandlerStore: NoteManager, noteName: string) => {
	if (!noteName) return;

	await fileHandlerStore.addNewNote(noteName, '');

	editorStore.update((state) => {
		state.notes = [...state.notes, noteName + '.json'];
		return state;
	});
};
