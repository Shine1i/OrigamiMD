import {
	BaseDirectory,
	createDir,
	exists,
	readDir,
	readTextFile,
	removeFile,
	writeFile
} from '@tauri-apps/api/fs';

export async function ensureNotesDirectoryExists() {
	const notesPath = 'Notes';

	const isDirExists = await exists(notesPath, { dir: BaseDirectory.Document });

	if (!isDirExists) {
		await createDir(notesPath, { dir: BaseDirectory.Document });
		console.log("Notes directory doesn't exist. Creating...");
	}
}

/**
 * A class that handles reading, creating, appending, and deleting Markdown files.
 */
export class MarkdownFileHandler {
	baseDir: string;

	constructor(baseDir: string) {
		this.baseDir = baseDir;
	}

	async createNote(noteName: string, content: string = ''): Promise<void> {
		if (!(await exists(`${noteName}.md`, { dir: BaseDirectory.Document }))) {
			await writeFile(`${noteName}.md`, content, { dir: BaseDirectory.Document });
		} else {
			throw new Error('Note already exists');
		}
	}

	async readNote(noteName: string): Promise<string> {
		if (await exists(`${noteName}.md`, { dir: BaseDirectory.Document })) {
			return await readTextFile(`${noteName}.md`, { dir: BaseDirectory.Document });
		} else {
			throw new Error('Note does not exist');
		}
	}

	async appendToNote(noteName: string, content: string): Promise<void> {
		if (await exists(`${noteName}.md`, { dir: BaseDirectory.Document })) {
			await writeFile(`${noteName}.md`, content, { dir: BaseDirectory.Document, append: true });
		} else {
			throw new Error('Note does not exist');
		}
	}

	async deleteNote(noteName: string): Promise<void> {
		if (await exists(`${noteName}.md`, { dir: BaseDirectory.Document })) {
			await removeFile(`${noteName}.md`, { dir: BaseDirectory.Document });
		} else {
			throw new Error('Note does not exist');
		}
	}
}
