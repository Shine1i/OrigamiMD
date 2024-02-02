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

export class MarkdownFileHandler {
	notesDir: string;
	private notes: string[] = [];
	constructor(notesDir: string) {
		this.notesDir = notesDir;
	}

	async ensureNotesDirectoryExists() {
		const isDirExists = await exists(this.notesDir, { dir: BaseDirectory.Document });
		if (!isDirExists) {
			await createDir(this.notesDir, { dir: BaseDirectory.Document });
		}
	}

	async createNote(noteName: string, content: string = ''): Promise<void> {
		await this.ensureNotesDirectoryExists();
		if (!(await exists(`${this.notesDir}/${noteName}.md`, { dir: BaseDirectory.Document }))) {
			await writeFile(`${this.notesDir}/${noteName}.md`, content, { dir: BaseDirectory.Document });
		} else {
			throw new Error('Note already exists');
		}
	}

	async readNote(noteName: string): Promise<string> {
		await this.ensureNotesDirectoryExists();
		if (await exists(`${this.notesDir}/${noteName}`, { dir: BaseDirectory.Document })) {
			return await readTextFile(`${this.notesDir}/${noteName}`, { dir: BaseDirectory.Document });
		} else {
			throw new Error('Note does not exist');
		}
	}

	async appendToNote(noteName: string, content: string): Promise<void> {
		await this.ensureNotesDirectoryExists();
		if (await exists(`${this.notesDir}/${noteName}.md`, { dir: BaseDirectory.Document })) {
			await writeFile(`${this.notesDir}/${noteName}.md`, content, {
				dir: BaseDirectory.Document,
				append: true
			});
		} else {
			throw new Error('Note does not exist');
		}
	}

	async deleteNote(noteName: string): Promise<void> {
		await this.ensureNotesDirectoryExists();
		if (await exists(`${this.notesDir}/${noteName}.md`, { dir: BaseDirectory.Document })) {
			await removeFile(`${this.notesDir}/${noteName}.md`, { dir: BaseDirectory.Document });
		} else {
			throw new Error('Note does not exist');
		}
	}
	async readDirectory(): Promise<FileEntry[]> {
		await this.ensureNotesDirectoryExists();

		return await readDir(this.notesDir, { dir: BaseDirectory.Document, recursive: true });
	}

	async processEntries(entries: FileEntry[]) {
		for (const entry of entries) {
			if (entry.children) {
				await this.processEntries(entry.children);
			} else if (entry.path.endsWith('.md')) {
				this.notes.push(await path.basename(entry.path));
			}
		}
	}

	async getNotes() {
		const entries = await this.readDirectory();
		await this.processEntries(entries);
		return this.notes;
	}
}
export class Directory {
	markdownFileHandler: MarkdownFileHandler;
	constructor(markdownFileHandler: MarkdownFileHandler) {
		this.markdownFileHandler = markdownFileHandler;
	}

	async getNotes(): Promise<string[]> {
		return this.markdownFileHandler.getNotes();
	}
	async getFileContent(noteName: string): Promise<string> {
		return this.markdownFileHandler.readNote(noteName);
	}
}
