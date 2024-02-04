<script lang="ts">
	import { onMount } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { BubbleMenu, createEditor, Editor, EditorContent, FloatingMenu } from 'svelte-tiptap';
	import StarterKit from '@tiptap/starter-kit';
	import { editorStore, fileHandlerStore } from '$lib/stores';
	import { NoteManager } from '$lib';
	import type { JSONContent } from '@tiptap/core';
	import Typography from '@tiptap/extension-typography';
	let editor: Readable<Editor>;
	let typingTimeout = null;
	import CharacterCount from '@tiptap/extension-character-count';
	import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
	import css from 'highlight.js/lib/languages/css';
	import js from 'highlight.js/lib/languages/javascript';
	import ts from 'highlight.js/lib/languages/typescript';
	import html from 'highlight.js/lib/languages/xml';
	import { common, createLowlight } from 'lowlight';
	import { Placeholder } from '@tiptap/extension-placeholder';
	const lowlight = createLowlight(common);

	lowlight.register('html', html);
	lowlight.register('css', css);
	lowlight.register('js', js);
	lowlight.register('ts', ts);
	function saveMarkdownToFile(
		markdown: JSONContent,
		noteManager: NoteManager,
		currentNote: string
	) {
		clearTimeout(typingTimeout);
		typingTimeout = setTimeout(async () => {
			await noteManager.updateNoteContent(currentNote, markdown);
			console.log('Markdown saved to file');
		}, 1000);
	}

	onMount(() => {
		editor = createEditor({
			extensions: [
				StarterKit,
				Typography,
				CharacterCount.configure({}),
				CodeBlockLowlight.configure({
					lowlight,
					defaultLanguage: 'javascript'
				}),
				Placeholder.configure({
					// Use a placeholder:
					placeholder: 'Write something …'
					// Use different placeholders depending on the node type:
					// placeholder: ({ node }) => {
					//   if (node.type.name === 'heading') {
					//     return 'What’s the title?'
					//   }

					//   return 'Can you add some further context?'
					// },
				})
			],

			editorProps: {
				attributes: {
					class: 'prose  prose-white 2xl:prose-2xl mx-auto focus:outline-none dark:prose-invert'
				}
			},
			autofocus: false,
			onUpdate: ({ editor }) => {
				const json = editor.getJSON();
				if ($editorStore.currentNote != '' && $editorStore.noteContent != '')
					saveMarkdownToFile(json, $fileHandlerStore, $editorStore.currentNote);
				console.log('Note updated successfully');
			},
			onCreate: ({ editor }) => {
				editor.commands.setContent('', true);
			}
		});
	});
	let previousNote: string = '';

	function updateEditorContent(state) {
		if (state.currentNote !== previousNote && state.noteContent.trim() !== '') {
			$editor.commands.setContent(JSON.parse(state.noteContent), true);

			previousNote = state.currentNote;
		}
	}

	$: if ($editor) {
		editorStore.subscribe(updateEditorContent);
	}
</script>

<EditorContent editor={$editor} />
{#if $editor}
	<FloatingMenu editor={$editor}>
		<div class="character-count">
			<br />
			{$editor.storage.characterCount.words()} words
		</div>
	</FloatingMenu>

	<BubbleMenu editor={$editor}>working</BubbleMenu>
{/if}
