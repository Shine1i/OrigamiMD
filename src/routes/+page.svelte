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
	import * as ToggleGroup from '$lib/components/ui/toggle-group';
	import * as Select from '$lib/components/ui/select';
	import {
		Code,
		FontBold,
		FontItalic,
		Link2,
		Pencil1,
		Strikethrough,
		Underline
	} from 'radix-icons-svelte';
	import { Toggle } from '$lib/components/ui/toggle';
	const limit = 3000;

	onMount(() => {
		editor = createEditor({
			extensions: [
				StarterKit,
				Typography,

				TableOfContents.configure({
					getIndex: getHierarchicalIndexes,
					onUpdate(toCNodes) {
						$editorStore.toc = toCNodes;
					}
				}),
				CharacterCount.configure({
					limit
				}),
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
	<BubbleMenu class="min-w-[525px]" editor={$editor}>
		<ToggleGroup.Root
			size="sm"
			type="multiple"
			class="   divide-x rounded-md border bg-dracula-background p-0.5"
		>
			<div class="flex gap-2 px-1">
				<Select.Root>
					<Select.Trigger class="m-0 w-[90px] border-none p-0 pl-2 focus:ring-dracula-purple">
						<Select.Value placeholder="Font" />
					</Select.Trigger>
					<Select.Content>
						<Select.Item value="light">Inter</Select.Item>
						<Select.Item value="dark">Arial</Select.Item>
						<Select.Item value="system">Helvetica</Select.Item>
					</Select.Content>
				</Select.Root><Select.Root>
					<Select.Trigger class="m-0 w-[80px] border-none p-0 pl-2 focus:ring-dracula-purple">
						<Select.Value placeholder="Medium" />
					</Select.Trigger>
					<Select.Content>
						<Select.Item value="light">Inter</Select.Item>
						<Select.Item value="dark">Arial</Select.Item>
						<Select.Item value="system">Helvetica</Select.Item>
					</Select.Content>
				</Select.Root>
			</div>
			<div class="pl-1">
				<!--			<Toggle-->
				<!--				on:click={() => {-->
				<!--					$editor.chain().focus().toggleBold().run();-->
				<!--					console.log('worked');-->
				<!--				}}>Toggle</Toggle-->
				<!--			>-->

				<ToggleGroup.Item
					on:click={() => {
						$editor.chain().focus().toggleBold().run();
						console.log('worked');
					}}
					value="bold"
					aria-label="Toggle bold"
				>
					<FontBold class="h-5 w-5" />
				</ToggleGroup.Item>
				<ToggleGroup.Item value="italic" aria-label="Toggle italic" class="">
					<FontItalic
						on:click={() => {
							console.log('worked');
						}}
						class="h-5 w-5"
					/>
				</ToggleGroup.Item>
				<ToggleGroup.Item value="underline" aria-label="Toggle underline" class="">
					<Underline class="h-5 w-5" />
				</ToggleGroup.Item>
				<ToggleGroup.Item value="strikethrough" aria-label="Toggle strikethrough" class="">
					<Strikethrough class="h-5 w-5" />
				</ToggleGroup.Item>
				<ToggleGroup.Item value="code" aria-label="Toggle code" class="">
					<Code class="h-5 w-5" />
				</ToggleGroup.Item>
				<ToggleGroup.Item value="link" aria-label="Toggle link" class="">
					<Link2 class="h-5 w-5" />
				</ToggleGroup.Item>
				<ToggleGroup.Item value="highlight" aria-label="Toggle highlight" class="">
					<Pencil1 class="h-5 w-5" />
				</ToggleGroup.Item><ToggleGroup.Item
					value="highlight"
					aria-label="Toggle highlight"
					class=""
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="h-5 w-5"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008Z"
						/>
					</svg>
				</ToggleGroup.Item>
				<!--			</div>-->
			</div></ToggleGroup.Root
		>
	</BubbleMenu>
{/if}
