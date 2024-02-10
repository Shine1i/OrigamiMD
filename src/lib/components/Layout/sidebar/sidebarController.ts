// Import relevant dependencies
import { editorStore } from '$lib/stores';
import { NoteManager } from '$lib';

export const getNotes = async (fileHandlerStore: NoteManager) => {
	if (fileHandlerStore) {
		const notes = await fileHandlerStore.fetchAllNotes();

		editorStore.update((state) => {
			state.notes = notes;
			return state;
		});
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
