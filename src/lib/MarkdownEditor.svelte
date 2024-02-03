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
	import { NoteManager } from '$lib';
	import { replaceAll } from '@milkdown/utils';
	export let defaultValue: string;
	let editorInstance = Editor.make();
	let dom: HTMLElement;

	let typingTimeout: any; // debounce
	const DEBOUNCE_DELAY = 1000;
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
					clearTimeout(typingTimeout);
					typingTimeout = setTimeout(async () => {
						await $fileHandlerStore.updateNoteContent($selectedNoteStore, markdown);
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
	class test {
		public static editor(element: HTMLElement) {
			dom = element;
			createEditor(defaultValue);
		}
	}
	onMount(() => {
		if (editorInstance) {
			const unsubscribe = markdownStore.subscribe(async (markdown) => {
				editorInstance.action(replaceAll(markdown));
				console.log('Editor updated with new markdown content');
			});

			return unsubscribe;
		}
	});
</script>

<article use:test.editor class="border" />

<style>
</style>
