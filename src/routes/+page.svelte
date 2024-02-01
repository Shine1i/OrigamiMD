<script lang="ts">
	import type { Plugin } from 'svelte-exmarkdown';
	import Markdown from 'svelte-exmarkdown';
	import typescript from 'highlight.js/lib/languages/typescript';
	import csharp from 'highlight.js/lib/languages/csharp';
	import 'highlight.js/styles/github.css';
	import rehypeHighlight from 'rehype-highlight';
	import { MarkdownFileHandler } from '$lib/markdown/utils/fileHandler';
	import { BaseDirectory, readDir } from '@tauri-apps/api/fs';

	let md = "```typescript\nconsole.log('Hello, world!');\n```";
	const plugins: Plugin[] = [
		{
			rehypePlugin: [rehypeHighlight, { ignoreMissing: true, languages: { typescript, csharp } }]
		}
	];

	const noteHandler = new MarkdownFileHandler('Notes');

	async function createNote() {
		try {
			await noteHandler.createNote('NewNote', '# My New Note\nThis is my new note.');
			console.log('Note created');
		} catch (e) {
			console.error(e);
		}
	}
	async function Append(content: string) {
		try {
			await noteHandler.appendToNote('NewNote', `${content}`);
			console.log('Note created');
		} catch (e) {
			console.error(e);
		}
	}
	async function openNote(note: string): Promise<string> {
		try {
			return (md = await noteHandler.readNote(note));
		} catch (e) {
			console.log(e);
		}
		return '';
	}
	function handleKeydown(event: KeyboardEvent) {
		let { value, selectionStart } = event.target as HTMLTextAreaElement;
		const lastNewline = value.lastIndexOf('\n', selectionStart - 1);
		const currentLine = value.substring(lastNewline !== -1 ? lastNewline + 1 : 0, selectionStart);
		if (event.key === 'Enter') {
			event.preventDefault();
			if (currentLine.trim() === '-') {
				// If the current line is only a "-", remove the '-' and stay on the same line
				md = value.slice(0, lastNewline != -1 ? lastNewline + 1 : 0) + value.slice(selectionStart);
			} else if (currentLine.trim().startsWith('-')) {
				// If the current line starts with "-", add a new line and a "-"
				md += '\n- ';
			} else {
				// If the current line doesn't start with "-", behave as usual
				md += '\n';
			}
		}
	}

	async function processEntries() {
		const entries = await readDir('Notes', { dir: BaseDirectory.Document, recursive: true });
		console.log(entries);
		// for (const entry of entries) {
		// 	console.log(`Entry: ${entry.path}`);
		// 	if (entry.children) {
		// 		await processEntries(entry.children);
		// 	}
		// }
	}
	$: console.log(processEntries());
	let selectedText = '';
	function handleMouseUp(event: MouseEvent) {
		console.log('workie');
		const { value, selectionStart, selectionEnd } = event.target as HTMLTextAreaElement;
		if (selectionStart !== selectionEnd) {
			selectedText = value.substring(selectionStart, selectionEnd);
		}
	}
</script>

<button
	on:click={() => {
		Append(md);
	}}>Create Note</button
>
<button
	on:click={() => {
		openNote('NewNote');
	}}>Open Note</button
>
<div class="flex h-full w-full justify-between">
	<textarea
		bind:value={md}
		class="h-full w-full border border-teal-600 bg-background"
		on:keydown={handleKeydown}
		on:mouseup={handleMouseUp}
	/>

	<!--	<article class="prose prose-pink h-full w-1/2">-->
	<!--		<Markdown {md} {plugins} />-->
	<!--	</article>-->
</div>
<p>Selected text: "{selectedText}"</p>
