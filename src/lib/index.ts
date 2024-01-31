// place files you want to import through the `$lib` alias in this folder.


import { fs } from '@tauri-apps/api';

export class MarkdownFileHandler{
	filepath: string;
	constructor(filepath: string) {
		this.filepath = filepath;
	}
	read(){
		if (!fs.exists(this.filepath)){
			throw new Error("File Not Found");
		}
		return fs.readTextFile(this.filepath);
	}
	async write(content: string) {
		await fs.writeFile(this.filepath, content)
	}
	exists(){
		return fs.exists( this.filepath );
	}

}