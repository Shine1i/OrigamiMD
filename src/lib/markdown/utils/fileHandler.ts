import {
	BaseDirectory,
	createDir,
	exists,
	type FileEntry,
	readDir,
	readTextFile,
	removeFile,
	writeFile
} from '@tauri-apps/api/fs';
import { path } from '@tauri-apps/api';

export class MarkdownFileManager {
	notesDirectory: string;
	private collectedNotes: string[] = [];
	constructor(notesDirectory: string) {
		this.notesDirectory = notesDirectory;
	}
	async ensureNoteDirectoryExists() {
		const directoryExists = await exists(this.notesDirectory, { dir: BaseDirectory.Document });
		if (!directoryExists) {
			await createDir(this.notesDirectory, { dir: BaseDirectory.Document });
		}
	}
	async addNewNote(noteTitle: string, textContent: string = ''): Promise<void> {
		await this.ensureNoteDirectoryExists();
		if (
			!(await exists(`${this.notesDirectory}/${noteTitle}.md`, { dir: BaseDirectory.Document }))
		) {
			await writeFile(`${this.notesDirectory}/${noteTitle}.md`, textContent, {
				dir: BaseDirectory.Document
			});
		} else {
			throw new Error('Note already exists');
		}
	}
	async retrieveNote(noteTitle: string): Promise<string> {
		await this.ensureNoteDirectoryExists();
		if (await exists(`${this.notesDirectory}/${noteTitle}`, { dir: BaseDirectory.Document })) {
			return await readTextFile(`${this.notesDirectory}/${noteTitle}`, {
				dir: BaseDirectory.Document
			});
		} else {
			throw new Error('Note does not exist');
		}
	}
	async updateNoteContent(noteTitle: string, content: string): Promise<void> {
		await this.ensureNoteDirectoryExists();
		if (await exists(`${this.notesDirectory}/${noteTitle}`, { dir: BaseDirectory.Document })) {
			await writeFile(`${this.notesDirectory}/${noteTitle}`, content, {
				dir: BaseDirectory.Document,
				append: false
			});
		} else {
			throw new Error('Note does not exist');
		}
	}
	async removeNote(noteTitle: string): Promise<void> {
		await this.ensureNoteDirectoryExists();
		if (await exists(`${this.notesDirectory}/${noteTitle}.md`, { dir: BaseDirectory.Document })) {
			await removeFile(`${this.notesDirectory}/${noteTitle}.md`, { dir: BaseDirectory.Document });
		} else {
			throw new Error('Note does not exist');
		}
	}
	async listDirectory(): Promise<FileEntry[]> {
		await this.ensureNoteDirectoryExists();
		return await readDir(this.notesDirectory, { dir: BaseDirectory.Document, recursive: true });
	}
	async buildNoteList(dirContents: FileEntry[]) {
		for (const file of dirContents) {
			if (file.children) {
				await this.buildNoteList(file.children);
			} else if (file.path.endsWith('.md')) {
				this.collectedNotes.push(await path.basename(file.path));
			}
		}
	}
	async fetchAllNotes() {
		const directoryContents = await this.listDirectory();
		await this.buildNoteList(directoryContents);
		return this.collectedNotes;
	}
}
export class DirectoryManager {
	markdownFileManager: MarkdownFileManager;
	constructor(markdownFileManager: MarkdownFileManager) {
		this.markdownFileManager = markdownFileManager;
	}
	async fetchAllNotes(): Promise<string[]> {
		return this.markdownFileManager.fetchAllNotes();
	}
	async retrieveMarkdownFileContents(noteTitle: string): Promise<string> {
		return this.markdownFileManager.retrieveNote(noteTitle);
	}
	async addNewNote(noteTitle: string, textContent: string = ''): Promise<void> {
		return this.markdownFileManager.addNewNote(noteTitle, textContent);
	}
	async updateNoteContent(noteTitle: string, additionalContent: string): Promise<void> {
		return this.markdownFileManager.updateNoteContent(noteTitle, additionalContent);
	}
	async removeNote(noteTitle: string): Promise<void> {
		return this.markdownFileManager.removeNote(noteTitle);
	}
}
