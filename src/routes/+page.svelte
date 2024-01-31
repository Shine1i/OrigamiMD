<script lang="ts">
	import type { Plugin } from 'svelte-exmarkdown';
	import Markdown from 'svelte-exmarkdown';
	import typescript from 'highlight.js/lib/languages/typescript';
	import csharp from 'highlight.js/lib/languages/csharp';
	import 'highlight.js/styles/github.css';
	import rehypeHighlight from 'rehype-highlight';

	let md = "```typescript\nconsole.log('Hello, world!');\n```";
	const plugins: Plugin[] = [
		{
			rehypePlugin: [
				rehypeHighlight,
				{ ignoreMissing: true, languages: { typescript, csharp } }
			]
		}
	];

</script>

<textarea  bind:value={md} />
<article class="prose prose-pink">
<Markdown {md} {plugins} />
</article>