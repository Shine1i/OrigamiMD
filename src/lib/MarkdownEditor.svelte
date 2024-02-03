<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { Editor, rootCtx } from '@milkdown/core';
	import { prism, prismConfig } from '@milkdown/plugin-prism';
	import 'prism-themes/themes/prism-nord.css';
	import javascript from 'refractor/lang/javascript';
	import { commonmark } from '@milkdown/preset-commonmark';
	import { nord } from '@milkdown/theme-nord';
	import { clipboard } from '@milkdown/plugin-clipboard';
	import { gfm } from '@milkdown/preset-gfm';
	import { editorStore, fileHandlerStore } from '$lib/stores';
	import { listener, listenerCtx } from '@milkdown/plugin-listener';
	import { replaceAll } from '@milkdown/utils';
	import { saveMarkdownToFile } from '$lib';
	import { Ctx } from '@milkdown/ctx';
	let editorInstancePromise: any;
	let editorInstance = Editor.make();

	let dom: HTMLElement;
	function createEditor(node: HTMLElement) {
		// Extract the markdownUpdate handler
		const markdownUpdateCallback = (ctx: Ctx, markdown: string) => {
			saveMarkdownToFile(markdown, $fileHandlerStore, $editorStore.currentNote);
		};

		editorInstancePromise = editorInstance
			.config((ctx) => {
				ctx.set(rootCtx, node);
				ctx.set(prismConfig.key, {
					configureRefractor: (refractor) => {
						refractor.register(javascript);
					}
				});
				ctx.get(listenerCtx).markdownUpdated(markdownUpdateCallback);
			})
			.use(gfm)
			.config(nord)
			.use(clipboard)
			.use(commonmark)
			.use(listener)
			.use(prism)
			.create();

		editorInstancePromise.then((editorInstance: Editor) => {
			$editorStore.editorInstance = editorInstance;
		});
		return {
			destroy() {
				// manage any cleanup/logic when component is destroyed
			}
		};
	}
	let unsubscribe;
	onMount(() => {
		editorInstancePromise.then((_) => {
			unsubscribe = editorStore.subscribe((state) => {
				state?.editorInstance?.action(replaceAll(state.noteContent));
				console.log('Editor updated with new markdown');
			});
		});
	});

	onDestroy(() => {
		if (unsubscribe) {
			unsubscribe();
		}
	});
</script>

<article use:createEditor class="border" />

<style>
</style>
