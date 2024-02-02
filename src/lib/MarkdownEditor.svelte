<script lang="ts">
	import { onMount } from 'svelte';
	import { Editor, rootCtx, defaultValueCtx } from '@milkdown/core';

	import { commonmark } from '@milkdown/preset-commonmark';
	import { nord } from '@milkdown/theme-nord';
	import { history } from '@milkdown/plugin-history';
	import { clipboard } from '@milkdown/plugin-clipboard';
	import { gfm } from '@milkdown/preset-gfm';
	import { markdownStore } from '$lib/stores';

	export let defaultValue: string;
	let editorInstance = Editor.make();
	let dom: HTMLElement;

	function createEditor(markdown: string) {
		editorInstance
			.config((ctx) => {
				ctx.set(rootCtx, dom);
				ctx.set(defaultValueCtx, markdown);
			})
			.config(nord)
			.use(history)
			.use(gfm)
			.use(clipboard)
			.use(commonmark)
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
