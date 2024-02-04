<script lang="ts">
	import { onMount } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { BubbleMenu, createEditor, Editor, EditorContent, FloatingMenu } from 'svelte-tiptap';
	import StarterKit from '@tiptap/starter-kit';

	let editor: Readable<Editor>;

	onMount(() => {
		editor = createEditor({
			extensions: [StarterKit],
			content: `Hello world!`
		});
	});
	$: if ($editor) {
		console.log($editor.getJSON());
	}
</script>

<EditorContent editor={$editor} />
{#if $editor}
	<FloatingMenu editor={$editor}>wow</FloatingMenu>

	<BubbleMenu editor={$editor}>working</BubbleMenu>
{/if}
