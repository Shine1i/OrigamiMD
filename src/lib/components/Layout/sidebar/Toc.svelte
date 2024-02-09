<script lang="ts">
	import { TextSelection } from '@tiptap/pm/state';
	import { editorStore } from '$lib/stores';
	import type { TableOfContentData } from '@tiptap-pro/extension-table-of-contents';

	export let itemList: TableOfContentData = [];

	const getEditorElementById = (id) => {
		return $editorStore?.editor?.view.dom.querySelector(`[data-toc-id="${id}"`);
	};

	const scrollToElement = async (el, id) => {
		if (history.pushState) {
			history.pushState(null, null, `#${id}`);
		}
		el.scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		});
	};

	const setFocus = async (element: HTMLElement, pos: never) => {
		const tr = $editorStore?.editor?.view.state.tr;
		tr?.setSelection(new TextSelection(tr.doc.resolve(pos)));
		$editorStore?.editor?.view.dispatch(tr);
		$editorStore?.editor?.view.focus();
	};

	const updateIsScrolled = (id) => {
		itemList = itemList.map((item) => {
			item.isScrolled = item.id === id;
			return item;
		});
	};

	const handleItemClick = async (e, id) => {
		e.preventDefault();
		if ($editorStore.editor) {
			const element = getEditorElementById(id);
			if (element) {
				const position = $editorStore.editor.view.posAtDOM(element, 0);
				await setFocus(element, position);
				await scrollToElement(element, id);
				updateIsScrolled(id);
			}
		}
	};
</script>

<div class=" z-[10000] px-4">
	{#each itemList as item (item.id)}
		<div style="padding-left: {item.level - 1}em" class="py-1 hover:bg-muted">
			<a
				class={`toc-link pl-2 text-base text-muted-foreground hover:underline ${item.isScrolled ? 'font-bold' : ''}`}
				href={`#${item.id}`}
				on:click|preventDefault={(e) => handleItemClick(e, item.id)}
			>
				{`${item.textContent}`}
			</a>
		</div>
	{/each}
</div>
