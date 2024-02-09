<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { BubbleMenu, createEditor, Editor, EditorContent } from 'svelte-tiptap';
	import StarterKit from '@tiptap/starter-kit';
	import { editorStore, fileHandlerStore } from '$lib/stores';
	import { scrollToSelection, updateNoteContent } from '$lib';

	import Typography from '@tiptap/extension-typography';

	let editor: Readable<Editor>;

	import CharacterCount from '@tiptap/extension-character-count';
	import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
	import { lowlight } from '$lib';
	import { Placeholder } from '@tiptap/extension-placeholder';
	import { getHierarchicalIndexes, TableOfContents } from '@tiptap-pro/extension-table-of-contents';

	import Underline from '@tiptap/extension-underline';

	import { Link } from '@tiptap/extension-link';
	import { Highlight } from '@tiptap/extension-highlight';
	import { Color } from '@tiptap/extension-color';
	import { TextStyle } from '@tiptap/extension-text-style';
	import ToggleMenu from '$lib/markdown/editor/ToggleMenu.svelte';
	const limit = 3000;

	onMount(() => {
		editor = createEditor({
			extensions: [
				StarterKit,
				Typography,
				Underline,
				TableOfContents.configure({
					getIndex: getHierarchicalIndexes,
					onUpdate(toCNodes) {
						$editorStore.toc = toCNodes;
					}
				}),
				Link.configure({
					openOnClick: false,
					autolink: true
				}),
				Highlight.configure({ multicolor: true }),
				CharacterCount.configure({
					limit
				}),
				TextStyle,
				Color,
				CodeBlockLowlight.configure({
					lowlight,
					defaultLanguage: 'plaintext'
				}),
				Placeholder.configure({
					placeholder: 'Write something …'
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
				if ($editorStore.currentNote != '')
					updateNoteContent(json, $fileHandlerStore, $editorStore.currentNote);
				console.log('Note updated successfully');

				scrollToSelection(editor);
			},
			onCreate: ({ editor }) => {
				editor.commands.setContent('', true);
			}
		});
	});
	onDestroy(() => {
		if ($editor) {
			$editor.destroy();
			editor = null;
		}
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
		$editorStore.editor = $editor;
	}
</script>

<EditorContent editor={$editor} />

{#if $editor}
	<BubbleMenu class="z-[100000] min-w-[625px]" editor={$editor}>
		<ToggleMenu />
	</BubbleMenu>
{/if}
