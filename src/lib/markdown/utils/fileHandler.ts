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

interface FileOperations {
	addNewFile(filePath: string, content: string): Promise<void>;
	readFile(filePath: string): Promise<string>;
	updateFile(filePath: string, content: string): Promise<void>;
	removeFile(filePath: string): Promise<void>;
	listDirectory(directory: string): Promise<FileEntry[]>;
}

export class TauriFileOperations implements FileOperations {
	async addNewFile(filePath: string, content: string): Promise<void> {
		await writeFile(filePath, content, { dir: BaseDirectory.Document });
	}

	async readFile(filePath: string): Promise<string> {
		return await readTextFile(filePath, { dir: BaseDirectory.Document });
	}

	async updateFile(filePath: string, content: string): Promise<void> {
		await writeFile(filePath, content, { dir: BaseDirectory.Document, append: false });
	}

	async removeFile(filePath: string): Promise<void> {
		await removeFile(filePath, { dir: BaseDirectory.Document });
	}

	async listDirectory(directory: string): Promise<FileEntry[]> {
		return await readDir(directory, { dir: BaseDirectory.Document, recursive: true });
	}
}

export class NoteManager {
	fileOperations: FileOperations;
	notesDirectory: string;
	private collectedNotes: string[] = [];

	constructor(notesDirectory: string, fileOperations: FileOperations) {
		this.notesDirectory = notesDirectory;
		this.fileOperations = fileOperations;
	}

	async ensureNoteDirectoryExists(): Promise<void> {
		const directoryExists = await exists(this.notesDirectory, { dir: BaseDirectory.Document });
		if (!directoryExists) {
			await createDir(this.notesDirectory, { dir: BaseDirectory.Document });
		}
	}

	async addNewNote(noteTitle: string, textContent: string = ''): Promise<void> {
		await this.ensureNoteDirectoryExists();
		const filePath = `${this.notesDirectory}/${noteTitle}.md`;

		if (!(await exists(filePath, { dir: BaseDirectory.Document }))) {
			await this.fileOperations.addNewFile(filePath, textContent);
		} else {
			throw new Error('Note already exists');
		}
	}

	async retrieveNote(noteTitle: string): Promise<string> {
		await this.ensureNoteDirectoryExists();
		const filePath = `${this.notesDirectory}/${noteTitle}`;

		if (await exists(filePath, { dir: BaseDirectory.Document })) {
			return await this.fileOperations.readFile(filePath);
		} else {
			throw new Error('Note does not exist');
		}
	}

	async updateNoteContent(noteTitle: string, content: string): Promise<void> {
		await this.ensureNoteDirectoryExists();
		const filePath = `${this.notesDirectory}/${noteTitle}`;

		if (await exists(filePath, { dir: BaseDirectory.Document })) {
			await this.fileOperations.updateFile(filePath, content);
		} else {
			throw new Error('Note does not exist');
		}
	}

	async removeNote(noteTitle: string): Promise<void> {
		await this.ensureNoteDirectoryExists();
		const filePath = `${this.notesDirectory}/${noteTitle}`;

		if (await exists(filePath, { dir: BaseDirectory.Document })) {
			await this.fileOperations.removeFile(filePath);
		} else {
			throw new Error('Note does not exist');
		}
	}

	async fetchAllNotes() {
		const directoryContents = await this.fileOperations.listDirectory(this.notesDirectory);
		await this.buildNoteList(directoryContents);
		return this.collectedNotes;
	}

	private async buildNoteList(dirContents: FileEntry[]) {
		for (const file of dirContents) {
			if (file.children) {
				await this.buildNoteList(file.children);
			} else if (file.path.endsWith('')) {
				this.collectedNotes.push(await path.basename(file.path));
			}
		}
	}
}
