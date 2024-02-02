<script lang="ts">
	import MarkdownEditor from '$lib/MarkdownEditor.svelte';
	let markdown = '# workie';
</script>

<!--<article use:editor class="w-full bg-background !text-foreground" />-->
<MarkdownEditor
	defaultValue="# Milkdown Svelte Commonmark

> You're scared of a world where you're needed.

This is a demo for using Milkdown with **Svelte**.
![Image alt text](http://via.placeholder.com/350x150)
"
/>
