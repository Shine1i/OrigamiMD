<script lang="ts">
	import { onMount } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { BubbleMenu, createEditor, Editor, EditorContent, FloatingMenu } from 'svelte-tiptap';
	import StarterKit from '@tiptap/starter-kit';
	import { editorStore, fileHandlerStore } from '$lib/stores';
	import { NoteManager } from '$lib';
	import type { JSONContent } from '@tiptap/core';

	let editor: Readable<Editor>;
	let typingTimeout = null;
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
			extensions: [StarterKit],
			content: ` `,
			editorProps: {
				attributes: {
					class: 'prose  prose-white 2xl:prose-2xl mx-auto focus:outline-none dark:prose-invert'
				}
			},
			autofocus: false,
			onUpdate: ({ editor }) => {
				const json = editor.getJSON();
				if ($editorStore.currentNote != '')
					saveMarkdownToFile(json, $fileHandlerStore, $editorStore.currentNote);
				console.log('Note updated successfully');
			},
			onCreate: ({ editor }) => {
				editor.commands.setContent('', true);
			}
		});
	});
	let previousNote = null;

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
<!--{#if $editor}-->
<!--	<FloatingMenu editor={$editor}>wow</FloatingMenu>-->

<!--	<BubbleMenu editor={$editor}>working</BubbleMenu>-->
<!--{/if}-->
