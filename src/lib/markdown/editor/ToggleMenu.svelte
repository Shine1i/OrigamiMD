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
	import * as Popover from '$lib/components/ui/popover';
	import { Label } from '$lib/components/ui/label';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import * as ToggleGroup from '$lib/components/ui/toggle-group';
	import * as Select from '$lib/components/ui/select';

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
	async function rephraseSelectedText() {
		if (!$editorStore.editor) return;

		const { from, to } = $editorStore.editor.state.selection;
		// Ensure there's a selection to replace
		if (from === to) return;

		// Extract the selected text
		const selectedText = $editorStore.editor.state.doc.textBetween(from, to);
		console.log(selectedText);

		try {
			// Send the selected text to your local server for rephrasing
			const rephrasedText = await fetchRequestToGrazie(selectedText);
			console.log(rephrasedText);
			// Replace the selected text with the rephrased text from your server
			$editorStore.editor
				.chain()
				.command(({ tr }) => {
					tr.replaceWith(from, to, $editorStore.editor.schema.text(rephrasedText));
					return true;
				})
				.run();
		} catch (error) {
			console.error('Error rephrasing text:', error);
		}
	}

	async function fetchRequestToGrazie(selectedText) {
		const response = await fetch('http://localhost:5148/grazie-backend/Services/grazie', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				requestType: 'AdjustTone',
				sysCfgMsgs: ['string'], // Adjust according to your requirements
				prompt: selectedText
			})
		});

		if (!response.ok) {
			throw new Error(`Error: ${response.statusText}`);
		}

		const data = await response.text();
		console.log(data);
		// Assuming the API returns the rephrased text in a specific field, adjust the following line accordingly
		return data; // Adjust this to match the actual response structure
	}
</script>

{#if $editorStore.editor}
	<ToggleGroup.Root
		size="sm"
		type="multiple"
		class="flex divide-x rounded-md border bg-dracula-background p-0.5"
	>
		<!--		tiptap-extension-font-size-->
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
			</Select.Root>
			<Select.Root>
				<Select.Trigger
					class="m-0 w-[90px] rounded-md border-none p-0 pl-2 focus:ring-dracula-purple"
				>
					<Select.Value placeholder="Font" />
				</Select.Trigger>
				<Select.Content>
					<Select.Item
						value="Roboto"
						on:click={() => $editorStore.editor?.commands.setFontFamily('Roboto')}
					>
						Roboto {$editorStore.editor.isActive('textStyle', { fontFamily: 'Roboto' })
							? ' (current font)'
							: ''}
					</Select.Item>
					<Select.Item
						value="Open Sans"
						on:click={() => $editorStore.editor?.commands.setFontFamily('Open Sans')}
						>Open Sans</Select.Item
					>
					<Select.Item
						value="Lora"
						on:click={() => $editorStore.editor?.commands.setFontFamily('Lora')}>Lora</Select.Item
					>
					<Select.Item
						value="Source Code Pro"
						on:click={() => $editorStore.editor?.commands.setFontFamily('Source Code Pro')}
						>Source Code Pro</Select.Item
					>
					<Select.Item
						value="Merriweather"
						on:click={() => $editorStore.editor?.commands.setFontFamily('Merriweather')}
						>Merriweather</Select.Item
					>
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
		</div>

		<Popover.Root>
			<Popover.Trigger asChild let:builder>
				<Button builders={[builder]} variant="outline" class="flex items-center gap-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="h-6 w-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
						/>
					</svg>
					AI Assistant
				</Button>
			</Popover.Trigger>
			<Popover.Content class="w-80">
				<Button
					on:click={() => {
						rephraseSelectedText();
					}}
					variant="outline"
					class="flex items-center gap-2"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="h-6 w-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
						/>
					</svg>

					Rephrase
				</Button>
			</Popover.Content>
		</Popover.Root>
	</ToggleGroup.Root>
{/if}
