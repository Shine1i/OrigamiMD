<script lang="ts">
	import { onMount } from 'svelte';
	import { Editor, rootCtx, defaultValueCtx } from '@milkdown/core';
	import { prism, prismConfig } from '@milkdown/plugin-prism';
	import 'prism-themes/themes/prism-nord.css';
	import javascript from 'refractor/lang/javascript';
	import { commonmark } from '@milkdown/preset-commonmark';
	import { nord } from '@milkdown/theme-nord';
	import { history } from '@milkdown/plugin-history';
	import { clipboard } from '@milkdown/plugin-clipboard';
	import { gfm } from '@milkdown/preset-gfm';
	import { fileHandlerStore, markdownStore, selectedNoteStore } from '$lib/stores';
	import { listener, listenerCtx } from '@milkdown/plugin-listener';
	import { DirectoryManager } from '$lib/markdown/utils/fileHandler';
	export let defaultValue: string;
	let editorInstance = Editor.make();
	let dom: HTMLElement;
	let fileHandler;
	let directory: DirectoryManager;
	fileHandlerStore.subscribe((value) => {
		fileHandler = value;
		directory = new DirectoryManager(fileHandler);
	});
	let typingTimeout: any; // debounce
	let DEBOUNCE_DELAY = 1000;
	function createEditor(markdown: string) {
		editorInstance
			.config((ctx) => {
				ctx.set(rootCtx, dom);
				ctx.set(defaultValueCtx, markdown);
				ctx.set(prismConfig.key, {
					configureRefractor: (refractor) => {
						refractor.register(javascript);
					}
				});
				ctx.get(listenerCtx).markdownUpdated(async (ctx, markdown, prevMarkdown) => {
					// debounce
					clearTimeout(typingTimeout);
					typingTimeout = setTimeout(async () => {
						await directory.updateNoteContent($selectedNoteStore, markdown);
						console.log('Markdown saved to file');
					}, DEBOUNCE_DELAY);
				});
			})
			.config(nord)
			.use(history)
			.use(gfm)
			.use(clipboard)
			.use(commonmark)
			.use(listener)
			.use(prism)
			.create();
	}

	function editor(element: HTMLElement) {
		dom = element;
		createEditor(defaultValue);
	}

	onMount(() => {
		if (editorInstance) {
			const unsubscribe = markdownStore.subscribe(async (markdown) => {
				await editorInstance.destroy();
				createEditor(markdown);
				console.log('Editor updated with new markdown content');
			});

			return unsubscribe;
		}
	});
</script>

<article use:editor class="border" />

<style>
</style>
