<script>
	import { Toggle } from '$lib/components/ui/toggle';
	import {
		Code,
		FontBold,
		FontItalic,
		Link2,
		Pencil1,
		Strikethrough,
		Underline as UnderlineIcon
	} from 'radix-icons-svelte';
	import * as ToggleGroup from '$lib/components/ui/toggle-group';
	import * as Select from '$lib/components/ui/select';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { editorStore } from '$lib/stores';
	const setLink = () => {
		if (!$editorStore.editor) return;
		const existingLinkAttributes = $editorStore.editor.getAttributes('link');
		const previousUrl = existingLinkAttributes.href;

		// If a link already exists, remove it and return.
		if (previousUrl) {
			$editorStore.editor.chain().focus().extendMarkRange('link').unsetLink().run();
			return;
		}

		// Otherwise prompt for URL and set a link.
		const url = window.prompt('URL', previousUrl);

		if (url === null || url === '') {
			return;
		}

		$editorStore.editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
	};
	let color = '#ff0000'; // Initial color

	function handleColorChange(color) {
		if (!$editorStore.editor) return;
		$editorStore.editor.commands.setColor(color);
	}
</script>

{#if $editorStore.editor}
	<ToggleGroup.Root
		size="sm"
		type="multiple"
		class="divide-x rounded-md border bg-dracula-background p-0.5"
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
			<Toggle
				size="sm"
				on:click={() => {
					$editorStore.editor?.chain().focus().toggleBold().run();
				}}
				value="bold"
				pressed={$editorStore.editor.isActive('bold')}
				aria-label="Toggle bold"
			>
				<FontBold class="h-5 w-5" />
			</Toggle>
			<Toggle
				pressed={$editorStore.editor.isActive('italic')}
				on:click={() => $editorStore.editor?.chain().focus().toggleItalic().run()}
				size="sm"
				value="italic"
				aria-label="Toggle italic"
				class=""
			>
				<FontItalic class="h-5 w-5" />
			</Toggle>
			<Toggle
				pressed={$editorStore.editor.isActive('underline')}
				on:click={() => $editorStore.editor?.chain().focus().toggleUnderline().run()}
				size="sm"
				value="underline"
				aria-label="Toggle underline"
				class=""
			>
				<UnderlineIcon class="h-5 w-5" />
			</Toggle>
			<Toggle
				pressed={$editorStore.editor.isActive('strike')}
				on:click={() => $editorStore.editor?.chain().focus().toggleStrike().run()}
				size="sm"
				value="strikethrough"
				aria-label="Toggle strikethrough"
				class=""
			>
				<Strikethrough class="h-5 w-5" />
			</Toggle>
			<Toggle
				pressed={$editorStore.editor.isActive('code')}
				on:click={() => $editorStore.editor?.chain().focus().toggleCode().run()}
				size="sm"
				value="code"
				aria-label="Toggle code"
				class=""
			>
				<Code class="h-5 w-5" />
			</Toggle>
			<Toggle
				pressed={$editorStore.editor.isActive('link')}
				on:click={setLink}
				size="sm"
				value="link"
				aria-label="Toggle link"
				class=""
			>
				<Link2 class="h-5 w-5" />
			</Toggle>

			<Toggle
				pressed={$editorStore.editor.isActive('highlight')}
				on:click={() =>
					$editorStore.editor?.chain().focus().toggleHighlight({ color: '#FF9580' }).run()}
				size="sm"
				value="highlight"
				aria-label="Toggle highlight"
				class=""
			>
				<Pencil1 class="h-5 w-5" />
			</Toggle>
			<Toggle
				pressed={$editorStore.editor.isActive('textStyle')}
				size="sm"
				value="textStyle"
				aria-label="Toggle textStyle"
				class=""
			>
				<label>
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
					<input
						type="color"
						class="absolute opacity-0"
						bind:value={color}
						on:change={() => handleColorChange(color)}
					/>
				</label>
			</Toggle>
		</div></ToggleGroup.Root
	>{/if}
